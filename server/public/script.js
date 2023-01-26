const socket = io('http://localhost:3000');
const button = document.getElementById('button-notif');
let notify = false;

button.addEventListener('click', () => {
    notify = true
    button.classList.remove('opacity-50')
})

socket.on('data', data => {

    const h2 = document.querySelector('h2')
    if (data.title != h2.innerText && notify) {
        const audio = new Audio('./notification-sound.wav');

        audio.play();
        audio.playbackRate = 1;



    }

    h2.innerText = data.title;
    document.querySelector('span').innerText = data.time.slice(0, 10) + ' ' + data.time.slice(11, 19);
    document.querySelector('a').href = data.link;


});
setInterval(() => {
    socket.emit('getData')
}, 120000);
