
const lblPendientes = document.getElementById('lblPendientes');
const btn = document.querySelector('button');
const small = document.querySelector('small');
const alert = document.querySelector('.alert');

const searchParams = new URLSearchParams( window.location.search );

if( !searchParams.has('escritorio') ) {
  window.location = 'index.html';
  throw new Error('El escritorio es obligatorio');
}

const escritorio = searchParams.get('escritorio');

alert.style.display = 'none';

const socket = io();

socket.on('connect', () => {
    btn.disabled = false
});

socket.on('disconnect', () => {
    // console.log('Desconectado del servidor');
    btn.disabled = true;
});

socket.on( 'ultimo-ticket', ( ticket ) => {
    // lblNuevoTicket.innerText = `Ticket nro: ${ticket}`;
});

socket.on( 'tickets-pendientes', (res) => {
  console.log(res)
  lblPendientes.innerText = res
})


socket.on('enviar-mensaje', (payload) => {
    console.log( payload )
})


btn.addEventListener( 'click', () => {
  socket.emit('atender-ticket', { escritorio }, ( res ) => {
    console.log(res)
    if( !res.ok ) {
      small.innerText = `Nadie`;
      return SpeechRecognitionAlternative.style.display = '';
    }
    small.innerText = `Ticket numero: ${res.msg.numero}`
  });
});