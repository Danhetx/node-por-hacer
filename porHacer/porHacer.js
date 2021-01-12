const fs = require('fs');
const colors = require('colors');

let listadoPorHacer = [];

const guardarDB = () => {
    let data = JSON.stringify(listadoPorHacer);
    fs.writeFile(`db/data.json`, data, (err) => {
        if (err) throw new Error('No se ha podido crear el archivo', err);
    });
}

const cargarDB = () => {
    try {
        listadoPorHacer = require('../db/data.json')
    } catch (error) {
        listadoPorHacer = [];
    }
}

const getListado = () => {
    cargarDB();
    return listadoPorHacer;
}

const actualizar = (descripcion, completado = true) => {
    cargarDB();
    let enc = listadoPorHacer.findIndex(element => element.descripcion === descripcion);
    if (enc >= 0) {
        listadoPorHacer[enc].completado = completado;
        guardarDB();
        return true;
    } else {
        return false;
    }

}

const crear = (descripcion) => {

    cargarDB();

    let porHacer = {
        descripcion,
        completado: false
    };

    listadoPorHacer.push(porHacer);
    guardarDB();

    return porHacer;
}

const borrar = (descripcion) => {

    cargarDB();

    let enc = listadoPorHacer.findIndex(element => element.descripcion === descripcion);
    if (enc >= 0) {
        listadoPorHacer.splice(enc, 1);
        guardarDB();
        return getListado();
    } else {
        return false;
    }
}

module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}