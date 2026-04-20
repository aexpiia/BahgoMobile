import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { LinearGradient } from 'expo-linear-gradient'
import { useFonts, Poppins_400Regular, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins'
import { useState } from 'react'

const LOCATIONS = [
  { id: '1', city: 'Makati City',   area: 'Pembo Village'   },
  { id: '2', city: 'Makati City',   area: 'Cembo Village'   },
  { id: '3', city: 'Pasay City',    area: 'Pinya Village'   },
  { id: '4', city: 'Taguig City',   area: 'North Village'   },
  { id: '5', city: 'Taguig City',   area: 'Central Taguig'  },
  { id: '6', city: 'Quezon City',   area: 'Commonwealth'    },
  { id: '7', city: 'Marikina City', area: 'Concepcion'      },
]

export default function Search() {
  const router = useRouter()
  const [query, setQuery] = useState('')

  const [fontsLoaded] = useFonts({ Poppins_400Regular, Poppins_600SemiBold, Poppins_700Bold })
  if (!fontsLoaded) return null

  const filtered = LOCATIONS.filter(l =>
    l.city.toLowerCase().includes(query.toLowerCase()) ||
    l.area.toLowerCase().includes(query.toLowerCase())
  )

  const handleSelect = (loc: typeof LOCATIONS[0]) => {
    // Goes back to dashboard with selected location
    // In a real app this would update global state/context
    router.back()
  }

  return (
    <View style={styles.container}>
      <View style={{ ...StyleSheet.absoluteFillObject, backgroundColor: '#F1F5F9' }} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <MaterialIcons name="arrow-back" size={24} color="#1E293B" />
        </TouchableOpacity>
        <View style={styles.searchBar}>
          <MaterialIcons name="search" size={18} color="#627897" />
          <TextInput
            style={styles.searchInput}
            placeholder="Enter a location"
            placeholderTextColor="rgb(122, 133, 146)"
            value={query}
            onChangeText={setQuery}
            autoFocus
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={() => setQuery('')}>
              <MaterialIcons name="close" size={18} color="#94A3B8" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Results */}
      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ padding: 20, paddingTop: 12 }}
      >
        {filtered.map(loc => (
          <TouchableOpacity
            key={loc.id}
            style={styles.locationItem}
            onPress={() => handleSelect(loc)}
            activeOpacity={0.75}
          >
            <MaterialIcons name="place" size={20} color="#2563EB" />
            <View style={{ flex: 1 }}>
              <Text style={styles.locationCity}>{loc.city}</Text>
              <Text style={styles.locationArea}>{loc.area}</Text>
            </View>
            <MaterialIcons name="chevron-right" size={18} color="#CBD5E1" />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    paddingTop: 56, paddingBottom: 16, paddingHorizontal: 20,
    flexDirection: 'row', alignItems: 'center', gap: 12,
    backgroundColor: 'transparent',
  },
  backBtn: { width: 36, height: 36, alignItems: 'center', justifyContent: 'center' },
  searchBar: {
    flex: 1, flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#FFFFFF', borderRadius: 50,
    paddingHorizontal: 16, paddingVertical: 12, gap: 8,
    elevation: 2, shadowColor: '#000', shadowOpacity: 0.06,
    shadowRadius: 6, shadowOffset: { width: 0, height: 1 },
  },
  searchInput: {
    flex: 1, fontFamily: 'Poppins_400Regular',
    fontSize: 14, color: '#1E293B',
  },
  scroll: { flex: 1 },
  locationItem: {
    flexDirection: 'row', alignItems: 'center', gap: 14,
    backgroundColor: '#FFFFFF', borderRadius: 14, padding: 16, marginBottom: 10,
    elevation: 2, shadowColor: '#000', shadowOpacity: 0.06,
    shadowRadius: 6, shadowOffset: { width: 0, height: 1 },
  },
  locationCity: { fontFamily: 'Poppins_700Bold', fontSize: 15, color: '#1E293B' },
  locationArea: { fontFamily: 'Poppins_400Regular', fontSize: 12, color: '#64748B' },
})