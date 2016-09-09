import React from "react"

export function ControlPanel ({ data, color, dispatch, children, ...props }) {
  const cs = React.Children.map(children, (c) => {
    const el = React.cloneElement(c, {
      value: data[c.key],
      onChange: (x) => dispatch(c.key, x)
    })
    return (
      <div key={c.key}>
        <div style={{color: color, fontWeight: "bold"}}>{c.key}: {data[c.key]}</div>
        {el}
      </div>
    )
  })
  return (
    <div {...props}>{cs}</div>
  )
}

const scale = (value, [min, max], [newMin, newMax]) => {
  const percent = (value - min) / (max - min)
  return percent * (newMax - newMin) + newMin
}

export function Slider ({ value, onChange, min, max }) {
  const userScale = [min, max]
  const inputScale = [0, 255]
  const scaleValue = Math.round(scale(value, userScale, inputScale))

  return <input type="range"
    value={scaleValue}
    min={0} max={255} step={1}
    onChange={(e) =>
      onChange(scale(Number(e.target.value), inputScale, userScale))}/>
}
