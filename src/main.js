import App from "./App";
import { customRender } from "./lib/react/render";

const appElement = App();
const dom = customRender(appElement);
document.body.appendChild(dom);
