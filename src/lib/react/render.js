export function customRender(vnode) {
  // vnode가 null이거나 undefined이면 null 반환
  if (!vnode) return null;

  const { type, props } = vnode;

  if (typeof type === "function") {
    // type이 함수일 경우, 해당 함수를 호출하여 결과를 vnode로 생성
    const componentVNode = type(props);
    return customRender(componentVNode); // 재귀적으로 처리
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
              console.log(child);
              const childElement = customRender(child);
              if (childElement) element.appendChild(childElement);
            });
          } else {
            if (typeof value === "string" || typeof value === "number") {
              element.textContent = value;
            } else {
              const childElement = customRender(value);
              if (childElement) element.appendChild(childElement);
            }
          }
        } else {
          // 일반 속성 설정
          element[key] = value;
        }
      }
    }
    console.log(element);
    return element;
  }
  return null;
}
