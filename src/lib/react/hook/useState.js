import { createElement } from "../render/createElement";
import { renderElement } from "../render/rederElement";

let state = []; // 상태 저장소
let stateIndex = 0; // 현재 훅 호출 인덱스
let rootElement = null;
let rootComponent = null;

let updateQueue = new Set(); // 중복 방지
let isUpdating = false;

export const createRoot = (component, container) => {
  rootElement = container;
  rootComponent = component;
};

export const rerender = () => {
  if (!rootElement || !rootComponent)
    throw new Error("Root element or component not initialized");

  stateIndex = 0;
  renderElement(rootComponent, rootElement);
};

export function useState(initialValue) {
  const currentIndex = stateIndex;

  if (state[currentIndex] === undefined) {
    state[currentIndex] = initialValue;
  }

  const setState = (newValue) => {
    const prevState = state[currentIndex];

    // 🔥 콜백 함수가 들어온 경우, 실행해서 최신 상태 값 얻기
    const newStateValue =
      typeof newValue === "function" ? newValue(prevState) : newValue;

    if (JSON.stringify(prevState) === JSON.stringify(newStateValue)) {
      return;
    }

    updateQueue.add(() => {
      state[currentIndex] = newStateValue;
    });

    if (!isUpdating) {
      isUpdating = true;
      queueMicrotask(() => {
        updateQueue.forEach((update) => update());
        updateQueue.clear();
        rerender();
        isUpdating = false;
      });
    }
  };

  stateIndex++;
  return [state[currentIndex], setState];
}
