import { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

function Home() {
    const [formulario, setFormulario] = useState({
        nombreCompleto: '',
        email: '',
        edad: '',
        tipoEntrada: '', // 'general' o 'vip'
        telefono: '' // puede ser null / es opcional
    });

    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const enviarFormulario = () => {

        if (formulario.nombreCompleto.trim() === '') {
            console.log('El nombre es obligatorio');
            return;
        }
        else if (!emailValido.test(formulario.email)) {
            console.log('El email no es válido');
            return;
        }
        else if (formulario.edad.trim() === '' || formulario.edad < 18) {
            console.log('La edad no es válida, debe haber algo escrito y debes ser mayor a 18 para entrar');
            return;
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Sonido Sur</Text>
            <Text style={styles.subtitulo}>Consigue tus entradas, no te lo pierdas al mejor festival del sur</Text>
            <Text style={styles.letraChica}>Entradas entre $100,000 y $500,000</Text>
            <View style={styles.formulario}>
                <TextInput 
                    style={styles.input}
                    placeholder='Nombre completo'
                    value={formulario.nombreCompleto}
                    onChangeText={(valor) =>
                        setFormulario({...formulario, nombreCompleto: valor})
                    }
                />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={formulario.email}
                    keyboardType="email-address"
                    onChangeText={(valor) =>
                        setFormulario({...formulario, email: valor})
                    }
                />
                <TextInput
                    style={styles.input}
                    placeholder="Edad"
                    keyboardType="numeric"
                    value={formulario.edad}
                    onChangeText={(valor) =>
                        setFormulario({...formulario, edad: valor})
                    }
                />
                <TextInput 
                    style={styles.input}
                    placeholder='TipoEntrada'
                />
                <TextInput 
                    style={styles.input}
                    placeholder='Telefono'
                />
                <Button 
                    style={styles.button}
                    title="Terminar Formulario"
                    onPress={enviarFormulario}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 30,
        alignItems: 'center',
        fontStyle: 'italic'
    },
    titulo: {
        color: '#ffffff',
        fontSize: 32,
        fontWeight: 'bold'
    },
    subtitulo: {
        color: '#ffffff',
        fontSize: 18,
        textAlign: 'center',
        marginTop: 10
    },
    letraChica: {
        color: '#ffffff98',
        fontSize: 14,
        marginTop: 10
    },
    formulario: {
        backgroundColor: '#2a4c91',
        width: '75%',
        marginTop: 20,
        borderRadius: 10
    },
    input: {
        backgroundColor: '#ffffff',
        width: '90%',
        padding: 10,
        margin: 8,
        borderRadius: 8
    },
    button: {
        color: '#ffffff'
    }
});

export default Home;