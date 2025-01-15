export default function createElement(type, props, ...children) {
  if (typeof type === "function") {
    return type({ ...props, children });
  }

  // props가 null이면 빈 객체로 초기화
  const normalizedProps = props || null;

  return {
    type,
    props: normalizedProps,
    children: children,
  };
}

export function createTextElement(text) {
  return {
    type: "TEXT_ELEMENT",
    props: {
      nodeValue: text,
      children: [],
    },
  };
}
