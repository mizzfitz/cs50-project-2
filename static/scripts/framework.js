alert('loaded');
function newElement(container=document.querySelector('body'), type='p') {
  const element = document.createElement(type);
  const result = container.appendChild(element);
  return result;
}

function newText(container, text='', style, type='p') {
  // a function to create a new text object, typically a <p> element but with options to define it as a <span> or whatever.  Does not escape text

  const attach = newElement(container, type);
  attach.innerHTML = text;
  if (style !== undefined) {
    attach.className = style;
  }
  let result = {
    connector: attach,
    text: attach.innerHTML,
    style: attach.className
  }
  return result;
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
}
