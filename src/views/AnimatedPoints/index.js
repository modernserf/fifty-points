import React, { PropTypes } from "react"
import { CanvasPoints } from "../CanvasPoints"

// t: current time, b: begInnIng value, c: change In value, d: duration
function ease (t, b, c, d) {
  return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
}

export class AnimatedPoints extends React.Component {
  static propTypes = {
    points: PropTypes.array.isRequired,
    frames: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    onEnd: PropTypes.func.isRequired,
  };
  constructor () {
    super()
    this.state = {
      currentPoints: [],
      lastPoints: [],
      frame: 0,
    }
  }
  componentDidMount () {
    this.props.onEnd()
  }
  componentWillUnmount () {
    window.cancelAnimationFrame(this.timeout)
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.points !== this.props.points) {
      this.setState({
        lastPoints: this.props.points,
        currentPoints: this.props.points,
        frame: 0,
      })
      window.requestAnimationFrame(() => {
        this.interpolatePoints()
      })
    }
  }
  interpolatePoints () {
    const { frame, lastPoints } = this.state
    const { frames, points } = this.props

    if (frame === frames) {
      this.props.onEnd()
      return
    }

    const p = []
    for (var i = 0; i < lastPoints.length; i++) {
      const [x1, y1] = lastPoints[i]
      const [x2, y2] = points[i]

      p[i] = [
        ease(frame, x1, x2 - x1, frames),
        ease(frame, y1, y2 - y1, frames),
      ]
    }

    this.setState({
      frame: frame + 1,
      currentPoints: p,
    })

    this.timeout = window.requestAnimationFrame(() => this.interpolatePoints())
  }
  render () {
    const { currentPoints } = this.state
    const { width, height } = this.props
    return (
      <CanvasPoints width={width} height={height} points={currentPoints}/>
    )
  }
}
