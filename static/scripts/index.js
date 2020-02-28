function renderMessage(container, values){
	const msg = createHTMLElement(container, 'div', {'class': 'message'});
	createHTMLElement(msg, 'h6', values[0]);
	createHTMLElement(msg, 'h6', values[1]);
	createHTMLElement(msg, 'p', values[2]);
}

function newChannelPopup(container){
	alert('running');
	const form = createHTMLElement(container, 'form', {'id': 'popup'});
	createHTMLElement(form, 'input', {'type':'text', 'id':'channel-name', 'hint':'Channel Name'});
	createHTMLElement(form, 'p');
	createHTMLElement(form, 'input', {'type':'submit', 'value':'Submit'});
	form.onsubmit = function() {
		const value = this.firstChild.value;
		const channelList = getChannelList();
		if (value === '') {
			this.firstChild.nextSibling.innerHTML = 'Channel name must not be empty';
			return false;
		} else if (channelList.includes(value)) {
			this.firstChild.nextSibling.innerHTML = 'Channel name must be unique';
			return false;
		} else if (!/^[a-z]+$/i.test(value)) {
			this.firstChild.nextSibling.innerHTML = 'Must contain only upper and lower case letters';
			return false;
		} else {
			alert('created ' + value);
			return true;
		}
	}
}

function getChannelList(){
				const select = document.getElementById('channel-select');
				let list = [];

				for (i = 0; i < select.options.length; i++) {
								list.push(select.options[i].value);
				}

				return list;
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
			newChannelPopup(document.querySelector('body'));
		} else {
			loadChannel(this.value);
		}
	};
});
