import React from "react";
import ReactDOM from "react-dom";
import "./assets/styles/style.css";
import "./assets/styles/style.scss";
import {sum} from "./sum";
import {mul} from "./mul";

const a = 11;
const b = 1;

ReactDOM.render(
    <div>привет, мир!!3 {
        sum(a, b)
    }
    {
        mul(a, b)
    }
    <div className={"heh"}>text ой тестовый текст</div>
    </div>,
    document.getElementById("root")
);