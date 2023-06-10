
const lblTicket1 = document.getElementById('lblTicket1');
const lblEscritorio1 = document.getElementById('lblEscritorio1');

const lblTicket2 = document.getElementById('lblTicket2');
const lblEscritorio2 = document.getElementById('lblEscritorio2');

const lblTicket3 = document.getElementById('lblTicket3');
const lblEscritorio3 = document.getElementById('lblEscritorio3');

const lblTicket4 = document.getElementById('lblTicket4');
const lblEscritorio4 = document.getElementById('lblEscritorio4');


const socket = io();

socket.on('estado-actual', ( payload ) => {

    // ! no es compatible con chrome;
    // const audio = new Audio('../audio/new-ticket.mp3')
    // audio.play();

    const [ ticket1, ticket2, ticket3, ticket4 ] = payload;

    if( ticket1 ) {
        lblTicket1.innerText = `Ticker Nro: ${ticket1.numero}`;
        lblEscritorio1.innerText = ticket1.escritorio;
    }
    if( ticket2 ) {
        lblTicket2.innerText = `Ticker Nro: ${ticket2.numero}`;
        lblEscritorio2.innerText = ticket2.escritorio;
    }
    if( ticket3 ) {
        lblTicket3.innerText = `Ticker Nro: ${ticket3.numero}`;
        lblEscritorio3.innerText = ticket3.escritorio;
    }
    if( ticket4 ) {
        lblTicket4.innerText = `Ticker Nro: ${ticket4.numero}`;
        lblEscritorio4.innerText = ticket4.escritorio;
    }
});