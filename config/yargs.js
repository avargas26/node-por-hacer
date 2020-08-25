const { demand } = require('yargs');
const descripcion = {
    demand: true,
    alias: 'd',
    desc: 'Descripcion de la tarea por hacer'
};

const completado = {
    alias: 'c',
    default: true,
    desc: 'marca como completado o pendiente la tarea'
}
const argv = require('yargs')
    .command('crear', 'Crea un elemento por hacer', {
        descripcion
    })
    .command('actualizar', 'Actualiza el estado completado de una tarea ', {
        descripcion,
        completado
    })
    .command('borrar', 'Borrar registro en json', {
        descripcion
    })
    .help()
    .argv;

module.exports = {
    argv
}