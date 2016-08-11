import React from "react"
import { TextMask } from "../TextMask"
import { CanvasPoints } from "../CanvasPoints"
import { AnimatedPoints } from "../AnimatedPoints"
import { StyleSheet, css } from "aphrodite"
import { takePoints } from "../../data/points"

const S = StyleSheet.create({
  container: {
    margin: "0 auto",
  },
  block: {
    position: "absolute",
    overflow: "hidden",
    top: 0,
  }
})


const genPoints = takePoints(Math.random)

function randomInt (min, max) {
  return Math.round(Math.random() * (max - min) + min)
}

const staticPoints = genPoints(50)

export function Static () {
  return (
    <div>
      <CanvasPoints width={1000} height={500}
        points={staticPoints}/>
    </div>
  )
}

export class Responsive extends React.Component {
  constructor () {
    super()
    this.state = {
      width: 800,
      height: 500,
      points: genPoints(50)
    }
  }
  componentDidMount () {
    this.setSize()
  }
  setSize () {
    this.setState({
      width: randomInt(200, 1200),
      height: randomInt(200, 800),
    })
  }
  render () {
    const { width, height, points } = this.state
    return (
      <div>
      <AnimatedPoints width={width} height={height}
        points={points}
        frames={200}
        onEnd={() => this.setSize()}/>
      </div>
    )
  }
}

export class Intro extends React.Component {
  static defaultProps = {
    width: 1000,
    height: 500,
  };
  constructor () {
    super()
    this.state = {
      points: [],
      count: 2,
    }
  }
  componentWillMount () {
    this.initPoints()
  }
  initPoints () {
    const { count } = this.state
    const basePoints = genPoints(count)
    const ln = basePoints.length
    const maxPoints = 50
    const points = []
    for (var i = 0; i < 50; i++) {
      points[i] = basePoints[i % ln]
    }

    this.setState({
      count: Math.min(count * 2, maxPoints),
      points: points
    })
  }
  render () {
    const { width, height } = this.props
    const { points } = this.state

    const style = { width, height }

    return (
      <div className={css(S.container)} style={style}>
        <div className={css(S.block)} style={style}>
          <AnimatedPoints width={width} height={height}
            points={points}
            frames={400}
            onEnd={() => this.initPoints()}/>
        </div>
        <div className={css(S.block)} style={style}>
          <TextMask style={{position: "absolute", top: 0}}
            width={width} height={height} />
        </div>
      </div>
    )
  }
}
