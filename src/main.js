import App from "./App";
import { createRoot } from "./lib/react/hook/useState";
import { render } from "./lib/react/render";

const appElement = App();
const rootElement = document.getElementById("app");
createRoot(App, rootElement);
render(appElement, rootElement);
