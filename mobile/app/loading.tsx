import { View, Text, StyleSheet, Dimensions, ActivityIndicator, Image, Animated } from 'react-native'
import { useRouter } from 'expo-router'
import { useEffect, useRef } from 'react'
import Background from '../components/Background'

const { height } = Dimensions.get('window')

export default function LoadingScreen() {
    const router = useRouter()
    const floatAnim = useRef(new Animated.Value(0)).current
    const glowAnim = useRef(new Animated.Value(0.5)).current

    useEffect(() => {
        // Navigate to dashboard after 3 seconds
        const timer = setTimeout(() => {
            router.push('/dashboard' as any)
        }, 3000)

        // Float animation
        Animated.loop(
            Animated.sequence([
                Animated.timing(floatAnim, { toValue: -10, duration: 1800, useNativeDriver: true }),
                Animated.timing(floatAnim, { toValue: 0, duration: 1800, useNativeDriver: true }),
            ])
        ).start()

        // Glow animation
        Animated.loop(
            Animated.sequence([
                Animated.timing(glowAnim, { toValue: 1, duration: 1800, useNativeDriver: true }),
                Animated.timing(glowAnim, { toValue: 0.4, duration: 1800, useNativeDriver: true }),
            ])
        ).start()

        return () => clearTimeout(timer)
    }, [])

    return (
        <Background>
            <View style={styles.container}>

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

                {/* Welcome Text */}
                <Text style={styles.welcome}>Welcome</Text>

                {/* Spinner */}
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
        shadowColor: '#FFFFFF',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 30,
        elevation: 20,
    
    },
    welcome: {
        fontSize: 36,
        fontWeight: '800',
        color: '#FFFFFF',
        marginBottom: 40,
    },
    spinner: {
        position: 'absolute',
        bottom: height * 0.15,
    },
})