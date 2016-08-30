import React from "react"
import THREE, { Vector3 } from "three"
import R3, { Object3D, Scene, Renderer, PerspectiveCamera } from "react-three"
import { CanvasPoints } from "../CanvasPoints"
import { StyleSheet, css } from "aphrodite"
import { takePoints } from "../../data/points"

const S = StyleSheet.create({
  container: {
    margin: "0 auto",
    overflow: "hidden",
    width: 1000,
  },
})

const staticPoints = takePoints(Math.random)(50)

const lines = (() => {
  const ln = staticPoints.length
  const segments = new THREE.Geometry()
  for (var i = 0; i < ln; i++) {
    for (var j = i; j < ln; j++) {
      const [x1, y1] = staticPoints[i]
      const [x2, y2] = staticPoints[j]
      segments.vertices.push(
        new Vector3(x1 - 0.5, y1 - 0.5, i / ln / 2 - 0.5),
        new Vector3(x2 - 0.5, y2 - 0.5, j / ln / 2 - 0.5)
      )
    }
  }
  return segments
})()


function Lines ({ material, lines, position, rotation }) {
  const e = new THREE.Euler(0, 0)

  material.uniforms.time.value = Math.floor(rotation * 200)

  return (
    <Object3D position={position} rotation={e}>
      <R3.LineSegments geometry={lines} material={material}/>
    </Object3D>
  )
}


const fragShader = `
uniform float time;
uniform float amount;
uniform float size;
varying vec2 vUv;

float rand (vec2 co) {
  return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
}

void main () {
  float xs = floor(gl_FragCoord.x / size);
  float ys = floor(gl_FragCoord.y / size);
  float snow = rand(vec2(xs * time, ys * time)) * amount;
  gl_FragColor = vec4(0.3, 1, 0, 0.2 + snow);
}
`


Lines.defaultProps = {
  material: new THREE.ShaderMaterial({
    uniforms: {
  		time:     { type: "f", value: 0.0 },
  		amount:   { type: "f", value: 0.1 },
  		size:     { type: "f", value: 8.0 }
  	},
    fragmentShader: fragShader,
    transparent: true,
  })
}

class Test3D extends React.Component {
  constructor () {
    super()
    this.state = { rotation: 0 }
  }
  componentDidMount () {
    this.rotate()
  }
  rotate = () => {
    this.setState({
      rotation: this.state.rotation + 0.001
    })
    window.requestAnimationFrame(this.rotate)
  }
  render () {
    const { rotation } = this.state
    const width = 800
    const height = 500
    const camera = "maincamera"
    const cameraPos = new Vector3(0,0,1.5)
    const center = new Vector3(0,0,0)

    return (
      <Renderer width={width} height={height}>
        <Scene width={width} height={height} camera={camera}>
          <PerspectiveCamera name={camera}
            position={cameraPos} lookat={center}/>
          <Lines lines={lines}
            position={center} rotation={rotation} />
        </Scene>
      </Renderer>
    )
  }
}

class GLCanvas extends React.Component {
  init (e) {
    if (this.canvasWrap) { return }
    this.canvasWrap = e;

    R3.render(this.props.children, this.canvasWrap)
  }
  render () {
    return <div ref={(e) => { this.init(e) }}/>
  }
}

export function _Static () {
  return <GLCanvas><Test3D /></GLCanvas>
}

export function Static () {
  return (
    <div className={css(S.container)}>
      <CanvasPoints width={1000} height={500}
        points={staticPoints}/>
    </div>
  )
}
