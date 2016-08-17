import React from "react"
import { StyleSheet, css } from "aphrodite"
import { CanvasBase } from "../CanvasBase"
import { takePoints, takePoisson, takeBestCandidate } from "../../data/points"

const width = 300
const height = 300

const S = StyleSheet.create({
  label: {
    color: `rgb(100,255,0)`,
    fontSize: 15,
    textTransform: "uppercase",
  },
  block: {
    padding: 20,
  },
  container: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    listStyleType: "none",
  },
  wrap: {
    width,
    height,
    overflow: "hidden"
  }
})

function drawFrame (ctx, props) {
  const { width, height, points } = props

  const ln = points.length
  const r = 2
  const t = Math.PI * 2

  ctx.fillStyle = "rgb(0,0,0)"
  ctx.fillRect(0,0,300,300)


  for (var i = 0; i < ln; i++) {
    const alpha = Math.random() * 0.2 + 0.5
    ctx.strokeStyle = `rgba(100,255,0,${alpha})`
    const [x, y] = points[i]

    ctx.beginPath()
    ctx.arc(x * width + r, y * height + r, r ,0, t)
    ctx.stroke()
    ctx.closePath()
  }
}


const poisson = takePoisson(300, 300, 6)

const dists = [{
  label: `Uniform (Math.random) ×${poisson.count}`,
  points: takePoints(Math.random)(poisson.count),
},{
  label: `Best Candidate (s=10) ×${poisson.count}`,
  points: takeBestCandidate(poisson.count, 300, 300, 5)
},{
  label: `Poisson Disc (r=6) ×${poisson.count}`,
  points: poisson.points,
}]

const smallSamples = [0,0,0,0,0,0].map(() => ({
  label: "Uniform ×50",
  points: takePoints(Math.random)(50)
}))

function RandomBlock ({ label, points }) {
  return (
    <li  className={css(S.block)}>
      <h3 className={css(S.label)}>{label}</h3>
      <div className={css(S.wrap)}>
        <CanvasBase points={points}
          drawFrame={drawFrame}
          width={width} height={height} />
      </div>
    </li>
  )
}

export class Random extends React.Component {
  constructor () {
    super()
    this.state = { count: 1 }
  }
  componentDidMount () {
    this.runLoop()
  }
  runLoop () {
    const { count } = this.state
    if (count < poisson.count) {
      this.setState({
        count: Math.min(poisson.count, Math.ceil(count * 1.1))
      })
      this.timeout = window.setTimeout(() => this.runLoop(), 100)
    }
  }
  componentWillUnmount () {
    window.clearTimeout(this.timeout)
  }
  render () {
    const { count } = this.state
    const rows = dists.map(({label, points}, i) =>
      <RandomBlock key={i} label={label} points={points.slice(0, count)}/>
    )

    return (
      <ul className={css(S.container)}>{rows}</ul>
    )
  }
}

export class RandomSmall extends React.Component {
  render () {
    const rows = smallSamples.map(({label, points}, i) =>
      <RandomBlock key={i} label={label} points={points}/>
    )

    return (
      <ul className={css(S.container)}>{rows}</ul>
    )
  }
}
