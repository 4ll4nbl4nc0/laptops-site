export function buildDashboardMetrics(products, customers, reservations) {
  return {
    totalProducts: products.length,
    lowStock: products.filter((product) => product.stock <= product.minStock).length,
    totalCustomers: customers.length,
    pendingReservations: reservations.filter((item) => item.status === 'Pendiente').length,
    confirmedReservations: reservations.filter((item) => item.status === 'Confirmado').length,
    mostViewed:
      [...products].sort((a, b) => b.views - a.views)[0]?.name || 'Sin datos',
    topCategory:
      Object.entries(
        products.reduce((acc, product) => {
          acc[product.category] = (acc[product.category] || 0) + product.views
          return acc
        }, {}),
      ).sort(([, a], [, b]) => b - a)[0]?.[0] || 'N/A',
  }
}
