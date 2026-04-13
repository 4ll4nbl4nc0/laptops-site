import { useContext } from 'react'
import { SnackbarContext } from './snackbarContext'

export function useAppSnackbar() {
  return useContext(SnackbarContext)
}
