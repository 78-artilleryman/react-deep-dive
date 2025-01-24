import { rerender } from "../render";

let state = []; // 여러 상태 저장소
let stateIndex = 0; // 현재 훅 호출 인덱스
let rootElement = null;
let rootComponent = null;

export const createRoot = (component, container) => {
  rootElement = container;
  rootComponent = component;
};

function debounceFrame(callback) {
  let nextFrameCallback = -1;
  return () => {
    cancelAnimationFrame(nextFrameCallback);
    nextFrameCallback = requestAnimationFrame(callback);
  };
}

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
    const newStateValue =
      typeof newValue === "function"
        ? newValue(state[currentIndex]) // 콜백 함수 호출
        : newValue;

    //값이 똑같은 경우
    if (state[currentIndex] === newStateValue) return;

    state[currentIndex] = newStateValue;
    //렌더 함수 실행
    debounceFrame(rerender)();
  }

  stateIndex++; // 다음 훅 호출을 위한 인덱스 증가

  return [state[currentIndex], setState];
}
