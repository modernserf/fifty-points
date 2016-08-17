import React from "react"
import { StyleSheet, css } from "aphrodite"
import { TextBody } from "./text"

const maskID = "mask"

const S = StyleSheet.create({
  maskDest: {
    fill: "black",
    mask: `url('#${maskID}')`
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

export function TextMask ({ width, height, ...props }) {
  return (
    <svg width={width} height={height} {...props}>
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
      <rect className={css(S.maskDest)} width={width} height={height} />
    </svg>
  )
}
