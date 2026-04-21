import { View, Text, StyleSheet, TouchableOpacity, TextInput, Dimensions } from 'react-native'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import Background from '../components/Background'


const { width, height } = Dimensions.get('window')

export default function PhoneScreen() {
    const router = useRouter()
    const [phone, setPhone] = useState('')
    const [barangay, setBarangay] = useState('')

    const canContinue = phone.length >= 10 && barangay.length > 0

    return (
        <Background>
             

            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Let&#39;s get you set up</Text>
                <Text style={styles.headerSub}>
                    We&#39;ll send flood alerts straight to your phone.
                </Text>
            </View>

            {/* Form Card */}
            <View style={styles.card}>

                {/* Phone Number */}
                <Text style={styles.label}>Phone Number</Text>
                <View style={styles.inputRow}>
                    <View style={styles.flagBox}>
                        <Text style={styles.flagText}>🇵🇭 +63</Text>
                    </View>
                    <TextInput
                        style={styles.input}
                        placeholder="9XX XXX XXXX"
                        placeholderTextColor="#A0AEC0"
                        keyboardType="phone-pad"
                        maxLength={10}
                        value={phone}
                        onChangeText={setPhone}
                    />
                </View>

                {/* Barangay */}
                <Text style={[styles.label, { marginTop: 20 }]}>Your Area/ Barangay</Text>
                <View style={styles.inputRow}>
                    <TextInput
                        style={[styles.input, { flex: 1 }]}
                        placeholder="Enter barangay"
                        placeholderTextColor="#A0AEC0"
                        value={barangay}
                        onChangeText={setBarangay}
                    />
                </View>

                {/* Continue Button */}
                <TouchableOpacity
                    style={[styles.button, !canContinue && styles.buttonDisabled]}
                    onPress={() => canContinue && router.push('/otp')}
                    activeOpacity={0.85}
                >
                    <Text style={[styles.buttonText, !canContinue && styles.buttonTextDisabled]}>
                        Continue
                    </Text>
                </TouchableOpacity>

            </View>
        </Background>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1565C0',

    },
    header: {
        paddingTop: 80,
        paddingHorizontal: 32,
        paddingBottom: 32,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: '800',
        color: '#FFFFFF',
        marginBottom: 8,
    },
    headerSub: {
        fontSize: 14,
        color: '#FFFFFF',
        lineHeight: 20,
    },
    card: {
        marginHorizontal: 24,
        backgroundColor: 'rgba(255,255,255,0.15)',
        borderRadius: 24,
        padding: 24,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.3)',
    },
    label: {
        fontSize: 13,
        fontWeight: '600',
        color: '#FFFFFF',
        marginBottom: 8,
    },
    inputRow: {
        flexDirection: 'row',
        backgroundColor: 'rgba(255,255,255,0.9)',
        borderRadius: 12,
        overflow: 'hidden',
        alignItems: 'center',
    },
    flagBox: {
        paddingHorizontal: 14,
        paddingVertical: 14,
        borderRightWidth: 1,
        borderRightColor: '#E2E8F0',
    },
    flagText: {
        fontSize: 14,
        color: '#2D3748',
        fontWeight: '600',
    },
    input: {
        flex: 1,
        paddingHorizontal: 14,
        paddingVertical: 14,
        fontSize: 15,
        color: '#2D3748',
    },
    button: {
        marginTop: 32,
        backgroundColor: '#FFFFFF',
        borderRadius: 50,
        paddingVertical: 15,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 10,
        elevation: 5,
    },
    buttonDisabled: {
        backgroundColor: 'rgba(255,255,255,0.3)',
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '700',
        color: '#1565C0',
    },
    buttonTextDisabled: {
        color: 'rgba(255,255,255,0.6)',
    },
})