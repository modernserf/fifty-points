import "./style.css"
import React from "react"
import { Router, hashHistory as history } from "react-router"
import { Layout } from "./Layout"
import { Static, Responsive, Intro } from "./Intro"
import { Carousel } from "./Carousel"
import { CodeBlock, CodeHighlight } from "./CodeBlock"
import { CanvasPoints3D } from "./CanvasPoints3D"
import { HumanPoints } from "./HumanPoints"
import { CopyLines } from "./CopyLines"
import { Random } from "./Random"
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
    component: () => <Carousel images={img.lewittDia} />,
    notes: `
      But it wasn't all giant walls of rust and white-on-white collages. There was a lot of art that connected on a more intellectual than visceral level.`,
    frontRow: `
      There was also a stack of unlabelled casette tapes in the room, which I can only _assume_ was recordings of demonic summoning incantations.`
  },
  {
    component: () => <Carousel images={[img.wd136]} />,
    notes: `
      A lot of these were made by an artist named Sol LeWitt. Now, Sol LeWitt was an American artist who worked in the mid-to-late 20th century and specialized in abstract wall drawings and structures.`,
    frontRow: `We heard low rumblings at night, but never saw her child.`
  },
  {
    component: () =>
      <Carousel images={[img.lwCertificate]} contain/>,
    notes: `
      LeWitt didn't think of himself as a sculptor or an illustrator; in many cases he didn't touch the materials at all. Instead, he wrote the instructions to generate them.`,
    frontRow: `
      Beacon, like a lot of touristy small towns, had a surprising number of incense and crystal shops.`
  },
  {
    component: () => <Carousel images={[img.lwInstructions118]} contain/>,
    notes: `
      I'm going to go deep on this particular piece, Wall Drawing #118, to demonstrate some of the ideas at work.`,
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
      And here's a couple of different _implementations_ of this -- one at MOMA, one a Dia, one in somebody's home. Each one is a little bit different, but they're all recognizably instances of the same concept.`,
    frontRow: `
      Seems like a lost opportunity for social commentary in the new Ghostbusters movie.`
  },
  {
    component: Static,
    notes: `
      And this is my own interpretation of it. Now I'm breaking the rules a little bit -- no pencil has touched this wall -- but it captures the spirit. Take a close look at this, because this instance, like a snowflake, will never appear again.`
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
      Now, as I was implementing this, I was struck by the ambiguity inherent in these instructions.`
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
      Does a continuous stretch of wall include corners? By the way, if any of you are good at webGL I'd love to see what this would look like on the inside of a cylinder or something like that.`,
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
    notes: `
      There's also some ambiguity with the distribution of points.`
  },
  {
    component: Random,
    notes: `
      There are different kinds of randomness. The most common form, the kind you get with Math.random, is a uniform distribution, but you can see even with thousands of samples you still get clusters and empty spots. These other algorithms trade off some randomness for more even distribtuion.`
  },
  {
    component: HumanPoints,
    notes: `
      Of course, the normal implementation of randomness for these wall drawings is human intuition, not mathematical perfection. I collected these random points at boroughgramming today. <use laser pointer to "identify" points drawn by borojs people>`
  },
  {
    component: () => <Carousel images={[img.wd123]} contain/>,
    notes: `
      A lot of LeWitt's wall drawings are celebrations of ambiguity and irregularity. Here's another one I like -- wall drawing #123.`
  },
  {
    component: () => <CodeBlock>
      <p>The first drafter draws a not straight vertical line as long as possible. The second drafter draws a line next to the first one, trying to copy it. The third drafter does the same, as do as many drafters as possible.</p>
      <p>Then the first drafter, followed by the others, copies the last line drawn until both ends of the wall are reached.</p>
    </CodeBlock>,
    notes: `
      Another simple algorithm, but this one is even more dependent on human irregularity.`
  },
  {
    component: CopyLines,
    notes: `
      First, there's the inherent randomness in "not straight lines."
      As each drafter tries to follow the one before them, the initial irregularity is offset by the irregularity of the next person, giving the wood-grain effect.
      "As long as possible" adds another dimension of irregularity -- that depends on the height and reach of the drafter.`
  },
  {
    notes: `
      I think that I find this so fascinating because its clearly a sibling to writing software, but its goals are almost antithetical to what we do for work. The soul of the art -- the ambiguity, irregularity and surprise -- are the kinds of things we try to stamp out in most of the code we write.`
  },
  {
    notes: `
      One of the big questions raised by LeWitt's art is -- who is the artist? LeWitt wrote the instructions, but in most cases never touched the wall. He died in 2007 yet in the last 10 minutes we've seen several implementations of wall drawing  118. Has he been creating from beyond the grave, Tupac-style?`
  },
  {
    component: () => <CodeBlock>
      <p>The idea becomes a machine that makes the art.</p>
    </CodeBlock>,
    notes: `
      `
  },
  {
    notes: `
      But all parties involved -- author, drafters, the process itself -- are necessary for the creation of the art. Maybe its better to think of this in terms of music or drama -- LeWitt is the composer or the playwright and the drafters are the performers; a performance is ultimately a collaboration between them.`
  },
  {
    notes: `
      And maybe this is how we should think about our software -- a collaborative performance between the programmers and the users, through the medium of our development tools.`
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
