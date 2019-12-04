function load_rooms(attach) {
  // a function to initially load list of chatrooms

  // initiate request
  const request = new XMLHttpRequest();
  request.open('GET', '/rooms%list');

  request.onload(() => {
    const data = JSON.parse(request.responseText);
