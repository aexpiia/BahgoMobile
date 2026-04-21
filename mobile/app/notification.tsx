import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import Background from '../components/Background'

const { width, height } = Dimensions.get('window')

export default function NotificationScreen() {
    const router = useRouter()

    return (
        <Background>
            <View style={styles.container}>
                {/* Popup Card */}
                <View style={styles.popup}>
                {/* Icon */}
                <View style={styles.iconBox}>
                    <MaterialIcons name="notifications" size={28} color="#4A90D9" style={styles.icon} />
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
                        <Text style={styles.buttonLeftText}>Don&#39;t Allow</Text>
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
        </Background>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
    
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
        color: '#4A90D9',
    },
})