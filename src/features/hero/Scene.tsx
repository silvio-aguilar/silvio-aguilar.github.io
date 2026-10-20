import { Float, Icosahedron, RoundedBox, Torus } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import type { Group } from 'three'
import { profileAccent } from '../../content/site'
import type { ProfileId } from '../../content/types'

function Spin({ children, speed = 0.25 }: { children: React.ReactNode; speed?: number }) {
  const ref = useRef<Group>(null)
  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * speed
  })
  return <group ref={ref}>{children}</group>
}

function Phone({ color }: { color: string }) {
  return (
    <Spin>
      <RoundedBox args={[1.5, 3, 0.18]} radius={0.16} smoothness={4}>
        <meshStandardMaterial color="#1b1b19" metalness={0.6} roughness={0.35} />
      </RoundedBox>
      <mesh position={[0, 0, 0.1]}>
        <planeGeometry args={[1.3, 2.7]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.35} />
      </mesh>
    </Spin>
  )
}

function Shield({ color }: { color: string }) {
  return (
    <Spin speed={0.35}>
      <Icosahedron args={[1.5, 1]}>
        <meshStandardMaterial color={color} wireframe />
      </Icosahedron>
      <Icosahedron args={[0.8, 0]}>
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} flatShading />
      </Icosahedron>
    </Spin>
  )
}

function Reel({ color }: { color: string }) {
  return (
    <Spin speed={0.4}>
      <group rotation={[Math.PI / 2, 0, 0]}>
        <Torus args={[1.4, 0.12, 16, 64]}>
          <meshStandardMaterial color={color} metalness={0.5} roughness={0.3} />
        </Torus>
        {[0, 1, 2, 3, 4].map((i) => {
          const a = (i / 5) * Math.PI * 2
          return (
            <mesh key={i} position={[Math.cos(a) * 0.75, 0, Math.sin(a) * 0.75]}>
              <cylinderGeometry args={[0.28, 0.28, 0.16, 32]} />
              <meshStandardMaterial color="#2a2a27" metalness={0.4} />
            </mesh>
          )
        })}
      </group>
    </Spin>
  )
}

export default function Scene({ profile, dark }: { profile: ProfileId; dark: boolean }) {
  const color = profileAccent[profile][dark ? 'dark' : 'light']
  return (
    <Canvas dpr={[1, 1.75]} camera={{ position: [0, 0, 6], fov: 40 }} gl={{ antialias: true, alpha: true }}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 4, 5]} intensity={1.4} />
      <pointLight position={[-4, -2, 3]} intensity={12} color={color} />
      <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.8}>
        {profile === 'dev' && <Phone color={color} />}
        {profile === 'security' && <Shield color={color} />}
        {profile === 'audiovisual' && <Reel color={color} />}
      </Float>
    </Canvas>
  )
}
