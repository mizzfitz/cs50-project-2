function renderMessage(container, values){
	const msg = createHTMLElement(container, 'div', {'class': 'message'});
	const usrName = createHTMLElement(msg, 'h6', values[0]);
	const timeStamp = createHTMLElement(msg, 'h6', values[1]);
	const messageTxt = createHTMLElement(msg, 'p', values[2]);
}

function loadChannel(channel){

	// first we clear any messages from the current channel
	const container = document.getElementById('messages');
	while (container.firstChild) {
		container.removeChild(container.firstChild);
	}

	// now we make the request and update the messages field

	const request = new XMLHttpRequest();
	request.open('POST', '/%load%channel')

	request.onload = () => {

		const data = JSON.parse(request.responseText);

		if (data.success) {
			for (let i = 0; i < data.messages.length; i++){
				renderMessage(container, data.messages[i]);
			}
		} else {
			createHTMLElement(container, 'h2', 'An error occurred')
		}
	}

	const data = new FormData();
	data.append('channel', channel);

	request.send(data);
}

document.addEventListener('DOMContentLoaded', () => {
	document.getElementById('channel-select').onchange = function() {
		if (this.value === "%new"){
			alert('create a new channel');
		} else {
			loadChannel(this.value);
		}
	};
});
