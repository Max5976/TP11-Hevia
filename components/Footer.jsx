import { View, Text, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

function Footer() {
    const insets = useSafeAreaInsets();

    return (
        <View style={[
            styles.footer,
            { paddingBottom: insets.bottom + 20 }
        ]}>
            <Text style={styles.copyright}>
                © 2026 Ticketon. Todos los derechos reservados.
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    footer: {
        backgroundColor: '#0d1b38',
        paddingTop: 25,
        paddingHorizontal: 20,
    },
    copyright: {
        color: '#7f8ba3',
        fontSize: 12,
    },
});

export default Footer;