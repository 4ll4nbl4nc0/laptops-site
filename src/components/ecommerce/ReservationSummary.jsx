import { Card, CardContent, Divider, Stack, Typography } from '@mui/material'
import { useMemo } from 'react'
import { useAppStore } from '../../app/store'
import { formatCurrency } from '../../utils/format'

function ReservationSummary({ helperText }) {
  const cart = useAppStore((state) => state.reservationCart)
  const products = useAppStore((state) => state.products)
  const settings = useAppStore((state) => state.settings)

  const items = useMemo(
    () =>
      cart
        .map((item) => ({
          ...item,
          product: products.find((product) => product.id === item.productId),
        }))
        .filter((item) => item.product),
    [cart, products],
  )

  const total = items.reduce(
    (sum, item) => sum + (item.product.promoPrice || item.product.price) * item.quantity,
    0,
  )

  return (
    <Card sx={{ borderRadius: 5 }}>
      <CardContent sx={{ p: 3 }}>
        <Stack spacing={2}>
          <Typography variant="h5">Resumen de solicitud</Typography>
          {items.map((item) => (
            <Stack key={item.productId} direction="row" justifyContent="space-between" spacing={2}>
              <Typography>{item.product.name}</Typography>
              <Typography color="text.secondary">
                x{item.quantity} · {formatCurrency((item.product.promoPrice || item.product.price) * item.quantity)}
              </Typography>
            </Stack>
          ))}
          <Divider />
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="h6">Monto referencial</Typography>
            <Typography variant="h6">{formatCurrency(total)}</Typography>
          </Stack>
          <Typography color="text.secondary" variant="body2">
            {helperText || settings.reserveFlowMessage}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  )
}

export default ReservationSummary
