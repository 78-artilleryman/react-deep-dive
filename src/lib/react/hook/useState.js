import { normalizeVNode } from "../render";

let state = []; // 여러 상태 저장소
let stateIndex = 0; // 현재 훅 호출 인덱스
let rootElement = null;
let rootComponent = null;

export const rerender = () => {
  // 초기 렌더 없이 jsx를 사용할 경우의 에러처리
  if (rootElement || rootComponent)
    throw new Error("Root element or component not initialized");
  rootElement.innerHTML = "";
  stateIndex = 0;
  normalizeVNode(rootComponent(), stateIndex);
};

export function useState(initialValue) {
  const currentIndex = stateIndex;

  // 상태 초기화

  if (state[currentIndex] === undefined) {
    state[currentIndex] = initialValue;
  } else {
    state[currentIndex] = state[currentIndex];
  }

  // 상태 업데이트 함수
  function setState(newValue) {
    state[currentIndex] = newValue;
    //렌더 함수 실행
    rerender();
  }

  stateIndex++; // 다음 훅 호출을 위한 인덱스 증가

  return [state[currentIndex], setState];
}
