import { Box, Typography, useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { Canvas } from '@react-three/fiber'
import { Float, OrbitControls } from '@react-three/drei'

function LaptopModel() {
  return (
    <Float speed={2} rotationIntensity={0.25} floatIntensity={0.7}>
      <group rotation={[-0.18, 0.56, 0]}>
        <mesh position={[0, -0.25, 0]} castShadow>
          <boxGeometry args={[2.8, 0.14, 2]} />
          <meshStandardMaterial color="#16243b" metalness={0.8} roughness={0.35} />
        </mesh>
        <mesh position={[0, 0.66, -0.82]} rotation={[-1.05, 0, 0]} castShadow>
          <boxGeometry args={[2.7, 0.08, 1.7]} />
          <meshStandardMaterial color="#0a1323" metalness={0.7} roughness={0.3} />
        </mesh>
        <mesh position={[0, 0.65, -0.84]} rotation={[-1.05, 0, 0]}>
          <planeGeometry args={[2.38, 1.45]} />
          <meshStandardMaterial color="#4cc9f0" emissive="#274e77" emissiveIntensity={0.8} />
        </mesh>
      </group>
    </Float>
  )
}

function TechShowcaseCanvas() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  if (isMobile) {
    return (
      <Box
        sx={{
          minHeight: 360,
          borderRadius: 6,
          p: 4,
          background:
            'radial-gradient(circle at top right, rgba(76, 201, 240, 0.22), transparent 28%), linear-gradient(180deg, #0e1728, #09101d)',
          border: '1px solid rgba(220, 231, 255, 0.1)',
        }}
      >
        <Typography variant="overline" color="primary.main">
          Showcase 3D
        </Typography>
        <Typography variant="h4" sx={{ mt: 1, mb: 2 }}>
          Visual premium optimizado para mobile
        </Typography>
        <Typography color="text.secondary">
          En pantallas pequeñas priorizamos performance con un hero visual estático de alto
          contraste, manteniendo la sensación premium.
        </Typography>
      </Box>
    )
  }

  return (
    <Box sx={{ height: 420, borderRadius: 6, overflow: 'hidden' }}>
      <Canvas camera={{ position: [0, 1.5, 4.2], fov: 42 }}>
        <color attach="background" args={['#09111f']} />
        <ambientLight intensity={1.1} />
        <directionalLight position={[4, 5, 4]} intensity={1.5} />
        <pointLight position={[-3, 1, 1]} color="#4cc9f0" intensity={20} />
        <LaptopModel />
        <OrbitControls enablePan={false} enableZoom={false} autoRotate autoRotateSpeed={1.8} />
      </Canvas>
    </Box>
  )
}

export default TechShowcaseCanvas
