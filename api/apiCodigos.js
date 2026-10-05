export async function obtenerPaises() {
    const respuesta = await fetch(
        'https://api.restcountries.com/countries/v5',
        {
            headers: {
                'Authorization': `Bearer ${process.env.EXPO_PUBLIC_API_KEY}`
            }
        }
    );

    if (!respuesta.ok) {
        throw new Error('Error al obtener los países');
    }

    const datos = await respuesta.json();

    return datos.data.objects.map((pais) => ({
        nombre: pais.names.common,
        codigo: `+${pais.calling_codes[0]}`
    }));
}