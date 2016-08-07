import "./style.css"
import React from "react"
import { Router, Route, IndexRedirect, hashHistory } from "react-router"
import { Layout } from "./Layout"
import intro from "./Intro"
import serra from "./Serra"
import spider from "./Spider"

const history = hashHistory

const count = 10

const goBack = (location) => {
  const index = Number(location.pathname.split("/")[1])
  history.push(`/${Math.max(1, index - 1)}`)
}

const goForward = (location) => {
  console.log("forward")
  const index = Number(location.pathname.split("/")[1])
  history.push(`/${Math.min(count, index + 1)}`)
}

export const main = (
  <Router history={history}>
    <Route path="/" component={Layout} goBack={goBack} goForward={goForward}>
      <IndexRedirect to="/1" />
      <Route path="/1" {...intro}/>
      <Route path="/2" {...serra}/>
      <Route path="/3" {...spider}/>
    </Route>
  </Router>
)
