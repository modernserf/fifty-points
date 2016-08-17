import React from "react"
import { CanvasBase } from "../CanvasBase"
import { takePoints } from "../../data/points"

function drawFrame (ctx, props) {
  const { width, height, points } = props

  const ln = points.length
  const mid = width >> 1

  ctx.fillStyle = "rgba(0,0,0,0.5)"
  ctx.fillRect(0,0,1500,1000)

  const vanishBottom = height * -4
  const vanishRight = width

  // const ras2cart = (x, y) => [x - mid, height - y]
  const cart2ras = ([x, y]) => [x + mid, 0 - (y - height)]

  const mHoriz = (b) => (height - b) / vanishRight
  const mVert = (_x) => (vanishBottom - height) / _x

  const fX = (x, b) => mHoriz(b) * x + b

  const fY = (b1) => {
    const m1 = mHoriz(b1)
    const m2 = mVert(mid)
    const b2 = vanishBottom

    return (b2 - b1) / (m1 - m2)
  }

  const xDiag = fY(0)
  const yDiag = fX(xDiag, 0)
  const bDiag = height - 100
  const mDiag = (yDiag - bDiag) / xDiag

  const fHoriz = (bHoriz) => {
    return (bDiag - bHoriz) / (mHoriz(bHoriz) - mDiag)
  }

  const mapPoint = (x, y) => {
    if (x === 0) { return [x, y] }

    const sign = x > 0 ? 1 : -1
    const xAt = bDiag - (x * sign)

    const barX = fHoriz(xAt)
    const barY = fX(barX, xAt)

    // vertical fn
    const m1 = (barY - vanishBottom) / barX
    const b1 = vanishBottom

    // horiz fn
    const m2 = mHoriz(y)
    const b2 = y

    const _x = (b2 - b1) / (m1 - m2)
    const _y = (m1 * _x) + b1

    return [_x * sign * -1, _y]
  }

  const drawLine = (start, end) => {
    const [x1, y1] = cart2ras(start)
    const [x2, y2] = cart2ras(end)
    ctx.beginPath()
    ctx.moveTo(x1, y1)
    ctx.lineTo(x2, y2)
    ctx.stroke()
    ctx.closePath()
  }

  const drawLine3D = (x1, y1, x2, y2) => {
      drawLine(mapPoint(x1, y1), mapPoint(x2, y2))
  }

  ctx.strokeStyle = `rgba(100,255,0,0.3)`
  for (let b = 0; b < (height - 50); b += 50) {
    drawLine3D(0, b, bDiag, b)
    drawLine3D(0, b, -bDiag, b)
    drawLine3D(b, 0, b, bDiag)
    drawLine3D(-b, 0, -b, bDiag)
  }

  for (var i = 0; i < ln; i++) {
    const alpha = Math.random() * 0.1 + 0.2
    ctx.strokeStyle = `rgba(100,255,0,${alpha})`

    for (var j = i; j < ln; j++) {
      const start = points[i]
      const end = points[j]

      drawLine3D(
        (start[0] - 0.5) * bDiag * 2, start[1] * bDiag,
        (end[0] - 0.5) * bDiag * 2, end[1] * bDiag)
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
