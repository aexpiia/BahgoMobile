import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Animated, Image } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { useRouter } from 'expo-router'
import { useEffect, useRef, useState } from 'react'
import { useFonts, Poppins_400Regular, Poppins_700Bold, Poppins_800ExtraBold } from '@expo-google-fonts/poppins'

const { width, height } = Dimensions.get('window')

// ── Rain Drop ────────────────────────────────────────────────────────────────
function RainDrop({ left, delay, size, duration }: { left: number; delay: number; size: number; duration: number }) {
    const translateY = useRef(new Animated.Value(-40)).current
    const opacity = useRef(new Animated.Value(0)).current

    useEffect(() => {
        const animate = () => {
            translateY.setValue(-40)
            opacity.setValue(1)
            Animated.parallel([
                Animated.timing(translateY, { toValue: height + 40, duration, useNativeDriver: true }),
                Animated.sequence([
                    Animated.timing(opacity, { toValue: 1, duration: 200, useNativeDriver: true }),
                    Animated.timing(opacity, { toValue: 0.15, duration: duration - 200, useNativeDriver: true }),
                ]),
            ]).start(() => animate())
        }
        const timer = setTimeout(animate, delay)
        return () => clearTimeout(timer)
    }, [])

    return (
        <Animated.View style={{
            position: 'absolute', left, top: 0,
            width: size, height: size * 3,
            borderRadius: size * 2,
            backgroundColor: 'rgba(255,255,255,0.9)',
            transform: [{ translateY }], opacity,
        }} />
    )
}

function RainBackground() {
    const drops = Array.from({ length: 30 }, (_, i) => ({
        id: i,
        left: Math.random() * width,
        delay: Math.random() * 3000,
        size: Math.random() * 2 + 1.5,
        duration: Math.random() * 1200 + 1200,
    }))
    return (
        <View style={[StyleSheet.absoluteFillObject, { zIndex: 2 }]} pointerEvents="none">
            {drops.map(d => (
                <RainDrop key={d.id} left={d.left} delay={d.delay} size={d.size} duration={d.duration} />
            ))}
        </View>
    )
}

// ── Wave ─────────────────────────────────────────────────────────────────────
function Wave({ color, speed, initialOffset, verticalOffset }: {
    color: string; speed: number; initialOffset: number; verticalOffset: number
}) {
    const anim = useRef(new Animated.Value(0)).current

    useEffect(() => {
        Animated.loop(
            Animated.timing(anim, { toValue: 1, duration: speed, useNativeDriver: true })
        ).start()
    }, [])

    const translateX = anim.interpolate({
        inputRange: [0, 1],
        outputRange: [initialOffset, initialOffset - width * 2],
    })

    return (
        <Animated.View style={[styles.waveSingle, { top: verticalOffset, transform: [{ translateX }] }]}>
            {[0, 1, 2, 3].map(i => (
                <View key={i} style={[styles.waveHump, { backgroundColor: color }]} />
            ))}
        </Animated.View>
    )
}

