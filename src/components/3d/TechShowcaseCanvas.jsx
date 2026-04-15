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
          <meshStandardMaterial color="#ea7a5a" emissive="#f3c4aa" emissiveIntensity={0.5} />
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
            'radial-gradient(circle at top right, rgba(234, 122, 90, 0.16), transparent 28%), linear-gradient(180deg, #fffaf4, #f7efe5)',
          border: '1px solid rgba(31, 42, 51, 0.08)',
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
        <color attach="background" args={['#f8efe6']} />
        <ambientLight intensity={1.25} />
        <directionalLight position={[4, 5, 4]} intensity={1.5} />
        <pointLight position={[-3, 1, 1]} color="#ea7a5a" intensity={10} />
        <LaptopModel />
        <OrbitControls enablePan={false} enableZoom={false} autoRotate autoRotateSpeed={1.8} />
      </Canvas>
    </Box>
  )
}

export default TechShowcaseCanvas
