import { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // librería para desplegador de opciones
import DateTimePicker from '@react-native-community/datetimepicker'; // librería para selector de fecha para la edad, no compatible con web, solo funciona en móvil

function Home() {
    const [formulario, setFormulario] = useState({
        nombreCompleto: '',
        email: '',
        edad: 0,
        tipoEntrada: '', // 'general' o 'vip'
        telefono: '' // puede ser null / es opcional
    });
    const [fechaNacimiento, setFechaNacimiento] = useState(new Date());
    const [codigoPais, setCodigoPais] = useState('+54');
    const [telefono, setTelefono] = useState('');

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
        else if (formulario.tipoEntrada.trim() === '') {
            console.log('El tipo de entrada es obligatorio');
            return;
        }
        else if (formulario.tipoEntrada.trim() === 'general' || formulario.tipoEntrada.trim() === 'vip') {
            console.log('El tipo de entrada no es válido. Debe ser "general" o "vip"');
            return;
        }
        else if (formulario.telefono.trim() !== '' && formulario.telefono.length < 10 || formulario.telefono.trim() !== '' && formulario.telefono.length > 15) {
            console.log('El teléfono no es válido, debe tener al menos 10 dígitos y como máximo 15');
            return;
        }
        else {
            console.log('Formulario enviado correctamente');
            console.log(formulario);
            return;
        }
    }

    function convertirFechaAEdad(fechaNacimiento) {
        const hoy = new Date();

        let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();

        const mes = hoy.getMonth() - fechaNacimiento.getMonth();

        if (
            mes < 0 ||
            (mes === 0 && hoy.getDate() < fechaNacimiento.getDate())
        ) {
            edad--;
        }

        return edad;
    }

    function formatearTelefono(valor) {
        const numeros = valor.replace(/\D/g, '');

        if (numeros.length <= 2) {
            return numeros;
        }

        if (numeros.length <= 10) {
            return numeros.slice(0, 2) + ' ' + numeros.slice(2);
        }

        return numeros.slice(0, 2) + ' ' + numeros.slice(2, 6) + '-' + numeros.slice(6, 10);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Sonido Sur</Text>
            <Text style={styles.subtitulo}>Consigue tus entradas, no te lo pierdas al mejor festival del sur</Text>
            <Text style={styles.letraChica}>Entradas entre $100,000 y $500,000</Text>
            <View style={styles.formulario}>
                <View style={styles.campo}>
                    <TextInput 
                        style={styles.input}
                        placeholder='Nombre completo'
                        value={formulario.nombreCompleto}
                        onChangeText={(valor) =>
                            setFormulario({...formulario, nombreCompleto: valor})
                        }
                    />
                </View>
                <View style={styles.campo}>
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        value={formulario.email}
                        keyboardType="email-address"
                        onChangeText={(valor) =>
                            setFormulario({...formulario, email: valor})
                        }
                    />
                </View>
                <DateTimePicker
                    style={styles.input}
                    value={fechaNacimiento}
                    mode="date"
                    onChange={(_, fecha) => { // "_" significa que no me interesa el primer parámetro (el evento)
                        if (fecha) {
                            setFechaNacimiento(fecha);
                            const edad = convertirFechaAEdad(fecha);
                            setFormulario({
                                ...formulario,
                                edad
                            });
                        }
                    }}
                />
                <Picker
                    style={styles.input}
                    selectedValue={formulario.tipoEntrada}
                    onValueChange={(valor) => 
                        setFormulario({...formulario, tipoEntrada: valor})
                    }
                >
                    <Picker.Item label="Elegí tu entrada" value="" />
                    <Picker.Item label="General" value="general" />
                    <Picker.Item label="VIP" value="vip" />
                </Picker>
                <TextInput 
                    style={styles.input}
                    placeholder='Telefono'
                    value={formulario.telefono}
                    onChangeText={(valor) => {
                        const telefonoFormateado = formatearTelefono(valor);

                        setFormulario({
                            ...formulario,
                            telefono: telefonoFormateado
                        });
                    }}
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