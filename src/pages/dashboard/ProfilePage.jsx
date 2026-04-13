import {
  Avatar,
  Card,
  CardContent,
  Grid,
  Stack,
  Typography,
} from '@mui/material'
import { useAppStore } from '../../app/store'

function ProfilePage() {
  const user = useAppStore((state) => state.auth.user)

  return (
    <Stack spacing={3}>
      <Typography variant="h3">Perfil de admin</Typography>
      <Card sx={{ borderRadius: 5 }}>
        <CardContent sx={{ p: 4 }}>
          <Grid container spacing={3} alignItems="center">
            <Grid size={{ xs: 12, md: 3 }}>
              <Avatar sx={{ width: 96, height: 96, bgcolor: 'primary.main', color: 'background.default', fontSize: 40 }}>
                {user?.name?.[0] || 'A'}
              </Avatar>
            </Grid>
            <Grid size={{ xs: 12, md: 9 }}>
              <Stack spacing={1}>
                <Typography variant="h4">{user?.name}</Typography>
                <Typography color="text.secondary">{user?.email}</Typography>
                <Typography color="text.secondary">{user?.role}</Typography>
                <Typography color="text.secondary">
                  Perfil mock pensado para reforzar la percepción de un panel administrativo real.
                </Typography>
              </Stack>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Stack>
  )
}

export default ProfilePage
