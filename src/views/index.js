import "./style.css"
import React from "react"
import { Router, hashHistory as history } from "react-router"
import { Layout } from "./Layout"
import { Static, Responsive, Intro } from "./Intro"
import { Carousel } from "./Carousel"
import { CodeBlock, CodeHighlight } from "./CodeBlock"
import { CanvasPoints3D } from "./CanvasPoints3D"
import * as img from "../img"

const childRoutes = [
  {
    component: Intro,
    notes: `
      Last spring, my partner and I took a train upstate to Beacon for the weekend. We visited a museum called Dia:Beacon that specializes in large installations.`,
    frontRow: `
      Hello everyone in the front row! Don't tell anyone but you get some ~bonus content~`
  },
  {
    component: () =>
      <Carousel images={img.serra} />,
    notes: `
      Its difficult to convey this experience with photographs. Its one thing to look at a Richard Serra sculpture, but its another thing altogether to confront its enormity in person and walk around inside of it.`,
    frontRow: `
      I don't believe in the supernatural but our AirBnB had an intense horror movie vibe to it.`
  },
  {
    component: () => <Carousel images={[img.bourgeois]} />,
    notes: `
      Imagine turning a corner in their shadowy basement and encountering this sculpture by Louise Bourgeois.`,
    frontRow: `
      We arrived at 1:30 PM and the owner told us that she had just put her child to bed, which seemed a little odd.`
  },
  {
    component: () => <Carousel images={[img.ryman]} />,
    notes: `
      Not everything was this "in your face". Some of it was subtle and textural, almost to the point of parody.`,
    frontRow: `
      Our room was decorated with taxidermy, saw blades, and mannequin limbs, which the owner said she bought from Mia Farrow.`
  },
  {
    component: () =>
      <Carousel images={img.lewittDia} />,
    notes: `
      But it wasn't all giant walls of rust and white-on-white collages. There was a lot of art that connected on a more intellectual than visceral level.`,
    frontRow: `
      There was also a stack of unlabelled casette tapes in the room, which I can only _assume_ was recordings of demonic summoning incantations.`
  },
  {
    notes: `
      A lot of these were made by an artist named Sol LeWitt. Now, Sol LeWitt was an American artist who worked in the mid-to-late 20th century and specialized in these minimalist wall drawings and structures.`,
    frontRow: `We heard low rumblings at night, but never saw her child.`
  },
  {
    component: () =>
      <Carousel images={[img.lwCertificate]}
        style={{backgroundSize: "contain"}}/>,
    notes: `
      LeWitt didn't think of himself as a sculptor or an illustrator; in many cases he didn't touch the materials at all. Instead, he wrote the instructions to generate them.`,
    frontRow: `
      Beacon, like a lot of touristy small towns, had a surprising number of incense and crystal shops.`
  },
  {
    component: () => <Carousel
      images={[img.lwInstructions118]}
      style={{backgroundSize: "contain"}}/>,
    notes: `
      I'm going to focus on this particular piece, Wall Drawing #118, to demonstrate some of the ideas that are at work.`,
    frontRow: `
      It seemed that, if demons and ghosts were part of mundane, everyday life, the town would change very little.`
  },
  {
    component: () => <CodeBlock>
      <p>On a wall surface,
        any continuous stretch of wall,
        using a hard pencil,
        place fifty points at random.</p>
      <p>The points should be evenly distributed over the area of the wall.</p>
      <p>All of the points should be connected by straight lines.</p>
    </CodeBlock>,
    notes: `
      The instructions, for those of you in the back, are: "On a wall surface, any continuous stretch of wall, using a hard pencil, place fifty points at random. The points should be evenly distributed over the area of the wall. All of the points should be connected by straight lines."`,
    frontRow: `
      In a world where malevolent spirits are common, would haunted places become poor neighborhoods? Would exorcisms be available only to the rich?`
  },
  {
    component: () => <Carousel images={img.wd118} />,
    notes: `
      And here's a couple of different _implementations_ of this. Each one is a little bit different, but they're all recognizably instances of the same concept.`,
    frontRow: `
      Seems like a lost opportunity for social commentary in the new Ghostbusters movie.`
  },
  {
    component: Static,
    notes: `
      And this is my own interpretation of it, drawing on this wall with light instead of hard pencil.`
  },
  {
    component: () => <CodeBlock>
      <p>On a wall surface,
        any continuous stretch of wall,
        using a hard pencil,
        place fifty points at random.</p>
      <p>The points should be evenly distributed over the area of the wall.</p>
      <p>All of the points should be connected by straight lines.</p>
    </CodeBlock>,
    notes: `
      Now, the first thing I want to highlight here is the ambiguity inherent in these instructions.`
  },
  {
    component: () => <CodeBlock>
      <p><CodeHighlight>On a wall surface,
        any continuous stretch of wall,</CodeHighlight>
        &nbsp;using a hard pencil,
        place fifty points at random.</p>
      <p>The points should be evenly distributed over the area of the wall.</p>
      <p>All of the points should be connected by straight lines.</p>
    </CodeBlock>,
    notes: `
      "Any continuous stretch of wall." No size specified; crucially, no aspect ratio specified either.`
  },
  {
    component: Responsive,
    notes: `
      Its the original Responsive Design!`
  },
  {
    component: CanvasPoints3D,
    notes: `
      Does a continuous stretch of wall include corners?`,
  },
  {
    component: () => <CodeBlock>
      <p>On a wall surface,
        any continuous stretch of wall,
        using a hard pencil,
        <CodeHighlight>place fifty points at random.</CodeHighlight></p>
      <p><CodeHighlight>The points should be evenly distributed over the area of the wall.</CodeHighlight></p>
      <p>All of the points should be connected by straight lines.</p>
    </CodeBlock>,

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
