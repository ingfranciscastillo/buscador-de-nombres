import { Copy, Heart, Shuffle, Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { NameEntry } from "@/types";
import { useToast } from "@/components/ui/toast";
import { useFavorites } from "@/hooks/useFavorites";

interface NameCardProps {
  name: NameEntry;
  onSimilar: (name: NameEntry) => void;
}

const styleVariants: Record<
  string,
  | "tierno"
  | "epico"
  | "ridiculo"
  | "elegante"
  | "anime"
  | "medieval"
  | "oscuro"
  | "magico"
  | "futurista"
  | "noble"
  | "comic"
  | "misterioso"
  | "salvaje"
  | "default"
  | "secondary"
  | "destructive"
  | "outline"
> = {
  tierno: "tierno",
  epico: "epico",
  ridiculo: "ridiculo",
  elegante: "elegante",
  anime: "anime",
  medieval: "medieval",
  oscuro: "oscuro",
  magico: "magico",
  futurista: "futurista",
  noble: "noble",
  comico: "comic",
  misterioso: "misterioso",
  salvaje: "salvaje",
};

const typeVariants: Record<
  string,
  | "mascota"
  | "personaje"
  | "npc"
  | "default"
  | "secondary"
  | "destructive"
  | "outline"
> = {
  mascota: "mascota",
  personaje: "personaje",
  npc: "npc",
};

export function NameCard({ name, onSimilar }: NameCardProps) {
  const { addToast } = useToast();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [copied, setCopied] = React.useState(false);

  const favorite = isFavorite(name.id);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(name.name);
    setCopied(true);
    addToast({
      title: "Copiado!",
      description: `${name.name} se ha copiado al portapapeles`,
      variant: "success",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFavorite = () => {
    toggleFavorite(name);
    addToast({
      title: favorite ? "Eliminado de favoritos" : "Añadido a favoritos",
      description: `${name.name} ${favorite ? "ya no está" : "está"} en tus favoritos`,
      variant: favorite ? "default" : "success",
    });
  };

  const handleSimilar = () => {
    onSimilar(name);
  };

  return (
    <Card className="group hover:scale-[1.02] transition-transform">
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-display text-foreground truncate group-hover:text-[#6b5fff] transition-colors">
              {name.name}
            </h3>
            <p className="text-sm text-muted-foreground font-body mt-1">
              {name.description}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-3">
          <Badge variant={styleVariants[name.style] || "default"}>
            {name.style}
          </Badge>
          <Badge variant={typeVariants[name.type] || "default"}>
            {name.type}
          </Badge>
          <Badge variant="outline" className="text-xs">
            {name.gender}
          </Badge>
          <Badge variant="outline" className="text-xs">
            {name.length}
          </Badge>
        </div>

        <div className="flex gap-1.5">
          <Button
            size="sm"
            variant={copied ? "success" : "secondary"}
            onClick={handleCopy}
            className="flex-1 gap-1"
          >
            {copied ? (
              <Check className="h-3 w-3" />
            ) : (
              <Copy className="h-3 w-3" />
            )}
            {copied ? "Copiado" : "Copiar"}
          </Button>

          <Button
            size="sm"
            variant={favorite ? "destructive" : "outline"}
            onClick={handleFavorite}
            className="gap-1"
          >
            <Heart className={`h-3 w-3 ${favorite ? "fill-current" : ""}`} />
          </Button>

          <Button
            size="sm"
            variant="outline"
            onClick={handleSimilar}
            className="gap-1"
            title="Generar nombres similares"
          >
            <Shuffle className="h-3 w-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

import React from "react";
