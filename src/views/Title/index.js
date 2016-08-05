import React from "react"

export function TextMask ({ width, height, ...props }) {
  const maskDestStyle = {
    fill: "black",
    mask: "url('#mask')"
  }

  return (
    <svg width={width} height={height} {...props}>
      <defs>
        <mask id="mask"
          width={width} height={height}
          x={0} y={0}>
          <rect width={width} height={height}
            style={{ fill: "gray"}}/>
          <g transform="translate(125,0)">
          <text x={140} y={120} fontSize={90}>“fifty</text>
          <text x={250} y={270}
            textAnchor="middle"
            fontSize={160}>points</text>
          <text x={20} y={370} fontSize={90}>at</text>
          <text x={500} y={400} fontSize={90} textAnchor="end">random”</text>
          </g>
        </mask>
      </defs>
      <rect style={maskDestStyle} width={width} height={height} />
    </svg>
  )
}
