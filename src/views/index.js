import "./style.css"
import React from "react"
import { Router, hashHistory as history } from "react-router"
import { Layout } from "./Layout"
import { Responsive, Intro } from "./Intro"
import { Static } from "./Static"
import { Carousel } from "./Carousel"
import { CodeBlock, CodeHighlight } from "./CodeBlock"
import { CanvasPoints3D } from "./CanvasPoints3D"
import { HumanPoints } from "./HumanPoints"
import { CopyLines } from "./CopyLines"
import { Random } from "./Random"
import { Collaboration } from "./Collaboration"
import { BlockQuote } from "./BlockQuote"
import { NoSurprises } from "./NoSurprises"
import * as img from "../img"

const childRoutes = [
  {
    component: () => <BlockQuote>
      <p>test</p>
    </BlockQuote>
  },
  {
    component: Intro,
    notes: `
      Last spring, my partner and I took a train upstate to Beacon for the weekend. We visited a museum called Dia:Beacon that specializes in large installations.`,
    frontRow: `
      Hello everyone in the front row! Don't tell anyone but you get some *bonus content*`
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
      Imagine turning a corner in their shadowy attic and encountering this sculpture by Louise Bourgeois.`,
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
      There was also a stack of unlabelled casette tapes in the room, which I can only _assume_ were recordings of demonic summoning incantations.`
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
    component: () => <CodeBlock>
      <p>On a wall surface,
        any continuous stretch of wall,
        using a hard pencil,
        place fifty points at random.</p>
      <p>The points should be evenly distributed over the area of the wall.</p>
      <p>All of the points should be connected by straight lines.</p>
    </CodeBlock>,
    notes: `
      One that stood out for me is wall drawing #118. The instructions, for those of you in the back, are: "On a wall surface, any continuous stretch of wall, using a hard pencil, place fifty points at random. The points should be evenly distributed over the area of the wall. All of the points should be connected by straight lines."`,
    frontRow: `
      It seemed that, if demons and ghosts were part of mundane, everyday life, the town would change very little.`
  },
  {
    component: () => <Carousel images={img.wd118} />,
    notes: `
      And here's a couple of different _implementations_ of this -- one at MOMA, one a Dia, one in somebody's home. Each one is a little bit different, but they're all recognizably instances of the same concept.`,
    frontRow: `
      In a world where malevolent spirits are common, would haunted places become poor neighborhoods? Would exorcisms be available only to the rich?`
  },
  {
    component: Static,
    notes: `
      And this is my own interpretation of it. Now I'm breaking the rules a little bit -- no pencil has touched this wall -- but it captures the spirit. Take a close look at this, because this instance, like a snowflake, will never appear again.`,
    frontRow: `
      Seems like a lost opportunity for social commentary in the new Ghostbusters movie.`
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
    component: () => <CodeBlock highlight>
      <p><CodeHighlight>On a wall surface,
        any continuous stretch of wall,
        using a hard pencil,
        place fifty points at random.</CodeHighlight></p>
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
    component: () => <CodeBlock highlight>
      <p>On a wall surface,
        any continuous stretch of wall,
        using a hard pencil,
        place fifty points at random.</p>
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
    // expand on difference between human and algorithmic randomness
    component: HumanPoints,
    notes: `
      Of course, the normal implementation of randomness for these wall drawings is human intuition, not mathematical perfection. I collected these random points at boroughgramming today. <use laser pointer to "identify" points drawn by borojs people>`
  },
  {
    component: () => <BlockQuote>
      <p>Who is the artist?</p>
    </BlockQuote>,
    notes: `
      One of the big questions raised by LeWitt's art is -- who is the artist?
      LeWitt wrote the instructions, but in most cases never touched the wall.
      He died in 2007 yet in the last few minutes we've seen several new implementations of wall drawing 118. Has he been creating from beyond the grave, Tupac-style?

      What role did I play? I was following his instructions but I still made some editorial decisions in the implementation details. What about the people at boroughgramming that contributed their own randomness? Everyone's contributions are small individually, but the art depends on our varying interpretations on what "fifty points at random" means.`
  },
  {
    component: () => <Carousel images={[img.wd123]} contain/>,
    notes: `
      A lot of LeWitt's wall drawings are celebrations of ambiguity and irregularity. Here's another one I like -- wall drawing #123.`
  },
  {
    component: () => <CodeBlock>
      <p>The first drafter draws a not straight vertical line as long as possible.</p>
      <p>The second drafter draws a line next to the first one, trying to copy it.</p>
      <p>The third drafter does the same, as do as many drafters as possible.</p>
      <p>Then the first drafter, followed by the others, copies the last line drawn until both ends of the wall are reached.</p>
    </CodeBlock>,
    notes: `
      Another simple algorithm, but this one is even more dependent on ambiguity and irregularity -- specifically _human_ irregularity.`
  },
  {
    component: () => <CodeBlock highlight>
      <p><CodeHighlight>The first drafter draws a not straight vertical line as long as possible.</CodeHighlight></p>
      <p>The second drafter draws a line next to the first one, trying to copy it.</p>
      <p>The third drafter does the same, as do as many drafters as possible.</p>
      <p>Then the first drafter, followed by the others, copies the last line drawn until both ends of the wall are reached.</p>
    </CodeBlock>,
    notes: `
      "The first drafter draws a not straight vertical line as long as possible." What does this mean? This leaves a lot open to interpretation -- "not straight" can mean anything from slightly rough to wild and wiggly. "As long as possible" is clearer, but _this_ depends on the reach of the drafter.`
  },
  {
    component: () => <CodeBlock highlight>
      <p>The first drafter draws a not straight vertical line as long as possible.</p>
      <p><CodeHighlight>The second drafter draws a line next to the first one, trying to copy it.</CodeHighlight></p>
      <p>The third drafter does the same, as do as many drafters as possible.</p>
      <p>Then the first drafter, followed by the others, copies the last line drawn until both ends of the wall are reached.</p>
    </CodeBlock>,
    notes: `
      Then each drafter tries to copy -- imperfectly, of course -- the contour of the line before them. This is where Wall Drawing #123 gets its distinctive wood-grain effect, as some irregularities are smoothed out and others are compounded.

      But even here there's some ambiguity in the instructions. If the second drafter is shorter than the first, should they stand on a box so they can reach the top of the previous line? If they're only copying the contour of the previous line as far as they can reach, should subsequent drafters maintain that height or try then extend the line beyond that if their reach allows? I've seen all three approaches.`
  },
  {
    component: CopyLines,
    notes: `
      I like the uneven look of the implementation at Dia:Beacon, though I recognize its kind of a loose interpretation of the source material. I'm not a Sol LeWitt "strict constructionist." Regardless, I had a much harder time implementing this one in a way that looked right -- its hard to make an algorithm that captures intuition.`
  },
  {
    component: NoSurprises,
    notes: `
      So why am I up here? What about LeWitt's work is so special that I have to tell you all about it? I think that I find this so fascinating because its clearly a sibling to writing software, but its goals are almost antithetical to what we do for work. The soul of the art -- the ambiguity,   surprises, edge cases -- are the kinds of things we try to stamp out in most of the code we write.

      When we write software, we're working with goals in mind and we change our code -- our process -- to better fit those goals. But LeWitt's art is all about following the process wherever it goes; adhering to the process _is_ the goal. The art is an emergent behavior of the process.`
      // something about games as art / code as art
  },
  // How are algorithms like or unlike humans? How does machine randomness differ or relate to human randomness? The "randomness" in games, if done effectively feels to the user like a creative partner
  {
    component: () => <BlockQuote>
      <p>“The idea becomes a machine that makes the art.”</p>
    </BlockQuote>,
    notes: `
      Right before LeWitt started his wall drawing series, he wrote about his vision of Conceptual Art and this is one of the key lines from it: “The idea becomes a machine that makes the art.”

      I would take this a step further. LeWitt's algorithms are a far cry from anything we would recognize artificial intelligence, but they're both examples of emergent behavior, just at vastly different levels of complexity.`
  },
  {
    component: () => <Carousel images={[img.deepDream]}/>,
    notes: `
      What about something like Google's DeepDream? Again, a lot more complex than something like wall drawing #118 but its still "just an algorithm." But the lines are blurred -- is the art created _with_ DeepDream, or is the art created _by_ DeepDream? At the very least, we need to acknowledge that the algorithms, the process for creating the art, is more than a tool; its a creative partner.`
  },
  // richard serra isnt making his art all by himself either
  // auteur theory -- leWitt disrupts this with his "open" work
  {
    component: Collaboration,
    notes: `
      Through this lens, we can see LeWitt's work as a network of collaborations. All parties involved -- author, drafters, the process itself -- are necessary for the creation of the art.

      One way to look at this is through the lens of the performing arts, with LeWitt as the composer or the playwright and the drafters as performers. The performers find new ways to interpret the art that the author could never have intended; the art inspires performances the performers didn't know they had in them.

      But I like to think about LeWitt's art through the lens of games. Not just computer games, but games in general -- board games, party games, sports. The people who write the rules for these games have some ideas about what play might look like, but games are fundamentally about how each playthrough is unique, how the game as a "machine for play" creates surprises and what the players can do within the given rules.`
  },
  {
    notes: `
      When I think about LeWitt's art, I think about how the software I write could embrace that sense of play. I don't mean that in the hollow sense that "gamification" evokes; I'm talking about frameworks for creative exploration. The software that made me who I am -- Kid Pix, ResEdit, HyperCard -- they're not toys or games but they allow for play and performance. And there are HyperCard stacks that Bill Atkinson could have never imagined, which are nevertheless unmistakably HyperCard stacks; the tool is the medium.

      We have the ability to create those kinds of experiences with the software we write; even in line-of-business apps we can create tools that feel like collaborators. But in order to do this, we need to embrace uncertainty and unpredictability; we need to accept that the most compelling uses of our software will be the kind we can't predict. And in doing so, we need to design systems that are robust because of their simplicity, not because we've exhaustively filed down all the sharp edges.`
  },
  {
    component: () => <BlockQuote>
      <p>Thank You!</p>
      <p>{"<3 @modernserf"}</p>
    </BlockQuote>,
    notes: `
      Thank you.`
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
