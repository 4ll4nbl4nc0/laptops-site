import LockOpenRoundedIcon from '@mui/icons-material/LockOpenRounded'
import {
  Button,
  Card,
  CardContent,
  Chip,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAppStore } from '../../app/store'

function LoginPage() {
  const login = useAppStore((state) => state.login)
  const navigate = useNavigate()
  const location = useLocation()
  const [email, setEmail] = useState('admin@astracompute.com')
  const [password, setPassword] = useState('demo123')

  return (
    <Card sx={{ borderRadius: 6 }}>
      <CardContent sx={{ p: { xs: 4, md: 5 } }}>
        <Stack spacing={3}>
          <LockOpenRoundedIcon color="primary" sx={{ fontSize: 42 }} />
          <Chip label="Acceso por ruta /dashboard" color="primary" variant="outlined" sx={{ alignSelf: 'flex-start' }} />
          <Typography variant="h3">Admin Dashboard</Typography>
          <Typography color="text.secondary">
            Acceso simulado para demo comercial. No existe autenticación real ni backend.
          </Typography>
          <TextField label="Email" value={email} onChange={(event) => setEmail(event.target.value)} />
          <TextField
            label="Contraseña"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <Button
            variant="contained"
            size="large"
            onClick={() => {
              login(email)
              navigate(location.state?.from || '/dashboard')
            }}
          >
            Entrar al panel
          </Button>
        </Stack>
      </CardContent>
    </Card>
  )
}

export default LoginPage
