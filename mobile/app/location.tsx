import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { useFonts, Poppins_400Regular, Poppins_600SemiBold, Poppins_800ExtraBold } from '@expo-google-fonts/poppins'
import Background from '../components/Background'

const { width } = Dimensions.get('window')

export default function LocationScreen() {
    const router = useRouter()
    const [fontsLoaded] = useFonts({ Poppins_400Regular, Poppins_600SemiBold, Poppins_800ExtraBold })
    if (!fontsLoaded) return null

    return (
        <Background>
            <View style={styles.container}>
                <View style={styles.card}>
                    <View style={styles.iconBox}>
                        <MaterialIcons name="place" size={28} color="#2563EB" />
                    </View>

                    <Text style={styles.title}>Enable Location</Text>
                    <Text style={styles.description}>
                        Allow app to use your location to monitor weather conditions and flood alerts in your area.
                    </Text>

                    <TouchableOpacity style={styles.buttonOutline} onPress={() => router.push('/notification')}>
                        <Text style={styles.buttonOutlineText}>Allow Once</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.buttonOutline} onPress={() => router.push('/notification')}>
                        <Text style={styles.buttonOutlineText}>Allow While Using App</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.buttonGhost} onPress={() => router.push('/notification')}>
                        <Text style={styles.buttonGhostText}>Don&#39;t Allow</Text>
                    </TouchableOpacity>
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
    // ✅ Copied exactly from phone.tsx card style
    card: {
        marginHorizontal: 24,
        backgroundColor: 'rgba(255,255,255,0.15)',
        borderRadius: 24,
        padding: 28,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.3)',
        width: width * 0.78,
        alignItems: 'center',
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
        fontFamily: 'Poppins_600SemiBold',
        fontSize: 14,
        color: '#FFFFFF',
    },
    buttonGhost: {
        width: '100%',
        paddingVertical: 13,
        alignItems: 'center',
    },
    buttonGhostText: {
        fontFamily: 'Poppins_600SemiBold',
        fontSize: 14,
        color: 'rgba(255,255,255,0.6)',
    },
})