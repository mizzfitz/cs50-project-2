function load_rooms(attach) {
  // a function to initially load list of chatrooms
  rooms = [];

  // initiate request
  const request = new XMLHttpRequest();
  request.open('GET', '/rooms%list');

  request.onload = () => {
    const data = JSON.parse(request.responseText);

    // add rooms to the list
    data.forEach(room => {
      const link = new Room_link(room);
      attach.append(link);
    });

    const newLink = new Room_link('New');
    attach.append(newLink);

    rooms = data;

  }

  return rooms;
}

function load_msgs(attach, namespc, room=false) {
  // a function to load messages
  //
  // clear attach point

  if room {
    // init request
    const request = new XMLHttpRequest();
    request.open('GET', namespc);

    request.onload = () => {
      const data = JSON.parse(request.responseText);

      data.forEach(vals => {
        const msg = new Message(vals[0], vals[1], vals[2]);
        attach.append(msg.attach);
      });
    }
  } else {
    const text = new Text('There doesn\'t appear to be a chat room here. You can find one from the dropdown selection.');
    attach.append(text);
  }
}
