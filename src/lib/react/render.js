export function normalizeVNode(vnode, container) {
  const dom = renderVNode(vnode);
  container.innerHTML = ""; // 기존 DOM 초기화
  container.appendChild(dom); // 새로운 DOM 추가
}

export function renderVNode(vnode) {
  // vnode가 null이거나 undefined이면 null 반환
  if (!vnode) return null;

  const { type, props } = vnode;

  if (typeof type === "function") {
    // type이 함수일 경우, 해당 함수를 호출하여 결과를 vnode로 생성
    const componentVNode = type(props);
    return renderVNode(componentVNode); // 재귀적으로 처리
  }

  // type이 문자열인 경우, DOM 요소 생성
  if (typeof type === "string") {
    const element = document.createElement(type);

    // props가 있는 경우 속성을 설정
    if (props) {
      for (const [key, value] of Object.entries(props)) {
        if (key === "children") {
          if (Array.isArray(value)) {
            value.forEach((child) => {
              const childElement = renderVNode(child);
              if (childElement) element.appendChild(childElement);
            });
          } else {
            if (typeof value === "string" || typeof value === "number") {
              element.textContent = value;
            } else {
              const childElement = renderVNode(value);
              if (childElement) element.appendChild(childElement);
            }
          }
        } else {
          // 일반 속성 설정
          element[key] = value;
        }
      }
    }
    return element;
  }
  return null;
}
