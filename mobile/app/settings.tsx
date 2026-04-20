import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { LinearGradient } from 'expo-linear-gradient'
import { useFonts, Poppins_400Regular, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins'
import { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage' 

export default function Settings() {
  const router = useRouter()
  const [selected, setSelected] = useState<'person' | 'car' | 'condition'>('person')

  const [fontsLoaded] = useFonts({ Poppins_400Regular, Poppins_600SemiBold, Poppins_700Bold })
  if (!fontsLoaded) return null

  useEffect(() => {
    const loadMode = async () => {
      const mode = await AsyncStorage.getItem('monitorMode')
      if (mode) setSelected(mode as 'person' | 'car' | 'condition')
    }
    loadMode()
  }, [])

  const monitorTitle = selected === 'person' ? 'Person Mode' : selected === 'car' ? 'Car Mode' : 'Condition Mode'
  const monitorDescription = selected === 'person'
    ? 'Person mode tracks walkability: shallow water below 10cm is usually safe, 10–20cm needs caution, and 25cm+ becomes unsafe for pedestrians.'
    : selected === 'car'
    ? 'Car mode tracks drivability: 10cm is still manageable, 15–20cm is risky, and 25cm+ can cause loss of traction or engine damage.'
    : 'Condition mode provides general flood information without specific safety thresholds for walking or driving.'

  const handleModeChange = async (mode: 'person' | 'car' | 'condition') => {
    setSelected(mode)
    await AsyncStorage.setItem('monitorMode', mode)
  }

  return (
    <View style={styles.container}>
      {/* Same gradient as dashboard */}
      <LinearGradient
        colors={['#0F6CE9', '#7EC8E3', '#EEF4FF']}
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
          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push('/search' as any)}
          >
            <MaterialIcons name="place" size={20} color="#2563EB" />
            <Text style={styles.locationText}>Taguig, Metro Manila</Text>
            <Text style={styles.changeText}>Change Location</Text>
            <MaterialIcons name="chevron-right" size={20} color="#94A3B8" />
          </TouchableOpacity>
        </View>

        {/* Object to Monitor */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Object to Monitor</Text>
          <View style={[styles.card, styles.monitorCard]}>
            <View style={styles.toggleRow}>
              <TouchableOpacity
                style={[styles.toggleOption, selected === 'person' && styles.toggleActive]}
                onPress={() => handleModeChange('person')}
              >
                <MaterialIcons name="directions-walk" size={22} color={selected === 'person' ? '#fff' : '#2563EB'} />
                <Text style={[styles.toggleLabel, selected === 'person' && styles.toggleLabelActive]}>
                  person
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.toggleOption, selected === 'car' && styles.toggleActive]}
                onPress={() => handleModeChange('car')}
              >
                <MaterialIcons name="directions-car" size={22} color={selected === 'car' ? '#fff' : '#2563EB'} />
                <Text style={[styles.toggleLabel, selected === 'car' && styles.toggleLabelActive]}>
                  car
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.toggleOption, selected === 'condition' && styles.toggleActive]}
                onPress={() => handleModeChange('condition')}
              >
                <MaterialIcons name="info" size={22} color={selected === 'condition' ? '#fff' : '#2563EB'} />
                <Text style={[styles.toggleLabel, selected === 'condition' && styles.toggleLabelActive]}>
                  condition
                </Text>
              </TouchableOpacity>
            </View>

            {/* Info box */}
            <View style={styles.monitorInfo}>
              <View style={styles.monitorHeader}>
                <MaterialIcons
                  name={selected === 'person' ? 'directions-walk' : selected === 'car' ? 'directions-car' : 'info'}
                  size={22} color="#2563EB"
                />
                <Text style={styles.monitorTitle}>{monitorTitle}</Text>
              </View>
              <Text style={styles.monitorDescription}>{monitorDescription}</Text>

              {/* Safety levels */}
              <View style={styles.safetyRow}>
                <View style={[styles.safetyBadge, { backgroundColor: '#DCFCE7' }]}>
                  <Text style={[styles.safetyText, { color: '#16A34A' }]}>
                    {selected === 'person' ? '< 10cm Safe' : selected === 'car' ? '< 10cm Safe' : '< 15cm Low'}
                  </Text>
                </View>
                <View style={[styles.safetyBadge, { backgroundColor: '#FEF9C3' }]}>
                  <Text style={[styles.safetyText, { color: '#CA8A04' }]}>
                    {selected === 'person' ? '10–20cm Caution' : selected === 'car' ? '15–20cm Risky' : '15–30cm Moderate'}
                  </Text>
                </View>
                <View style={[styles.safetyBadge, { backgroundColor: '#FEE2E2' }]}>
                  <Text style={[styles.safetyText, { color: '#DC2626' }]}>
                    {selected === 'person' ? '25cm+ Unsafe' : selected === 'car' ? '25cm+ Danger' : '30cm+ High'}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Apps */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Apps</Text>
          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push('/about' as any)}
          >
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

  toggleRow: { flexDirection: 'row', gap: 10, marginBottom: 0, width: '100%' },
  toggleOption: {
    flex: 1, alignItems: 'center', paddingVertical: 14, gap: 4,
    borderRadius: 12, backgroundColor: '#F1F5F9',
  },
  toggleActive: { backgroundColor: '#2563EB' },
  toggleLabel: { fontFamily: 'Poppins_600SemiBold', fontSize: 12, color: '#64748B' },
  toggleLabelActive: { color: '#FFFFFF' },

  monitorCard: {
    flexDirection: 'column', alignItems: 'stretch', gap: 12,
  },
  monitorInfo: {
    width: '100%', marginTop: 0, padding: 14, borderRadius: 12,
    backgroundColor: '#F8FBFF', borderWidth: 1, borderColor: '#D8E7FF',
  },
  monitorHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
  monitorTitle: { fontFamily: 'Poppins_700Bold', fontSize: 14, color: '#1E293B' },
  monitorDescription: { fontFamily: 'Poppins_400Regular', fontSize: 13, color: '#475569', lineHeight: 20, marginBottom: 12 },

  safetyRow: { flexDirection: 'row', gap: 6, flexWrap: 'wrap' },
  safetyBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  safetyText: { fontFamily: 'Poppins_600SemiBold', fontSize: 11 },

  menuText: { fontFamily: 'Poppins_400Regular', fontSize: 14, color: '#1E293B', flex: 1 },
}) 