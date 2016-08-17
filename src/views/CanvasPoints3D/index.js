import React from "react"
import { CanvasBase } from "../CanvasBase"
import { takePoints } from "../../data/points"

function drawFrame (ctx, props) {
  const { width, height, points } = props

  const ln = points.length
  const mid = width >> 1

  ctx.fillStyle = "rgba(0,0,0,0.5)"
  ctx.fillRect(0,0,1500,1000)

  const mapPoint = (x, y) => {
    const x_ = x <= mid ? x : width - x
    const y_ = height / 2 + y -  x_ / 2

    return [x, y_]
  }

  const drawLine = ([x1, y1], [x2, y2]) => {
    ctx.beginPath()
    ctx.moveTo(x1, y1)
    ctx.lineTo(x2, y2)
    ctx.stroke()
    ctx.closePath()
  }

  const drawLine3D = (x1, y1, x2, y2) => {
      drawLine(mapPoint(x1, y1), mapPoint(x2, y2))
  }

  for (let i = 0; i <= 5; i++) {
    const w = i * mid / 5
    const h = i * height / 5
    // vertical left
    ctx.strokeStyle = `rgba(100,255,0, ${(6 - i)/ 5})`
    drawLine3D(w, 0, w, height)
    // vertical right
    ctx.strokeStyle = `rgba(100,255,0, ${(i + 1)/ 5})`
    drawLine3D(w + mid, 0, w + mid, height)
    ctx.strokeStyle = `rgba(100,255,0, 0.5)`
    // horizontal
    drawLine3D(0, h, mid, h)
    drawLine3D(mid, h, width, h)
  }

  for (var i = 0; i < ln; i++) {
    const alpha = Math.random() * 0.1 + 0.2
    ctx.strokeStyle = `rgba(100,255,0,${alpha})`

    for (var j = i; j < ln; j++) {
      const start = points[i]
      const end = points[j]

      drawLine3D(start[0] * width, start[1] * height,
        end[0] * width, end[1] * height)
    }
  }
}

export class CanvasPoints3D extends React.Component {
  constructor () {
    super()
    this.state = {
      points: takePoints(Math.random)(50),
      count: 2
    }
  }
  componentDidMount () {
    this.addPoints()
  }
  addPoints () {
    const { count } = this.state
    if (count < 50) {
      this.setState({ count: count + 1 })
      this.timeout = window.setTimeout(() => this.addPoints(), 100)
    }
  }
  componentWillUnmount () {
    window.clearTimeout(this.timeout)
  }
  render () {
    const { points, count } = this.state
    return (
      <div>
        <CanvasBase drawFrame={drawFrame}
          points={points.slice(0, count)} width={1000} height={500}/>
      </div>
    )
  }
}
