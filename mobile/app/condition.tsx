import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native'
import { useRouter } from 'expo-router'
import { LinearGradient } from 'expo-linear-gradient'
import { useFonts, Poppins_400Regular, Poppins_600SemiBold, Poppins_700Bold, Poppins_800ExtraBold } from '@expo-google-fonts/poppins'

const { width } = Dimensions.get('window')

function FloodChart() {
    const points = [20, 25, 18, 28, 22, 30, 25, 27, 24, 26, 25]
    const maxVal = 65
    const chartH = 120
    const chartW = width - 120

    return (
        <View style={chartStyles.container}>
            <View style={chartStyles.yAxis}>
                {[65, 50, 30, 20, 10, 0].map(v => (
                    <Text key={v} style={chartStyles.yLabel}>{v}cm</Text>
                ))}
            </View>
            <View style={chartStyles.chartArea}>
                {[0, 1, 2, 3, 4, 5].map(i => (
                    <View key={i} style={[chartStyles.gridLine, { top: (i / 5) * chartH }]} />
                ))}
                <View style={[chartStyles.thresholdLine, { top: chartH * (1 - 30 / maxVal) }]} />
                <View style={chartStyles.lineContainer}>
                    {points.map((p, i) => {
                        if (i === points.length - 1) return null
                        const x1 = (i / (points.length - 1)) * chartW
                        const x2 = ((i + 1) / (points.length - 1)) * chartW
                        const y1 = chartH * (1 - p / maxVal)
                        const y2 = chartH * (1 - points[i + 1] / maxVal)
                        const segW = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))
                        const angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI)
                        return (
                            <View key={i} style={[chartStyles.segment, {
                                width: segW, left: x1, top: y1,
                                transform: [{ rotate: `${angle}deg` }],
                            }]} />
                        )
                    })}
                    {points.map((p, i) => (
                        <View key={`dot-${i}`} style={[chartStyles.dot, {
                            left: (i / (points.length - 1)) * chartW - 4,
                            top: chartH * (1 - p / maxVal) - 4,
                        }]} />
                    ))}
                </View>
                <View style={chartStyles.xAxis}>
                    {['12am', '6pm', '6am'].map(t => (
                        <Text key={t} style={chartStyles.xLabel}>{t}</Text>
                    ))}
                </View>
            </View>
        </View>
    )
}

const chartStyles = StyleSheet.create({
    container: { flexDirection: 'row', height: 160, marginTop: 10 },
    yAxis: { width: 40, justifyContent: 'space-between', paddingBottom: 24 },
    yLabel: { fontSize: 10, color: '#94A3B8', fontFamily: 'Poppins_400Regular' },
    chartArea: { flex: 1, position: 'relative' },
    gridLine: { position: 'absolute', left: 0, right: 0, height: 1, backgroundColor: '#E2E8F0' },
    thresholdLine: { position: 'absolute', left: 0, right: 0, height: 1.5, backgroundColor: '#EF4444' },
    lineContainer: { position: 'absolute', inset: 0 },
    segment: {
        position: 'absolute', height: 2,
        backgroundColor: '#3B82F6',
        transformOrigin: 'left center',
    },
    dot: {
        position: 'absolute', width: 8, height: 8,
        borderRadius: 4, backgroundColor: '#2563EB',
        borderWidth: 1.5, borderColor: '#FFFFFF',
    },
    xAxis: {
        position: 'absolute', bottom: 0, left: 0, right: 0,
        flexDirection: 'row', justifyContent: 'space-between',
    },
    xLabel: { fontSize: 10, color: '#94A3B8', fontFamily: 'Poppins_400Regular' },
})

