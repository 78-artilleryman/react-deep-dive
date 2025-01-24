export function render(vnode, container) {
  // vnode가 null이거나 undefined이면 처리 중단
  if (!vnode) return;

  const { type, props } = vnode;

  if (typeof type === "function") {
    // type이 함수일 경우, 해당 함수를 호출하여 결과를 vnode로 생성
    const componentVNode = type(props);
    return render(componentVNode, container); // 재귀적으로 처리
  }

  if (typeof type === "string") {
    // type이 문자열인 경우, DOM 요소 생성
    const element = document.createElement(type);

    // props가 있는 경우 속성을 설정
    if (props) {
      for (const [key, value] of Object.entries(props)) {
        if (key === "children") {
          if (Array.isArray(value)) {
            value.forEach((child) => {
              render(child, element); // 자식 노드를 재귀적으로 처리
            });
          } else {
            if (typeof value === "string" || typeof value === "number") {
              element.textContent = value;
            } else {
              render(value, element); // 단일 자식 노드 처리
            }
          }
        } else if (key.startsWith("on") && typeof value === "function") {
          // 이벤트 핸들러 처리
          const eventType = key.slice(2).toLowerCase(); // "onClick" -> "click"
          element.addEventListener(eventType, value);
        } else {
          // 일반 속성 설정
          element[key] = value;
        }
      }
    }

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
