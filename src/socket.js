// configration (touch this)
var server = 'wss://server.mattkc.com:2002'
var chat = new WebSocket(`${server}`)
const token = '' // DO NOT SHARE THIS!
var loginMessage = 'Logged in using UCKCC!'

// code (touch this if you know what you are doing)
const input = document.querySelector('#msgbox');
const srvbox = document.querySelector('#srvbox');
const jmsgb = document.querySelector('#jmsgb');
const body = document.getElementsByTagName('body');
srvbox.value = server;

function readySend() {
    chat.send(JSON.stringify({ type: 'status', data: {}, auth: 'google', token: token }))
    chat.send(JSON.stringify({ type: 'getuserconf', data: {}, auth: 'google', token: token }))
}

function sendMessage(msg) {
    chat.send(JSON.stringify({ type: 'message', data: { text: msg }, reply: 0, auth: 'google', token: token }))
}

function setServer(addr) {
    var server = 'wss://' + addr
    var chat = new WebSocket(`${server}`);
}

function renderMessage(author, message) {
    render = document.createElement('p');
    render.innerText = author + ': ' + message;
    render.classList.add = 'message';
    document.body.appendChild(render)
}

function randBgColor() {
    var x = Math.floor(Math.random() * 256);
    var y = Math.floor(Math.random() * 256);
    var z = Math.floor(Math.random() * 256);
    return "rgb(" + x + "," + y + "," + z + ")";
}

chat.onopen = function () {
    readySend();
    console.log(`SUCCESS: Connected to server ${server}`)
    if (localStorage.getItem('sendJoinMessage') === "true") {
        //sendMessage(`${loginMessage}`)
    }
}

chat.onmessage = function (e) {
    var packet = JSON.parse(e.data);
    console.log(packet)
    console.log(`DEBUG: [message] Data received from socket: ${e.data}`)
    if (packet.type == 'chat') {
        renderMessage(packet.data.author, packet.data.message)
    }
}

setInterval(readySend, 10000)

input.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        sendMessage(`${input.value}`)
        input.value = '';
    }
});

srvbox.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        setServer(`${srvbox.value}`)
    }
});

jmsgb.addEventListener('change', function () {
    if (this.checked) {
        localStorage.setItem('sendJoinMessage', true)
    } else {
        localStorage.setItem('sendJoinMessage', false)
    }
});

if (localStorage.getItem('sendJoinMessage') === undefined) {
    localStorage.setItem('sendJoinMessage', false)
}

if (localStorage.getItem('sendJoinMessage' === 'true')) {
    jmsgb.checked = 'true';
} else {
    jmsgb.checked == 'false';
}

document.body.addEventListener('click', function() {
    document.body.style.background = randBgColor();
})
