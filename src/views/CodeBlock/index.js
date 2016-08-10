import React from "react"
import { StyleSheet, css } from "aphrodite/no-important"

const green = "rgb(100,255,0)"

const S = StyleSheet.create({
  container: {
    padding: 10,
    color: green,
    fontFamily: ["Fira Code", "monospace"],
    fontSize: 36,
  },
  highlight: {
    color: "black",
    backgroundColor: green,
  }
})

export function CodeHighlight ({ children }) {
  return <em className={css(S.highlight)}>{children}</em>
}

export function CodeBlock ({ children }) {
    return <div className={css(S.container)}>{children}</div>
}
