/**
 * Recibiendo la latitud y la longitud hacemos una peticion a 
 * Open Wheather Maps para regresar la temperatura de esas
 * coordenadas
 */

const axios = require('axios');

// Recibimos las coordenadas
const getClima = async(lat, lng) => {

    // Hacemos una peticion get pasando la lat y la lng
    const resp = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${ lat }&lon=${ lng }&appid=2bfddf3baf8cb565aaac27ac1149125d&units=metric`)

    // Regresamos la temperatura de esas coordenadas
    return resp.data.main.temp;

}

module.exports = {
    getClima
}