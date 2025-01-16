const isFunctionComponent = (type) => {
  return typeof type === "function";
};

export function jsxDEV(type, props) {
  if (isFunctionComponent(type)) {
    return {
      type: type,
      props: type(props).props,
    };
  }
  // props가 null이면 빈 객체로 초기화
  const normalizedProps = props || null;

  return {
    type,
    props: normalizedProps,
  };
}
