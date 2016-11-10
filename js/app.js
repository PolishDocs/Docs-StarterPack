import React from "react";
import ReactDOM from "react-dom";

import Layout from "./components/Layout";
import Navigation from "./components/Navigation";

const app = document.getElementById("app");
const nav = document.getElementById("nav");

ReactDOM.render(<Layout />, app);
ReactDOM.render(<Navigation />, nav);
