import { createElement } from "./createElement";
import { updateElement } from "./updateElement";

const vNodeMap = new WeakMap();

export function renderElement(vDomElement, container) {
  const currentvDomElement = vNodeMap.get(container);
  if (!currentvDomElement) {
    container.innerHTML = "";
    createElement(vDomElement, container);
  } else {
    // 업데이트
    updateElement(container, vDomElement, currentvDomElement);
  }

  vNodeMap.set(container, vDomElement);
}
