export default function createElement(type, props, ...children) {
  // children 배열을 평탄화하고 정리
  const flattenedChildren = children
    .flat(Infinity)
    .filter((child) => child != null && child !== false && child !== true);

  // props가 null이면 빈 객체로 초기화
  const normalizedProps = props || null;

  return {
    type,
    props: normalizedProps,
    children: flattenedChildren,
  };
}