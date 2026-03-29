import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native'
import { useRouter } from 'expo-router'
import { useFonts, Poppins_400Regular, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins'
import { useState } from 'react'

const LOCATIONS = [
    { id: '1', city: 'Makati City', area: 'Pembo Village' },
    { id: '2', city: 'Makati City', area: 'Cembo Village' },
    { id: '3', city: 'Pasay City', area: 'Pinya Village' },
    { id: '4', city: 'Taguig City', area: 'North Village' },
    { id: '5', city: 'Taguig City', area: 'Central Taguig' },
    { id: '6', city: 'Quezon City', area: 'Commonwealth' },
    { id: '7', city: 'Marikina City', area: 'Concepcion' },
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

    return (
        <View style={styles.container}>

            {/* Back + Search bar */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
                    <Text style={styles.backText}>‹</Text>
                </TouchableOpacity>
                <View style={styles.searchBar}>
                    <Text style={styles.searchIcon}>🔍</Text>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Enter a location"
                        placeholderTextColor="#94A3B8"
                        value={query}
                        onChangeText={setQuery}
                        autoFocus
                    />
                </View>
            </View>

            {/* Results */}
            <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
                {filtered.map(loc => (
                    <TouchableOpacity
                        key={loc.id}
                        style={styles.locationItem}
                        onPress={() => router.back()}
                    >
                        <Text style={styles.locationIcon}>📍</Text>
                        <View>
                            <Text style={styles.locationCity}>{loc.city}</Text>
                            <Text style={styles.locationArea}>{loc.area}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>

        </View>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F0F4FF' },

    header: {
        paddingTop: 56, paddingBottom: 16, paddingHorizontal: 20,
        flexDirection: 'row', alignItems: 'center', gap: 12,
        backgroundColor: '#F0F4FF',
    },
    backBtn: { width: 36, height: 36, alignItems: 'center', justifyContent: 'center' },
    backText: { fontSize: 28, color: '#1E293B', fontWeight: '300', marginTop: -4 },
    searchBar: {
        flex: 1, flexDirection: 'row', alignItems: 'center',
        backgroundColor: '#FFFFFF', borderRadius: 50, paddingHorizontal: 16,
        paddingVertical: 12, gap: 8,
        elevation: 2, shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 6, shadowOffset: { width: 0, height: 1 },
    },
    searchIcon: { fontSize: 16 },
    searchInput: {
        flex: 1, fontFamily: 'Poppins_400Regular',
        fontSize: 14, color: '#1E293B',
    },

    scroll: { flex: 1, paddingHorizontal: 20 },
    locationItem: {
        flexDirection: 'row', alignItems: 'center', gap: 14,
        backgroundColor: '#FFFFFF', borderRadius: 14, padding: 16, marginBottom: 10,
        elevation: 2, shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 6, shadowOffset: { width: 0, height: 1 },
    },
    locationIcon: { fontSize: 20 },
    locationCity: { fontFamily: 'Poppins_700Bold', fontSize: 15, color: '#1E293B' },
    locationArea: { fontFamily: 'Poppins_400Regular', fontSize: 12, color: '#64748B' },
})