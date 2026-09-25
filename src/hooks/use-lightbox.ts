"use client";

import { useCallback, useState } from "react";
import { GalleryItem } from "@/data/portfolio";

export function useLightbox() {
  const [image, setImage] = useState<GalleryItem | null>(null);
  const [originRect, setOriginRect] = useState<DOMRect | null>(null);

  const open = useCallback((item: GalleryItem, rect: DOMRect | null) => {
    setOriginRect(rect);
    setImage(item);
  }, []);

  const onOpenChange = useCallback((nextOpen: boolean) => {
    if (!nextOpen) {
      setImage(null);
      setOriginRect(null);
    }
  }, []);

  return { image, originRect, open, onOpenChange };
}
