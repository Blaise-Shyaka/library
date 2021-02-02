export function getDomElement(identifier) {
  return document.querySelector(identifier);
}

export function setInnerHTML(domElement, text) {
  domElement.innerHTML = text;
}

export function setValue(domElement, val) {
  domElement.value = val;
}

export function setCheckedValue(domElement, val) {
  domElement.checked = val;
}

export function getAllElementsOfType(type) {
  return document.querySelectorAll(type);
}

export function addEvent(buttons, eventType, handler) {
  buttons.forEach(btn => btn.addEventListener(eventType, handler));
}
