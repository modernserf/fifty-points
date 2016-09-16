import React from "react"
import { connect } from "react-redux"
import { css } from "aphrodite/no-important"
import { rgba, makeStyles, selectColors } from "../../data/colors"

const colorStyles = makeStyles({
    container: {
        backgroundColor: "backgroundColor",
        color: "color",
        padding: 10,
        fontSize: 48,
    },
    dimmed: {
        color: ({ color }) => rgba(color)(0.5),
        animationName: {
          "0%": { opacity: 1 },
          "50%": { opacity: 0.8 },
          "100%": { opacity: 1 },
        },
        animationDuration: "10s",
        animationIterationCount: 'infinite',
    },
    highlight: {
        color: "color",
        fontWeight: "bold",
    }
})

export const CodeHighlight = connect(selectColors)(
({ children, colorMode }) => {
    const S = colorStyles[colorMode]
    return <span className={css(S.highlight)}>{children}</span>
})

export const CodeBlock = connect(selectColors)(
({ children, highlight, backgroundColor, colorMode }) => {
    const S = colorStyles[colorMode]
    return (
      <div className={css(S.container, highlight && S.dimmed)}>
        {children}
      </div>
    )
})
