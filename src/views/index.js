import "./style.css"
import React from "react"
import { Router, hashHistory as history } from "react-router"
import { Layout } from "./Layout"
import { Intro } from "./Intro"
import { Carousel } from "./Carousel"

import serra1 from "../img/serra-1.jpg"
import serra2 from "../img/serra-2.jpg"
import serra3 from "../img/serra-3.jpg"
import serra4 from "../img/serra-4.jpg"
import bourgeois from "../img/bourgeois.jpg"
import ryman from "../img/ryman.jpg"

const childRoutes = [
  {
    component: Intro,
    notes: `
      Last spring, my partner and I took a train upstate to Beacon for the weekend. We visited a museum called Dia:Beacon that specializes in large installations.`,
    frontRow: `
      Hello everyone in the front row! Don't tell anyone but you get some ~bonus content~`
  },
  {
    component: () => <Carousel images={[serra1, serra2, serra3, serra4]} />,
    notes: `
      Its difficult to convey this experience with photographs. Its one thing to look at a Richard Serra sculpture, but its another thing altogether to confront its enormity in person and walk around inside of it.`,
    frontRow: `
      I don't believe in the supernatural but our AirBnB had an intense horror movie vibe to it.`
  },
  {
    component: () => <Carousel images={[bourgeois]} />,
    notes: `
      Imagine turning a corner in their shadowy basement and encountering this sculpture by Louise Bourgeois.`,
    frontRow: `
      We arrived at 1:30 PM and the owner told us that she had just put her child to bed, which seemed a little odd.`
  },
  {
    component: () => <Carousel images={[ryman]} />,
    notes: `
      Not everything was this "in your face". Some of it was subtle, almost to the point of parody.`,
    frontRow: `
      Our room was decorated with taxidermy, saw blades, and mannequin limbs, which the owner said she bought from Mia Farrow.`
  }
].map((route, i) => ({...route, path: `/${i + 1}`}))

const routes = {
    path: "/", indexRoute: { onEnter: (_, to) => to("/1") },
    component: Layout,
    goBack, goForward, childRoutes
}

export const main = (
  <Router history={history} routes={routes} />
)

function goBack (location) {
  const index = Number(location.pathname.split("/")[1])
  history.push(`/${Math.max(1, index - 1)}`)
}

function goForward (location) {
  const index = Number(location.pathname.split("/")[1])
  history.push(`/${Math.min(childRoutes.length, index + 1)}`)
}
