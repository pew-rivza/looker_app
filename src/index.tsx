import React from "react";
import ReactDOM from "react-dom";
import "./assets/styles/style.css";
import "./assets/styles/style.scss";
import {sum} from "./sum";
const ava = require("./assets/avaMAIN.jpg"); // resolve problem later (typesctipt import problem)

ReactDOM.render(
    <div>привет, мир!!3 {
        sum(11, 7)
    }
    <img src={ava} alt={""}/>
    </div>,
    document.getElementById("root")
);