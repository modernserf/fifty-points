import React from "react"
import { CanvasBase } from "../CanvasBase"

function drawFrame (ctx, props) {
  const { width, height, points } = props

  const ln = points.length

  ctx.fillStyle = "rgba(0,0,0,0.2)"
  ctx.fillRect(0,0,1500,1000)

  for (var i = 0; i < ln; i++) {
    const alpha = Math.random() * 0.2
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

export function CanvasPoints (props) {
  return (
    <CanvasBase drawFrame={drawFrame} {...props}/>
  )
}
