const { io } = require('../server');

const { TicketControl } = require('../classes/ticket-control');

const ticketControl = new TicketControl(); //muestra el constructor de la clase

io.on('connection', (client) => {

    client.on('siguienteTicket', (data, callback) => { //escucha un evento
        let siguiente = ticketControl.siguiente();
        console.log(siguiente);
        callback(siguiente);
    });

    //emitir un evento 'estadoActual'
    client.emit('estadoActual', {
        actual: ticketControl.getUltimoTicket(), //regresa el ultimo ticket
        ultimosCuatro: ticketControl.getUltimosCuatro() //regresa los ultimos 4 tickets
    });

    client.on('atenderTicket', (data, callback) => {
        if (!data.escritorio) {
            return callback({
                err: true,
                mensaje: 'El escritorio es necesario'
            })
        }

        let atenderTicket = ticketControl.atenderTicket(data.escritorio);

        callback(atenderTicket); // escritorio que atiende el ticket

        //Actualizar o notificar cambios en los ULTIMOS 4

        // emitir 'ultimosCuatro'
        client.broadcast.emit('ultimosCuatro', {
            ultimosCuatro: ticketControl.getUltimosCuatro()
        });

    });

});

//servidor