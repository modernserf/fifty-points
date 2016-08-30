import React from "react"
import { css, StyleSheet } from "aphrodite"

const S = StyleSheet.create({
  container: {
    margin: "0 auto",
    stroke: "rgb(100,255,0)",
    fill: "none"
  },
  text: {
    textAnchor: "middle",
    fontSize: 72,
    fill: "rgb(100,255,0)",
    stroke: "none"
  }
})

export function NoSurprises () {
  const d = 500
  const r = d / 2

  const x2 = Math.floor(r + r * Math.cos(Math.PI * 1 / 4))
  const y2 = d - x2

  return (
    <div className={css(S.container)}>
      <svg width={d + 20} height={d + 20}>
        <g transform="translate(10, 10)">
          <text x={r} y={280} className={css(S.text)}>Surprises</text>
          <circle cx={r} cy={r} r={r}/>
          <line x1={y2} y1={x2} x2={x2} y2={y2} />
        </g>
      </svg>
    </div>
  )
}
