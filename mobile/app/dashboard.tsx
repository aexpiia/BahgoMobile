import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native'
import { useRouter } from 'expo-router'
import { LinearGradient } from 'expo-linear-gradient'
import { useFonts, Poppins_400Regular, Poppins_600SemiBold, Poppins_700Bold, Poppins_800ExtraBold } from '@expo-google-fonts/poppins'

const { width } = Dimensions.get('window')

const WATER_DATA = [
    { id: '1', street: 'Apple Street', area: 'Central, Taguig', level: '25cm', status: 'moderate', statusColor: '#F5920A', isCurrent: true },
    { id: '2', street: 'Peach Street', area: 'Central, Taguig', level: '23cm', status: 'moderate', statusColor: '#F5920A', isCurrent: false },
    { id: '3', street: 'Lime Street', area: 'Central, Taguig', level: '30cm', status: 'dangerous', statusColor: '#E53E3E', isCurrent: false },
]

export default function Dashboard() {
    const router = useRouter()

    const [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_600SemiBold,
        Poppins_700Bold,
        Poppins_800ExtraBold,
    })

    if (!fontsLoaded) return null

    const current = WATER_DATA[0]

    return (
        <View style={styles.container}>
            {/* Header */}
            <LinearGradient colors={['#2563EB', '#1A4DB5']} style={styles.header}>
                <TouchableOpacity
                    style={styles.headerIcon}
                    onPress={() => router.push('/settings' as any)}
                >
                    <Text style={styles.headerIconText}>⚙️</Text>
                </TouchableOpacity>

                <Text style={styles.headerTitle}>Taguig City</Text>

                <TouchableOpacity
                    style={styles.headerIcon}
                    onPress={() => router.push('/search' as any)}
                >
                    <Text style={styles.headerIconText}>🔍</Text>
                </TouchableOpacity>
            </LinearGradient>

            <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>

                {/* Current Location Card */}
                <View style={styles.section}>
                    <View style={styles.sectionRow}>
                        <Text style={styles.sectionLabel}>your current location:</Text>
                        <TouchableOpacity onPress={() => router.push('/conditions' as any)}>
                            <Text style={styles.viewFull}>view full condition</Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                        style={styles.locationCard}
                        onPress={() => router.push('/conditions' as any) }
                        activeOpacity={0.85}
                    >
                        <LinearGradient colors={['#EBF4FF', '#DBEAFE']} style={styles.locationCardInner}>
                            <View style={styles.locationCardLeft}>
                                <Text style={styles.locationIcon}>📍</Text>
                                <View>
                                    <Text style={styles.locationStreet}>{current.street}</Text>
                                    <Text style={styles.locationArea}>{current.area}</Text>
                                </View>
                            </View>
                            <View style={styles.divider} />
                            <View style={styles.locationCardRight}>
                                <Text style={styles.levelIcon}>🚶</Text>
                                <View>
                                    <Text style={styles.levelLabel}>Water Level</Text>
                                    <View style={styles.levelRow}>
                                        <Text style={styles.levelValue}>{current.level}</Text>
                                        <Text style={[styles.levelStatus, { color: current.statusColor }]}>{current.status}</Text>
                                    </View>
                                </View>
                            </View>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>

                {/* Current Level Status */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Current Level Status</Text>

                    <View style={styles.statusRow}>
                        {/* Water Level Card */}
                        <LinearGradient colors={['#2563EB', '#1D4ED8']} style={styles.statusCard}>
                            <Text style={styles.statusCardIcon}>📈</Text>
                            <Text style={styles.statusCardLabel}>Water Level</Text>
                            <Text style={styles.statusCardValue}>25cm</Text>
                            <Text style={styles.statusCardSub}>70% of threshold</Text>
                        </LinearGradient>

                        {/* Risk Level Card */}
                        <LinearGradient colors={['#F97316', '#EA6C0A']} style={styles.statusCard}>
                            <Text style={styles.statusCardIcon}>📈</Text>
                            <Text style={styles.statusCardLabel}>Risk Level</Text>
                            <Text style={styles.statusCardValueWarning}>warning</Text>
                            <Text style={styles.statusCardSub}>Water level is approaching the critical threshold</Text>
                        </LinearGradient>
                    </View>

                    {/* Rate Row */}
                    <View style={styles.rateRow}>
                        <View style={styles.rateCard}>
                            <Text style={styles.rateText}>Rate of Rise: <Text style={styles.rateBold}>8cm/hr</Text></Text>
                        </View>
                        <View style={styles.rateCard}>
                            <Text style={styles.rateText}>Precipitation: <Text style={styles.rateBold}>5.0 mm/hr</Text></Text>
                        </View>
                    </View>

                    {/* Person Mode */}
                    <View style={styles.personCard}>
                        <View style={styles.personHeader}>
                            <Text style={styles.personIcon}>🚶</Text>
                            <Text style={styles.personLabel}>Person Mode</Text>
                        </View>
                        <Text style={styles.personText}>
                            Area may become unsafe—stay alert and avoid if possible.
                        </Text>
                    </View>
                </View>

                {/* Nearby Devices */}
                <View style={styles.section}>
                    <Text style={styles.sectionLabel}>nearby street devices:</Text>

                    {WATER_DATA.filter(d => !d.isCurrent).map(device => (
                        <TouchableOpacity
                            key={device.id}
                            style={styles.deviceCard}
                            onPress={() => router.push('/conditions' as any) }
                            activeOpacity={0.85}
                        >
                            <View style={styles.locationCardLeft}>
                                <Text style={styles.locationIcon}>📍</Text>
                                <View>
                                    <Text style={styles.locationStreet}>{device.street}</Text>
                                    <Text style={styles.locationArea}>{device.area}</Text>
                                </View>
                            </View>
                            <View style={styles.divider} />
                            <View style={styles.locationCardRight}>
                                <Text style={styles.levelIcon}>🚶</Text>
                                <View>
                                    <Text style={styles.levelLabel}>Water Level</Text>
                                    <View style={styles.levelRow}>
                                        <Text style={styles.levelValue}>{device.level}</Text>
                                        <Text style={[styles.levelStatus, { color: device.statusColor }]}>{device.status}</Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>

                <View style={{ height: 40 }} />
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F0F4FF' },

    // Header
    header: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
        paddingTop: 56, paddingBottom: 16, paddingHorizontal: 20,
    },
    headerIcon: { width: 36, height: 36, alignItems: 'center', justifyContent: 'center' },
    headerIconText: { fontSize: 20 },
    headerTitle: {
        fontFamily: 'Poppins_700Bold', fontSize: 18, color: '#FFFFFF',
    },

    scroll: { flex: 1 },
    section: { paddingHorizontal: 20, marginTop: 20 },

    sectionRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
    sectionLabel: { fontFamily: 'Poppins_400Regular', fontSize: 13, color: '#64748B' },
    sectionTitle: { fontFamily: 'Poppins_700Bold', fontSize: 17, color: '#1E293B', marginBottom: 12 },
    viewFull: { fontFamily: 'Poppins_400Regular', fontSize: 12, color: '#2563EB' },

    // Location Card
    locationCard: { borderRadius: 16, overflow: 'hidden', elevation: 3, shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 8, shadowOffset: { width: 0, height: 2 } },
    locationCardInner: { flexDirection: 'row', alignItems: 'center', padding: 16, gap: 12 },
    locationCardLeft: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 10 },
    locationCardRight: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 10 },
    divider: { width: 1, height: 40, backgroundColor: '#CBD5E1' },
    locationIcon: { fontSize: 22 },
    levelIcon: { fontSize: 22 },
    locationStreet: { fontFamily: 'Poppins_700Bold', fontSize: 14, color: '#1E293B' },
    locationArea: { fontFamily: 'Poppins_400Regular', fontSize: 11, color: '#64748B' },
    levelLabel: { fontFamily: 'Poppins_400Regular', fontSize: 11, color: '#64748B' },
    levelRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
    levelValue: { fontFamily: 'Poppins_700Bold', fontSize: 14, color: '#1E293B' },
    levelStatus: { fontFamily: 'Poppins_600SemiBold', fontSize: 12 },

    // Status Cards
    statusRow: { flexDirection: 'row', gap: 12, marginBottom: 12 },
    statusCard: {
        flex: 1, borderRadius: 16, padding: 14,
        elevation: 3, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 8, shadowOffset: { width: 0, height: 2 },
    },
    statusCardIcon: { fontSize: 16, marginBottom: 4 },
    statusCardLabel: { fontFamily: 'Poppins_400Regular', fontSize: 11, color: 'rgba(255,255,255,0.85)', marginBottom: 4 },
    statusCardValue: { fontFamily: 'Poppins_800ExtraBold', fontSize: 28, color: '#FFFFFF', marginBottom: 2 },
    statusCardValueWarning: { fontFamily: 'Poppins_800ExtraBold', fontSize: 22, color: '#FFFFFF', marginBottom: 2 },
    statusCardSub: { fontFamily: 'Poppins_400Regular', fontSize: 11, color: 'rgba(255,255,255,0.85)', lineHeight: 16 },

    // Rate Row
    rateRow: { flexDirection: 'row', gap: 12, marginBottom: 12 },
    rateCard: {
        flex: 1, backgroundColor: '#FFFFFF', borderRadius: 12, padding: 12,
        alignItems: 'center', elevation: 2, shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 6, shadowOffset: { width: 0, height: 1 },
    },
    rateText: { fontFamily: 'Poppins_400Regular', fontSize: 12, color: '#475569' },
    rateBold: { fontFamily: 'Poppins_700Bold', color: '#1E293B' },

    // Person Mode
    personCard: {
        backgroundColor: '#FFFFFF', borderRadius: 16, padding: 16,
        elevation: 2, shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 6, shadowOffset: { width: 0, height: 1 },
    },
    personHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
    personIcon: { fontSize: 18 },
    personLabel: { fontFamily: 'Poppins_600SemiBold', fontSize: 13, color: '#1E293B' },
    personText: { fontFamily: 'Poppins_400Regular', fontSize: 13, color: '#475569', lineHeight: 20 },

    // Device Cards
    deviceCard: {
        backgroundColor: '#FFFFFF', borderRadius: 16, padding: 16,
        flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 12,
        elevation: 2, shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 6, shadowOffset: { width: 0, height: 1 },
    },
})