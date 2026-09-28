import { View, Text, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

function Header() {
    const insets = useSafeAreaInsets();

    return (
        <View style={[styles.header, { paddingTop: insets.top + 15 }]}>
            <Text style={styles.PrincipalText}>
                Ticketon
            </Text>

            <Text style={styles.Subtitle}>
                Compra tus entradas baratas
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#0d1b38',
        paddingHorizontal: 20,
        paddingBottom: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },

    PrincipalText: {
        fontSize: 28,
        fontWeight: '700',
        color: '#ffffff',
        letterSpacing: 0.5,
        marginBottom: 5,
    },

    Subtitle: {
        fontSize: 15,
        fontWeight: '400',
        color: '#b8c2d6',
        lineHeight: 21,
    },
});

export default Header;