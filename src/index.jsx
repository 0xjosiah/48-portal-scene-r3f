import './style.css'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import Experience from './Experience.jsx'

const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render(
    <Canvas
        flat // toneMapping was done in blender so we want to turn the default toneMapping of r3f off
        camera={ {
            fov: 45,
            near: 0.1,
            far: 200,
            position: [ 1, 2, 6 ]
        } }
    >
        <Experience />
    </Canvas>
)