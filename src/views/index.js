import "./style.css"
import React from "react"
import { Router, Route, IndexRedirect, hashHistory } from "react-router"
import { Layout } from "./Layout"
import intro from "./Intro"
import serra from "./Serra"

export const main = (
  <Router history={hashHistory}>
    <Route path="/" component={Layout}>
      <IndexRedirect to="/intro" />
      <Route path="/intro" {...intro}/>
      <Route path="/serra" {...serra}/>
    </Route>
  </Router>
)
