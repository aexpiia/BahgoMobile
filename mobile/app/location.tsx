import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import { useRouter } from 'expo-router'

const { width, height } = Dimensions.get('window')

export default function LocationScreen() {
    const router = useRouter()

    return (
        <View style={styles.container}>
            <View style={styles.gradientTop} />
            <View style={styles.gradientBottom} />

            {/* Popup Card */}
            <View style={styles.popup}>
                {/* Icon */}
                <View style={styles.iconBox}>
                    <Text style={styles.icon}>📍</Text>
                </View>

                <Text style={styles.title}>Enable Location</Text>
                <Text style={styles.description}>
                    Allow app to use your location to monitor weather conditions and flood alerts in your area.
                </Text>

                {/* Buttons */}
                <TouchableOpacity
                    style={styles.buttonOutline}
                    onPress={() => router.push('/notification')}
                >
                    <Text style={styles.buttonOutlineText}>Allow Once</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.buttonOutline}
                    onPress={() => router.push('/notification')}
                >
                    <Text style={styles.buttonOutlineText}>Allow While Using App</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.buttonGhost}
                    onPress={() => router.push('/notification')}
                >
                    <Text style={styles.buttonGhostText}>Don't Allow</Text>
                </TouchableOpacity>
            </View>
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
    popup: {
        width: width * 0.78,
        backgroundColor: 'rgba(255,255,255,0.18)',
        borderRadius: 28,
        padding: 28,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.35)',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.2,
        shadowRadius: 30,
        elevation: 10,
    },
    iconBox: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: 'rgba(255,255,255,0.2)',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.3)',
    },
    icon: {
        fontSize: 28,
    },
    title: {
        fontSize: 20,
        fontWeight: '800',
        color: '#FFFFFF',
        marginBottom: 10,
    },
    description: {
        fontSize: 13,
        color: 'rgba(255,255,255,0.8)',
        textAlign: 'center',
        lineHeight: 20,
        marginBottom: 24,
    },
    buttonOutline: {
        width: '100%',
        paddingVertical: 13,
        borderRadius: 50,
        borderWidth: 1.5,
        borderColor: 'rgba(255,255,255,0.6)',
        alignItems: 'center',
        marginBottom: 10,
        backgroundColor: 'rgba(255,255,255,0.1)',
    },
    buttonOutlineText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#FFFFFF',
    },
    buttonGhost: {
        width: '100%',
        paddingVertical: 13,
        alignItems: 'center',
    },
    buttonGhostText: {
        fontSize: 14,
        fontWeight: '600',
        color: 'rgba(255,255,255,0.6)',
    },
})