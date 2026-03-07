import { Search, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { FilterState } from "@/types";

interface SearchBarProps {
  filters: FilterState;
  onSearchChange: (search: string) => void;
  onRandomize: () => void;
  isRandomizing: boolean;
}

export function SearchBar({
  filters,
  onSearchChange,
  onRandomize,
  isRandomizing,
}: SearchBarProps) {
  return (
    <div className="flex gap-2 w-full">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Busca un nombre... (ej: gato, guerrero, mago)"
          value={filters.search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 bg-card"
        />
      </div>
      <Button
        onClick={onRandomize}
        variant="retro"
        size="lg"
        disabled={isRandomizing}
        className="gap-2"
      >
        <Sparkles
          className={`h-4 w-4 ${isRandomizing ? "animate-spin" : ""}`}
        />
        Sorpréndeme
      </Button>
    </div>
  );
}
