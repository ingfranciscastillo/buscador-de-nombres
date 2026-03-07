import { TrendingUp, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { NameEntry } from "@/types";
import { useToast } from "@/components/ui/toast";
import { useFavorites } from "@/hooks/useFavorites";

interface TrendSectionProps {
  popularNames: NameEntry[];
  onSelectName: (name: NameEntry) => void;
}

export function TrendSection({
  popularNames,
  onSelectName,
}: TrendSectionProps) {
  const { addToast } = useToast();
  const { isFavorite, toggleFavorite } = useFavorites();

  const handleQuickFavorite = (name: NameEntry) => {
    const wasFavorite = isFavorite(name.id);
    toggleFavorite(name);
    addToast({
      title: wasFavorite ? "Eliminado" : "Añadido!",
      description: `${name.name} ${wasFavorite ? "ya no está" : "está"} en favoritos`,
      variant: wasFavorite ? "default" : "success",
    });
  };

  return (
    <Card className="bg-gradient-to-br from-[#6b5fff]/10 to-[#ff6b9d]/10 border-[#6b5fff]/30">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-base">
          <TrendingUp className="h-4 w-4 text-[#00ff88]" />
          Nombres Populares
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {popularNames.slice(0, 8).map((name) => (
            <Button
              key={name.id}
              variant="outline"
              size="sm"
              onClick={() => onSelectName(name)}
              className="gap-1.5 text-xs font-body"
            >
              <Sparkles className="h-3 w-3 text-[#fbbf24]" />
              {name.name}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleQuickFavorite(name);
                }}
                className="ml-1 hover:text-[#ff6b9d]"
              >
                <HeartIcon filled={isFavorite(name.id)} />
              </button>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-3 w-3"
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  );
}
