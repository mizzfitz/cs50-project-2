function createHTMLElement() {
  const ERRARGS = {name: "errArgs", message: "The first argument must be a DOM element and the second element must be a valid name of a type of DOM element"};
  const ERRATTR = {name: "errAttr", message: "Attribute is undefined or invalid"};

  let newElement = undefined;
  let attributes = {};

  if (arguments.length < 2) {
    throw ERRARGS;
  }
  if (!document.body.contains(arguments[0])) {
    throw ERRARGS;
  }

  try {
    newElement = document.createElement(arguments[1]);
  } catch(err) {
    throw ERRARGS;
  }

  newElement = arguments[0].appendChild(newElement);

  if (arguments[2]) {
    if (typeof arguments[2] === "string") {
      newElement.innerHTML = arguments[2];
      if (arguments[3]) {
        attributes = arguments[3];
      }
    } else {
      attributes = arguments[2];
    }
  }

  for (attr in attributes) {
    try {
      newElement.setAttribute(attr, attributes[attr]);
    } catch {
      throw ERRATTR;
    }
  }

	return newElement;
}
