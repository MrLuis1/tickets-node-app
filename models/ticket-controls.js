const path = require('path');
const fs = require('fs');

class Ticket {
    constructor( numero, escritorio ) {
        this.numero = numero;
        this.escritorio = escritorio;
    }
}

class TicketControl {

    constructor() {

        this.ultimo = 0;
        this.day = new Date().getDate();
        this.allTickets = [];
        this.lastFour = [];

        this.init();

    }

    get toJson() {
        return {
            ultimo: this.ultimo,
            day: this.day,
            allTickets: this.allTickets,
            lastFour: this.lastFour
        }
    }

    init() {
        const { day, allTickets, lastFour, ultimo } = require('../db/data.json');

        if(day === this.day) {
            this.allTickets = allTickets;
            this.ultimo = ultimo;
            this.lastFour = lastFour;
        } else {
            // es otro dia //
            this.guardarDB();
        }
    }

    guardarDB() {
        const dbPath = path.join( __dirname, '../db/data.json' );
        fs.writeFileSync( dbPath, JSON.stringify(this.toJson) )
    }

    siguiente() {
        this.ultimo += 1;
        const ticket = new Ticket( this.ultimo, null );

        this.allTickets.push( ticket );
        this.guardarDB();
        return 'Ticket ' + ticket.numero;
    }

    atenderTicket( escritorio ) {
        if( this.allTickets.length === 0 ) return null;

        const ticket = this.allTickets.shift();
        ticket.escritorio = escritorio;
        this.lastFour.unshift( ticket );

        if( this.lastFour.length > 4 ) this.lastFour.pop();

        this.guardarDB();
        return ticket;
    }
}

module.exports = {
    TicketControl
}