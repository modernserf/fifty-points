import React from "react"
import { connect } from "react-redux"
import THREE, { Vector3 } from "three"
import R3, { Object3D, Scene, Renderer, PerspectiveCamera } from "react-three"
import { takePoints } from "../../data/points"
import { colorModes, int, selectColors } from "../../data/colors"
import { ControlPanel, Slider } from "../Controls"

const staticPoints = takePoints(Math.random)(50)

function mapPoint ([x, y]) {
  if (x < 0.5) {
    return new Vector3(-x * 2, y, 0)
  } else {
    return new Vector3(0, y, (x - 0.5) * 2)
  }
  // return x > 0.5 ? new Vector3(0, y, (x - 0.5) * 2) : new Vector3(x * 2, y, 0)
}

const lines = ((points) => {
  const segments = new THREE.Geometry()
  for (var i = 0; i < points.length; i++) {
    for (var j = i; j < points.length; j++) {
      segments.vertices.push(
        mapPoint(points[i]),
        mapPoint(points[j])
      )
    }
  }
  return segments
})(staticPoints)

function Lines ({ material, planeMaterial, lines, position, rotation, color }) {
  const e = new THREE.Euler(0, rotation)
  // console.log(material)
  material.color = color
  planeMaterial.color = color

  return (
    <Object3D rotation={e}>
      <R3.Mesh name="left"
        geometry={new THREE.PlaneGeometry(1, 1, 8, 8)}
        position={new Vector3(-0.5,0.5,0)}
        rotation={new THREE.Euler(0,0)}
        material={planeMaterial}/>
      <R3.Mesh name="right"
        geometry={new THREE.PlaneGeometry(1, 1, 8, 8)}
        position={new Vector3(0, 0.5, 0.5)}
        rotation={new THREE.Euler(0, Math.PI / 2)}
        material={planeMaterial}/>
      <R3.Mesh name="bottom"
        geometry={new THREE.PlaneGeometry(1, 1, 8, 8)}
        position={new Vector3(-0.5,0,0.5)}
        rotation={new THREE.Euler(-Math.PI / 2,0)}
        material={planeMaterial}/>
      <R3.LineSegments geometry={lines} material={material}/>
    </Object3D>
  )
}

Lines.defaultProps = {
  material: new THREE.MeshBasicMaterial({
      transparent: true,
      opacity: 0.2,
  }),
  planeMaterial: new THREE.MeshBasicMaterial({
    transparent: true,
    opacity: 0.2,
    wireframe: true,
  })
}

class Test3D extends React.Component {
  render () {
    const {
        width, height, camera_y, camera_z, rotation, color, backgroundColor,
    } = this.props
    const camera = "maincamera"
    const cameraPos = new Vector3(0,camera_y, camera_z)
    const center = new Vector3(0,0,0)

    return (
      <Renderer width={width} height={height}
        background={backgroundColor}>
        <Scene width={width} height={height} camera={camera}>
          <PerspectiveCamera name={camera}
            aspect={width / height}
            position={cameraPos} lookat={center}/>
          <Lines lines={lines}
            position={center} rotation={rotation}
            color={new THREE.Color(color)} />
        </Scene>
      </Renderer>
    )
  }
}

class GLCanvas extends React.Component {
  init (e) {
    if (this.canvasWrap) { return }
    this.canvasWrap = e;

    this.renderChild(this.props)
  }
  componentWillReceiveProps (nextProps) {
    this.renderChild(nextProps)
  }
  renderChild ({ width, height, component: Component, childProps }) {
    R3.render(
      <Component width={width} height={height} {...childProps} />,
      this.canvasWrap)
  }
  render () {
    return <div ref={(e) => { this.init(e) }}/>
  }
}

const baseControlStyle = {
  position: "absolute",
  top: 0,
  right: 0,
  width: 400,
  zIndex: 1,
}

function mapLog (rate, range) {
  return (rate === 0) ? 0 :
    (rate > 0) ? Math.pow(10, rate - range) :
    -Math.pow(10, -rate - range)
}

export const CanvasPoints3D = connect(selectColors)(
class extends React.Component {
  state = {
      time: 0,
      camera_z: 3,
      camera_y: 1.5,
      rotation: Math.PI / 8,
      rotation_rate: 1,
      showControls: false,
  }
  componentDidMount () {
    this.inc()
  }
  componentWillUnmount () {
      window.cancelAnimationFrame(this.timeout)
  }
  inc = () => {
    const s = this.state
    this.setState({
      time: s.time + 1,
      rotation: s.rotation + mapLog(s.rotation_rate, 4),
      camera_z: s.camera_z - 0.001,
      camera_y: s.camera_y - 0.0001,
    })
    this.timeout = window.requestAnimationFrame(this.inc)
  }
  dispatch = (key, value) => {
    this.setState({[key]: value})
  }
  render () {
      const { colorMode } = this.props
      const { showControls, ...state } = this.state

      const controlStyle = {
          ...baseControlStyle,
          display: showControls ? "block" : "none",
      }

      const childProps = {
          ...state,
          color: int(colorModes[colorMode].color),
          backgroundColor: int(colorModes[colorMode].backgroundColor)
      }

    return (
      <div style={{margin: "0 auto"}}>
        <ControlPanel style={controlStyle}
            color={this.props.color}
          data={state} dispatch={this.dispatch}>
          <Slider key="camera_y" min={-5} max={5} />
          <Slider key="camera_z" min={0} max={5} />
          <Slider key="rotation" min={0} max={Math.PI * 2}/>
          <Slider key="rotation_rate" min={-3} max={3} />
        </ControlPanel>
        <GLCanvas width={1000} height={800}
          component={Test3D} childProps={childProps} />
      </div>
    )
  }
})
