import { Heart, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useFavorites } from "@/hooks/useFavorites";
import { useToast } from "@/components/ui/toast";

interface FavoritesSheetProps {
  children: React.ReactNode;
}

export function FavoritesSheet({ children }: FavoritesSheetProps) {
  const { favorites, removeFavorite, clearFavorites, favoritesCount } =
    useFavorites();
  const { addToast } = useToast();

  const handleRemove = (id: string, name: string) => {
    removeFavorite(id);
    addToast({
      title: "Eliminado",
      description: `${name} eliminado de favoritos`,
    });
  };

  const handleClear = () => {
    clearFavorites();
    addToast({
      title: "Favoritos limpiados",
      description: "Todos los favoritos han sido eliminados",
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-md max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-[#ff6b9d]" />
            Mis Favoritos
            {favoritesCount > 0 && (
              <Badge variant="secondary">{favoritesCount}</Badge>
            )}
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto min-h-[200px] max-h-[400px]">
          {favorites.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Heart className="h-16 w-16 text-muted-foreground/30 mb-4" />
              <p className="text-muted-foreground font-body text-lg">
                No tienes favoritos aún
              </p>
              <p className="text-sm text-muted-foreground/70 mt-2">
                Guarda los nombres que más te gusten!
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {favorites.map((fav) => (
                <div
                  key={fav.id}
                  className="flex items-center justify-between p-3 rounded-md border-2 border-border bg-card pixel-border"
                >
                  <div className="flex-1 min-w-0">
                    <div className="font-display text-sm truncate">
                      {fav.name}
                    </div>
                    <div className="text-xs text-muted-foreground font-body mt-0.5">
                      {fav.description}
                    </div>
                    <div className="flex gap-1 mt-1">
                      <Badge
                        variant={
                          fav.style as
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
                        }
                        className="text-[10px] py-0"
                      >
                        {fav.style}
                      </Badge>
                      <Badge
                        variant={fav.type as "mascota" | "personaje" | "npc"}
                        className="text-[10px] py-0"
                      >
                        {fav.type}
                      </Badge>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemove(fav.id, fav.name)}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        {favorites.length > 0 && (
          <div className="flex justify-end mt-4 pt-4 border-t">
            <Button variant="destructive" size="sm" onClick={handleClear}>
              <Trash2 className="h-4 w-4 mr-1" />
              Limpiar todo
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
