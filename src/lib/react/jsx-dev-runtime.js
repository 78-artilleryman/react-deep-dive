// 컴포넌트가 함수형 컴포넌트인지 확인하는 함수
const isFunctionComponent = (type) => {
  return typeof type === "function";
};

// 자식 요소를 평탄화(flatten)하여 불필요한 배열 구조를 제거하는 함수
const flattenChildren = (children) => {
  if (children == null) return [];
  if (Array.isArray(children)) {
    return children
      .flatMap((child) => flattenChildren(child)) // 중첩 배열 재귀적 처리
      .filter((child) => child != null);
  }
  return [children];
};

// JSX를 처리하기 위해 사용되는 내부 함수 (개발 모드에서 활용)
export function jsxDEV(type, props) {
  const propsWithFlattenedChildren = {
    ...props,
    children: flattenChildren(props.children),
  };

  if (isFunctionComponent(type)) {
    return {
      type: type,
      props: type({ ...propsWithFlattenedChildren }),
    };
  }

  return {
    type,
    props: propsWithFlattenedChildren,
  };
}
