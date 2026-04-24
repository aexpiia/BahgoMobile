import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { LinearGradient } from 'expo-linear-gradient'
import { useFonts, Poppins_400Regular, Poppins_600SemiBold, Poppins_700Bold, Poppins_800ExtraBold } from '@expo-google-fonts/poppins'

// ── TEMPORARY MOCK — swap back to useFloodData() once Firebase is ready ──
const currentSensor = {
    street: 'Apple Street',
    area: 'Central, Taguig',
    waterLevelCm: 25,
    status: 'caution' as const,
    rateOfRiseCmPerHr: 8,
    precipitationMmPerHr: 5.0,
}

const nearbySensors = [
    { id: '2', street: 'Peach Street', area: 'Central, Taguig', waterLevelCm: 23, status: 'caution' as const },
    { id: '3', street: 'Lime Street',  area: 'Central, Taguig', waterLevelCm: 30, status: 'danger'  as const },
]

const STATUS_COLOR = { safe: '#639922', caution: '#F5920A', danger: '#E53E3E', critical: '#A32D2D' }
const STATUS_DESCRIPTION = {
    safe:     'Water levels are normal. No immediate flood threat.',
    caution:  'Water level is approaching the caution threshold. Monitor the situation and stay updated.',
    danger:   'Dangerous water levels. Avoid flooded areas and prepare to evacuate.',
    critical: 'Life-threatening flood conditions. Evacuate immediately.',
}
const THRESHOLD_CM = 35
const getThresholdPercent = (cm: number) => Math.min(Math.round((cm / THRESHOLD_CM) * 100), 100)
// ─────────────────────────────────────────────────────────────────────────────

