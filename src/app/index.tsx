import * as React from "react";
import { createRoot } from "react-dom/client";
import Home from "./pages/home";

function App() {

    return <Home/>;
}

const root = createRoot(document.getElementById("root")!);
root.render(<App />);