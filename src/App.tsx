import { useState, useMemo, useCallback } from "react";
import { Heart, Gamepad2 } from "lucide-react";
import { ToastProvider } from "@/components/ui/toast";
import { SearchBar } from "@/components/SearchBar";
import { FilterPanel } from "@/components/FilterPanel";
import { NameCard } from "@/components/NameCard";
import { FavoritesSheet } from "@/components/FavoritesSheet";
import { TrendSection } from "@/components/TrendSection";
import { RandomResult } from "@/components/RandomResult";
import { SearchHistory } from "@/components/SearchHistory";
import { NameGenerator } from "@/components/NameGenerator";
import { useFavorites } from "@/hooks/useFavorites";
import { useSearchHistory } from "@/hooks/useSearchHistory";
import { names, popularNames } from "@/data/names";
import type { FilterState, NameEntry } from "@/types";

const initialFilters: FilterState = {
  search: "",
  type: "todos",
  style: "todos",
  gender: "todos",
  length: "todos",
  language: "todos",
  initial: "todos",
};

function App() {
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [isRandomizing, setIsRandomizing] = useState(false);
  const [randomName, setRandomName] = useState<NameEntry | null>(null);
  const { favoritesCount } = useFavorites();
  const { addToHistory } = useSearchHistory();

  const filteredNames = useMemo(() => {
    let result = [...names];

    if (filters.search.trim()) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(
        (n) =>
          n.name.toLowerCase().includes(searchLower) ||
          n.description.toLowerCase().includes(searchLower) ||
          n.keywords.some((k) => k.toLowerCase().includes(searchLower)),
      );
    }

    if (filters.type !== "todos") {
      result = result.filter((n) => n.type === filters.type);
    }

    if (filters.style !== "todos") {
      result = result.filter((n) => n.style === filters.style);
    }

    if (filters.gender !== "todos") {
      result = result.filter((n) => n.gender === filters.gender);
    }

    if (filters.length !== "todos") {
      result = result.filter((n) => n.length === filters.length);
    }

    if (filters.language !== "todos") {
      result = result.filter((n) => n.language === filters.language);
    }

    if (filters.initial !== "todos") {
      result = result.filter((n) =>
        n.name.toUpperCase().startsWith(filters.initial),
      );
    }

    return result;
  }, [filters]);

  const handleFilterChange = useCallback(
    (key: keyof FilterState, value: string) => {
      setFilters((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );

  const handleReset = useCallback(() => {
    setFilters(initialFilters);
    setRandomName(null);
  }, []);

  const handleRandomize = useCallback(() => {
    setIsRandomizing(true);

    let candidates = [...names];

    const activeFilters = Object.entries(filters).filter(
      ([key, value]) => key !== "search" && value !== "todos",
    );

    if (activeFilters.length > 0) {
      activeFilters.forEach(([key, value]) => {
        if (key !== "initial") {
          candidates = candidates.filter(
            (n) => n[key as keyof NameEntry] === value,
          );
        }
      });
    }

    if (candidates.length === 0) {
      candidates = names;
    }

    const randomIndex = Math.floor(Math.random() * candidates.length);
    const selectedName = candidates[randomIndex];
    setRandomName(selectedName);

    setTimeout(() => setIsRandomizing(false), 300);
  }, [filters]);

  const handleCloseRandom = useCallback(() => {
    setRandomName(null);
  }, []);

  const handleSimilar = useCallback((name: NameEntry) => {
    const similar = names
      .filter(
        (n) =>
          n.id !== name.id &&
          (n.style === name.style ||
            n.type === name.type ||
            n.language === name.language),
      )
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);

    if (similar.length > 0) {
      const firstSimilar = similar[0];
      const element = document.getElementById(`name-card-${firstSimilar.id}`);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
        element.classList.add("animate-pulse");
        setTimeout(() => element.classList.remove("animate-pulse"), 1000);
      }
    }
  }, []);

  const handleSelectName = useCallback((name: NameEntry) => {
    setFilters({
      ...initialFilters,
      search: "",
      style: name.style,
      type: name.type,
    });
    const element = document.getElementById("results-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  return (
    <ToastProvider>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b-2 border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-linear-to-br from-[#6b5fff] to-[#ff6b9d] rounded pixel-shadow flex items-center justify-center">
                  <Gamepad2 className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-lg md:text-xl font-display text-foreground">
                    Buscador de Nombres
                  </h1>
                  <p className="text-xs text-muted-foreground font-body hidden sm:block">
                    Busca nombres para mascotas, personajes y NPCs
                  </p>
                </div>
              </div>

              <FavoritesSheet>
                <button className="relative p-2 rounded-md hover:bg-secondary transition-colors pixel-border">
                  <Heart className="h-5 w-5" />
                  {favoritesCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-[#ff6b9d] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-display">
                      {favoritesCount}
                    </span>
                  )}
                </button>
              </FavoritesSheet>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-6xl mx-auto px-4 py-6 space-y-6">
          {/* Search and Filters */}
          <section className="space-y-4">
            <SearchBar
              filters={filters}
              onSearchChange={(search) => {
                handleFilterChange("search", search)
                if (search.length >= 2) {
                  addToHistory(search)
                }
              }}
              onRandomize={handleRandomize}
              isRandomizing={isRandomizing}
            />
            
            <SearchHistory onSelectTerm={(term) => handleFilterChange("search", term)} />
            
            <FilterPanel
              filters={filters}
              onFilterChange={handleFilterChange}
              onReset={handleReset}
            />
          </section>

          {/* Generator */}
          <NameGenerator />

          {/* Random Result */}
          {randomName && (
            <RandomResult
              name={randomName}
              onRegenerate={handleRandomize}
              onClose={handleCloseRandom}
            />
          )}

          {/* Popular/Trends */}
          <TrendSection
            popularNames={popularNames}
            onSelectName={handleSelectName}
          />

          {/* Results */}
          <section id="results-section" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-display">
                {filters.search
                  ? `Resultados para "${filters.search}"`
                  : filteredNames.length === names.length
                    ? "Todos los nombres"
                    : `${filteredNames.length} nombres encontrados`}
              </h2>
            </div>

            {filteredNames.length === 0 ? (
              <div className="text-center py-16 px-4">
                <div className="w-24 h-24 mx-auto mb-6 bg-muted rounded-full flex items-center justify-center">
                  <Gamepad2 className="h-12 w-12 text-muted-foreground/50" />
                </div>
                <h3 className="text-xl font-display mb-2">
                  No se encontraron nombres
                </h3>
                <p className="text-muted-foreground font-body max-w-md mx-auto">
                  ¡Intenta con otros filtros o prueba el botón "Sorpréndeme"
                  para obtener una sugerencia aleatoria!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredNames.map((name, index) => (
                  <div
                    key={name.id}
                    id={`name-card-${name.id}`}
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 30}ms` }}
                  >
                    <NameCard name={name} onSimilar={handleSimilar} />
                  </div>
                ))}
              </div>
            )}
          </section>
        </main>

        {/* Footer */}
        <footer className="border-t-2 border-border mt-12">
          <div className="max-w-6xl mx-auto px-4 py-6 text-center">
            <p className="text-sm text-muted-foreground font-body">
              Hecho con ❤️.
              <span className="font-display text-xs">v1.0.0</span>
            </p>
          </div>
        </footer>
      </div>
    </ToastProvider>
  );
}

export default App;
