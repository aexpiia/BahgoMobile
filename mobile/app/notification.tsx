import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import { useRouter } from 'expo-router'

const { width, height } = Dimensions.get('window')

export default function NotificationScreen() {
    const router = useRouter()

    return (
        <View style={styles.container}>
            <View style={styles.gradientTop} />
            <View style={styles.gradientBottom} />

            {/* Popup Card */}
            <View style={styles.popup}>
                {/* Icon */}
                <View style={styles.iconBox}>
                    <Text style={styles.icon}>🔔</Text>
                </View>

                <Text style={styles.title}>Enable Notification</Text>
                <Text style={styles.description}>
                    Notifications may include alerts, sounds, and icon badges. These can be configured in Settings.
                </Text>

                {/* Two Buttons Side by Side */}
                <View style={styles.row}>
                    <TouchableOpacity
                        style={styles.buttonLeft}
                        onPress={() => router.push('/loading')}
                    >
                        <Text style={styles.buttonLeftText}>Don't Allow</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.buttonRight}
                        onPress={() => router.push('/loading')}
                    >
                        <Text style={styles.buttonRightText}>Allow</Text>
                    </TouchableOpacity>
                </View>
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
        marginBottom: 28,
    },
    row: {
        flexDirection: 'row',
        gap: 12,
        width: '100%',
    },
    buttonLeft: {
        flex: 1,
        paddingVertical: 13,
        borderRadius: 50,
        borderWidth: 1.5,
        borderColor: 'rgba(255,255,255,0.5)',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.1)',
    },
    buttonLeftText: {
        fontSize: 13,
        fontWeight: '600',
        color: 'rgba(255,255,255,0.8)',
    },
    buttonRight: {
        flex: 1,
        paddingVertical: 13,
        borderRadius: 50,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
    },
    buttonRightText: {
        fontSize: 13,
        fontWeight: '700',
        color: '#1565C0',
    },
})