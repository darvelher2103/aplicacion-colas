const fs = require('fs'); //para guardar el archivo


class Ticket {
    constructor(numero, escritorio) { //numero del ticket y escritorio que lo atendera
        this.numero = numero;
        this.escritorio = escritorio;
    }
}

class TicketControl {

    constructor() { //se dispara al instanciar un objeto de la clase
        this.ultimo = 0;
        this.hoy = new Date().getDate();
        this.tickets = []; //tickest pendientes por revisión
        this.ultimosCuatro = []; // contiene los 4 ultimos tickets

        let data = require('../data/data.json'); //consultamos en la base de datos

        if (data.hoy === this.hoy) {
            this.ultimo = data.ultimo;
            this.tickets = data.tickets; //cargamos los tickets
            this.ultimosCuatro = data.ultimosCuatro;
        } else {
            this.reiniciarConteo();
        }
        //console.log(data);
    }

    getUltimoTicket() {
        return `Ticket ${ this.ultimo }`;
    }

    getUltimosCuatro() {
        return this.ultimosCuatro;
    }

    atenderTicket(escritorio) { //recibe el numero de escritorio que atendera el ticket 
        //si no hay tickets pendiente

        if (this.tickets.length === 0) {
            return 'No hay tickets';
        }

        // tomamos el numero del primer ticket pendiente
        let numeroTicket = this.tickets[0].numero;
        this.tickets.shift(); //eliminamos el primer elmento del arreglo

        let atenderTicket = new Ticket(numeroTicket, escritorio); //crea el ticket y asigna el escritorio que lo atendera
        this.ultimosCuatro.unshift(atenderTicket); //lo agregamos al inicio del arreglo

        if (this.ultimosCuatro.length > 4) { //verificamos que solo existan 4 tickets en el arreglo
            this.ultimosCuatro.splice(-1, 1); // borra el ultimo elemento
        }

        console.log('Ultimos 4');
        console.log(this.ultimosCuatro);

        this.grabarArchivo(); //grabamos el archivo

        return atenderTicket; // regreso el ticket que quiero atender

    }

    siguiente() {
        this.ultimo += 1;
        let ticket = new Ticket(this.ultimo, null);
        this.tickets.push(ticket);

        this.grabarArchivo();
        return `Ticket ${ this.ultimo }`;
    }

    reiniciarConteo() { //reinicializa el conteo
        this.ultimo = 0;
        this.tickets = [];
        this.ultimosCuatro = [];
        console.log('Se ha inicializado el sistema');
        this.grabarArchivo();
    }

    grabarArchivo() {
        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets, //guarda los tickets pendientes
            ultimosCuatro: this.ultimosCuatro
        };

        let jsonDataString = JSON.stringify(jsonData);
        fs.writeFileSync('./server/data/data.json', jsonDataString); //almacrnamos en la bd
    }
}

module.exports = {
    TicketControl
}

//archivo que contiene la logica de las acciones