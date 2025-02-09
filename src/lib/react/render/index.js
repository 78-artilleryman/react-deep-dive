import { createRoot } from "../hook/useState";
import { renderElement } from "./rederElement";

export function render(vDomElement) {
  const rootContainer = document.getElementById("app");

  createRoot(vDomElement, rootContainer);
  renderElement(vDomElement(), rootContainer);
}
