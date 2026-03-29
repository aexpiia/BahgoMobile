import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import { useRouter } from 'expo-router'
import { LinearGradient } from 'expo-linear-gradient'
import { useFonts, Poppins_400Regular, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins'
import { useState } from 'react'

export default function Settings() {
    const router = useRouter()
    const [selected, setSelected] = useState<'person' | 'car'>('person')

    const [fontsLoaded] = useFonts({ Poppins_400Regular, Poppins_600SemiBold, Poppins_700Bold })
    if (!fontsLoaded) return null

    return (
        <View style={styles.container}>
            {/* Header */}
            <LinearGradient colors={['#C5E3F7', '#4A90D9']} style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
                    <Text style={styles.backText}>‹</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Settings</Text>
                <View style={{ width: 36 }} />
            </LinearGradient>

            <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>

                {/* Location */}
                <View style={styles.section}>
                    <TouchableOpacity
                        style={styles.locationRow}
                        onPress={() => router.push('/search' as any)}
                    >
                        <Text style={styles.locationIcon}>📍</Text>
                        <Text style={styles.locationText}>Taguig, Metro Manila</Text>
                        <Text style={styles.changeText}>Change Location</Text>
                    </TouchableOpacity>
                </View>

                {/* Object to Monitor */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Object to Monitor</Text>
                    <View style={styles.card}>
                        <View style={styles.toggleRow}>
                            <TouchableOpacity
                                style={[styles.toggleOption, selected === 'person' && styles.toggleActive]}
                                onPress={() => setSelected('person')}
                            >
                                <Text style={styles.toggleIcon}>🚶</Text>
                                <Text style={[styles.toggleLabel, selected === 'person' && styles.toggleLabelActive]}>
                                    person
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.toggleOption, selected === 'car' && styles.toggleActive]}
                                onPress={() => setSelected('car')}
                            >
                                <Text style={styles.toggleIcon}>🚗</Text>
                                <Text style={[styles.toggleLabel, selected === 'car' && styles.toggleLabelActive]}>
                                    car
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                {/* Apps */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Apps</Text>
                    <TouchableOpacity style={styles.menuItem}>
                        <Text style={styles.menuIcon}>ℹ️</Text>
                        <Text style={styles.menuText}>About Bahgo app</Text>
                        <Text style={styles.menuArrow}>›</Text>
                    </TouchableOpacity>
                </View>

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
    backText: { fontSize: 28, color: '#1E293B', fontWeight: '300', marginTop: -4 },
    headerTitle: { fontFamily: 'Poppins_700Bold', fontSize: 18, color: '#1E293B' },
    scroll: { flex: 1 },
    section: { paddingHorizontal: 20, marginTop: 24 },
    sectionTitle: { fontFamily: 'Poppins_600SemiBold', fontSize: 14, color: '#1E293B', marginBottom: 10 },

    // Location
    locationRow: {
        flexDirection: 'row', alignItems: 'center', gap: 8,
        backgroundColor: '#FFFFFF', borderRadius: 14, padding: 16,
        elevation: 2, shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 6, shadowOffset: { width: 0, height: 1 },
    },
    locationIcon: { fontSize: 18 },
    locationText: { fontFamily: 'Poppins_600SemiBold', fontSize: 14, color: '#1E293B', flex: 1 },
    changeText: { fontFamily: 'Poppins_400Regular', fontSize: 12, color: '#2563EB' },

    // Toggle
    card: {
        backgroundColor: '#FFFFFF', borderRadius: 14, padding: 12,
        elevation: 2, shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 6, shadowOffset: { width: 0, height: 1 },
    },
    toggleRow: { flexDirection: 'row', gap: 10 },
    toggleOption: {
        flex: 1, alignItems: 'center', paddingVertical: 14,
        borderRadius: 12, backgroundColor: '#F1F5F9',
    },
    toggleActive: { backgroundColor: '#2563EB' },
    toggleIcon: { fontSize: 22, marginBottom: 4 },
    toggleLabel: { fontFamily: 'Poppins_600SemiBold', fontSize: 12, color: '#64748B' },
    toggleLabelActive: { color: '#FFFFFF' },

    // Menu
    menuItem: {
        flexDirection: 'row', alignItems: 'center', gap: 12,
        backgroundColor: '#FFFFFF', borderRadius: 14, padding: 16,
        elevation: 2, shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 6, shadowOffset: { width: 0, height: 1 },
    },
    menuIcon: { fontSize: 18 },
    menuText: { fontFamily: 'Poppins_400Regular', fontSize: 14, color: '#1E293B', flex: 1 },
    menuArrow: { fontSize: 20, color: '#94A3B8' },
})