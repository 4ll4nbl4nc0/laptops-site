import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded'
import { Breadcrumbs, Link as MuiLink, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

function AppBreadcrumbs({ items }) {
  return (
    <Breadcrumbs
      separator={<NavigateNextRoundedIcon fontSize="small" />}
      sx={{ mb: 3, color: 'text.secondary' }}
    >
      {items.map((item, index) =>
        item.to ? (
          <MuiLink
            key={item.label}
            component={Link}
            underline="hover"
            color="inherit"
            to={item.to}
          >
            {item.label}
          </MuiLink>
        ) : (
          <Typography key={`${item.label}-${index}`} color="text.primary">
            {item.label}
          </Typography>
        ),
      )}
    </Breadcrumbs>
  )
}

export default AppBreadcrumbs
