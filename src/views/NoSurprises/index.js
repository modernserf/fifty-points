import React from "react"
import { connect } from "react-redux"
import { css, StyleSheet } from "aphrodite"
import { selectColors } from "../../data/colors"

const S = StyleSheet.create({
  container: {
    margin: "0 auto",
    fill: "none"
  },
  text: {
    textAnchor: "middle",
    fontSize: 144,
    stroke: "none"
  }
})

export const NoSurprises = connect(selectColors)(
function ({ color }) {
    const d = 1000
    const r = d / 2

    const x2 = Math.floor(r + r * Math.cos(Math.PI * 1 / 4))
    const y2 = d - x2

  return (
    <div className={css(S.container)} style={{ stroke: color }}>
      <svg width={d + 20} height={d + 20}>
        <g transform="translate(10, 10)">
          <text x={r} y={r + 40} className={css(S.text)}
            style={{ fill: color }}>Surprises</text>
          <circle cx={r} cy={r} r={r}/>
          <line x1={y2} y1={x2} x2={x2} y2={y2} />
        </g>
      </svg>
    </div>
  )
})
