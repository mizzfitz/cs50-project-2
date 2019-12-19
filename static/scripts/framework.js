alert('loaded');
var ui = {
};

class Element{
  constructor(container=document.querySelector('body'), type='p', style) {
    const element = document.createElement(type);
    this.connector = container.appendChild(element);
    if (style !== undefined) {
      this.setStyle(style)
    }
  }

  setStyle(style) {
    this.connector.className = style;
  }
}

class Text extends Element{
  constructor(container, text, style, type='p') {
    super(container, type, style);
    if (text !== undefined) {
      this.setText(text);
    }
  }

  setText(text) {
    this.connector.innerHTML = text;
  }
}

function newText(container, text='', style, type='p') {
  // a function to create a new text object, typically a <p> element but with options to define it as a <span> or whatever.  Does not escape text

  const attach = newElement(container, type);
  attach.innerHTML = text;
  if (style !== undefined) {
    attach.className = style;
  }
  return {connector: attach};
}

function newInput(container, type='text', style, hint) {
  // a function to create a text input field

  const attach = newElement(container, 'input');
  attach.setAttribute('type', type);

  const result = {
    connector: attach,
    hint: (val) => {attach.setAttribute('hint', hint);},
    style: attach.className,
    value: attach.value
  }

  if (hint !== undefined) {
    result.hint(hint);
  }
  if (style !== undefined) {
    result.style = style;
  }

  return result;
}

function createRoom(container, val) {
  const attach = newElement(container, 'option');
  
  const result = {
    connector: attach,
    value: attach.value,
    style: attach.className,
    text: attach.innerHTML
  }

  result.value = '/' + val;
  result.text = val;
}
