import { View, Text, StyleSheet, TouchableOpacity, TextInput, Dimensions } from 'react-native'
import { useRouter } from 'expo-router'
import { useState, useRef } from 'react'

const { width, height } = Dimensions.get('window')

export default function OTPScreen() {
    const router = useRouter()
    const [otp, setOtp] = useState(['', '', '', '', '', ''])
    const inputs = useRef<TextInput[]>([])

    const handleChange = (text: string, index: number) => {
        const newOtp = [...otp]
        newOtp[index] = text
        setOtp(newOtp)
        if (text && index < 5) inputs.current[index + 1]?.focus()
    }

    const handleBackspace = (key: string, index: number) => {
        if (key === 'Backspace' && !otp[index] && index > 0) {
            inputs.current[index - 1]?.focus()
        }
    }

    const filled = otp.every(d => d !== '')

    return (
        <View style={styles.container}>
            <View style={styles.gradientTop} />
            <View style={styles.gradientBottom} />

            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Check your text messages</Text>
                <Text style={styles.headerSub}>
                    We'll send flood alerts straight to your phone.
                </Text>
            </View>

            {/* Card */}
            <View style={styles.card}>
                <Text style={styles.cardTitle}>OTP Verification</Text>
                <Text style={styles.cardSub}>
                    Enter the code from the sms we sent to{'\n'}
                    <Text style={styles.phoneText}>+09234567890</Text>
                </Text>

                {/* OTP Boxes */}
                <View style={styles.otpRow}>
                    {otp.map((digit, i) => (
                        <TextInput
                            key={i}
                            ref={ref => { if (ref) inputs.current[i] = ref }}
                            style={[styles.otpBox, digit ? styles.otpBoxFilled : null]}
                            value={digit}
                            onChangeText={text => handleChange(text.slice(-1), i)}
                            onKeyPress={({ nativeEvent }) => handleBackspace(nativeEvent.key, i)}
                            keyboardType="number-pad"
                            maxLength={1}
                            textAlign="center"
                            selectionColor="#1565C0"
                        />
                    ))}
                </View>

                {/* Resend */}
                <TouchableOpacity>
                    <Text style={styles.resend}>
                        Can't receive OTP? <Text style={styles.resendBold}>RESEND</Text>
                    </Text>
                </TouchableOpacity>

                {/* Verify Button */}
                <TouchableOpacity
                    style={[styles.button, !filled && styles.buttonDisabled]}
                    onPress={() => filled && router.push('/location')}
                    activeOpacity={0.85}
                >
                    <Text style={[styles.buttonText, !filled && styles.buttonTextDisabled]}>
                        Verify & Continue
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1565C0',
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
    header: {
        paddingTop: 80,
        paddingHorizontal: 32,
        paddingBottom: 32,
    },
    headerTitle: {
        fontSize: 26,
        fontWeight: '800',
        color: '#FFFFFF',
        marginBottom: 8,
    },
    headerSub: {
        fontSize: 14,
        color: 'rgba(255,255,255,0.8)',
    },
    card: {
        marginHorizontal: 24,
        backgroundColor: 'rgba(255,255,255,0.15)',
        borderRadius: 24,
        padding: 28,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.3)',
        alignItems: 'center',
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: '800',
        color: '#FFFFFF',
        marginBottom: 10,
    },
    cardSub: {
        fontSize: 13,
        color: 'rgba(255,255,255,0.8)',
        textAlign: 'center',
        lineHeight: 20,
        marginBottom: 28,
    },
    phoneText: {
        fontWeight: '700',
        color: '#FFFFFF',
    },
    otpRow: {
        flexDirection: 'row',
        gap: 10,
        marginBottom: 20,
    },
    otpBox: {
        width: 46,
        height: 54,
        backgroundColor: 'rgba(255,255,255,0.9)',
        borderRadius: 12,
        fontSize: 22,
        fontWeight: '700',
        color: '#1565C0',
        borderWidth: 2,
        borderColor: 'transparent',
    },
    otpBoxFilled: {
        borderColor: '#FFFFFF',
        backgroundColor: 'rgba(255,255,255,1)',
    },
    resend: {
        fontSize: 12,
        color: 'rgba(255,255,255,0.7)',
        marginBottom: 28,
    },
    resendBold: {
        fontWeight: '800',
        color: '#FFFFFF',
    },
    button: {
        width: '100%',
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