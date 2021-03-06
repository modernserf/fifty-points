import React from "react"
import { connect } from "react-redux"
import { selectColors } from "../../data/colors"
import { HumanPoints } from "../HumanPoints"
import { StyleSheet, css } from "aphrodite"
import { Map } from "./map"

const S = StyleSheet.create({
  container: {
    margin: "0 auto",
    overflow: "hidden",
    width: 1920,
    height: 1080,
  },
  map: {
      pointerEvents: "none",
      position: "absolute",
      width: "100%",
      height: "100%",
      top: 0,
  }
})

export const USMap = connect(selectColors)(function ({ color }) {
  return (
    <div className={css(S.container)}>
        <HumanPoints dataID="usmap"/>
        <div className={css(S.map)}>
            <Map color={color} />
        </div>
    </div>
  )
})
