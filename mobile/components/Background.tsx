import { View, Image, StyleSheet, Dimensions } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

const { width, height } = Dimensions.get('window')

export default function Background({ children }: { children: React.ReactNode }) {
    return (
        <LinearGradient
            colors={['#C5E3F7', '#4A90D9', '#1A5BB5']}
            locations={[0, 0.5, 1]}
            style={styles.container}
        >
            {children}
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})