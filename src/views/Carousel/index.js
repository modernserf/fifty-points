import React from "react"
import { StyleSheet, css } from "aphrodite/no-important"

const S = StyleSheet.create({
  container: {
    width: "100%",
    height: 1000,
  },
  image: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: "100%",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center top",
    opacity: 0,
    transition: "opacity 4s",
  },
  active: {
    opacity: 1,
  }
})

export class Carousel extends React.Component {
  static defaultProps = {
    time: 5000,
    transition: 4000,
    style: {},
  };
  constructor () {
    super()
    this.state = {
      index: 0,
    }
  }
  componentDidMount () {
    this.runCarousel()
  }
  componentWillUnmount () {
      window.clearTimeout(this.timeout)
  }
  runCarousel () {
    const { images, time } = this.props
    const { index } = this.state
    if (images.length) {
      this.setState({
        index: (index + 1) % images.length
      })
    }

    this.timeout = window.setTimeout(() => { this.runCarousel() }, time)
  }
  render () {
    const { images, transition, style } = this.props
    const { index } = this.state
    if (!images.length) { return <div></div> }

    const imgTags = images.map((src, i) =>
      <div key={src}
        style={{
          backgroundImage: `url('${src}')`,
          transition: `opacity ${transition}ms`,
          ...style }}
        className={css(S.image, i === index && S.active)}
        role="presentation" />)

      return (
        <div className={css(S.container)}>{imgTags}</div>
      )

  }
}
