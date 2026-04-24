import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { LinearGradient } from 'expo-linear-gradient'
import { useFonts, Poppins_400Regular, Poppins_600SemiBold, Poppins_700Bold, Poppins_800ExtraBold } from '@expo-google-fonts/poppins'

const { width } = Dimensions.get('window')

// ── TEMPORARY MOCK — swap back to useFloodData() once Firebase is ready ──
const currentSensor = {
  street: 'Apple Street',
  area: 'Central, Taguig',
  waterLevelCm: 25,
  status: 'caution' as const,
  rateOfRiseCmPerHr: 8,
  precipitationMmPerHr: 5.0,
}

const chartData = [
  { time: '12am', levelCm: 10 },
  { time: '2am',  levelCm: 12 },
  { time: '4am',  levelCm: 15 },
  { time: '6am',  levelCm: 18 },
  { time: '8am',  levelCm: 22 },
  { time: '10am', levelCm: 25 },
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

const riskGradient: Record<string, string[]> = {
  safe:     ['#6db33f', '#4e9a24'],
  caution:  ['#ffae75', '#eb8130'],
  danger:   ['#f87171', '#dc2626'],
  critical: ['#dc2626', '#991b1b'],
}
// ─────────────────────────────────────────────────────────────────────────────

function FloodChart() {
  const maxVal = THRESHOLD_CM * 2
  const chartH = 120
  const chartW = width - 120
  const points = chartData.map(d => d.levelCm)
  const labels = chartData.map(d => d.time)

  return (
    <View style={chartStyles.container}>
      <View style={chartStyles.yAxis}>
        {[maxVal, Math.round(maxVal * 0.75), Math.round(maxVal * 0.5), Math.round(maxVal * 0.25), 0].map(v => (
          <Text key={v} style={chartStyles.yLabel}>{v}cm</Text>
        ))}
      </View>
      <View style={chartStyles.chartArea}>
        {[0, 1, 2, 3, 4].map(i => (
          <View key={i} style={[chartStyles.gridLine, { top: (i / 4) * chartH }]} />
        ))}
        <View style={[chartStyles.thresholdLine, { top: chartH * (1 - THRESHOLD_CM / maxVal) }]} />
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
          {[labels[0], labels[Math.floor(labels.length / 2)], labels[labels.length - 1]].map(t => (
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
    position: 'absolute', height: 2, backgroundColor: '#3B82F6',
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
    Poppins_400Regular, Poppins_600SemiBold, Poppins_700Bold, Poppins_800ExtraBold,
  })

  if (!fontsLoaded) return null

  const statusLabel = currentSensor.status.charAt(0).toUpperCase() + currentSensor.status.slice(1)

  return (
      <View style={styles.container}>
      <View style={{ ...StyleSheet.absoluteFillObject, backgroundColor: '#F8FAFC' }} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <MaterialIcons name="arrow-back" size={24} color="#1E293B" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Conditions</Text>
        <TouchableOpacity style={styles.headerIcon} onPress={() => router.push('/search' as any)}>
          <MaterialIcons name="search" size={24} color="#1E293B" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>

        {/* Location Banner */}
        <View style={styles.section}>
          <LinearGradient colors={['#134999', '#1869b4']} style={styles.locationBanner}>
            <View style={styles.bannerLeft}>
              <MaterialIcons name="place" size={26} color="#FFFFFF" />
              <View>
                <Text style={styles.bannerStreet}>{currentSensor.street}</Text>
                <Text style={styles.bannerArea}>{currentSensor.area}</Text>
              </View>
            </View>
          </LinearGradient>
        </View>

        {/* Current Level Status */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Current Level Status</Text>
          <Text style={[styles.personText, { marginBottom: 12 }]}>
            {STATUS_DESCRIPTION[currentSensor.status]}
          </Text>

            <View style={styles.statusRow}>
            <LinearGradient colors={['#5492e4', '#317de0']} style={styles.statusCard}>
              <MaterialIcons name="trending-up" size={18} color="#fff" />
              <Text style={styles.statusCardLabel}>Water Level</Text>
              <Text style={styles.statusCardValue}>{currentSensor.waterLevelCm}cm</Text>
              <Text style={styles.statusCardSub}>
                {getThresholdPercent(currentSensor.waterLevelCm)}% of threshold
              </Text>
            </LinearGradient>

            <LinearGradient
              colors={riskGradient[currentSensor.status]}
              style={styles.statusCard}
            >
              <MaterialIcons name="warning" size={18} color="#fff" />
              <Text style={styles.statusCardLabel}>Risk Level</Text>
              <Text style={styles.statusCardValueWarning}>{statusLabel}</Text>
              <Text style={styles.statusCardSub}>{STATUS_DESCRIPTION[currentSensor.status]}</Text>
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
            <View style={styles.personHeader}>
              <MaterialIcons name="info" size={22} color="#2563EB" />
              <Text style={styles.personLabel}>Flood Monitoring</Text>
            </View>
            <Text style={styles.personText}>
              {STATUS_DESCRIPTION[currentSensor.status]}
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
    container: { flex: 1 },
    header: {
      flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
      paddingTop: 56, paddingBottom: 16, paddingHorizontal: 20, backgroundColor: 'transparent',
    },
    backBtn: { width: 36, height: 36, alignItems: 'center', justifyContent: 'center' },
    headerTitle: { fontFamily: 'Poppins_700Bold', fontSize: 18, color: '#1E293B' },
    headerIcon: { width: 36, height: 36, alignItems: 'center', justifyContent: 'center' },
    scroll: { flex: 1 },
    section: { paddingHorizontal: 20, marginTop: 20 },
    sectionTitle: { fontFamily: 'Poppins_700Bold', fontSize: 17, color: '#1E293B', marginBottom: 12 },
    locationBanner: {
      borderRadius: 18, padding: 18,
      flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
      elevation: 4, shadowColor: '#0C386C', shadowOpacity: 0.3, shadowRadius: 10, shadowOffset: { width: 0, height: 4 },
    },
    bannerLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
    bannerStreet: { fontFamily: 'Poppins_800ExtraBold', fontSize: 22, color: '#FFFFFF' },
    bannerArea: { fontFamily: 'Poppins_400Regular', fontSize: 13, color: 'rgba(255,255,255,0.8)' },
    statusRow: { flexDirection: 'row', gap: 12, marginBottom: 12 },
    statusCard: {
      flex: 1, borderRadius: 16, padding: 14,
      elevation: 3, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 8, shadowOffset: { width: 0, height: 2 },
    },
    statusCardLabel: { fontFamily: 'Poppins_400Regular', fontSize: 11, color: 'rgba(255,255,255,0.85)', marginBottom: 4, marginTop: 4 },
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
    personLabel: { fontFamily: 'Poppins_600SemiBold', fontSize: 13, color: '#1E293B' },
    personText: { fontFamily: 'Poppins_400Regular', fontSize: 13, color: '#475569', lineHeight: 20 },
    chartCard: {
      backgroundColor: '#FFFFFF', borderRadius: 16, padding: 16,
      elevation: 2, shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 6, shadowOffset: { width: 0, height: 1 },
    },
  })