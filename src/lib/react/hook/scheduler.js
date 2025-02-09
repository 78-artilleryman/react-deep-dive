import { rerender } from "./useState";

let updateQueue = [];
let isScheduled = false;

export function updateSchedule(update) {
  updateQueue.push(update);

  if (!isScheduled) {
    isScheduled = true;
    queueMicrotask(() => {
      updateQueue.forEach((update) => update());
      updateQueue = [];
      rerender();
      isScheduled = false;
    });
  }
}
