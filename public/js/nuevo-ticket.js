const lblNuevoTicket = document.getElementById('lblNuevoTicket');
const btn = document.querySelector('button');


const socket = io();

socket.on('connect', () => {
    btn.disabled = false
});

socket.on('disconnect', () => {
    // console.log('Desconectado del servidor');
    btn.disabled = true;
});

socket.on( 'ultimo-ticket', ( ticket ) => {
    lblNuevoTicket.innerText = `Ticket nro: ${ticket}`;
});


socket.on('enviar-mensaje', (payload) => {
    console.log( payload )
})


btn.addEventListener( 'click', () => {
    socket.emit( 'siguiente-ticket', null, ( ticket ) => {
        lblNuevoTicket.innerText = ticket;
    });
});