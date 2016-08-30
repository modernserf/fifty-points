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
    fontFamily: "sans-serif",
  }
})

const keyCodes = {
  // for remote
  pgUp: 33,
  pgDn: 34,
  // for keyboard
  left: 37,
  up: 38,
  right: 39,
  down: 40,
}

const backKeys = new Set([keyCodes.pgUp, keyCodes.left, keyCodes.up])
const nextKeys = new Set([keyCodes.pgDn, keyCodes.right, keyCodes.down])

export class Layout extends React.Component {
  constructor() {
    super()
    this.onNext = this.onNext.bind(this)
  }
  onNext (e) {
    const { goBack, goForward } = this.props.route
    const { location } = this.props
    if (backKeys.has(e.keyCode)) {
      goBack(location)
    } else if (nextKeys.has(e.keyCode)) {
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
    console.log(`%c ----------- %c
       ${this.props.routes[1].notes} \n\n\n\n`,
       "background-color: red",
       "background-color: white")
  }
  render () {
    const { children, routes } = this.props
    return (
      <div className={css(S.container)}>
        <div className={css(S.contentWrap)}>
          {children}
        </div>
        <div className={css(S.frontRow)}>
          {routes[1].notes}
        </div>
      </div>
    )
  }
}
