import React from "react"
import { CanvasBase } from "../CanvasBase"
import { connect } from "react-redux"
import { selectColors } from "../../data/colors"

function drawFrame (ctx, props) {
  const { width, height, points, colorAlpha, backgroundColorAlpha } = props

  const ln = points.length

  ctx.fillStyle = backgroundColorAlpha(0.2)
  ctx.fillRect(0,0,1920,1080)

  for (var i = 0; i < ln; i++) {
    const alpha = Math.random() * 0.2
    ctx.strokeStyle = colorAlpha(alpha)

    for (var j = i + 1; j < ln; j++) {
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

export const CanvasPoints = connect(selectColors)(function (props) {
    return (
        <CanvasBase drawFrame={drawFrame} {...props}/>
    )
})
