import React from "react"
import { CanvasPoints } from "../CanvasPoints"
import { StyleSheet, css } from "aphrodite"
import { takePoints } from "../../data/points"

const S = StyleSheet.create({
  container: {
    margin: "0 auto",
    overflow: "hidden",
    width: 1920,
  },
})

export function Static () {
    const staticPoints = takePoints(Math.random)(50)

  return (
    <div className={css(S.container)}>
      <CanvasPoints width={1920} height={1080}
        points={staticPoints}/>
    </div>
  )
}
