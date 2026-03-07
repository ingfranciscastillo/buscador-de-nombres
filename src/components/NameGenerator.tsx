import { useState, useCallback } from 'react'
import { Sparkles, Copy, Heart, RefreshCw } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { prefixes, suffixes, type GeneratorTheme } from '@/data/prefixes'
import { useToast } from '@/components/ui/toast'
import { useFavorites } from '@/hooks/useFavorites'
import type { NameEntry } from '@/types'

interface GeneratedName {
  name: string
  theme: GeneratorTheme
}

interface NameGeneratorProps {
  onGenerate?: (generated: GeneratedName) => void
}

const themeLabels: Record<GeneratorTheme, string> = {
  'fantasia': 'Fantasía',
  'sci-fi': 'Sci-Fi',
  'horror': 'Horror',
  'medieval': 'Medieval',
  'anime': 'Anime',
  'comun': 'Común',
  'salvaje': 'Salvaje',
}

const themeVariants: Record<GeneratorTheme, "tierno" | "epico" | "ridiculo" | "elegante" | "anime" | "medieval" | "oscuro" | "magico" | "futurista" | "noble" | "comic" | "misterioso" | "salvaje" | "default" | "secondary" | "destructive" | "outline"> = {
  'fantasia': 'magico',
  'sci-fi': 'futurista',
  'horror': 'oscuro',
  'medieval': 'medieval',
  'anime': 'anime',
  'comun': 'default',
  'salvaje': 'epico',
}

export function NameGenerator({ onGenerate }: NameGeneratorProps) {
  const [selectedTheme, setSelectedTheme] = useState<GeneratorTheme>('fantasia')
  const [generatedNames, setGeneratedNames] = useState<GeneratedName[]>([])
  const [copiedId, setCopiedId] = useState<number | null>(null)
  const { addToast } = useToast()
  const { addFavorite } = useFavorites()

  const generateNames = useCallback(() => {
    const prefixPool = prefixes.filter(p => p.theme.includes(selectedTheme))
    const suffixPool = suffixes.filter(s => s.theme.includes(selectedTheme))
    
    const fallbackPrefixes = selectedTheme === 'comun' ? prefixes : prefixPool.length < 3 ? prefixes : prefixPool
    const fallbackSuffixes = selectedTheme === 'comun' ? suffixes : suffixPool.length < 3 ? suffixes : suffixPool

    const newNames: GeneratedName[] = []
    
    for (let i = 0; i < 6; i++) {
      const prefix = fallbackPrefixes[Math.floor(Math.random() * fallbackPrefixes.length)]
      const suffix = fallbackSuffixes[Math.floor(Math.random() * fallbackSuffixes.length)]
      const name = `${prefix.value}${suffix.value}`
      
      if (!newNames.some(n => n.name === name)) {
        newNames.push({ name, theme: selectedTheme })
      }
    }
    
    setGeneratedNames(newNames)
    onGenerate?.(newNames[0])
  }, [selectedTheme, onGenerate])

  const handleCopy = async (name: string, index: number) => {
    await navigator.clipboard.writeText(name)
    setCopiedId(index)
    addToast({
      title: 'Copiado!',
      description: `${name} se ha copiado al portapapeles`,
      variant: 'success',
    })
    setTimeout(() => setCopiedId(null), 2000)
  }

  const handleSave = (generated: GeneratedName) => {
    const fakeEntry: NameEntry = {
      id: `gen-${Date.now()}`,
      name: generated.name,
      type: 'personaje',
      style: generated.theme === 'fantasia' ? 'magico' : 
             generated.theme === 'sci-fi' ? 'futurista' :
             generated.theme === 'horror' ? 'oscuro' :
             generated.theme === 'medieval' ? 'medieval' :
             generated.theme === 'anime' ? 'anime' :
             generated.theme === 'salvaje' ? 'epico' : 'tierno',
      gender: 'unisex',
      length: generated.name.length <= 5 ? 'corto' : generated.name.length <= 8 ? 'medio' : 'largo',
      language: 'inventado',
      description: `Nombre generado - ${themeLabels[generated.theme]}`,
      keywords: [generated.theme],
    }
    
    addFavorite(fakeEntry)
    addToast({
      title: 'Guardado!',
      description: `${generated.name} añadido a favoritos`,
      variant: 'success',
    })
  }

  return (
    <Card className="bg-gradient-to-br from-[#00ff88]/10 to-[#6b5fff]/10 border-[#00ff88]/30">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-base">
          <Sparkles className="h-4 w-4 text-[#00ff88]" />
          Generador de Nombres
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Theme selector */}
        <div className="flex flex-wrap gap-2">
          {(Object.keys(themeLabels) as GeneratorTheme[]).map((theme) => (
            <Button
              key={theme}
              variant={selectedTheme === theme ? "retro" : "outline"}
              size="sm"
              onClick={() => setSelectedTheme(theme)}
              className="text-xs"
            >
              {themeLabels[theme]}
            </Button>
          ))}
        </div>

        {/* Generate button */}
        <Button 
          onClick={generateNames} 
          variant="retro" 
          className="w-full gap-2"
        >
          <RefreshCw className="h-4 w-4" />
          Generar Nombres
        </Button>

        {/* Generated names */}
        {generatedNames.length > 0 && (
          <div className="space-y-2">
            {generatedNames.map((generated, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 rounded-md border border-border bg-card/50"
              >
                <div className="flex items-center gap-2">
                  <span className="font-display text-sm">{generated.name}</span>
                  <Badge variant={themeVariants[generated.theme]} className="text-[10px]">
                    {themeLabels[generated.theme]}
                  </Badge>
                </div>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleCopy(generated.name, index)}
                    className="h-7 w-7"
                  >
                    {copiedId === index ? (
                      <span className="text-[#00ff88] text-xs">✓</span>
                    ) : (
                      <Copy className="h-3 w-3" />
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleSave(generated)}
                    className="h-7 w-7"
                  >
                    <Heart className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
