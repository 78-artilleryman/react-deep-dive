import App from "./App";
import { normalizeVNode } from "./lib/react/render";

const appElement = App();
const rootElement = document.getElementById("app");
normalizeVNode(appElement, rootElement);
