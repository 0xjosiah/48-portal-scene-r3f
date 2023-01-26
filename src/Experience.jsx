import { Center, OrbitControls, Sparkles, useGLTF, useTexture } from '@react-three/drei'

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
                <shaderMaterial />
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