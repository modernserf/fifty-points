import React from "react"
import { connect } from "react-redux"
import { css } from "aphrodite/no-important"
import { makeStyles, selectColors } from "../../data/colors"

const colorStyles = makeStyles({
  container: {
    padding: 10,
    backgroundColor: "backgroundColor",
    color: "color",
    fontSize: 120,
  },
})

export const BlockQuote = connect(selectColors)(
({ children, colorMode }) => {
    const S = colorStyles[colorMode]
    return (
      <blockquote className={css(S.container)}>
        {children}
      </blockquote>
    )
})
