//Comando para establecer la conexión
var socket = io();

var label = $('#lblNuevoTicket'); //referencia directa del elemento html

socket.on('connect', function() {
    console.log('Conectado al servidor');
});

socket.on('disconnect', function() {
    console.log('Desconectado del servidor');
});

// on 'estadoActual' muestra el estado actual de un ticket
socket.on('estadoActual', function(resp) {
    console.log(resp);
    label.text(resp.actual);
});

$('button').on('click', function() {
    //console.log('click');
    socket.emit('siguienteTicket', null, function(siguienteTicket) {
        label.text(siguienteTicket);
        //console.log(siguienteTicket);
    });
});