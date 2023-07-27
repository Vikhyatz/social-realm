let socket = io();

let container = document.getElementById('Container')
let messages = document.getElementById('messages');
let form = document.getElementById('form');
let input = document.getElementById('input');
let notification = document.getElementById('notification-audio')


socket.on('chat-notification', function () {
	notification.play()
});


socket.on('chat message', function (name, msg) {
	let item = document.createElement('li');
	item.classList.add('message')
	// to get time
	let currentDate = new Date();
	let currentHour = currentDate.getHours();
	if (currentHour < 10) { currentHour = "0" + currentHour }
	let currentMinute = currentDate.getMinutes();
	if (currentMinute < 10) { currentMinute = "0" + currentMinute }


	item.innerText = `${name}(${currentHour}:${currentMinute}): ${msg}`;
	messages.appendChild(item);
	socket.emit('chat-notification');
});




socket.on('user-connected', function (name) {
	let item = document.createElement('li');
	item.classList.add('message')
	item.classList.add('joined')
	item.innerText = name;
	messages.appendChild(item);
});

function userConnection() {
	let person = prompt("Please enter your name", "Your Name");

	// let container = document.getElementById('Container')

	if (person != null) {
		socket.emit('user-connected', person);
		Notification.requestPermission()
	}
	else {
		container.style.display = 'none'
		form.style.display = 'none'
	}

	var input = document.getElementById('input');

	form.addEventListener('submit', function (e) {
		e.preventDefault();
		if (input.value) {
			socket.emit('chat message', person, input.value);
			input.value = '';
		}
		container.scrollTop = container.scrollHeight;
	});
}

function reloadConformation() {
	return "";
}