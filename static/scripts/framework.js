class Text {
  constructor(text, style, type='p') {
    // a function to create a new text object, typically a <p> element but with options to define it as a <span> or whatever.  Does not escape text.
    
    self.attach = document.createElement(type);
    self.attach.innerHTML = text;
    if (style !== undefined) {
      self.attach.className = style;
    }

    self.text = p.innerHTML;
    self.style = p.className;
  }
}

class Input {
  constructor(hint, style) {
    // a function to create a text input field

    self.attach = document.createElement('input');
    self.attach.setAttribute('type', 'text');

    self.hint = (hint) => {self.attach.setAttribute('hint', hint);}
    self.style = self.attach.className;

    if (hint !== undefined) {
      self.hint(hint);
      if (style !== undefined) {
        self.style = style;
      }
    }
  }
}

class Message {
  constructor(message, usr, time) {
    // a function to create a message element

    // initiate the dom hierarchy
    self.attach = document.createElement('div');
    const usr_name = new Text(usr, 'usr-name');
    const time_stamp = new Text(time, 'time-stamp');
    const msg = new Text(message, 'message');
    self.attach.append(usr_name, time_stamp, msg);

    // initiate attributes
    self.usr = usr_name.text;
    self.time = time_stamp.text;
    self.msg = msg.text;
  }
}

class Room_link {
  constructor(value) {
    self.attach = document.createElement('option');
    self.attach.setAttribute('value', value);
    self.attach.innerHTML = value;
  }
}
