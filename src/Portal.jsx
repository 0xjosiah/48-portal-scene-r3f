/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/
import { useRef } from 'react'
import { shaderMaterial, useGLTF, useTexture } from '@react-three/drei'
import * as THREE from 'three'
import portalVertexShader from './shaders/portal/vertex.glsl'
import portalFragmentShader from './shaders/portal/fragment.glsl'
import { extend, useFrame } from '@react-three/fiber'

const PortalMaterial = shaderMaterial(
  {
    uTime: 0,
    uColorStart: new THREE.Color(0xaaaaff),
    uColorEnd: new THREE.Color(0x0908aa)
  },
  portalVertexShader,
  portalFragmentShader
)

extend({ PortalMaterial })

export function Portal(props) {
  const { nodes, materials } = useGLTF('./model/portal.glb')
  const bakedTexture = useTexture('./model/baked.jpg')
  bakedTexture.flipY = false

  const portalMat = useRef(null)
  useFrame((state, delta) => {
    portalMat.current.uTime += delta
  })

  return (
    <group {...props} dispose={null}>
      {/* pole lights */}
      <mesh
        geometry={nodes.poleLightA.geometry}
        material={nodes.poleLightA.material}
        position={[0.71, 1.07, 0.23]}
      >
        <meshBasicMaterial color={0xffffe5} />
      </mesh>
      <mesh
        geometry={nodes.poleLightB.geometry}
        material={nodes.poleLightB.material}
        position={[-0.64, 1.07, 0.23]}
        rotation={[Math.PI, 0, Math.PI]}
      >
        <meshBasicMaterial color={0xffffe5} />
      </mesh>

      {/* portal */}
      <mesh
        geometry={nodes.portalLight.geometry}
        material={nodes.portalLight.material}
        position={[0, 0.85, -1.77]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <portalMaterial ref={ portalMat } />
      </mesh>

      {/* baked scene */}
      <mesh
        geometry={nodes.baked.geometry}
        material={nodes.baked.material}
      >
        <meshBasicMaterial map={ bakedTexture } />
      </mesh>
    </group>
  )
}

useGLTF.preload('/portal.glb')
