// Impostamos getLugarLatLng que recibe una direccion y devuelve las coordenadas
const lugar = require('./lugar/lugar');

// Impostamos getClima que recibe las coordenadas y devuelve la temperatura
const clima = require('./clima/clima');

/*
 * Para obtener el clima de una cuidad, se tiene que ejecutar:
 *       cmd -> node app -d "New York"
 * Puesto que no tiene un comando como es: crear o actualizar
 * usamos .options para definir el comando directamente
 */

const argv = require('yargs').options({
    direccion: {
        alias: 'd',
        desc: 'Direccion de la cuidad para obtener el clima',
        demand: true
    }
}).argv;

// Mostramos la direccion que tecleo el usuario
// console.log(argv.direccion);

/**
 * Llamamos a getLugarLatLng pasandole la direccion que se escribio en consola
 * esta funcion es de tipo async por lo que devuelve una promesa
 */
//lugar.getLugarLatLng(argv.direccion)
//  .then(console.log);

// // Llamamos a getCLima pasando coordenadas para obtener la temperatura
// clima.getClima(40.750000, -74.000000)
//     .then(console.log)
//     .catch(console.log)


// Recibimos la direccion la cual es la que se coloco en cmd
//      cmd -> node app -d "New York"
const getInfo = async(direccion) => {

    try {

        // Obtenemos las coordenadas de la direccion recibida
        const coords = await lugar.getLugarLatLng(direccion);

        // Obtenemos el clima pasando las coordenadas
        const temp = await clima.getClima(coords.lat, coords.lng);

        // Mostramos la temperatura de la direccion recibida
        return `El clima de ${ coords.direccion } es de ${ temp }.`;

    } catch (e) {

        return `No se pudo determinar el clima de ${ direccion }`;

    }

}

// Llamamos a la funcion getInfo
getInfo(argv.direccion)
    .then(console.log)
    .catch(console.log);