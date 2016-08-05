import React from "react"
import { Carousel } from "../Carousel"
import serra1 from "../../img/serra-1.jpg"
import serra2 from "../../img/serra-2.jpg"
import serra3 from "../../img/serra-3.jpg"
import serra4 from "../../img/serra-4.jpg"

const images = [serra1, serra2, serra3, serra4]

class Serra extends React.Component {
  render () {
    return (
      <Carousel images={images} time={5000} />
    )
  }
}

const notes = `
  Its difficult to convey this experience with photographs. Its one thing to look at a Richard Serra sculpture, but its another thing altogether to confront its enormity in person and walk around inside of it.
`

const frontRow = `
  I don't believe in the supernatural but our AirBnB had an intense horror movie vibe to it.
`

export default {
  component: Serra,
  frontRow,
  notes
}
