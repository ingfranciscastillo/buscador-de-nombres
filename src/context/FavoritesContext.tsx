import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react'
import type { NameEntry } from '@/types'

const FAVORITES_KEY = 'buscador-nombres-favorites'

interface FavoritesContextType {
  favorites: NameEntry[]
  addFavorite: (name: NameEntry) => void
  removeFavorite: (id: string) => void
  isFavorite: (id: string) => boolean
  toggleFavorite: (name: NameEntry) => void
  clearFavorites: () => void
  favoritesCount: number
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined)

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<NameEntry[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(FAVORITES_KEY)
    if (stored) {
      try {
        setFavorites(JSON.parse(stored))
      } catch {
        setFavorites([])
      }
    }
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites))
    }
  }, [favorites, isLoaded])

  const addFavorite = useCallback((name: NameEntry) => {
    setFavorites(prev => {
      if (prev.some(f => f.id === name.id)) {
        return prev
      }
      return [...prev, name]
    })
  }, [])

  const removeFavorite = useCallback((id: string) => {
    setFavorites(prev => prev.filter(f => f.id !== id))
  }, [])

  const isFavorite = useCallback((id: string) => {
    return favorites.some(f => f.id === id)
  }, [favorites])

  const toggleFavorite = useCallback((name: NameEntry) => {
    if (isFavorite(name.id)) {
      removeFavorite(name.id)
    } else {
      addFavorite(name)
    }
  }, [isFavorite, addFavorite, removeFavorite])

  const clearFavorites = useCallback(() => {
    setFavorites([])
  }, [])

  return (
    <FavoritesContext.Provider value={{
      favorites,
      addFavorite,
      removeFavorite,
      isFavorite,
      toggleFavorite,
      clearFavorites,
      favoritesCount: favorites.length,
    }}>
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const context = useContext(FavoritesContext)
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider')
  }
  return context
}
