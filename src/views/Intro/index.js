import React from "react"
import { TextMask } from "../TextMask"
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

export class Intro extends React.Component {
  static defaultProps = {
    width: 1920,
    height: 1080,
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
