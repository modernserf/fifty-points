import React from "react"
import { connect } from "react-redux"
import { StyleSheet, css } from "aphrodite"
import { selectColors } from "../../data/colors"

const S = StyleSheet.create({
  container: {
    position: "fixed",
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  contentWrap: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
  },
  frontRow: {
    padding: 20,
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

const compose = (fns) => (val) => fns.reduceRight((r, l) => l(r), val)
const getRouter = (Component) => {
    return class RouterWrap extends React.Component {
        static contextTypes = {
            router: React.PropTypes.object
        }
        render () {
            return <Component {...this.props} router={this.context.router} />
        }
    }
}

function LogNotes ({ children }) {
    console.log(`%c ----------- %c
       ${children} \n\n\n\n`,
       "background-color: red",
       "background-color: white")
    return null
}

export const Layout = compose([
    connect(selectColors),
    getRouter,
])(class extends React.Component {
  goBack = () =>  {
      const { router, id } = this.props
      router.transitionTo(`/${Math.max(1, Number(id) - 1)}`)
  }
  goForward = () => {
      const { router, id, children } = this.props
      const ln = React.Children.count(children) - 1
      router.transitionTo(`/${Math.min(ln, Number(id) + 1)}`)
  }
  onNext = (e) => {
    if (backKeys.has(e.keyCode)) {
      this.goBack()
    } else if (nextKeys.has(e.keyCode)) {
      this.goForward()
    }
  }
  focus = (ref) => {
      if (ref) { ref.focus() }
  }
  render () {
    const { children, notes, color, backgroundColor } = this.props
    const style = { color, backgroundColor }
    return (
      <div className={css(S.container)} style={style}
        ref={this.focus}
        tabIndex={1}
        onKeyDown={this.onNext}>
        <div className={css(S.contentWrap)}>
          {children}
        </div>
      <LogNotes>{notes}</LogNotes>
      </div>
    )
  }
})
