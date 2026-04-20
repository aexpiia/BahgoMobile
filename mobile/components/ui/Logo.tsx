import { View, Image, StyleSheet } from 'react-native'

export default function Logo({ size = 110 }: { size?: number }) {
    return (
        <View style={[styles.wrapper, { width: size, height: size }]}>
            <Image
                source={require('../../assets/images/logo.png')}
                style={{ width: size, height: size }}
                resizeMode="contain"
            />
    
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
    },

})