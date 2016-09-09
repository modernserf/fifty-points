import React from "react"
import { connect } from "react-redux"
import { StyleSheet, css } from "aphrodite"
import { TextBody } from "./text"
import { selectColors } from "../../data/colors"

const maskID = "mask"

const S = StyleSheet.create({
  maskDest: {
    mask: `url('#${maskID}')`,
  },
  maskBase: {
    fill: "gray",
  },
  textGroup: {
    stroke: "black",
    strokeWidth: 2,
    fill: "gray",
  }
})

export const TextMask = connect(selectColors)(
function TextMask ({ width, height, backgroundColor, style }) {
  return (
    <svg width={width} height={height} style={style}>
      <defs>
        <mask id={maskID}
          width={width} height={height}
          x={0} y={0}>
          <rect className={css(S.maskBase)}
            width={width} height={height}/>
          <g className={css(S.textGroup)}
            transform="translate(125,100)">
            <TextBody/>
          </g>
        </mask>
      </defs>
      <rect className={css(S.maskDest)}
        style={{ fill: backgroundColor }}
        width={width} height={height} />
    </svg>
  )
})
