import { useState, useEffect, useCallback } from 'react'

const HISTORY_KEY = 'buscador-nombres-history'
const MAX_HISTORY = 10

export interface SearchHistoryItem {
  term: string
  timestamp: number
}

export function useSearchHistory() {
  const [history, setHistory] = useState<SearchHistoryItem[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(HISTORY_KEY)
    if (stored) {
      try {
        setHistory(JSON.parse(stored))
      } catch {
        setHistory([])
      }
    }
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(HISTORY_KEY, JSON.stringify(history))
    }
  }, [history, isLoaded])

  const addToHistory = useCallback((term: string) => {
    if (!term.trim()) return
    
    setHistory(prev => {
      const filtered = prev.filter(item => item.term.toLowerCase() !== term.toLowerCase())
      const newItem = { term: term.trim(), timestamp: Date.now() }
      return [newItem, ...filtered].slice(0, MAX_HISTORY)
    })
  }, [])

  const removeFromHistory = useCallback((term: string) => {
    setHistory(prev => prev.filter(item => item.term !== term))
  }, [])

  const clearHistory = useCallback(() => {
    setHistory([])
  }, [])

  return {
    history,
    addToHistory,
    removeFromHistory,
    clearHistory,
    historyCount: history.length,
  }
}
