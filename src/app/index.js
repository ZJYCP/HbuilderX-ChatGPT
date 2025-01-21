"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const client_1 = require("react-dom/client");
const home_1 = require("./pages/home");
function App() {
    return React.createElement(home_1.default, null);
}
const root = (0, client_1.createRoot)(document.getElementById("root"));
root.render(React.createElement(App, null));
//# sourceMappingURL=index.js.map