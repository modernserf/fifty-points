import React from "react"
import { StyleSheet, css } from "aphrodite"

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
    fontSize: 90,
    fontFamily: ["Fira Code", "monospace"],
    fontWeight: "bold",
    textTransform: "uppercase",
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
            transform="translate(125,0)">
            <text x={140} y={120}>“fifty</text>
            <text x={250} y={270}
              textAnchor="middle"
              fontSize={160}>points</text>
            <text x={20} y={370}>at</text>
            <text x={500} y={400} textAnchor="end">random”</text>
          </g>
        </mask>
      </defs>
      <rect className={css(S.maskDest)} width={width} height={height} />
    </svg>
  )
}