const argv = require('./config/yargs').argv;
const porHacer = require('./porHacer/porHacer');
const colors = require('colors');

let comando = argv._[0];

switch (comando) {
    case 'crear':
        let tarea = porHacer.crear(argv.descripcion);
        console.log(tarea);
        break;
    case 'listar':
        let listado = porHacer.getListado();
        for (let tarea of listado) {
            console.log('======== Por Hacer =========='.green);
            console.log(tarea.descripcion);
            console.log('Estado: ', tarea.completado);
            console.log('============================='.green);

        }
        break;
    case 'borrar':
        let borrado = porHacer.borrar(argv.descripcion);
        console.log(borrado);
        break;
    case 'actualizar':
        let act = porHacer.actualizar(argv.descripcion, argv.completar);
        console.log(act);
        break;
    default:
        console.log('comando no es reconocido');
}