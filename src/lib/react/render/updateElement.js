import { createElement } from "./createElement";

export function updateElement(parentElement, newNode, oldNode, index = 0) {
  if (!oldNode) {
    parentElement.appendChild(createElement(newNode));
    return;
  }

  if (!newNode) {
    parentElement.removeChild(parentElement.childNodes[index]);
    return;
  }

  if (typeof newNode !== typeof oldNode || newNode.type !== oldNode.type) {
    parentElement.replaceChild(
      createElement(newNode),
      parentElement.childNodes[index]
    );
    return;
  }

  // 텍스트 변경 감지
  if (typeof newNode === "string" || typeof newNode === "number") {
    if (newNode !== oldNode) {
      parentElement.childNodes[index].nodeValue = newNode;
    }
    return;
  }

  // 속성 변경 감지
  updateProps(parentElement.childNodes[index], newNode.props, oldNode.props);

  // 자식 요소 변경 감지
  const newChildren = newNode.props.children || [];
  const oldChildren = oldNode.props.children || [];
  const maxLength = Math.max(newChildren.length, oldChildren.length);

  for (let i = 0; i < maxLength; i++) {
    updateElement(
      parentElement.childNodes[index],
      newChildren[i],
      oldChildren[i],
      i
    );
  }
}

function updateProps(element, newProps = {}, oldProps = {}) {
  for (const key in oldProps) {
    if (!(key in newProps)) {
      element.removeAttribute(key);
    }
  }

  // 새로운 속성을 추가하거나 변경
  for (const key in newProps) {
    if (key === "children") continue; // 자식 요소는 따로 처리하므로 제외
    if (newProps[key] !== oldProps[key]) {
      if (key.startsWith("on")) {
        // 이벤트 핸들러 업데이트
        const eventType = key.slice(2).toLowerCase();

        element.removeEventListener(eventType, oldProps[key]);
        element.addEventListener(eventType, newProps[key]);
      } else {
        // 일반 속성 업데이트
        element.setAttribute(key, newProps[key]);
      }
    }
  }
}
