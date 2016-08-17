import React from "react"
import { StyleSheet, css } from "aphrodite/no-important"

const greenLo = "rgba(100,255,0,0.5)"
const greenHi = "rgba(100,255,0,1)"

const S = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "black",
    color: greenHi,
    fontSize: 36,
  },
  dimmed: {
    color: greenLo,
    animationName: {
      "0%": { opacity: 1 },
      "50%": { opacity: 0.8 },
      "100%": { opacity: 1 },
    },
    animationDuration: "10s",
    animationIterationCount: 'infinite',
  },
  highlight: {
    color: greenHi,
  }
})

export function CodeHighlight ({ children }) {
  return <span className={css(S.highlight)}>{children}</span>
}

export function CodeBlock ({ children, highlight }) {
    return (
      <div className={css(S.container, highlight && S.dimmed)}>
        {children}
      </div>
    )
}