export default function Conditions() {
    const router = useRouter()

    const [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_600SemiBold,
        Poppins_700Bold,
        Poppins_800ExtraBold,
    })

    if (!fontsLoaded) return null

    return (
        <View style={styles.container}>

            {/* Header */}
            <LinearGradient colors={['#2563EB', '#1A4DB5']} style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
                    <Text style={styles.backText}>‹</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Conditions</Text>
                <TouchableOpacity style={styles.headerIcon}>
                    <Text style={styles.headerIconText}>🔍</Text>
                </TouchableOpacity>
            </LinearGradient>

            <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>

                {/* Location Banner */}
                <View style={styles.section}>
                    <LinearGradient colors={['#2563EB', '#1D4ED8']} style={styles.locationBanner}>
                        <View style={styles.bannerLeft}>
                            <Text style={styles.bannerIcon}>📍</Text>
                            <View>
                                <Text style={styles.bannerStreet}>Apple Street</Text>
                                <Text style={styles.bannerArea}>Central, Taguig</Text>
                            </View>
                        </View>
                        <Text style={styles.bannerTemp}>29°</Text>
                    </LinearGradient>
                </View>

                {/* Current Level Status */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Current Level Status</Text>

                    <View style={styles.statusRow}>
                        <LinearGradient colors={['#2563EB', '#1D4ED8']} style={styles.statusCard}>
                            <Text style={styles.statusCardIcon}>📈</Text>
                            <Text style={styles.statusCardLabel}>Water Level</Text>
                            <Text style={styles.statusCardValue}>25cm</Text>
                            <Text style={styles.statusCardSub}>70% of threshold</Text>
                        </LinearGradient>

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
                            The Water level is 25cm, which is{' '}
                            <Text style={styles.bold}>70% of the safe limit for walking.</Text>
                            {' '}At this rate, it{' '}
                            <Text style={styles.bold}>may become unsafe soon,</Text>
                            {' '}as the water is rising at 3 cm per hour. The expected rainfall is 5.0 mm per hour, which could make the area even more dangerous.{' '}
                            <Text style={styles.bold}>Stay alert and avoid this area if possible.</Text>
                        </Text>
                    </View>
                </View>

                {/* Flood Severity Chart */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Flood Severity Chart</Text>
                    <View style={styles.chartCard}>
                        <FloodChart />
                    </View>
                </View>

                <View style={{ height: 40 }} />
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F0F4FF' },
    header: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
        paddingTop: 56, paddingBottom: 16, paddingHorizontal: 20,
    },
    backBtn: { width: 36, height: 36, alignItems: 'center', justifyContent: 'center' },
    backText: { fontSize: 28, color: '#FFFFFF', fontWeight: '300', marginTop: -4 },
    headerTitle: { fontFamily: 'Poppins_700Bold', fontSize: 18, color: '#FFFFFF' },
    headerIcon: { width: 36, height: 36, alignItems: 'center', justifyContent: 'center' },
    headerIconText: { fontSize: 20 },
    scroll: { flex: 1 },
    section: { paddingHorizontal: 20, marginTop: 20 },
    sectionTitle: { fontFamily: 'Poppins_700Bold', fontSize: 17, color: '#1E293B', marginBottom: 12 },
    locationBanner: {
        borderRadius: 18, padding: 18,
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
        elevation: 4, shadowColor: '#2563EB', shadowOpacity: 0.3, shadowRadius: 10, shadowOffset: { width: 0, height: 4 },
    },
    bannerLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
    bannerIcon: { fontSize: 26 },
    bannerStreet: { fontFamily: 'Poppins_800ExtraBold', fontSize: 22, color: '#FFFFFF' },
    bannerArea: { fontFamily: 'Poppins_400Regular', fontSize: 13, color: 'rgba(255,255,255,0.8)' },
    bannerTemp: { fontFamily: 'Poppins_800ExtraBold', fontSize: 36, color: '#FFFFFF' },
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
    rateRow: { flexDirection: 'row', gap: 12, marginBottom: 12 },
    rateCard: {
        flex: 1, backgroundColor: '#FFFFFF', borderRadius: 12, padding: 12,
        alignItems: 'center', elevation: 2, shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 6, shadowOffset: { width: 0, height: 1 },
    },
    rateText: { fontFamily: 'Poppins_400Regular', fontSize: 12, color: '#475569' },
    rateBold: { fontFamily: 'Poppins_700Bold', color: '#1E293B' },
    personCard: {
        backgroundColor: '#FFFFFF', borderRadius: 16, padding: 16,
        elevation: 2, shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 6, shadowOffset: { width: 0, height: 1 },
    },
    personHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
    personIcon: { fontSize: 18 },
    personLabel: { fontFamily: 'Poppins_600SemiBold', fontSize: 13, color: '#1E293B' },
    personText: { fontFamily: 'Poppins_400Regular', fontSize: 13, color: '#475569', lineHeight: 20 },
    bold: { fontFamily: 'Poppins_700Bold', color: '#1E293B' },
    chartCard: {
        backgroundColor: '#FFFFFF', borderRadius: 16, padding: 16,
        elevation: 2, shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 6, shadowOffset: { width: 0, height: 1 },
    },
})