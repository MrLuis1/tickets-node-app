const { TicketControl } = require('../models/ticket-controls');

const tickerCtrl = new TicketControl();

const socketController = (socket) => {

    socket.emit( 'ultimo-ticket', tickerCtrl.ultimo );
    socket.emit( 'estado-actual', tickerCtrl.lastFour );
    socket.emit( 'tickets-pendientes', tickerCtrl.allTickets.length );

    socket.on('siguiente-ticket', ( payload, callback ) => {
        const siguiente = tickerCtrl.siguiente();
        socket.broadcast.emit( 'tickets-pendientes', tickerCtrl.allTickets.length );
        callback( siguiente );
    })

    socket.on('atender-ticket', ({ escritorio }, callback ) => {
        if( !escritorio ) return callback({ ok:false, msg: 'El escritorio es obligatorio' });

        socket.broadcast.emit( 'estado-actual', tickerCtrl.lastFour );  
        socket.emit( 'tickets-pendientes', tickerCtrl.allTickets.length );
        socket.broadcast.emit( 'tickets-pendientes', tickerCtrl.allTickets.length );


        const ticket = tickerCtrl.atenderTicket( escritorio );
        if( !ticket ) return callback({ ok:false, msg: 'Ya no hay tickets pendientes' });
        callback({
            ok: true,
            msg: ticket
        })
    });

}



module.exports = {
    socketController
}

