export type NameType = 'mascota' | 'personaje' | 'npc'
export type NameStyle = 'tierno' | 'epico' | 'ridiculo' | 'elegante' | 'anime' | 'medieval' | 'oscuro' | 'magico' | 'futurista' | 'noble' | 'comico' | 'misterioso' | 'salvaje'
export type NameGender = 'masculino' | 'femenino' | 'unisex'
export type NameLength = 'corto' | 'medio' | 'largo'
export type NameLanguage = 'espanol' | 'ingles' | 'japones' | 'fantasia' | 'medieval' | 'inventado' | 'latino' | 'frances' | 'aleman' | 'griego' | 'hebreo' | 'escandinavo' | 'gales' | 'irlandes' | 'breton' | 'basco' | 'sumerio' | 'escoces' | 'native' | 'slavic' | 'ruso' | 'nordico' | 'eslava' | 'turco' | 'arabe' | 'chino' | 'coreano' | 'italiano' | 'portugues'

export interface NameEntry {
  id: string
  name: string
  type: NameType
  style: NameStyle
  gender: NameGender
  length: NameLength
  language: NameLanguage
  description: string
  keywords: string[]
}

export interface FilterState {
  search: string
  type: NameType | 'todos'
  style: NameStyle | 'todos'
  gender: NameGender | 'todos'
  length: NameLength | 'todos'
  language: NameLanguage | 'todos'
  initial: string | 'todos'
}
