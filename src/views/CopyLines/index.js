import React from "react"
import { connect } from "react-redux"
import { randomNormal, randomLogNormal } from "d3-random"
// import { StyleSheet, css } from "aphrodite"
import { CanvasBase } from "../CanvasBase"
import { selectColors } from "../../data/colors"

const randFrame = (() => {
    const randLog = randomLogNormal(0,0.5)
    const randNormal = randomNormal(0,0.5)
    return () => randNormal() * randLog()
})()

function drawFrame (ctx, props) {
    const { height, lines, colorAlpha, backgroundColorAlpha }  = props
  ctx.fillStyle = backgroundColorAlpha(0.2)
  ctx.fillRect(0,0,1920,1080)
  const spacing = 8

  const noise = Array(height).fill(0).map(randFrame)

  let lastLine = lines[0]

  for (let i = 0; i < lines.length; i++) {
    let basis = lastLine[0]
    const startX = basis + lines[i][0] + spacing
    const nextLine = []

    ctx.strokeStyle = colorAlpha(0.5)
    ctx.beginPath()
    ctx.moveTo(startX, height)

    for (let j = 0; j < lines[i].length; j++) {
      let offset = lines[i][j]
      // try to "trace" contour of line, comparing with prev and next points
      if (j > 0 && lastLine.length - 1 > j) {
        basis = (lastLine[j] + lastLine[j - 1] + lastLine[j + 1]) / 3
      }

      const x = basis + Math.max(4, offset + spacing)
      const y = height - j
      ctx.lineTo(x + noise[j], y)
      nextLine.push(x)
    }

    ctx.stroke()
    ctx.closePath()
    lastLine = nextLine
  }
}

function genLines (personCount, width, height) {
  const avg = 2 * height / 3
  const stdDev = height / 10
  const heightRand = randomNormal(avg, stdDev)
  const heights = Array(personCount).fill(0).map(heightRand)

  // const spacing = 3
  const rand = randomNormal(0, 0.2)
  return Array(250).fill(null)
    .map((_, i) => {
      const arr = []
      const h = heights[i % personCount] + Math.floor(Math.random() * 20)

      let basis = 0
      // fill line
      for (let i = 0; i < h; i++) {
        basis += rand()
        arr.push(Math.round(basis))
      }
      return arr
    })
}

const width = 1920
const height = 1080

const lines = genLines(30, width, height)

export const CopyLines = connect(selectColors)(
({ colorAlpha, backgroundColorAlpha }) => {
    return <div>
      <CanvasBase lines={lines}
        drawFrame={drawFrame}
        colorAlpha={colorAlpha}
        backgroundColorAlpha={backgroundColorAlpha}
        width={width} height={height} />
    </div>
})
