import { useState } from 'react';
import { View } from 'react-native-web';

import './Home.css';

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
            <p>Hola</p>
        </View>
    );
}

export default Home;