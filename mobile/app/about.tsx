import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { LinearGradient } from 'expo-linear-gradient'
import { useFonts, Poppins_400Regular, Poppins_600SemiBold, Poppins_700Bold, Poppins_800ExtraBold } from '@expo-google-fonts/poppins'
import Logo from '../components/ui/Logo'

export default function About() {
  const router = useRouter()

  const [fontsLoaded] = useFonts({ Poppins_400Regular, Poppins_600SemiBold, Poppins_700Bold, Poppins_800ExtraBold })
  if (!fontsLoaded) return null

  return (
    <View style={styles.container}>
      <View style={{ ...StyleSheet.absoluteFillObject, backgroundColor: '#eef7ff' }} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <MaterialIcons name="arrow-back" size={24} color="#1E293B" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>About</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={{ padding: 20, gap: 16 }}>

        {/* Logo area */}
        <View style={styles.logoSection}>
          <Logo size={90} />
          <Text style={styles.appName}>BAHGO</Text>
          <Text style={styles.appSub}>Flood Watch</Text>
          <Text style={styles.version}>Version 1.0.0</Text>
        </View>

        {/* Description */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>What is Bahgo?</Text>
          <Text style={styles.sectionText}>
            BAHGO is an innovative early flood detection and monitoring system designed to provide real-time alerts and data visualization through a mobile application dashboard.
          </Text>
        </View>

        {/* Features */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Features</Text>
          {[
            { icon: 'notifications', text: 'Real-time flood alerts' },
            { icon: 'place', text: 'Location-based monitoring' },
            { icon: 'show-chart', text: 'Flood severity charts' },
            { icon: 'directions-walk', text: 'Person & Car safety mode' },
            { icon: 'devices', text: 'Nearby sensor devices' },
          ].map((f, i) => (
            <View key={i} style={styles.featureRow}>
              <MaterialIcons name={f.icon as any} size={18} color="#2563EB" />
              <Text style={styles.featureText}>{f.text}</Text>
            </View>
          ))}
        </View>

        {/* Team */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Developed by</Text>
          <Text style={styles.sectionText}>BAHGO Team — Thesis Project {'\n'}Bachelor of Science in Information Technology</Text>
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
  headerTitle: { fontFamily: 'Poppins_700Bold', fontSize: 18, color: '#1E293B' },
  scroll: { flex: 1 },

  logoSection: {
    alignItems: 'center', paddingBottom: 8,
  },
  appName: { fontFamily: 'Poppins_800ExtraBold', fontSize: 28, color: '#1E293B' },
  appSub: { fontFamily: 'Poppins_400Regular', fontSize: 14, color: '#34465f' },
  version: { fontFamily: 'Poppins_400Regular', fontSize: 12, color: '#5c6e88', marginTop: 4 },

  section: {
    paddingVertical: 8,
  },
  sectionTitle: { fontFamily: 'Poppins_700Bold', fontSize: 15, color: '#1E293B', marginBottom: 10 },
  sectionText: { fontFamily: 'Poppins_400Regular', fontSize: 13, color: '#475569', lineHeight: 22 },

  featureRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 10 },
  featureText: { fontFamily: 'Poppins_400Regular', fontSize: 13, color: '#475569' },
})