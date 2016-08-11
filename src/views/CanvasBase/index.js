import React from "react"

export class CanvasBase extends React.Component {
  initCanvas (canvas) {
    if (!this.canvas) {
      this.canvas = canvas
      this.runLoop()
    }
  }
  componentWillUnmount () {
    window.cancelAnimationFrame(this.timeout)
  }
  runLoop() {
    this.timeout = window.requestAnimationFrame(() => this.drawPoints())
  }
  drawPoints () {
    if (!this.canvas) {
      this.runLoop()
      return
    }

    const ctx = this.canvas.getContext('2d')
    this.props.drawFrame(ctx, this.props)

    this.runLoop()
  }
  render () {
    return (
      <canvas ref={(el) => this.initCanvas(el)}
        width={1500} height={1000}></canvas>
    )
  }
}
