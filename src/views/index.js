import "./style.css"
import React from "react"
import { createStore } from "redux"
import { Provider } from "react-redux"
import { HashRouter, Match, Miss, Redirect } from "react-router"
import { Layout } from "./Layout"
import { Intro } from "./Intro"
import { Responsive } from "./Responsive"
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
import { USMap } from "./USMap"
import * as img from "../img"

const initState = {
    colorMode: "dark",
    showNotes: false,
}

function reducer (state = initState, { type, payload }) {
    switch (type) {
    case "darkMode":
        return { ...state, colorMode: "dark" }
    case "lightMode":
        return { ...state, colorMode: "light" }
    // TODO: enable these
    case "showNotes":
        return { ...state, showNotes: true }
    case "hideNotes":
        return { ...state, showNotes: false }
    default:
        return state
    }
}

const store = createStore(reducer)

if (window.Proxy) {
    // usage: command.darkMode -> dispatch({ type: "darkMode" })
    window.command = new Proxy({}, {
        get (_, key) {
            store.dispatch({ type: key })
        }
    })
}

const childRoutes = [
  {
    component: () => <div style={{
        position: "absolute",
        width: 1920, height: 1080,
        border: "10px solid red"
    }}>
    <BlockQuote>
      <p>test</p>
    </BlockQuote>
    </div>
  },
  {
    component: Intro,
    notes: `
      Last spring, my partner and I took a train upstate to Beacon for the weekend. We visited a museum called Dia:Beacon that specializes in large installations.`,
  },
  {
    component: () =>
      <Carousel images={img.serra} />,
    notes: `
      Its difficult to convey this experience with photographs. Its one thing to look at a Richard Serra sculpture, but its another thing altogether to confront its enormity in person and walk around inside of it.`,
  },
  {
    component: () => <Carousel images={[img.bourgeois]} />,
    notes: `
      Imagine turning a corner in their shadowy attic and encountering this sculpture by Louise Bourgeois.`,
  },
  {
    component: () => <Carousel images={[img.ryman]} />,
    notes: `
      Not everything was this "in your face". Some of it, like this collection of Robert Ryman's work, was subtle and textural, almost to the point of parody.`,
  },
  {
    component: () => <Carousel images={img.lewittDia} />,
    notes: `
      But it wasn't all giant walls of rust and white-on-white collages. There was a lot of art that connected on a more intellectual than visceral level.`,
  },
  {
    component: () => <Carousel images={[img.wd136]} />,
    notes: `
      A lot of these were made by an artist named Sol LeWitt. Now, Sol LeWitt was an American artist who worked in the mid-to-late 20th century and specialized in abstract wall drawings and structures.`,
  },
  {
    component: () =>
      <Carousel images={[img.lwCertificate]} contain/>,
    notes: `
      LeWitt didn't think of himself as a sculptor or an illustrator; in many cases he didn't touch the materials at all. Instead, he wrote the instructions to generate them.`,
  },
  {
      component: () => <CodeBlock>
        <p>The ideas need not be complex.</p>
        <p>Most ideas that are successful are ludicrously simple.</p>
        <p><CodeHighlight>Successful ideas generally have the appearance of simplicity because they seem inevitable.</CodeHighlight></p>
      </CodeBlock>,
      notes: `
        And these were not even complex instructions -- most of the algorithms he wrote were describable in a single paragraph; many of them were only a sentence. Though he didn't care for the term, his work is often described as minimalist.`
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
        Despite their simplicity, a number of his pieces have stuck with me since that trip to Dia:Beacon. One that particularly stands out is wall drawing #118. The instructions, for those of you in the back, are: "On a wall surface, any continuous stretch of wall, using a hard pencil, place fifty points at random. The points should be evenly distributed over the area of the wall. All of the points should be connected by straight lines."`,
  },
  {
    component: () => <Carousel images={img.wd118} />,
    notes: `
      And here's a couple of different _implementations_ of this -- one at MOMA, one a Dia, one in somebody's home. Each one is a little bit different, but they're all recognizably instances of the same concept.`,
  },
  {
    component: () => <CodeBlock><pre>{`
for (var i = 0; i < points.length; i++) {
    for (var j = i + 1; j < points.length; j++) {
        const [x1, y1] = points[i]
        const [x2, y2] = points[j]

        ctx.beginPath()
        ctx.moveTo(x1, y1)
        ctx.lineTo(x2, y2)
        ctx.stroke()
        ctx.closePath()
    }
}`}</pre></CodeBlock>,
    notes: `
        Translating to code seemed straightforward at first. I'm using canvas here; this is a slightly less fussy version of the code that I'm actually using.`
  },
  {
      component: () => <CodeBlock highlight><pre>{`
for (var i = 0; i < points.length; i++) {`}<CodeHighlight>{`
    for (var j = i + 1; j < points.length; j++) {`}</CodeHighlight>{`
        const [x1, y1] = points[i]
        const [x2, y2] = points[j]

        ctx.beginPath()
        ctx.moveTo(x1, y1)
        ctx.lineTo(x2, y2)
        ctx.stroke()
        ctx.closePath()
    }
}`}</pre></CodeBlock>,
    notes: `
        There's nothing all that surprising here -- I'm saving some cycles by only drawing the lines in one direction, I hope my high school CS teacher is proud of me.`
    },
  {
    component: Static,
    notes: `
        And this is what it draws. I'm breaking the rules a little bit -- no pencil has touched this wall -- but I think it captures the spirit.`,
  },
  {
      component: Static,
      notes: `
        And here's another one. If I refresh the page, it'll generate another. Take a close look at this, because this instance, like a snowflake, will never appear again.`
  },
  {
      component: () => <BlockQuote>
        <p>Why is this "Art"?</p>
      </BlockQuote>,
      notes: `
        Why is this art? Because it looks cool? Because its a perfect visualization of n log n algorithms? Because it represents how every individual is connected? Well -- at the risk of being all "you have to listen to the notes she's _not_ playing" -- for me, the most interesting parts of LeWitt's wall drawings are the questions that they raise.`
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
      Does a continuous stretch of wall include corners?`,
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
      <p>The first drafter draws a <CodeHighlight>not straight</CodeHighlight> vertical line <CodeHighlight>as long as possible.</CodeHighlight></p>
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
      So why am I up here? What about LeWitt's work is so special that I have to tell you all about it? I think that I find this so fascinating because its clearly a sibling to writing software, but its goals are almost antithetical to what we do for work. The soul of the art -- the ambiguity, surprises, edge cases -- are the kinds of things we try to stamp out in most of the code we write.

      When we write software, we're working with goals in mind and we change our code -- our process -- to better fit those goals. But LeWitt's art is all about following the process wherever it goes; adhering to the process _is_ the goal. The art is an emergent behavior of the process.`
  },
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
  {
    component: Collaboration,
    notes: `
      Through this lens, we can see LeWitt's work as a network of collaborations. All parties involved -- author, drafters, the process itself -- are necessary for the creation of the art.

      One way to look at this is through the lens of the performing arts, with LeWitt as the composer or the playwright and the drafters as performers. The performers find new ways to interpret the art that the author could never have intended; the art inspires performances the performers didn't know they had in them.`
  },
  // richard serra isnt making his art all by himself either
  // auteur theory -- leWitt disrupts this with his "open" work
  {
      component: () => <Carousel images={[img.asteroids]}/>,
      notes: `
        Another lens for considering LeWitt's art is the context of games. Though there are many cases where our goals as programmers seem like the opposite of LeWitt's, in game development they're often aligned. The whole idea of "ludic narratives" is that computer games are a form of collaborative storytelling; and while game's author can _create story possibilities_, the story itself is out of their hands. The narrative of a game is told through the player's interactions with the game's mechanics -- its scripted behaviors, its AI, its randomness, even its bugs. Just as LeWitt saw his work as "machines for art", games can be seen as "machine for play" that create fun and surprise witin the universe of the game's rules.`
  },
  // How are algorithms like or unlike humans? How does machine randomness differ or relate to human randomness? The "randomness" in games, if done effectively feels to the user like a creative partner
  {
      component: USMap,
    notes: `
        But its not just games. As much as we may try to eliminate ambiguity and emergent behavior, there are some places where its an absolutely essential component of our work. We often think of emergent behavior in pathological terms -- domino effects and cascading failures -- but emergent systems aren't inherently chaotic or failure-prone. The diffusion of control and the emergent behavior of the internet are what make it resillient.`
  },
  {
      component: () => <BlockQuote>
        <p>Ambiguous specifications</p>
        <p>enable</p>
        <p>diverse implementations.</p>
      </BlockQuote>,
    notes: `
        And ambiguous specifications enable diverse implementations. Wall drawing 118's unspecifed proportions are a _feature_ -- for one, they let me give this same talk in 1024x768. When I think of the best interfaces I've encountered -- both GUIs or APIs -- I don't typically think of those with the most features or the most detailed requirements; I think of the ones that are the simplest or the most flexible. The designers of these interfaces didn't try to anticipate my needs; they designed interfaces that were loose enough to serve needs they couldn't anticipate.`
  },
  {
      component: () =>
          <BlockQuote>
            <p>open-ended framework</p>
            <p>for creative exploration</p>
          </BlockQuote>,
      notes: `
          When I think about LeWitt's art, I think about how the software I write could share those qualities -- collaboration, play, simplicity. I think about how my software could be an open-ended framework for creative exploration. The software that made me who I am -- Kid Pix, ResEdit, HyperCard -- they're not toys or games but they allow for play and performance. And there are HyperCard stacks that Bill Atkinson could have never imagined, which are nevertheless unmistakably HyperCard stacks; the tool is the medium is the creative partner.`
  },
  {
      notes: `
        We have the ability to create those kinds of experiences with the software we write; even in line-of-business apps we can create tools that feel like collaborators. But in order to do this, we need to embrace uncertainty and unpredictability; we need to accept that the most compelling uses of our software will be the kind we can't predict. And in doing so, we need to design systems that are robust because of their simplicity, not because we've exhaustively filed down all the sharp edges.`
  },
  {
    component: () => <BlockQuote>
      <p>Thank You!</p>
      <p>{"<3 @modernserf"}</p>
    </BlockQuote>,
    notes: `
      Thank you.`
  },
  {
      component: () => <BlockQuote>
        <p>vart.institute</p>
        <p>Recreate Masterpieces of Modern Art with Javascript</p>
        <p>solvingsol.com</p>
      </BlockQuote>,
      notes: `
        I don't have enough time left for Q&A but I want to point out a few valuable resources. First is Jenn Schiffer's vart.institute -- vart is a series of explorable explanations on artists and their styles -- in the philosophical sense, not the deep-learning style transfer sense. For the deep learning stuff, you should check out Amy Cheng's talk "Masterpieces of Modern Art with Javascript" -- I guess Amy & I have a Deep Impact/Armageddon thing going on with Modern Art & JS but her talk is much much more technical than the one you just watched and you've gotta see it _if only_ for the Mondrian-flavored cellular automata. And finally, if you want to see more of sol lewitt's work in javascript, check out solvingsol.com.`
  }
].map((route, i) => ({ ...route, id: i + 1 }))

const notesMap = childRoutes.reduce((m, { id, notes }) => {
    m[id] = notes; return m
}, {})

const defaultComponent = () => <div></div>

function App () {
    const routes = childRoutes.map(({ id, component, notes }) =>
        <Match key={id} pattern={`/${id}`}
            component={component || defaultComponent}/>
    )

    return (
        <HashRouter>
            <div>
                <Match exact pattern="/:id" render={({ params: { id } }) => (
                    <Layout id={id} notes={notesMap[id]}>
                        {routes}
                        <Miss component={() => <Redirect to="/1" />} />
                    </Layout>
                )} />
                <Miss component={() => <Redirect to="/1" />} />
            </div>
        </HashRouter>
    )
}

export const main = (
    <Provider store={store}>
        <App />
    </Provider>
)
