import "./style.css"
import React, { PropTypes } from "react"
import { Router, Route, IndexRedirect, hashHistory } from "react-router"
import { TextMask } from "./Title"

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

// t: current time, b: begInnIng value, c: change In value, d: duration
function ease (t, b, c, d) {
  return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
}

const layoutStyle = {
  position: "fixed",
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between"
}

export class Layout extends React.Component {
  componentDidMount () {
    this.logNotes()
  }
  componentWillUpdate () {
    this.logNotes()
  }
  logNotes () {
    console.log(this.props.routes[1].notes)
  }
  render () {
    const { children, routes } = this.props
    return (
      <div style={layoutStyle}>
        <div>{children}</div>
        <div className="frontRow wrap">{routes[1].frontRow()}</div>
      </div>
    )
  }
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

    window.requestAnimationFrame(() => this.interpolatePoints())
  }
  render () {
    const { currentPoints } = this.state
    const { width, height } = this.props
    return (
      <CanvasPoints width={width} height={height} points={currentPoints}/>
    )
  }
}


export class Main extends React.Component {
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
    const width = 800
    const height = 500

    return (
      <div>
        <div>
          <AnimatedPoints width={width} height={height}
            points={points}
            frames={400}
            onEnd={() => this.initPoints()}/>
          <TextMask style={{position: "absolute", top: 0}}
            width={width} height={height} />
        </div>

      </div>
    )
  }
}

export class CanvasPoints extends React.Component {
  drawPoints (canvas) {
    const { width, height } = this.props
    canvas = canvas || this.canvas
    this.canvas = canvas

    const { points } = this.props
    const ln = points.length
    const ctx = canvas.getContext('2d')
    ctx.fillStyle = "rgba(0,0,0,0.2)"
    ctx.fillRect(0,0,width,height)
    ctx.strokeStyle = "rgba(100,255,0,0.05)"

    for (var i = 0; i < ln; i++) {
      for (var j = i; j < ln; j++) {
        const start = points[i]
        const end = points[j]

        ctx.beginPath()
        ctx.moveTo(start[0] * width, start[1] * height)
        ctx.lineTo(end[0] * width, end[1] * height)
        ctx.stroke()
        ctx.closePath()
      }
    }
  }
  shouldComponentUpdate (nextProps) {
    return nextProps.points !== this.props.points
  }
  render () {
    const { width, height } = this.props
    return (
      <canvas ref={(el) => this.drawPoints(el)}
        width={width} height={height}></canvas>
    )
  }
}

function FrontRow () {
  return <div>Hello everyone in the front row! Don't tell anyone but you get some ~bonus content~</div>
}


const intro = {
  component: Main,
  frontRow: FrontRow,
  notes: ["My notes go here", "this takes an array"],
}

export const main = (
  <Router history={hashHistory}>
    <Route path="/" component={Layout}>
      <IndexRedirect to="/1" />
      <Route path="/1" {...intro}/>
      <Route path="/2" {...intro}/>
    </Route>
  </Router>
)
