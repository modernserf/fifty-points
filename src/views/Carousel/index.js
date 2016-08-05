import React from "react"
import { StyleSheet, css } from "aphrodite"

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
    opacity: 0,
    transition: "opacity 8s",
  },
  active: {
    opacity: 1,
  }
})

export class Carousel extends React.Component {
  constructor () {
    super()
    this.state = {
      index: 0,
    }
  }
  componentDidMount () {
    this.runCarousel()
  }
  runCarousel () {
    const { images, time } = this.props
    const { index } = this.state
    if (images.length) {
      this.setState({
        index: (index + 1) % images.length
      })
    }

    window.setTimeout(() => { this.runCarousel() }, time)
  }
  render () {
    const { images } = this.props
    const { index } = this.state
    if (!images.length) { return <div></div> }

    const imgTags = images.map((src, i) =>
      <div key={src}
        style={{ backgroundImage: `url('${src}')`}}
        className={css(S.image, i === index && S.active)}
        role="presentation" />)

      return (
        <div className={css(S.container)}>{imgTags}</div>
      )

  }
}
