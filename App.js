import { StyleSheet, View, StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import Home from './pages/Home';
import Header from './components/Header';
import Footer from './components/Footer';

export default function App() {
    return (
        <SafeAreaProvider>
            <StatusBar
                translucent
                backgroundColor="transparent"
                barStyle="light-content"
            />

            <View style={styles.container}>
                <Header />

                <View style={styles.content}>
                    <Home />
                </View>

                <Footer />
            </View>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#162c58',

  },
  content: {
    flex: 1, // Esto empuja al Footer hacia abajo y al Header hacia arriba
    width: '100%',
  },
});
