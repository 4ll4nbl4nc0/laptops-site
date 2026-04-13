import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { seedState } from '../data/seed'
import { STORAGE_KEY } from '../services/storage'

function createReservationNumber(count) {
  return `RSV-2026-${String(1000 + count + 1)}`
}

export const useAppStore = create(
  persist(
    (set) => ({
      ...seedState,
      setSearch: (search) =>
        set((state) => ({
          ui: {
            ...state.ui,
            search,
          },
        })),
      toggleFavorite: (productId) =>
        set((state) => {
          const exists = state.favorites.includes(productId)
          return {
            favorites: exists
              ? state.favorites.filter((id) => id !== productId)
              : [...state.favorites, productId],
          }
        }),
      addToCompare: (productId) =>
        set((state) => {
          if (state.compare.includes(productId)) {
            return state
          }
          return { compare: [...state.compare.slice(-2), productId].slice(0, 4) }
        }),
      removeFromCompare: (productId) =>
        set((state) => ({
          compare: state.compare.filter((id) => id !== productId),
        })),
      clearCompare: () => set({ compare: [] }),
      addToReservationCart: (productId) =>
        set((state) => {
          const current = state.reservationCart.find((item) => item.productId === productId)
          if (current) {
            return {
              reservationCart: state.reservationCart.map((item) =>
                item.productId === productId
                  ? { ...item, quantity: item.quantity + 1 }
                  : item,
              ),
            }
          }
          return {
            reservationCart: [...state.reservationCart, { productId, quantity: 1 }],
          }
        }),
      updateCartQty: (productId, quantity) =>
        set((state) => ({
          reservationCart: state.reservationCart
            .map((item) =>
              item.productId === productId
                ? { ...item, quantity: Math.max(1, quantity) }
                : item,
            )
            .filter((item) => item.quantity > 0),
        })),
      removeFromReservationCart: (productId) =>
        set((state) => ({
          reservationCart: state.reservationCart.filter((item) => item.productId !== productId),
        })),
      clearReservationCart: () => set({ reservationCart: [] }),
      submitReservation: (payload) =>
        set((state) => {
          const newReservation = {
            id: `res-${Date.now()}`,
            number: createReservationNumber(state.reservations.length),
            customerId: `cus-${Date.now()}`,
            customerName: `${payload.firstName} ${payload.lastName}`,
            items: state.reservationCart,
            status: 'Pendiente',
            total: payload.total,
            preferredContact: payload.preferredContact,
            deliveryMode: payload.deliveryMode,
            createdAt: new Date().toISOString(),
            province: payload.province,
            notes: payload.comment,
            timeline: ['Solicitud enviada'],
            details: payload,
          }

          const newCustomer = {
            id: newReservation.customerId,
            name: newReservation.customerName,
            email: payload.email,
            phone: payload.phone,
            company: payload.company,
            location: payload.province,
            status: 'Nuevo',
            tags: ['nuevo'],
            reservations: [newReservation.id],
          }

          return {
            reservations: [newReservation, ...state.reservations],
            customers: [newCustomer, ...state.customers],
            reservationCart: [],
            ui: {
              ...state.ui,
              lastReservation: newReservation,
            },
          }
        }),
      login: (email) =>
        set(() => ({
          auth: {
            isAuthenticated: true,
            user: {
              name: 'Admin AstraCompute',
              email,
              role: 'Senior Commerce Manager',
            },
          },
        })),
      logout: () =>
        set((state) => ({
          auth: {
            isAuthenticated: false,
            user: null,
          },
          ui: {
            ...state.ui,
          },
        })),
      upsertProduct: (product) =>
        set((state) => {
          const exists = state.products.some((item) => item.id === product.id)
          return {
            products: exists
              ? state.products.map((item) => (item.id === product.id ? product : item))
              : [{ ...product, id: `prod-${Date.now()}` }, ...state.products],
          }
        }),
      deleteProduct: (productId) =>
        set((state) => ({
          products: state.products.filter((product) => product.id !== productId),
          favorites: state.favorites.filter((id) => id !== productId),
          compare: state.compare.filter((id) => id !== productId),
          reservationCart: state.reservationCart.filter((item) => item.productId !== productId),
        })),
      updateReservationStatus: (reservationId, status, note) =>
        set((state) => ({
          reservations: state.reservations.map((reservation) =>
            reservation.id === reservationId
              ? {
                  ...reservation,
                  status,
                  notes: note || reservation.notes,
                  timeline: [...reservation.timeline, `Estado actualizado a ${status}`],
                }
              : reservation,
          ),
        })),
      updateStock: (productId, quantity, type, reason) =>
        set((state) => ({
          products: state.products.map((product) =>
            product.id === productId
              ? {
                  ...product,
                  stock:
                    type === 'Entrada'
                      ? product.stock + quantity
                      : Math.max(0, product.stock - quantity),
                }
              : product,
          ),
          inventoryMovements: [
            {
              id: `mov-${Date.now()}`,
              productId,
              quantity,
              type,
              reason,
              date: new Date().toISOString(),
            },
            ...state.inventoryMovements,
          ],
        })),
      updateSettings: (settings) =>
        set((state) => ({
          settings: {
            ...state.settings,
            ...settings,
          },
        })),
      hydrateSeeds: () => set(seedState),
    }),
    {
      name: STORAGE_KEY,
      version: 1,
    },
  ),
)

export function useCatalogProducts() {
  const products = useAppStore((state) => state.products)
  const search = useAppStore((state) => state.ui.search)

  return products.filter((product) => {
    const haystack = [
      product.name,
      product.brand,
      product.category,
      product.subcategory,
      ...product.tags,
      ...product.badges,
      ...product.specsSummary,
    ]
      .join(' ')
      .toLowerCase()

    return haystack.includes(search.toLowerCase())
  })
}
