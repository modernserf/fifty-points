import React from "react"
import spider from "../../img/bourgeois.jpg"
import { Carousel } from "../Carousel"

export function Spider () {
  return <Carousel time={10000} images={[spider]} />
}

const notes = `Imagine turning a corner in their shadowy basement and encountering this sculpture by Louise Bourgeois.`

const frontRow = `We arrived at 1:30 PM and the owner told us that she had just put her child to bed, which seemed a little odd.`

export default {
  component: Spider,
  notes,
  frontRow
}
