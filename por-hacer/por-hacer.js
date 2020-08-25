const fs = require('fs');

let listadPorHacer = [];

const crear = (descripcion) => {
    cargarDB();

    let porHacer = {
        descripcion,
        completado: false
    };

    listadPorHacer.push(porHacer);
    guardarDB();
    return porHacer;
}

const guardarDB = () => {

    let data = JSON.stringify(listadPorHacer);

    fs.writeFile('./db/data.json', data, (err) => {
        if (err) throw new Error('No se pudo grabar ', err);
        //console.log('The file has been saved!');
    });

}
const cargarDB = () => {
    //esto automaticamente pasa los registro del json al listado
    //cuando el json esta vacio da error
    try {
        listadPorHacer = require('../db/data.json');
    } catch (error) {
        listadPorHacer = [];
    }
}
const getlistado = () => {
    cargarDB();
    return listadPorHacer;
}

const actualizar = (descripcion, completado = true) => {

    cargarDB();
    let index = listadPorHacer.findIndex(tarea => tarea.descripcion === descripcion);
    // -1 no lo encontro
    // 0 cual es la posicio para arriba
    if (index >= 0) {
        listadPorHacer[index].completado = completado;
        guardarDB();
        return true;
    } else {
        return false;
    }
}

const borrar = (descripcion) => {
    cargarDB();
    /*let index = listadPorHacer.findIndex(tarea => tarea.descripcion === descripcion);
    if (index >= 0) {
        delete listadPorHacer[index];
        guardarDB();
        return true;
    } else {
        return false;
    }
    */
    let nuevoListado = listadPorHacer.filter(tarea => tarea.descripcion !== descripcion);

    if (listadPorHacer.length === nuevoListado.length) {
        return false;
    } else {
        listadPorHacer = nuevoListado;
        guardarDB();
        return true;
    }
}
module.exports = {
    crear,
    getlistado,
    actualizar,
    borrar
}