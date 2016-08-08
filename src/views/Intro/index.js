import React from "react"
import { TextMask } from "../TextMask"
import { AnimatedPoints } from "../AnimatedPoints"
import { StyleSheet, css } from "aphrodite"

const width = 800
const height = 500

const S = StyleSheet.create({
  container: {
    width, height,
    margin: "0 auto",
  },
  block: {
    position: "absolute",
    top: 0,
    width, height,
  }
})

function genPoints (count) {
  const points = []
  for (var i = 0; i < count; i++) {
    points.push(genPoint())
  }
  return points;
}

function genPoint () {
  return [Math.random() , Math.random()]
}

export class Intro extends React.Component {
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
    const { points } = this.state

    return (
      <div className={css(S.container)}>
        <div className={css(S.block)}>
          <AnimatedPoints width={width} height={height}
            points={points}
            frames={400}
            onEnd={() => this.initPoints()}/>
        </div>
        <div className={css(S.block)}>
          <TextMask style={{position: "absolute", top: 0}}
            width={width} height={height} />
        </div>
      </div>
    )
  }
}
