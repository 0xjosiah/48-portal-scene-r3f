import { Center, OrbitControls, shaderMaterial, Sparkles, useGLTF, useTexture } from '@react-three/drei'
import { extend } from '@react-three/fiber'
import * as THREE from 'three'
import portalVertexShader from './shaders/portal/vertex.glsl'
import portalFragmentShader from './shaders/portal/fragment.glsl'

const PortalMaterial = shaderMaterial(
    {
        uTime: 0,
        uColorStart: new THREE.Color(0xffffff),
        uColorEnd: new THREE.Color(0x000000)
    },
    portalVertexShader,
    portalFragmentShader
)

extend({ PortalMaterial }) // this extend helper makes a class available as jsx

export default function Experience()
{
    const { nodes } = useGLTF('./model/portal.glb')
    const bakedTexture = useTexture('./model/baked.jpg')
    bakedTexture.flipY = false // this is true by default

    return <>
        <color args={ [ '#030202' ] } attach="background" />

        <OrbitControls makeDefault />

        <Center>

            {/* the base scene */}
            <mesh geometry={nodes.baked.geometry}>
                <meshBasicMaterial map={ bakedTexture }
                    // map-flipY={ false } // this another way to flip the texture
                />
            </mesh>

            {/* the lights */}
            <mesh
                geometry={ nodes.poleLightA.geometry }
                position={ nodes.poleLightA.position }
            >
                <meshBasicMaterial color={0xffffe5} />
            </mesh>
            <mesh
                geometry={ nodes.poleLightB.geometry }
                position={ nodes.poleLightB.position }
            >
                <meshBasicMaterial color={0xffffe5} />
            </mesh>

            {/* the portal */}
            <mesh
                geometry={ nodes.portalLight.geometry }
                position={ nodes.portalLight.position }
                rotation={ nodes.portalLight.rotation }
            >
                <shaderMaterial
                    vertexShader={ portalVertexShader }
                    fragmentShader={ portalFragmentShader }
                    uniforms={{
                        uTime: { value: 0 },
                        uColorStart: { value: new THREE.Color(0xffffff) },
                        uColorEnd: { value: new THREE.Color(0x000000) },
                    }}
                />
            </mesh>

            {/* fireflies */}
            <Sparkles 
                count={ 50 }
                size={ 6 }
                scale={ [ 4, 2, 4 ] }
                position-y={ 1 }
                speed={ 0.35 }
            />

        </Center>

    </>
}

useGLTF.preload('./model/portal.glb')