export default function Dashboard() {
    const router = useRouter()

    const [fontsLoaded] = useFonts({
        Poppins_400Regular, Poppins_600SemiBold, Poppins_700Bold, Poppins_800ExtraBold,
    })

      if (!fontsLoaded) return null

    const getWeatherIcon = (status: string) => {
        if (status === 'safe')    return 'mood'
        if (status === 'caution') return 'water'
        if (status === 'danger')  return 'waves'
        return 'warning'
    }

    const statusLabel = currentSensor.status.charAt(0).toUpperCase() + currentSensor.status.slice(1)

       return (
        <LinearGradient
            colors={['#0F6CE9', '#83b9ff', '#aee2f5', '#F1F5F9']}
            locations={[0, 0.35, 0.60, 1]}
            style={styles.container}
        >
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.headerIcon} onPress={() => router.push('/settings' as any)}>
                    <MaterialIcons name="settings" size={24} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{currentSensor.area}</Text>
                <TouchableOpacity style={styles.headerIcon} onPress={() => router.push('/search' as any)}>
                    <MaterialIcons name="search" size={24} color="#fff" />
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>

                {/* Glass Card */}
                <View style={styles.glassCard}>

                    {/* Current Location */}
                    <View style={styles.innerSection}>
                        <View style={styles.sectionRow}>
                            <Text style={styles.sectionLabel}>your current location:</Text>
                            <TouchableOpacity onPress={() => router.push('/condition' as any)}>
                                <Text style={styles.viewFull}>view full condition</Text>
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity
                            style={styles.locationCard}
                            onPress={() => router.push('/condition' as any)}
                            activeOpacity={0.85}
                        >
                            <LinearGradient colors={['#EBF4FF', '#DBEAFE']} style={styles.locationCardInner}>
                                <View style={styles.locationCardLeft}>
                                    <MaterialIcons name="place" size={22} color="#2563EB" />
                                    <View>
                                        <Text style={styles.locationStreet}>{currentSensor.street}</Text>
                                        <Text style={styles.locationArea}>{currentSensor.area}</Text>
                                    </View>
                                </View>
                                <View style={styles.divider} />
                                <View style={styles.locationCardRight}>
                                    <MaterialIcons name={getWeatherIcon(currentSensor.status)} size={22} color="#2563EB" />
                                    <View>
                                        <Text style={styles.levelLabel}>Water Level</Text>
                                        <View style={styles.levelRow}>
                                            <Text style={styles.levelValue}>{currentSensor.waterLevelCm}cm</Text>
                                            <Text style={[styles.levelStatus, { color: STATUS_COLOR[currentSensor.status] }]}>
                                                {statusLabel}
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>

                    {/* Current Level Status */}
                    <View style={styles.innerSection}>
                        <Text style={styles.sectionTitle}>Current Level Status</Text>

                        <View style={styles.statusRow}>
                            <LinearGradient colors={['#2F7EE7', '#4d91eb']} style={styles.statusCard}>
                                <MaterialIcons name="trending-up" size={18} color="#fff" style={{ marginBottom: 4 }} />
                                <Text style={styles.statusCardLabel}>Water Level</Text>
                                <Text style={styles.statusCardValue}>{currentSensor.waterLevelCm}cm</Text>
                                <Text style={styles.statusCardSub}>
                                    {getThresholdPercent(currentSensor.waterLevelCm)}% of threshold
                                </Text>
                            </LinearGradient>

                            <LinearGradient colors={['#2F7EE7', '#4d91eb']} style={styles.statusCard}>
                                <MaterialIcons name="warning" size={18} color="#fff" style={{ marginBottom: 4 }} />
                                <Text style={styles.statusCardLabel}>Risk Level</Text>
                                <Text style={styles.statusCardValueWarning}>{statusLabel}</Text>
                                <Text style={styles.statusCardSub}>
                                    {STATUS_DESCRIPTION[currentSensor.status]}
                                </Text>
                            </LinearGradient>
                        </View>

                        <View style={styles.rateRow}>
                            <View style={styles.rateCard}>
                                <Text style={styles.rateText}>
                                    Rate of Rise: <Text style={styles.rateBold}>{currentSensor.rateOfRiseCmPerHr}cm/hr</Text>
                                </Text>
                            </View>
                            <View style={styles.rateCard}>
                                <Text style={styles.rateText}>
                                    Precipitation: <Text style={styles.rateBold}>{currentSensor.precipitationMmPerHr} mm/hr</Text>
                                </Text>
                            </View>
                        </View>

                        <View style={styles.personCard}>
                            <Text style={styles.personText}>
                                {STATUS_DESCRIPTION[currentSensor.status]}
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Nearby Devices */}
                <View style={styles.section}>
                    <Text style={styles.nearbyLabel}>nearby street devices:</Text>

                    {nearbySensors.map(device => (
                        <TouchableOpacity
                            key={device.id}
                            style={styles.deviceCard}
                            onPress={() => router.push('/condition' as any)}
                            activeOpacity={0.85}
                        >
                            <View style={styles.nearbyCardLeft}>
                                <MaterialIcons name="place" size={22} color="#2563EB" />
                                <View>
                                    <Text style={styles.nearbyStreet}>{device.street}</Text>
                                    <Text style={styles.nearbyArea}>{device.area}</Text>
                                </View>
                            </View>
                            <View style={styles.nearbyDivider} />
                            <View style={styles.nearbyCardRight}>
                                <MaterialIcons name={getWeatherIcon(device.status)} size={22} color="#2563EB" />
                                <View>
                                    <Text style={styles.nearbyLevelLabel}>Water Level</Text>
                                    <View style={styles.levelRow}>
                                        <Text style={styles.nearbyLevelValue}>{device.waterLevelCm}cm</Text>
                                        <Text style={[styles.nearbyLevelStatus, { color: STATUS_COLOR[device.status] }]}>
                                            {device.status}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>

                <View style={{ height: 40 }} />
            </ScrollView>
        </LinearGradient>
    )
}

    const styles = StyleSheet.create({
        container: { flex: 1 },
        header: {
            flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
            paddingTop: 56, paddingBottom: 16, paddingHorizontal: 20,
        },
        headerIcon: { width: 36, height: 36, alignItems: 'center', justifyContent: 'center' },
        headerTitle: { fontFamily: 'Poppins_700Bold', fontSize: 18, color: '#FFFFFF' },
        scroll: { flex: 1 },
        section: { paddingHorizontal: 20, marginTop: 20 },
        glassCard: {
            backgroundColor: 'rgba(255,255,255,0.15)',
            borderRadius: 45, marginHorizontal: 0, marginTop: 20,
            padding: 20, borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)',
        },
        innerSection: { marginTop: 0, marginBottom: 10 },
        sectionRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
        sectionLabel: { fontFamily: 'Poppins_400Regular', fontSize: 13, color: 'rgba(255,255,255,0.85)' },
        nearbyLabel: { fontFamily: 'Poppins_400Regular', fontSize: 13, color: '#044b7a', marginBottom: 12 },
        sectionTitle: { fontFamily: 'Poppins_700Bold', fontSize: 17, color: '#1E293B', marginBottom: 12 },
        viewFull: { fontFamily: 'Poppins_400Regular', fontSize: 12, color: 'rgba(255,255,255,0.9)' },
        locationCard: { borderRadius: 16, overflow: 'hidden' },
        locationCardInner: { flexDirection: 'row', alignItems: 'center', padding: 24, gap: 12 },
        locationCardLeft: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 10 },
        locationCardRight: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 10 },
        divider: { width: 1, height: 50, backgroundColor: '#CBD5E1' },
        locationStreet: { fontFamily: 'Poppins_700Bold', fontSize: 18, color: '#1E293B' },
        locationArea: { fontFamily: 'Poppins_600SemiBold', fontSize: 14, color: '#64748B' },
        levelLabel: { fontFamily: 'Poppins_600SemiBold', fontSize: 14, color: '#64748B' },
        levelRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
        levelValue: { fontFamily: 'Poppins_700Bold', fontSize: 18, color: '#1E293B' },
        levelStatus: { fontFamily: 'Poppins_600SemiBold', fontSize: 16 },
        statusRow: { flexDirection: 'row', gap: 12, marginBottom: 12 },
        statusCard: { flex: 1, borderRadius: 16, padding: 14 },
        statusCardLabel: { fontFamily: 'Poppins_400Regular', fontSize: 11, color: 'rgba(255,255,255,0.85)', marginBottom: 4 },
        statusCardValue: { fontFamily: 'Poppins_800ExtraBold', fontSize: 28, color: '#FFFFFF', marginBottom: 2 },
        statusCardValueWarning: { fontFamily: 'Poppins_800ExtraBold', fontSize: 22, color: '#FFFFFF', marginBottom: 2 },
        statusCardSub: { fontFamily: 'Poppins_400Regular', fontSize: 11, color: 'rgba(255,255,255,0.85)', lineHeight: 16 },
        rateRow: { flexDirection: 'row', gap: 12, marginBottom: 12 },
        rateCard: {
            flex: 1, backgroundColor: 'rgba(255,255,255,0.6)',
            borderRadius: 12, padding: 12, alignItems: 'center',
        },
        rateText: { fontFamily: 'Poppins_400Regular', fontSize: 12, color: '#475569' },
        rateBold: { fontFamily: 'Poppins_700Bold', color: '#1E293B' },
        personCard: { backgroundColor: 'rgba(255,255,255,0.6)', borderRadius: 16, padding: 16 },
        personText: { fontFamily: 'Poppins_400Regular', fontSize: 13, color: '#475569', lineHeight: 20 },
        nearbyCardLeft: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 10 },
        nearbyCardRight: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 10 },
        nearbyDivider: { width: 1, height: 40, backgroundColor: '#CBD5E1' },
        nearbyStreet: { fontFamily: 'Poppins_700Bold', fontSize: 16, color: '#1E293B' },
        nearbyArea: { fontFamily: 'Poppins_400Regular', fontSize: 12, color: '#64748B' },
        nearbyLevelLabel: { fontFamily: 'Poppins_400Regular', fontSize: 12, color: '#64748B' },
        nearbyLevelValue: { fontFamily: 'Poppins_700Bold', fontSize: 16, color: '#1E293B' },
        nearbyLevelStatus: { fontFamily: 'Poppins_600SemiBold', fontSize: 14 },
        deviceCard: {
            backgroundColor: '#FFFFFF', borderRadius: 16, padding: 16,
            flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 12,
            elevation: 2, shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 6, shadowOffset: { width: 0, height: 1 },
        },
    })