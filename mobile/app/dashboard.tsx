import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { LinearGradient } from 'expo-linear-gradient'
import { useFonts, Poppins_400Regular, Poppins_600SemiBold, Poppins_700Bold, Poppins_800ExtraBold } from '@expo-google-fonts/poppins'
import { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

const WATER_DATA = [
    { id: '1', street: 'Apple Street', area: 'Central, Taguig', level: '25cm', status: 'moderate', statusColor: '#F5920A', isCurrent: true },
    { id: '2', street: 'Peach Street', area: 'Central, Taguig', level: '23cm', status: 'moderate', statusColor: '#F5920A', isCurrent: false },
    { id: '3', street: 'Lime Street', area: 'Central, Taguig', level: '30cm', status: 'dangerous', statusColor: '#E53E3E', isCurrent: false },
]

export default function Dashboard() {
    const router = useRouter()
    const [monitorMode, setMonitorMode] = useState<'person' | 'car' | 'condition'>('person')

    const [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_600SemiBold,
        Poppins_700Bold,
        Poppins_800ExtraBold,
    })

    useEffect(() => {
        const loadMode = async () => {
            const mode = await AsyncStorage.getItem('monitorMode')
            if (mode) setMonitorMode(mode as 'person' | 'car' | 'condition')
        }
        loadMode()
    }, [])

    if (!fontsLoaded) return null
    const current = WATER_DATA[0]

    const getStatusForMode = (level: string, mode: string) => {
        const levelNum = parseInt(level.replace('cm', ''))
        if (mode === 'person') {
            if (levelNum < 10) return { status: 'safe', color: '#16A34A' }
            if (levelNum < 25) return { status: 'caution', color: '#F5920A' }
            return { status: 'unsafe', color: '#E53E3E' }
        } else if (mode === 'car') {
            if (levelNum < 10) return { status: 'safe', color: '#16A34A' }
            if (levelNum < 25) return { status: 'risky', color: '#F5920A' }
            return { status: 'danger', color: '#E53E3E' }
        } else {
            if (levelNum < 15) return { status: 'low', color: '#16A34A' }
            if (levelNum < 30) return { status: 'moderate', color: '#F5920A' }
            return { status: 'high', color: '#E53E3E' }
        }
    }

    const currentStatus = getStatusForMode(current.level, monitorMode)

    return (
        <View style={styles.container}>
            <LinearGradient
            colors={['#0F6CE9', '#83b9ff', '#aee2f5', "#F1F5F9"]}
            locations={[0, 0.35, 0.60]}
            style={StyleSheet.absoluteFillObject}
        />

            {/* Glass overlay */}
            <View style={{ ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(255,255,255,0.06)' }} />
    

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.headerIcon}
                    onPress={() => router.push('/settings' as any)}
                >
                    <MaterialIcons name="settings" size={24} color="#fff" />
                </TouchableOpacity>

                <Text style={styles.headerTitle}>Taguig City</Text>

                <TouchableOpacity
                    style={styles.headerIcon}
                    onPress={() => router.push('/search' as any)}
                >
                    <MaterialIcons name="search" size={24} color="#fff" />
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>

                {/* Glass Card Container */}
                <View style={styles.glassCard}>
                    {/* Current Location Card */}
                    <View style={styles.innerSection}>
                        <View style={styles.sectionRow}>
                            <Text style={styles.sectionLabel}>your current location:</Text>
                            <TouchableOpacity onPress={() => router.push('/condition' as any)}>
                                <Text style={styles.viewFull}>view full condition</Text>
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity
                            style={styles.locationCard}
                            onPress={() => router.push('/condition' as any) }
                            activeOpacity={0.85}
                        >
                            <LinearGradient colors={['#EBF4FF', '#DBEAFE']} style={styles.locationCardInner}>
                                <View style={styles.locationCardLeft}>
                                    <MaterialIcons name="place" size={22} color="#2563EB" style={styles.locationIcon} />
                                    <View>
                                        <Text style={styles.locationStreet}>{current.street}</Text>
                                        <Text style={styles.locationArea}>{current.area}</Text>
                                    </View>
                                </View>
                                <View style={styles.divider} />
                                <View style={styles.locationCardRight}>
                                    <MaterialIcons name="directions-walk" size={22} color="#2563EB" style={styles.levelIcon} />
                                    <View>
                                        <Text style={styles.levelLabel}>Water Level</Text>
                                        <View style={styles.levelRow}>
                                            <Text style={styles.levelValue}>{current.level}</Text>
                                        <Text style={[styles.levelStatus, { color: currentStatus.color }]}>{currentStatus.status}</Text>
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
                            {/* Water Level Card */}
                            <LinearGradient colors={['#2F7EE7', '#4d91eb']} style={styles.statusCard}>
                                <MaterialIcons name="trending-up" size={18} color="#fff" style={styles.statusCardIcon} />
                                <Text style={styles.statusCardLabel}>Water Level</Text>
                                <Text style={styles.statusCardValue}>25cm</Text>
                                <Text style={styles.statusCardSub}>70% of threshold</Text>
                            </LinearGradient>

                            {/* Risk Level Card */}
                            <LinearGradient colors={['#2F7EE7', '#4d91eb']} style={styles.statusCard}>
                                <MaterialIcons name="trending-up" size={18} color="#fff" style={styles.statusCardIcon} />
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
                                <MaterialIcons name={monitorMode === 'person' ? 'directions-walk' : monitorMode === 'car' ? 'directions-car' : 'info'} size={22} color="#2563EB" style={styles.personIcon} />
                                <Text style={styles.personLabel}>{monitorMode === 'person' ? 'Person Mode' : monitorMode === 'car' ? 'Car Mode' : 'Condition Mode'}</Text>
                            </View>
                            <Text style={styles.personText}>
                                {monitorMode === 'person'
                                    ? 'Area may become unsafe—stay alert and avoid if possible.'
                                    : monitorMode === 'car'
                                    ? 'Driving conditions may be hazardous—exercise caution.'
                                    : 'General flood conditions are being monitored.'
                                }
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Nearby Devices */}
                <View style={styles.section}>
                    <Text style={styles.nearbyLabel}>nearby street devices:</Text>

                    {WATER_DATA.filter(d => !d.isCurrent).map(device => {
                        const deviceStatus = getStatusForMode(device.level, monitorMode)
                        return (
                        <TouchableOpacity
                            key={device.id}
                            style={styles.deviceCard}
                            onPress={() => router.push('/condition' as any) }
                            activeOpacity={0.85}
                        >
                            <View style={styles.nearbyCardLeft}>
                                <MaterialIcons name="place" size={22} color="#2563EB" style={styles.nearbyIcon} />
                                <View>
                                    <Text style={styles.nearbyStreet}>{device.street}</Text>
                                    <Text style={styles.nearbyArea}>{device.area}</Text>
                                </View>
                            </View>
                            <View style={styles.nearbyDivider} />
                            <View style={styles.nearbyCardRight}>
                                <MaterialIcons name="directions-walk" size={22} color="#2563EB" style={styles.nearbyIcon} />
                                <View>
                                    <Text style={styles.nearbyLevelLabel}>Water Level</Text>
                                    <View style={styles.levelRow}>
                                        <Text style={styles.nearbyLevelValue}>{device.level}</Text>
                                        <Text style={[styles.nearbyLevelStatus, { color: deviceStatus.color }]}>{deviceStatus.status}</Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                        )
                    })}
                </View>

                <View style={{ height: 40 }} />
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#EEF4FF' },

    // Header
    header: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
        paddingTop: 56, paddingBottom: 16, paddingHorizontal: 20,
        backgroundColor: 'transparent',
    },
    headerIcon: { width: 36, height: 36, alignItems: 'center', justifyContent: 'center' },
    headerIconText: { fontSize: 20 },
    headerTitle: {
        fontFamily: 'Poppins_700Bold', fontSize: 18, color: '#FFFFFF',
    },

    scroll: { flex: 1 },
    section: { paddingHorizontal: 20, marginTop: 20 },

    glassCard: {
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        borderRadius: 45,
        marginHorizontal: 0,
        marginTop: 20,
        padding: 20,
        elevation: 5,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
    },
    innerSection: { marginTop: 0, marginBottom: 10 },

    sectionRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
    sectionLabel: { fontFamily: 'Poppins_400Regular', fontSize: 13, color: 'rgba(255, 255, 255, 0.85)' },    nearbyLabel: { fontFamily: 'Poppins_400Regular', fontSize: 13, color: '#044b7a', marginBottom: 12 },    sectionTitle: { fontFamily: 'Poppins_700Bold', fontSize: 17, color: '#1E293B', marginBottom: 12 },
    viewFull: { fontFamily: 'Poppins_400Regular', fontSize: 12, color: 'rgba(255,255,255,0.9)' },

    // Location Card
    locationCard: { borderRadius: 16, overflow: 'hidden', elevation: 3, shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 8, shadowOffset: { width: 0, height: 2 } },
    locationCardInner: { flexDirection: 'row', alignItems: 'center', padding: 24, gap: 12 },
    locationCardLeft: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 10 },
    locationCardRight: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 10 },
    divider: { width: 1, height: 50, backgroundColor: '#CBD5E1' },
    locationIcon: { fontSize: 24 },
    levelIcon: { fontSize: 24 },
    locationStreet: { fontFamily: 'Poppins_700Bold', fontSize: 18, color: '#1E293B' },
    locationArea: { fontFamily: 'Poppins_600SemiBold', fontSize: 14, color: '#64748B' },
    levelLabel: { fontFamily: 'Poppins_600SemiBold', fontSize: 14, color: '#64748B' },
    levelRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
    levelValue: { fontFamily: 'Poppins_700Bold', fontSize: 18, color: '#1E293B' },
    levelStatus: { fontFamily: 'Poppins_600SemiBold', fontSize: 16 },

    // Nearby Device Cards
    nearbyCardLeft: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 10 },
    nearbyCardRight: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 10 },
    nearbyDivider: { width: 1, height: 40, backgroundColor: '#CBD5E1' },
    nearbyIcon: { fontSize: 22 },
    nearbyStreet: { fontFamily: 'Poppins_700Bold', fontSize: 16, color: '#1E293B' },
    nearbyArea: { fontFamily: 'Poppins_400Regular', fontSize: 12, color: '#64748B' },
    nearbyLevelLabel: { fontFamily: 'Poppins_400Regular', fontSize: 12, color: '#64748B' },
    nearbyLevelValue: { fontFamily: 'Poppins_700Bold', fontSize: 16, color: '#1E293B' },
    nearbyLevelStatus: { fontFamily: 'Poppins_600SemiBold', fontSize: 14 },
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
        flex: 1, backgroundColor: 'rgba(255, 255, 255, 0.6)', borderRadius: 12, padding: 12,
        alignItems: 'center', elevation: 2, shadowColor: '#1d4ed8', shadowOpacity: 0.03, shadowRadius: 4, shadowOffset: { width: 0, height: 1 },
    },
    rateText: { fontFamily: 'Poppins_400Regular', fontSize: 12, color: '#475569' },
    rateBold: { fontFamily: 'Poppins_700Bold', color: '#1E293B' },

    // Person Mode
    personCard: {
        backgroundColor: 'rgba(255, 255, 255, 0.6)', borderRadius: 16, padding: 16,
        elevation: 2, shadowColor: '#1d4ed8', shadowOpacity: 0.03, shadowRadius: 4, shadowOffset: { width: 0, height: 1 },
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