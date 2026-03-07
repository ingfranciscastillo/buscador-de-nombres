import { Clock, X, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useSearchHistory } from '@/hooks/useSearchHistory'

interface SearchHistoryProps {
  onSelectTerm: (term: string) => void
}

export function SearchHistory({ onSelectTerm }: SearchHistoryProps) {
  const { history, removeFromHistory, clearHistory } = useSearchHistory()

  if (history.length === 0) {
    return null
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span className="font-display text-xs">Búsquedas recientes</span>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={clearHistory}
          className="text-xs h-6 text-muted-foreground hover:text-destructive"
        >
          Limpiar
        </Button>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {history.map((item) => (
          <Button
            key={item.timestamp}
            variant="outline"
            size="sm"
            onClick={() => onSelectTerm(item.term)}
            className="gap-1.5 text-xs font-body"
          >
            <Search className="h-3 w-3 text-muted-foreground" />
            {item.term}
            <button
              onClick={(e) => {
                e.stopPropagation()
                removeFromHistory(item.term)
              }}
              className="ml-1 hover:text-destructive"
            >
              <X className="h-3 w-3" />
            </button>
          </Button>
        ))}
      </div>
    </div>
  )
}
