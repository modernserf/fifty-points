import React from "react"

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

export class CanvasPoints3D extends React.Component {
  static defaultProps = {
    points: genPoints(50),
    width: 1000,
    height: 500,
  };
  drawPoints (canvas) {
    const { width, height, points } = this.props
    canvas = canvas || this.canvas
    this.canvas = canvas

    const ln = points.length
    const mid = width >> 1
    const ctx = canvas.getContext('2d')

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

    ctx.strokeStyle = `rgba(100,255,0, 0.5)`

    for (let i = 0; i <= 5; i++) {
      const w = i * mid / 5
      const h = i * height / 5
      drawLine3D(w, 0, w, height)
      drawLine3D(w + mid, 0, w + mid, height)
      drawLine3D(0, h, mid, h)
      drawLine3D(mid, h, width, h)
    }

    for (var i = 0; i < ln; i++) {
      ctx.strokeStyle = `rgba(100,255,0,0.2)`

      for (var j = i; j < ln; j++) {
        const start = points[i]
        const end = points[j]

        drawLine3D(start[0] * width, start[1] * height,
          end[0] * width, end[1] * height)
      }
    }
  }
  render () {
    return (
      <div>
        <canvas ref={(el) => this.drawPoints(el)}
          width={1500} height={1000}></canvas>
      </div>
    )
  }
}
