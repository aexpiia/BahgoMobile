import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { LinearGradient } from 'expo-linear-gradient'
import { useFonts, Poppins_400Regular, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins'

export default function Settings() {
  const router = useRouter()

  const [fontsLoaded] = useFonts({ Poppins_400Regular, Poppins_600SemiBold, Poppins_700Bold })

  if (!fontsLoaded) return null

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

        {/* Monitor Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Monitor Info</Text>
          <View style={styles.card}>
            <MaterialIcons name="directions-walk" size={20} color="#2563EB" />
            <View style={{ flex: 1 }}>
              <Text style={styles.locationText}>Monitor water levels and stay safe</Text>
              <Text style={styles.changeText}>General flood monitoring information</Text>
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

  menuText: { fontFamily: 'Poppins_400Regular', fontSize: 14, color: '#1E293B', flex: 1 },
}) 