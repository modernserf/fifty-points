import "./style.css"
import React from "react"





export class Main extends React.Component {
  constructor () {
    super()
    this.state = {
      points: [],
      count: 50,
    }
  }
  componentWillMount () {
    this.initPoints()
  }
  initPoints () {
    const { count } = this.state

    const points = []
    for (var i = 0; i < count; i++) {
      points.push(this.genPoint())
    }
    this.setState({ points })
  }
  genPoint () {
    return [Math.random() * 500, Math.random() * 500]
  }
  render () {
    const { points } = this.state

    return (
      <div>
        <button onClick={() => this.initPoints()}>
          Draw Lines
        </button>
        <ConnectedPoints width={500} height={500} points={points}/>
      </div>
    )
  }
}

function TextMask ({ width, height }) {
  const maskDestStyle = {
    fill: "white",
    mask: "url('#mask')"
  }

  return (
    <g>
      <defs>
        <mask id="mask"
          width={width} height={height}
          x={0} y={0}>
          <rect width={width} height={height}
            style={{ fill: "white"}}/>
          <text x={140} y={110}>“FIFTY</text>
          <text x={width / 2} y={250} textAnchor="middle">POINTS</text>
          <text x={20} y={370}>AT</text>
          <text x={width } y={400} textAnchor="end">RANDOM”</text>
        </mask>
      </defs>
      <rect style={maskDestStyle} width={width} height={height} />
    </g>
  )
}

function ConnectedPoints ({ points, width, height }) {
  const lines = []

  for (var i = 0; i < points.length; i++) {
    for (var j = i; j < points.length; j++) {
      const [x1, y1] = points[i]
      const [x2, y2] = points[j]
      lines.push(
        <line key={`${i}-${j}`}
          x1={x1} y1={y1}
          x2={x2} y2={y2}
          stroke="rgba(0,0,0,0.2)"/>)
    }
  }

  return (
    <svg width={width} height={height}>
      {lines}
      <TextMask width={width} height={height}/>
    </svg>
  )
}
