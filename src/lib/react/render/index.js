export function render(vDomElement, container) {
  // vnode가 null이거나 undefined이면 처리 중단
  if (!vDomElement) return;

  const { type, props } = vDomElement;

  if (typeof type === "function") {
    // type이 함수일 경우, 해당 함수를 호출하여 결과를 vnode로 생성
    const componentVNode = type(props);
    return render(componentVNode, container); // 재귀적으로 처리
  }

  if (typeof type === "string") {
    // type이 문자열인 경우, DOM 요소 생성
    const element = document.createElement(type);

    // props가 있는 경우 속성을 설정
    Object.entries(props).forEach(([key, value]) => {
      if (key === "children") {
        const children = Array.isArray(value) ? value : [value]; // 배열이 아니면 배열로 변환
        children.forEach((child) => {
          if (typeof child === "string" || typeof child === "number") {
            element.appendChild(document.createTextNode(child)); // 텍스트 노드 추가
          } else if (child) {
            render(child, element); // null이나 undefined가 아닌 경우 렌더링
          }
        });
      }

      if (key.startsWith("on") && typeof value === "function") {
        // 이벤트 핸들러 처리
        const eventType = key.slice(2).toLowerCase(); // "onClick" -> "click"
        element.addEventListener(eventType, value);
      }
    });

    // container가 존재하면 DOM 추가
    if (container) container.appendChild(element);

    return element;
  }
}

export const rerender = () => {
  // 초기 렌더 없이 jsx를 사용할 경우의 에러처리
  if (!rootElement || !rootComponent)
    throw new Error("Root element or component not initialized");

  stateIndex = 0;
  rootElement.innerHTML = ""; // 기존 DOM 초기화
  render(rootComponent(), rootElement);
};
