import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { LinearGradient } from 'expo-linear-gradient'
import { useFonts, Poppins_400Regular, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins'

const personLevels = [
  { bg: '#EAF3DE', dot: '#639922', textColor: '#27500A', sub: '#3B6D11', label: 'Ankle — 15 to 30 cm', desc: 'Walkable with caution.' },
  { bg: '#FAEEDA', dot: '#BA7517', textColor: '#633806', sub: '#854F0B', label: 'Knee — 30 to 60 cm', desc: 'Difficult to walk. Risk of falling.' },
  { bg: '#FAECE7', dot: '#D85A30', textColor: '#4A1B0C', sub: '#993C1D', label: 'Waist — 60 to 100 cm', desc: 'Very dangerous. Strong current risk.' },
  { bg: '#FCEBEB', dot: '#E24B4A', textColor: '#501313', sub: '#A32D2D', label: 'Chest or above — 100+ cm', desc: 'Life-threatening. Evacuate immediately.' },
]

const carLevels = [
  { bg: '#EAF3DE', dot: '#639922', textColor: '#27500A', sub: '#3B6D11', label: 'Safe — below 30 cm', desc: 'Most cars can pass. Drive slowly.' },
  { bg: '#FAEEDA', dot: '#BA7517', textColor: '#633806', sub: '#854F0B', label: 'Risky — 30 to 60 cm', desc: 'Small cars may stall. Avoid if possible.' },
  { bg: '#FAECE7', dot: '#D85A30', textColor: '#4A1B0C', sub: '#993C1D', label: 'Danger — 60 to 100 cm', desc: 'Engine will flood. Car may be swept.' },
  { bg: '#FCEBEB', dot: '#E24B4A', textColor: '#501313', sub: '#A32D2D', label: 'Critical — above 100 cm', desc: 'Do not attempt. Car will be submerged.' },
]

export default function Settings() {
  const router = useRouter()
  const [fontsLoaded] = useFonts({ Poppins_400Regular, Poppins_600SemiBold, Poppins_700Bold })

  if (!fontsLoaded) return null

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#0F6CE9', '#7EC8E3', '#8ab9ff']}
        locations={[0, 0.45, 0.75]}
        style={StyleSheet.absoluteFillObject}
      />
      <View style={{ ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(255,255,255,0.06)' }} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <MaterialIcons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>

        {/* Location */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.card} onPress={() => router.push('/search' as any)}>
            <MaterialIcons name="place" size={20} color="#2563EB" />
            <Text style={styles.locationText}>Taguig, Metro Manila</Text>
            <Text style={styles.changeText}>Change Location</Text>
            <MaterialIcons name="chevron-right" size={20} color="#94A3B8" />
          </TouchableOpacity>
        </View>

        {/* Monitor Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Monitor Info</Text>
          <View style={styles.infoCard}>

            {/* Person */}
            <View style={styles.infoHeader}>
              <MaterialIcons name="person" size={20} color="#185FA5" />
              <Text style={styles.infoTitle}>Person</Text>
            </View>

            {personLevels.map((item, i) => (
              <View key={i} style={[styles.levelRow, { backgroundColor: item.bg }]}>
                <View style={[styles.dot, { backgroundColor: item.dot }]} />
                <View style={{ flex: 1 }}>
                  <Text style={[styles.levelLabel, { color: item.textColor }]}>{item.label}</Text>
                  <Text style={[styles.levelDesc, { color: item.sub }]}>{item.desc}</Text>
                </View>
              </View>
            ))}

            <View style={styles.divider} />

            {/* Car */}
            <View style={styles.infoHeader}>
              <MaterialIcons name="directions-car" size={20} color="#BA7517" />
              <Text style={styles.infoTitle}>Car</Text>
            </View>

            {carLevels.map((item, i) => (
              <View key={i} style={[styles.levelRow, { backgroundColor: item.bg }]}>
                <View style={[styles.dot, { backgroundColor: item.dot }]} />
                <View style={{ flex: 1 }}>
                  <Text style={[styles.levelLabel, { color: item.textColor }]}>{item.label}</Text>
                  <Text style={[styles.levelDesc, { color: item.sub }]}>{item.desc}</Text>
                </View>
              </View>
            ))}

            <Text style={styles.safetyNote}>When in doubt, don't cross flooded areas.</Text>
          </View>
        </View>

        {/* Apps */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Apps</Text>
          <TouchableOpacity style={styles.card} onPress={() => router.push('/about' as any)}>
            <MaterialIcons name="info" size={20} color="#2563EB" />
            <Text style={styles.menuText}>About Bahgo app</Text>
            <MaterialIcons name="chevron-right" size={20} color="#94A3B8" />
          </TouchableOpacity>
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
    paddingTop: 56, paddingBottom: 16, paddingHorizontal: 20,
    backgroundColor: 'transparent',
  },
  backBtn: { width: 36, height: 36, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontFamily: 'Poppins_700Bold', fontSize: 18, color: '#FFFFFF' },
  scroll: { flex: 1 },
  section: { paddingHorizontal: 20, marginTop: 16 },
  sectionTitle: { fontFamily: 'Poppins_600SemiBold', fontSize: 13, color: '#FFFFFF', marginBottom: 10, opacity: 0.9 },

  card: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    backgroundColor: '#FFFFFF', borderRadius: 14, padding: 16,
    elevation: 2, shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 6, shadowOffset: { width: 0, height: 1 },
  },
  locationText: { fontFamily: 'Poppins_600SemiBold', fontSize: 14, color: '#1E293B', flex: 1 },
  changeText: { fontFamily: 'Poppins_400Regular', fontSize: 12, color: '#2563EB' },
  menuText: { fontFamily: 'Poppins_400Regular', fontSize: 14, color: '#1E293B', flex: 1 },

  infoCard: {
    backgroundColor: '#FFFFFF', borderRadius: 14, padding: 16,
    elevation: 2, shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 6, shadowOffset: { width: 0, height: 1 },
  },
  infoHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 10 },
  infoTitle: { fontFamily: 'Poppins_600SemiBold', fontSize: 13, color: '#1E293B' },
  divider: { borderTopWidth: 0.5, borderColor: '#E2E8F0', marginVertical: 14 },
  levelRow: { flexDirection: 'row', alignItems: 'center', gap: 10, borderRadius: 8, padding: 9, marginBottom: 6 },
  dot: { width: 10, height: 10, borderRadius: 5 },
  levelLabel: { fontFamily: 'Poppins_600SemiBold', fontSize: 12 },
  levelDesc: { fontFamily: 'Poppins_400Regular', fontSize: 11 },
  safetyNote: { fontFamily: 'Poppins_400Regular', fontSize: 11, color: '#94A3B8', textAlign: 'center', marginTop: 10 },
})