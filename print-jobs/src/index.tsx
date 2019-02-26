import * as React from "react";
import * as ReactDOM from "react-dom";
import { App } from "./components/App";
import { AppModel } from "./components/AppModel";

ReactDOM.render(
    <App appModel={new AppModel()}/>,
    document.getElementById("example")
);