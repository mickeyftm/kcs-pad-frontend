import React from "react";
import ReactDOM from "react-dom";
import Favicon from "react-favicon";
import favicon from "./assets/favicon.png";
import App from "./app/App";
import "./index.css";
import "././assets/css/override-antd.css";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    <Favicon url={favicon} />
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
