import { View, Text, StyleSheet, Dimensions, ActivityIndicator } from 'react-native'
import { useRouter } from 'expo-router'
import { useEffect } from 'react'

const { width, height } = Dimensions.get('window')

export default function LoadingScreen() {
    const router = useRouter()

    useEffect(() => {
        const timer = setTimeout(() => {
            router.push('/dashboard' as any)
        }, 3000)
        return () => clearTimeout(timer)
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.gradientTop} />
            <View style={styles.gradientBottom} />

            {/* Logo */}
            <View style={styles.logoCircle}>
                <View style={styles.logoInner}>
                    <Text style={styles.logoEmoji}>🌊</Text>
                </View>
                <View style={styles.orangeDot} />
            </View>

            {/* Welcome Text */}
            <Text style={styles.welcome}>Welcome</Text>

            {/* Spinner */}
            <ActivityIndicator
                size="small"
                color="rgba(255,255,255,0.8)"
                style={styles.spinner}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1565C0',
        alignItems: 'center',
        justifyContent: 'center',
    },
    gradientTop: {
        position: 'absolute',
        top: 0, left: 0, right: 0,
        height: height * 0.5,
        backgroundColor: '#90CAF9',
        borderBottomLeftRadius: width,
        borderBottomRightRadius: width,
        opacity: 0.5,
    },
    gradientBottom: {
        position: 'absolute',
        bottom: 0, left: 0, right: 0,
        height: height * 0.55,
        backgroundColor: '#0D47A1',
        borderTopLeftRadius: width,
        borderTopRightRadius: width,
        opacity: 0.7,
    },
    logoCircle: {
        width: 110,
        height: 110,
        borderRadius: 55,
        backgroundColor: 'rgba(255,255,255,0.15)',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 28,
        borderWidth: 2,
        borderColor: 'rgba(255,255,255,0.3)',
        position: 'relative',
    },
    logoInner: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: 'rgba(255,255,255,0.2)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoEmoji: {
        fontSize: 40,
    },
    orangeDot: {
        position: 'absolute',
        top: 12, right: 14,
        width: 18, height: 18,
        borderRadius: 9,
        backgroundColor: '#FF9800',
        borderWidth: 2,
        borderColor: 'white',
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