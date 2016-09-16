import React from "react"
import { connect } from "react-redux"
import { css, StyleSheet } from "aphrodite"
import { Artist } from "./artist"
import { Process } from "./process"
import { Drafter } from "./drafter"
import { selectColors } from "../../data/colors"

const S = StyleSheet.create({
  graphic: {
    fill: "none",
    transform: `scale(1.9)`
  },
  text: {
    textAnchor: "middle",
    fontSize: 24,
    letterSpacing: "1px"
  }
})

const mid = 125

export const Collaboration = connect(selectColors)(
({ color }) => {
  return (
    <svg width={1920} height={1080} style={{margin: "80px auto"}}>
      <g className={css(S.graphic)} style={{ stroke: color }}>
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
})
