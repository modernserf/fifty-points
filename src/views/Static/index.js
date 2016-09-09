import React from "react"
import { CanvasPoints } from "../CanvasPoints"
import { StyleSheet, css } from "aphrodite"
import { takePoints } from "../../data/points"

const S = StyleSheet.create({
  container: {
    margin: "0 auto",
    overflow: "hidden",
    width: 1000,
  },
})

const staticPoints = takePoints(Math.random)(50)

export function Static () {
  return (
    <div className={css(S.container)}>
      <CanvasPoints width={1000} height={500}
        points={staticPoints}/>
    </div>
  )
}
