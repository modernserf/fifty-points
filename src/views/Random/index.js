import React from "react"
import { connect } from "react-redux"
import { StyleSheet, css } from "aphrodite"
import { CanvasBase } from "../CanvasBase"
import { takePoints, takePoisson, takeBestCandidate } from "../../data/points"
import { selectColors } from "../../data/colors"

const width = 500
const height = 500

const S = StyleSheet.create({
  label: {
    fontSize: 24,
    textTransform: "uppercase",
  },
  block: {
    paddingRight: 20,
  },
  container: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    listStyleType: "none",
    justifyContent: "center",
    alignItems: "center",
  },
  wrap: {
    width,
    height,
    overflow: "hidden"
  }
})

function drawFrame (ctx, props) {
  const { width, height, points, colorAlpha, backgroundColorAlpha } = props

  const ln = points.length
  const r = 2
  const t = Math.PI * 2

  ctx.fillStyle = backgroundColorAlpha(1)
  ctx.fillRect(0,0,width + 100,height + 100)

  for (var i = 0; i < ln; i++) {
    const alpha = Math.random() * 0.2 + 0.5
    ctx.strokeStyle = colorAlpha(alpha)
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

function RandomBlock ({ label, points, colorAlpha, backgroundColorAlpha }) {
  return (
    <li  className={css(S.block)}>
      <h3 className={css(S.label)}
        style={{ color: colorAlpha(1) }}>{label}</h3>
      <div className={css(S.wrap)}>
        <CanvasBase points={points}
          drawFrame={drawFrame}
          width={width} height={height}
          colorAlpha={colorAlpha}
          backgroundColorAlpha={backgroundColorAlpha} />
      </div>
    </li>
  )
}

export const Random = connect(selectColors)(
class extends React.Component {
  state = { count: 1 }
  runLoop = () => {
    const { count } = this.state
    if (count < poisson.count) {
      this.setState({
        count: Math.min(poisson.count, Math.ceil(count * 1.1))
      })
      this.timeout = window.setTimeout(this.runLoop, 100)
    }
  }
  componentDidMount () {
    this.runLoop()
  }
  componentWillUnmount () {
    window.clearTimeout(this.timeout)
  }
  render () {
    const { colorAlpha, backgroundColorAlpha } = this.props
    const { count } = this.state
    const rows = dists.map(({label, points}, i) =>
      <RandomBlock key={i} label={label}
        points={points.slice(0, count)}
        colorAlpha={colorAlpha}
        backgroundColorAlpha={backgroundColorAlpha}/>
    )

    return (
      <ul className={css(S.container)}>{rows}</ul>
    )
  }
})
