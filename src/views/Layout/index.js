import React from "react"
import { StyleSheet, css } from "aphrodite"

const S = StyleSheet.create({
  container: {
    position: "fixed",
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between"
  },
  contentWrap: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
  },
  frontRow: {
    padding: 20,
    color: `rgb(100,255,0)`,
    fontFamily: ["Fira Code", "monospace"],
  }
})

export class Layout extends React.Component {
  componentDidMount () {
    this.logNotes()
  }
  componentDidUpdate () {
    this.logNotes()
  }
  logNotes () {
    console.log(this.props.routes[1].notes)
  }
  render () {
    const { children, routes } = this.props
    return (
      <div className={css(S.container)}>
        <div className={css(S.contentWrap)}>
          {children}
        </div>
        <div className={css(S.frontRow)}>
          {routes[1].frontRow}
        </div>
      </div>
    )
  }
}
