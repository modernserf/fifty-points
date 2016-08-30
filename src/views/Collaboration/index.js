import React from "react"
import { css, StyleSheet } from "aphrodite"
import { Artist } from "./artist"
import { Process } from "./process"
import { Drafter } from "./drafter"

const S = StyleSheet.create({
  graphic: {
    stroke: `rgb(100,255,0)`,
    fill: "none",
  },
  text: {
    textAnchor: "middle",
    fontSize: 24,
    letterSpacing: "1px"
  }
})

const mid = 125

export function Collaboration () {
  return (
    <svg width={1000} height={500} style={{margin: "80px auto"}}>
      <g className={css(S.graphic)}>
        <g>
          <Artist />
          <text className={css(S.text)} x={mid} y={400}>Author</text>
        </g>
        <g transform="translate(350, 0)">
          <Process />
          <text className={css(S.text)} x={mid} y={400}>Process</text>
        </g>
        <g transform="translate(700, 0)">
          <Drafter />
          <text className={css(S.text)} x={mid} y={400}>Drafter</text>
        </g>
      </g>
    </svg>
  )
}
