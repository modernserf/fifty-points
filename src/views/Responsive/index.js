import React from "react"
import { AnimatedPoints } from "../AnimatedPoints"
import { takePoints } from "../../data/points"

const genPoints = takePoints(Math.random)

function randomInt (min, max) {
  return Math.round(Math.random() * (max - min) + min)
}

export class Responsive extends React.Component {
  constructor () {
    super()
    this.state = {
      width: 1920,
      height: 1080,
      points: genPoints(50)
    }
  }
  componentDidMount () {
    this.setSize()
  }
  setSize () {
    this.setState({
      width: randomInt(200, 1920),
      height: randomInt(200, 1080),
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