// ── Main ─────────────────────────────────────────────────────────────────────
export default function Index() {
    const router = useRouter()

    // ✅ ALL hooks at the top
    const [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_700Bold,
        Poppins_800ExtraBold,
    })

    const [phase, setPhase] = useState<'flooding' | 'content'>('flooding')
    const waterRise = useRef(new Animated.Value(height)).current
    const waterExit = useRef(new Animated.Value(0)).current
    const contentOpacity = useRef(new Animated.Value(0)).current
    const contentSlide = useRef(new Animated.Value(40)).current
    const floatAnim = useRef(new Animated.Value(0)).current
    const glowAnim = useRef(new Animated.Value(0.5)).current

    useEffect(() => {
        if (!fontsLoaded) return

        Animated.timing(waterRise, {
            toValue: -height * 0.08,
            duration: 2600,
            useNativeDriver: true,
        }).start(() => {
            setTimeout(() => {
                Animated.timing(waterExit, {
                    toValue: -height * 1.15,
                    duration: 1000,
                    useNativeDriver: true,
                }).start(() => {
                    setPhase('content')

                    Animated.parallel([
                        Animated.timing(contentOpacity, { toValue: 1, duration: 1000, useNativeDriver: true }),
                        Animated.timing(contentSlide, { toValue: 0, duration: 900, useNativeDriver: true }),
                    ]).start()

                    Animated.loop(
                        Animated.sequence([
                            Animated.timing(floatAnim, { toValue: -10, duration: 1800, useNativeDriver: true }),
                            Animated.timing(floatAnim, { toValue: 0, duration: 1800, useNativeDriver: true }),
                        ])
                    ).start()

                    Animated.loop(
                        Animated.sequence([
                            Animated.timing(glowAnim, { toValue: 1, duration: 1800, useNativeDriver: true }),
                            Animated.timing(glowAnim, { toValue: 0.4, duration: 1800, useNativeDriver: true }),
                        ])
                    ).start()
                })
            }, 500)
        })
    }, [fontsLoaded])

    // ✅ return null AFTER all hooks
    if (!fontsLoaded) return null

    return (
        <LinearGradient
            colors={['#C5E3F7', '#4A90D9', '#1A5BB5']}
            locations={[0, 0.5, 1]}
            style={styles.container}
        >
            <RainBackground />

            {/* WAVE FLOOD */}
            <Animated.View style={[
                styles.waterBlock,
                { transform: [{ translateY: Animated.add(waterRise, waterExit) }] }
            ]}>
                <View style={styles.wavesContainer}>
                    <Wave color="rgba(255,255,255,0.18)" speed={6000} initialOffset={0} verticalOffset={-30} />
                    <Wave color="rgba(150,210,255,0.40)" speed={5000} initialOffset={-width * 0.4} verticalOffset={-10} />
                    <Wave color="rgba(80,160,240,0.70)" speed={4000} initialOffset={-width * 0.2} verticalOffset={10} />
                </View>
                <View style={styles.waterFill} />
            </Animated.View>

            {/* CONTENT */}
            {phase === 'content' && (
                <Animated.View style={[
                    styles.content,
                    { opacity: contentOpacity, transform: [{ translateY: contentSlide }] }
                ]}>

                    {/* Logo */}
                    <Animated.View style={[styles.logoWrapper, { transform: [{ translateY: floatAnim }] }]}>
                        <Animated.View style={[styles.glowRing, { opacity: glowAnim }]} />
                        <Image
                            source={require('../assets/images/logo.png')}
                            style={styles.logoImage}
                            resizeMode="contain"
                        />
                        <View style={styles.orangeDot} />
                    </Animated.View>

                    <Text style={styles.appName}>BAHGO</Text>

                    <View style={styles.glassCard}>
                        <Text style={styles.description}>
                            an innovative early flood detection and monitoring system designed to provide real-time alerts and data visualization through a mobile application dashboard.
                        </Text>
                    </View>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => router.push('/phone')}
                        activeOpacity={0.85}
                    >
                        <Text style={styles.buttonIcon}>👤</Text>
                        <Text style={styles.buttonText}>Get Started</Text>
                    </TouchableOpacity>

                </Animated.View>
            )}
        </LinearGradient>
    )
}

// ── Styles ────────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    waterBlock: {
        position: 'absolute',
        left: 0, right: 0, bottom: 0,
        height: height * 1.3,
        zIndex: 5,
    },
    wavesContainer: {
        height: 100,
        overflow: 'hidden',
        position: 'relative',
        width: '100%',
    },
    waveSingle: {
        position: 'absolute',
        flexDirection: 'row',
        width: width * 4,
    },
    waveHump: {
        width: width,
        height: 80,
        borderRadius: 9999,
        marginHorizontal: -width * 0.08,
        marginTop: -10,
    },
    waterFill: {
        flex: 1,
        backgroundColor: 'rgba(80,160,240,0.85)',
    },
    content: {
        alignItems: 'center',
        paddingHorizontal: 36,
        width: '100%',
        zIndex: 20,
    },
    logoWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        position: 'relative',
    },
    logoImage: {
        width: 120,
        height: 120,
    
   

    },
    appName: {
        fontFamily: 'Poppins_800ExtraBold',
        fontSize: 40,
        color: '#FFFFFF',
        marginBottom: 14,
        textShadowColor: 'rgba(0,0,0,0.15)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 6,
    
    },
    description: {
        fontFamily: 'Poppins_400Regular',
        fontSize: 14,
        color: 'rgba(255,255,255,0.95)',
        textAlign: 'center',
        lineHeight: 23,
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderWidth: 1.5,
        borderColor: 'rgba(255,255,255,0.6)',
        width: '100%',
        paddingVertical: 17,
        borderRadius: 50,
        gap: 10,
        shadowColor: '#FFFFFF',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
        elevation: 6,
    },
    buttonIcon: { fontSize: 18 },
    buttonText: {
        fontFamily: 'Poppins_700Bold',
        fontSize: 16,
        color: '#FFFFFF',
    },
})