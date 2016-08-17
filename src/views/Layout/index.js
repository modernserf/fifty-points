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
  }
})

const backKey = 33
const fwdKey = 34

export class Layout extends React.Component {
  constructor() {
    super()
    this.onNext = this.onNext.bind(this)
  }
  onNext (e) {
    const { goBack, goForward } = this.props.route
    const { location } = this.props
    if (e.keyCode === backKey) {
      goBack(location)
    } else if (e.keyCode === fwdKey) {
      goForward(location)
    }
  }
  componentDidMount () {
    window.addEventListener("keydown",this.onNext)
    this.logNotes()
  }
  componentDidUpdate () {
    this.logNotes()
  }
  componentWillUnmount () {
    window.removeEventListener("keydown", this.onNext)
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
