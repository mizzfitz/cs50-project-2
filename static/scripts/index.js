function renderMessage(container, values){
	const msg = createHTMLElement(container, 'div', {'class': 'message'});
	createHTMLElement(msg, 'h6', values[0]);
	createHTMLElement(msg, 'h6', values[1]);
	createHTMLElement(msg, 'p', values[2]);
}

function newChannelPopup(container){
	const form = createHTMLElement(container, 'form', {'id': 'popup'});

	createHTMLElement(form, 'input', {'type':'text', 'id':'channel-name', 'hint':'Channel Name'});
	createHTMLElement(form, 'p');
	createHTMLElement(form, 'input', {'type':'submit', 'value':'Submit'});

	const cancelBtn = createHTMLElement(form, 'button', 'X', {'src':'#'});

	toggleDisabled(document.getElementById('header'), true);
	toggleDisabled(document.getElementById('new-message'), true);
	toggleDisabled(document.getElementById('header').querySelector('div'), true);

	form.onsubmit = function() {
		const value = this.querySelector('input').value;
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
			toggleDisabled(document.getElementById('header'), false);
			toggleDisabled(document.getElementById('new-message'), false);
			toggleDisabled(document.getElementById('header').querySelector('div'), false);
			return true;
		}
	}

	cancelBtn.onclick = function() {
		toggleDisabled(document.getElementById('header'), false);
		toggleDisabled(document.getElementById('new-message'), false);
		toggleDisabled(document.getElementById('header').querySelector('div'), false);
		this.parentNode.remove();
	}
}

function toggleDisabled(container, disabled) {
	for (i = 0; i < container.children.length; i++) {
		container.children[i].disabled = disabled;
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

	document.getElementById('usr-name').onclick = function () {
		const form = document.getElementById('usr-name-form');
		form.style.display = 'inline';
		form.querySelector('input').value = this.innerHTML;
		this.style.display = 'none';
	}

	document.getElementById('usr-name-form').onsubmit = function () {
		const newUsrName = this.querySelector('input').value
		const usrNameDisplay = document.getElementById('usr-name');

		if (newUsrName === '') {
			alert('User tag cannot be empty');
		} else if (!/^[a-z]+$/i.test(newUsrName)) {
			alert('User tag must contain only upper and lower case letters');
		} else {
			usrNameDisplay.innerHTML = newUsrName;
			alert('new user name is ' + newUsrName);
		}

		this.style.display = 'none';
		usrNameDisplay.style.display = 'inline';
		return false;
	}
});

