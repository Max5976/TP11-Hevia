import { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Pressable, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // librería para desplegador de opciones
import DateTimePicker from '@react-native-community/datetimepicker'; // librería para selector de fecha para la edad, no compatible con web, solo funciona en móvil
import MaterialIcons from '@react-native-vector-icons/material-icons'; //íconos
import { obtenerPaises } from '../api/apiCodigos';

function Home() {
    const [formulario, setFormulario] = useState({
        nombreCompleto: '',
        email: '',
        edad: 0,
        tipoEntrada: '', // 'general' o 'vip'
        telefono: '' // puede ser null / es opcional
    });
    const [fechaNacimiento, setFechaNacimiento] = useState(new Date());
    const [mostrarFecha, setMostrarFecha] = useState(false);
    const [fechaSeleccionada, setFechaSeleccionada] = useState(false); // para mostrar la fecha si ya hay alguna seleccionada 
    const [codigoPais, setCodigoPais] = useState('+54');
    const [paises, setPaises] = useState([]);

    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    useEffect(() => {
        obtenerPaises()
            .then(datos => {
                console.log(datos);
                setPaises(datos);
            })
            .catch(error => {
                console.log('Error:', error);
            });
    }, []);

    const enviarFormulario = () => {
        const numerosTelefono = formulario.telefono.replace(/\D/g, '');

        if (formulario.nombreCompleto.trim() === '') {
            console.log('El nombre es obligatorio');
            return;
        }
        else if (!emailValido.test(formulario.email)) {
            console.log('El email no es válido');
            return;
        }
        else if (formulario.edad === 0 || formulario.edad < 18) {
            console.log('La edad no es válida, debe haber algo escrito y debes ser mayor a 18 para entrar');
            return;
        }
        else if (formulario.tipoEntrada.trim() === '') {
            console.log('El tipo de entrada es obligatorio');
            return;
        }
        else if (formulario.tipoEntrada.trim() !== 'general' || formulario.tipoEntrada.trim() !== 'vip') {
            console.log('El tipo de entrada no es válido. Debe ser "general" o "vip"');
            return;
        }
        else if (
            formulario.telefono.trim() !== '' && (numerosTelefono.length < 4 || numerosTelefono.length > 15)
        ) {
            console.log('El teléfono no es válido, debe tener al menos 4 dígitos y como máximo 15'); // los territorios con menos dígitos de celular (Niue y Tokelau), tienen solo 4
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
        <View style={styles.pantalla}>
            <ScrollView style={styles.scroll} contentContainerStyle={styles.container} showsVerticalScrollIndicator={true}>
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
                    <View style={styles.campo}>
                        <Pressable style={styles.input} onPress={() => setMostrarFecha(true)}>       
                            <MaterialIcons name="calendar-today" size={22} color="#2a4c91"/>

                            {fechaSeleccionada ? (
                                <Text>{fechaNacimiento.toLocaleDateString()}</Text>
                            ) : (
                                <Text style={styles.placeholder}>Fecha de nacimiento</Text>
                            )}
                        </Pressable>

                        {mostrarFecha && (
                            <DateTimePicker
                                value={fechaNacimiento}
                                mode="date"
                                onChange={(_, fecha) => { // "_" significa que no me interesa el primer parámetro (el evento)
                                if (fecha) {
                                        setFechaNacimiento(fecha);
                                        setFechaSeleccionada(true);
                                        const edad = convertirFechaAEdad(fecha);
                                        setFormulario({
                                            ...formulario,
                                            edad
                                        });
                                    }

                                    setMostrarFecha(false);
                                }}
                            />
                            )
                        }

                    </View>
                    <View style={styles.campo}>
                        <Picker
                            style={styles.tipoEntrada}
                            selectedValue={formulario.tipoEntrada}
                            onValueChange={(valor) => 
                                setFormulario({...formulario, tipoEntrada: valor})
                            }
                        >
                            <Picker.Item label="Elegí tu entrada" value="" />
                            <Picker.Item label="General" value="general" />
                            <Picker.Item label="VIP" value="vip" />
                        </Picker>
                    </View>
                    <View style={styles.campo}>
                        <Picker style={styles.nacion} selectedValue={codigoPais} onValueChange={(valor) => setCodigoPais(valor)}> 
                            {paises.map((pais) => (
                                <Picker.Item
                                    key={pais.codigo}
                                    label={`${pais.nombre} (${pais.codigo})`}
                                    value={pais.codigo}
                                />
                            ))}
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
                    </View>                
                    <Button 
                        style={styles.button}
                        title="Terminar Formulario"
                        onPress={enviarFormulario}
                    />
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    pantalla: {
        flex: 1,
        backgroundColor: '#0d1b38'
    },

    container: {
        alignItems: 'center',
        paddingTop: 30,
        paddingBottom: 50
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
        marginTop: 10,
        width: '80%'
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
        borderRadius: 10,
        paddingVertical: 15,
        alignItems: 'center',
        minHeight: 900,
    },

    campo: {
        width: '100%',
        alignItems: 'center'
    },

    input: {
        backgroundColor: '#ffffff',
        width: '90%',
        minHeight: 48,
        padding: 10,
        margin: 8,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8
    },

    tipoEntrada: {
        backgroundColor: '#ffffff',
        width: '90%',
        height: 50,
        margin: 8,
        borderRadius: 8
    },

    nacion: {
        backgroundColor: '#ffffff',
        width: '90%',
        height: 50,
        margin: 8,
        borderRadius: 8
    },

    button: {
        marginTop: 10,
        marginBottom: 10
    },

    placeholder: {
        color: '#c2c2c2'
    }
});

export default Home;