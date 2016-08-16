import React from "react"
import { CanvasPoints } from "../CanvasPoints"

const key = "humanPoints"

export class HumanPoints extends React.Component {
  static defaultProps = {
    width: 1000,
    height: 500
  };
  constructor () {
    super()
    this.state = {
      points: this.loadPoints()
    }
  }
  loadPoints () {
    const points = window.localStorage.getItem(key)
    if (!points) { return [] }
    return JSON.parse(points)
  }
  addPoint (e) {
    const { width, height } = this.props
    const { clientX, clientY } = e
    const p = [clientX / width, clientY / height]
    const nextPoints = this.state.points.concat([p])
    this.setState({
      points: nextPoints
    })
    window.localStorage.setItem(key, JSON.stringify(nextPoints))
  }
  render () {
    const { width, height } = this.props
    const { points } = this.state

    return (
      <div onClick={(e) => this.addPoint(e)}>
        <CanvasPoints width={width} height={height}
          points={points.slice(-50)} />
      </div>
    )

  }
}
