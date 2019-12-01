function new_channel(){
	// a function to manage displaying a sub window to receive user input to create a new channel
	const cont = document.createElement('div');
	cont.class = 'popup';
	cont.append(p);
	const form = document.createElement('form');
	const txt = document.createElement('input');
	txt.type = 'text';
	txt.placeholder = 'Enter channel name';
	txt.id = 'channel-name-field';
	const submit = document.createElement('input');
	submit.type = 'submit';
	submit.value = 'submit';
	form.append(txt);
	form.append(submit);
	cont.append(submit);
	document.querySelector('body').append(cont);

	// add functionality to our form
	form.onsubmit = () => {

}
