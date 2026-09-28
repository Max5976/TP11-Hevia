import { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native'; 

function Home() {
    const [formulario, setFormulario] = useState({
        nombreCompleto: '',
        email: '',
        edad: '',
        tipoEntrada: '', // 'general' o 'vip'
        telefono: '' // puede ser null / es opcional
    });

    return (
        <View>
            <Text>Hola</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default Home;