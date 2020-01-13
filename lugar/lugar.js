/**
 * Creamos una funcion que recibe como parametro una ciudad, pais etc
 * y devuelve las coordenadas haciando una peticion a un servicio REST
 */

const axios = require('axios');

// Funcion que recibe una direccion y devlueve las coordenadas
const getLugarLatLng = async(dir) => {

    // Preparamos la direccion para pasarla como argumento en la URL que consume el API
    const encodedUrl = encodeURI(dir);

    // Creamos la peticion hacia el servicio REST
    const instance = axios.create({
        baseURL: `https://devru-latitude-longitude-find-v1.p.rapidapi.com/latlon.php?location=${ encodedUrl }`,
        headers: { 'X-RapidAPI-Key': 'a57fd435bbmsh3b0b485e968ac30p1946c0jsnba8ab3536f35' }
    });

    // Ejecutamos la peticion, en basea a un await y la almacenamos en respuesta
    const resp = await instance.get()

    // Verificamos que respuesta tenga algo
    if (resp.data.Results.length === 0) {

        throw new Error(`No hay info para: ${ dir }`);

    }

    // Creamos una respuesta con la direccion la latitud y la longitud
    const data = resp.data.Results[0];

    const direccion = data.name;
    const lat = data.lat;
    const lng = data.lon;

    // Devolvemos una respuesta
    return {
        direccion,
        lat,
        lng
    }

}

module.exports = {
    getLugarLatLng
}