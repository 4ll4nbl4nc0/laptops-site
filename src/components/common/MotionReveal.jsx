import { Box } from '@mui/material'
import { motion } from 'framer-motion'

const MotionBox = motion.create(Box)

function MotionReveal({
  children,
  delay = 0,
  distance = 28,
  duration = 0.58,
  once = true,
  ...props
}) {
  return (
    <MotionBox
      initial={{ opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.2 }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      {...props}
    >
      {children}
    </MotionBox>
  )
}

export default MotionReveal
