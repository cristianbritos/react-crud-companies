import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Switch } from "react-router-dom"
import reportWebVitals from "./reportWebVitals"

import CompanyForm from './components/company/CompanyForm'
import CompanyList from "./components/company/CompanyList";
import NavBar from "./components/NavBar/NavBar";

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css"

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <NavBar />
    <div className="container my-4">
      <Switch>
        <Route exact path="/" component={CompanyList} />
        <Route path="/CompanyForm" component={CompanyForm} />
        <Route path="/updateCompany/:id" component={CompanyForm} />
      </Switch>
    </div>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
