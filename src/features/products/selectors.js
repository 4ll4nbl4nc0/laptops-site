export function getStockStatus(stock, minStock) {
  if (stock <= 0) return 'Agotado'
  if (stock <= minStock) return 'Bajo stock'
  return 'En stock'
}
