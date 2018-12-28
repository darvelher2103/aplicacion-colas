//Comando para establecer la conexión
var socket = io();

var searchParams = new URLSearchParams(window.location.search); //parametros que vienen por la url
var label = $('small');

//console.log(searchParams.has('escritorio')); //"has" para preguntar si existe el escritorio

if (!searchParams.has('escritorio')) { //si no existe el escritorio
    window.location = 'index.html';
    throw new Error('El escritorio es necesario');
}

//si viene informacion del escritorio
var escritorio = searchParams.get('escritorio');

console.log(escritorio);

$('h1').text('Escritorio ' + escritorio);

//evento
$('button').on('click', function() {
    socket.emit('atenderTicket', { escritorio: escritorio }, function(resp) { //funcion, escritorio, respuesta
        //console.log(resp);
        if (resp === 'No hay tickets') {
            label.text(resp);
            return;
        }
        label.text('Ticket' + resp.numero);
    });
});