import React from "react"
import { randomNormal } from "d3-random"
// import { StyleSheet, css } from "aphrodite"
import { CanvasBase } from "../CanvasBase"

const randFrame = randomNormal(0,1)

function drawFrame (ctx, { width, height, lines }) {
  ctx.fillStyle = "rgba(0,0,0, 0.1)"
  ctx.fillRect(0,0,10000,1000)

  const noise = Array(height).fill(0).map(randFrame)

  const fs = lines.slice(1).reduce((foldLines, thisLine) => {
    const lastLine = foldLines[foldLines.length - 1]
    let basis = lastLine[0]
    const nextLine = []

    for (let j = 0; j < thisLine.length; j++) {
      if (lastLine.length > j) {
        basis = lastLine[j]
      }
      // nextLine.push(line[j] + basis + spacing)
      const offset = Math.max(2, thisLine[j] + 3)

      nextLine.push(basis + offset)
    }


    return foldLines.concat([nextLine])
  }, [lines[0]])


  for (let i = 0; i < fs.length; i++) {
    const alpha = Math.random() * 0.3
    ctx.strokeStyle = `rgba(100,255,0,${alpha + 0.1})`
    // ctx.strokeStyle = "rgb(100,255,0)"
    ctx.beginPath()
    const startX = fs[i][0]
    ctx.moveTo(startX, height)
    for (let j = 0; j < lines[i].length; j++) {
      const x = fs[i][j] + noise[j]
      const y = height - j
      ctx.lineTo(x, y)
    }

    ctx.stroke()
    ctx.closePath()
  }
}

function genLines (personCount, width, height) {
  const avg = 2 * height / 3
  const stdDev = height / 10
  const heightRand = randomNormal(avg, stdDev)
  const heights = Array(personCount).fill(0)
    .map(() => Math.round(heightRand()))

  const spacing = 3
  const reach = 5
  const rand = randomNormal(0, 0.05)
  const lines = Array(200).fill(null)
    .map((_, i) => {
      const arr = []
      const h = heights[i % personCount] + Math.floor(Math.random() * reach)

      let basis = spacing
      // fill line
      for (let i = 0; i < h; i++) {
        basis += rand()
        arr.push(Math.round(basis))
      }
      return arr
    })

  return lines
}

const width = 1000
const height = 500

const lines = genLines(10, width, height)

export class CopyLines extends React.Component {
  render () {
    return <div>
      <CanvasBase lines={lines}
        drawFrame={drawFrame}
        width={width} height={height} />
    </div>
  }
}
