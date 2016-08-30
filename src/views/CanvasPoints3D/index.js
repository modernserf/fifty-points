import React from "react"
import THREE, { Vector3 } from "three"
import R3, { Object3D, Scene, Renderer, PerspectiveCamera } from "react-three"
import { takePoints } from "../../data/points"

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

function Lines ({ material, planeMaterial, lines, position, rotation }) {
  const e = new THREE.Euler(0, rotation)

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
  material: new THREE.ShaderMaterial({
    fragmentShader: `
      void main () {
        gl_FragColor = vec4(0.3, 1, 0, 0.2);
      }
    `,
    transparent: true,
  }),
  planeMaterial: new THREE.MeshBasicMaterial({
    color: 0x64ff00,
    transparent: true,
    opacity: 0.2,
    wireframe: true,
  })
}

class Test3D extends React.Component {
  constructor () {
    super()
    this.state = { rotation: Math.PI / 8 }
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
    const height = 800
    const camera = "maincamera"
    const cameraPos = new Vector3(0,1,3)
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

export function CanvasPoints3D () {
  return (
    <div style={{margin: "0 auto"}}>
      <GLCanvas><Test3D /></GLCanvas>
    </div>
  )


}
