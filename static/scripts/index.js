document.addEventListener('DOMContentLoaded', () => {

	// initial websocket connection
	var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port)

	socket.on('connect', () => {
