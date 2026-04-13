import { Grid, Stack, Typography } from '@mui/material'

function ProductSpecsTable({ specs }) {
  return (
    <Grid container spacing={2}>
      {Object.entries(specs).map(([key, value]) => (
        <Grid key={key} size={{ xs: 12, sm: 6 }}>
          <Stack
            spacing={0.5}
            sx={{
              p: 2,
              borderRadius: 4,
              border: '1px solid rgba(220, 231, 255, 0.08)',
              bgcolor: 'rgba(255,255,255,0.02)',
              height: '100%',
            }}
          >
            <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'capitalize' }}>
              {key}
            </Typography>
            <Typography fontWeight={700}>{value}</Typography>
          </Stack>
        </Grid>
      ))}
    </Grid>
  )
}

export default ProductSpecsTable
