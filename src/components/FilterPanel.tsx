import { RotateCcw } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import type { FilterState, NameType, NameGender, NameLength } from "@/types";
import { types, styles, genders, lengths, languages } from "@/data/names";

interface FilterPanelProps {
  filters: FilterState;
  onFilterChange: (key: keyof FilterState, value: string) => void;
  onReset: () => void;
}

const typeLabels: Record<NameType | "todos", string> = {
  todos: "Todos los tipos",
  mascota: "Mascota",
  personaje: "Personaje",
  npc: "NPC",
};

const styleLabels: Record<string, string> = {
  todos: "Todos los estilos",
  tierno: "Tierno",
  epico: "Épico",
  ridiculo: "Ridículo",
  elegante: "Elegante",
  anime: "Anime",
  medieval: "Medieval",
  oscuro: "Oscuro",
  magico: "Mágico",
  futurista: "Futurista",
  noble: "Noble",
  comico: "Cómico",
  misterioso: "Misterioso",
  salvaje: "Salvaje",
};

const genderLabels: Record<NameGender | "todos", string> = {
  todos: "Cualquier género",
  masculino: "Masculino",
  femenino: "Femenino",
  unisex: "Unisex",
};

const lengthLabels: Record<NameLength | "todos", string> = {
  todos: "Cualquier longitud",
  corto: "Corto",
  medio: "Medio",
  largo: "Largo",
};

const languageLabels: Record<string, string> = {
  todos: "Todos los idiomas",
  espanol: "Español",
  ingles: "Inglés",
  japones: "Japonés",
  fantasia: "Fantasía",
  medieval: "Medieval",
  inventado: "Inventado",
  latino: "Latino",
  frances: "Francés",
  aleman: "Alemán",
  griego: "Griego",
  hebreo: "Hebreo",
  escandinavo: "Escandinavo",
  gales: "Gales",
  irlandes: "Irlandés",
  breton: "Breton",
  basco: "Basco",
  sumerio: "Sumerio",
  escoces: "Escocés",
  native: "Nativo",
  slavic: "Eslavo",
  russo: "Ruso",
  nordico: "Nórdico",
  eslava: "Eslava",
  turco: "Turco",
  arabe: "Árabe",
  chino: "Chino",
  coreano: "Coreano",
  italiano: "Italiano",
  portuges: "Portugués",
};

export function FilterPanel({
  filters,
  onFilterChange,
  onReset,
}: FilterPanelProps) {
  const activeFilters = Object.entries(filters).filter(
    ([key, value]) => key !== "search" && value !== "todos",
  ).length;

  return (
    <div className="flex flex-wrap gap-2 items-center">
      <Select
        value={filters.type}
        onValueChange={(value) => onFilterChange("type", value)}
      >
        <SelectTrigger className="w-[160px]">
          <SelectValue placeholder="Tipo" />
        </SelectTrigger>
        <SelectContent>
          {types.map((type) => (
            <SelectItem key={type} value={type}>
              {typeLabels[type]}
            </SelectItem>
          ))}
          <SelectItem value="todos">{typeLabels.todos}</SelectItem>
        </SelectContent>
      </Select>

      <Select
        value={filters.style}
        onValueChange={(value) => onFilterChange("style", value)}
      >
        <SelectTrigger className="w-[160px]">
          <SelectValue placeholder="Estilo" />
        </SelectTrigger>
        <SelectContent>
          {styles.map((style) => (
            <SelectItem key={style} value={style}>
              {styleLabels[style]}
            </SelectItem>
          ))}
          <SelectItem value="todos">{styleLabels.todos}</SelectItem>
        </SelectContent>
      </Select>

      <Select
        value={filters.gender}
        onValueChange={(value) => onFilterChange("gender", value)}
      >
        <SelectTrigger className="w-[150px]">
          <SelectValue placeholder="Género" />
        </SelectTrigger>
        <SelectContent>
          {genders.map((gender) => (
            <SelectItem key={gender} value={gender}>
              {genderLabels[gender]}
            </SelectItem>
          ))}
          <SelectItem value="todos">{genderLabels.todos}</SelectItem>
        </SelectContent>
      </Select>

      <Select
        value={filters.length}
        onValueChange={(value) => onFilterChange("length", value)}
      >
        <SelectTrigger className="w-[140px]">
          <SelectValue placeholder="Longitud" />
        </SelectTrigger>
        <SelectContent>
          {lengths.map((length) => (
            <SelectItem key={length} value={length}>
              {lengthLabels[length]}
            </SelectItem>
          ))}
          <SelectItem value="todos">{lengthLabels.todos}</SelectItem>
        </SelectContent>
      </Select>

      <Select
        value={filters.language}
        onValueChange={(value) => onFilterChange("language", value)}
      >
        <SelectTrigger className="w-[150px]">
          <SelectValue placeholder="Idioma" />
        </SelectTrigger>
        <SelectContent>
          {languages.map((lang) => (
            <SelectItem key={lang} value={lang}>
              {languageLabels[lang]}
            </SelectItem>
          ))}
          <SelectItem value="todos">{languageLabels.todos}</SelectItem>
        </SelectContent>
      </Select>

      <Select
        value={filters.initial}
        onValueChange={(value) => onFilterChange("initial", value)}
      >
        <SelectTrigger className="w-[120px]">
          <SelectValue placeholder="Inicial" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="todos">Cualquiera</SelectItem>
          {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((letter) => (
            <SelectItem key={letter} value={letter}>
              {letter}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {activeFilters > 0 && (
        <Button variant="outline" size="sm" onClick={onReset} className="gap-1">
          <RotateCcw className="h-3 w-3" />
          Limpiar ({activeFilters})
        </Button>
      )}
    </div>
  );
}
