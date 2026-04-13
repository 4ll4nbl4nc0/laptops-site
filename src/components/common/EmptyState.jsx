import { Button, Card, CardContent, Stack, Typography } from '@mui/material'

function EmptyState({ title, description, actionLabel, onAction }) {
  return (
    <Card sx={{ borderRadius: 6 }}>
      <CardContent sx={{ p: { xs: 4, md: 5 } }}>
        <Stack spacing={2} alignItems="flex-start">
          <Typography variant="h4">{title}</Typography>
          <Typography color="text.secondary">{description}</Typography>
          {actionLabel ? (
            <Button variant="contained" onClick={onAction}>
              {actionLabel}
            </Button>
          ) : null}
        </Stack>
      </CardContent>
    </Card>
  )
}

export default EmptyState
