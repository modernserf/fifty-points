import React from "react"
import { StyleSheet, css } from "aphrodite/no-important"

const greenHi = "rgba(100,255,0,1)"

const S = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "black",
    color: greenHi,
    fontSize: 72,
  },
})

export function BlockQuote ({ children, }) {
    return (
      <blockquote className={css(S.container)}>
        {children}
      </blockquote>
    )
}
