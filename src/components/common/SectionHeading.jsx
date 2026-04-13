import { Stack, Typography } from '@mui/material'

function SectionHeading({ eyebrow, title, description, align = 'left' }) {
  return (
    <Stack spacing={1.5} textAlign={align} mb={4.5}>
      {eyebrow ? (
        <Typography variant="overline" sx={{ letterSpacing: 2.5, color: 'primary.main' }}>
          {eyebrow}
        </Typography>
      ) : null}
      <Typography variant="h3">{title}</Typography>
      {description ? (
        <Typography color="text.secondary" maxWidth={680} mx={align === 'center' ? 'auto' : 0}>
          {description}
        </Typography>
      ) : null}
    </Stack>
  )
}

export default SectionHeading
