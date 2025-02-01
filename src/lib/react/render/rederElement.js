import { createElement } from "./createElement";
import { updateElement } from "./updateElement";

const vNodeMap = new WeakMap();

export function renderElement(vDomElement, container) {
  const currentvDomElement = vNodeMap.get(container);

  if (!currentvDomElement) {
    // 최초 렌더링
    container.innerHTML = "";
    createElement(vDomElement, container);
  } else {
    // 업데이트: 변경된 부분만 업데이트
    updateElement(container, vDomElement, currentvDomElement);
  }
  vNodeMap.set(container, vDomElement);
}
