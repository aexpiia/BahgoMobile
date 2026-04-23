import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { useFonts, Poppins_400Regular, Poppins_600SemiBold, Poppins_700Bold, Poppins_800ExtraBold } from '@expo-google-fonts/poppins'
import Background from '../components/Background'

const { width } = Dimensions.get('window')

export default function NotificationScreen() {
    const router = useRouter()

    const [fontsLoaded] = useFonts({ Poppins_400Regular, Poppins_600SemiBold, Poppins_700Bold, Poppins_800ExtraBold })
    if (!fontsLoaded) return null

    return (
        <Background>
            <View style={styles.container}>
                <View style={styles.popup}>
                    <View style={styles.iconBox}>
                        <MaterialIcons name="notifications" size={28} color="#2563EB" />
                    </View>

                    <Text style={styles.title}>Enable Notification</Text>
                    <Text style={styles.description}>
                        Notifications may include alerts, sounds, and icon badges. These can be configured in Settings.
                    </Text>

                    <View style={styles.row}>
                        <TouchableOpacity style={styles.buttonLeft} onPress={() => router.push('/loading')}>
                            <Text style={styles.buttonLeftText}>Don&#39;t Allow</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.buttonRight} onPress={() => router.push('/loading')}>
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
        // ❌ removed elevation
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
    title: {
        fontFamily: 'Poppins_800ExtraBold',
        fontSize: 20,
        color: '#FFFFFF',
        marginBottom: 10,
    },
    description: {
        fontFamily: 'Poppins_400Regular',
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
        fontFamily: 'Poppins_600SemiBold',
        fontSize: 13,
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
        fontFamily: 'Poppins_700Bold',
        fontSize: 13,
        color: '#4A90D9',
    },
})