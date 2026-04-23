import { View, Text, StyleSheet, Dimensions, ActivityIndicator, Image, Animated } from 'react-native'
import { useRouter } from 'expo-router'
import { useEffect, useRef } from 'react'
import { useFonts, Poppins_800ExtraBold } from '@expo-google-fonts/poppins'
import Background from '../components/Background'

const { height } = Dimensions.get('window')

export default function LoadingScreen() {
    const router = useRouter()
    const floatAnim = useRef(new Animated.Value(0)).current
    const glowAnim = useRef(new Animated.Value(0.5)).current

    const [fontsLoaded] = useFonts({ Poppins_800ExtraBold })

    useEffect(() => {
        const timer = setTimeout(() => {
            router.push('/dashboard' as any)
        }, 3000)

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

        return () => clearTimeout(timer)
    }, [])

    if (!fontsLoaded) return null

    return (
        <Background>
            <View style={styles.container}>
                <Animated.View style={[styles.logoWrapper, { transform: [{ translateY: floatAnim }] }]}>
                    <Animated.View style={[styles.glowRing, { opacity: glowAnim }]} />
                    <Image
                        source={require('../assets/images/logo.png')}
                        style={styles.logoImage}
                        resizeMode="contain"
                    />
                    
                </Animated.View>

                <Text style={styles.welcome}>Welcome</Text>

                <ActivityIndicator
                    size="small"
                    color="rgba(255,255,255,0.8)"
                    style={styles.spinner}
                />
            </View>
        </Background>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 24,
        position: 'relative',
    },
    logoImage: {
        width: 120,
        height: 120,
    },
    glowRing: {
        position: 'absolute',
        width: 155,
        height: 155,
        borderRadius: 80,
        backgroundColor: 'rgba(255,255,255,0.1)',
    },
    
    welcome: {
        fontFamily: 'Poppins_800ExtraBold',
        fontSize: 36,
        color: '#FFFFFF',
        marginBottom: 40,
    },
    spinner: {
        position: 'absolute',
        bottom: height * 0.15,
    },
})