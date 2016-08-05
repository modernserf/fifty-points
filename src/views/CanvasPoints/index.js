import React from "react"

export class CanvasPoints extends React.Component {
  drawPoints (canvas) {
    const { width, height, points } = this.props
    canvas = canvas || this.canvas
    this.canvas = canvas

    const ln = points.length
    const ctx = canvas.getContext('2d')

    ctx.fillStyle = "rgba(0,0,0,0.2)"
    ctx.fillRect(0,0,width,height)

    for (var i = 0; i < ln; i++) {
      const alpha = Math.random() * 0.1 
      ctx.strokeStyle = `rgba(100,255,0,${alpha})`

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
