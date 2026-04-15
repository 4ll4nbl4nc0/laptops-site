import { Stack, Typography } from '@mui/material'

function SectionHeading({ eyebrow, title, description, align = 'left' }) {
  return (
    <Stack spacing={1.25} textAlign={align} mb={4}>
      {eyebrow ? (
        <Typography
          variant="overline"
          sx={{ letterSpacing: 2, color: 'primary.main', opacity: 0.92 }}
        >
          {eyebrow}
        </Typography>
      ) : null}
      <Typography variant="h3" sx={{ maxWidth: 900 }}>
        {title}
      </Typography>
      {description ? (
        <Typography
          color="text.secondary"
          maxWidth={760}
          mx={align === 'center' ? 'auto' : 0}
          fontSize="1.02rem"
        >
          {description}
        </Typography>
      ) : null}
    </Stack>
  )
}

export default SectionHeading
