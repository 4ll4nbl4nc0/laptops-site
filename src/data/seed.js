import {
  analyticsMock,
  categories,
  customers,
  featuredBrands,
  faqItems,
  inventoryMovements,
  products,
  reservations,
  storeSettings,
  testimonials,
} from './mockData'

export const seedState = {
  products,
  categories,
  favorites: [],
  compare: [],
  reservationCart: [],
  customers,
  reservations,
  inventoryMovements,
  analytics: analyticsMock,
  testimonials,
  faqItems,
  featuredBrands,
  auth: {
    isAuthenticated: false,
    user: null,
  },
  settings: storeSettings,
  ui: {
    search: '',
    lastReservation: null,
  },
}
