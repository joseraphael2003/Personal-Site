"use client";

import { useEffect, useMemo, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import Draggable from "gsap/Draggable";
import { GalleryItem } from "@/data/portfolio";

if (typeof window !== "undefined") {
  gsap.registerPlugin(Draggable);
}

interface DraggableMarqueeProps {
  items: GalleryItem[];
  speed?: number;
  repeatCount?: number;
  className?: string;
  itemClassName?: string;
  pauseOnHover?: boolean;
  onItemClick?: (index: number, item?: GalleryItem, rect?: DOMRect) => void;
  selectedIndex?: number;
  label?: string;
}

export function DraggableMarquee({
  items = [],
  speed = 0.6,
  repeatCount = 3,
  className = "",
  itemClassName = "",
  pauseOnHover = true,
  onItemClick,
  selectedIndex,
  label = "Image marquee. Drag horizontally or use arrow keys.",
}: DraggableMarqueeProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<Draggable | null>(null);

  // Duplicate items to enable continuous wrapping
  const duplicatedItems = useMemo(() => {
    if (!items.length) return [];
    if (items.length <= 1) return items;
    return Array.from({ length: repeatCount }).flatMap(() => items);
  }, [items, repeatCount]);

  useEffect(() => {
    if (!rootRef.current || !trackRef.current || items.length <= 1) return;

    const root = rootRef.current;
    const track = trackRef.current;

    let singleSetWidth = 0;
    let x = 0;
    let throwVelocity = 0;
    let isPointerOver = false;
    let isDragging = false;
    let lastDragX = 0;
    let lastDragTime = 0;
    let resizeRaf: number | null = null;

    let wrapValue = (val: number) => val;
    const observers: ResizeObserver[] = [];
    const setX = gsap.quickSetter(track, "x", "px");

    const getGap = () => {
      const styles = window.getComputedStyle(track);
      return parseFloat(styles.columnGap || styles.gap || "0");
    };

    const buildWrap = () => {
      const min = -singleSetWidth;
      const max = 0;
      wrapValue = gsap.utils.wrap(min, max);
    };

    const getProgressInLoop = () => {
      if (!singleSetWidth) return 0;
      const min = -singleSetWidth;
      const max = 0;
      const range = max - min;
      if (!range) return 0;

      let wrapped = x;
      while (wrapped < min) wrapped += range;
      while (wrapped > max) wrapped -= range;
      return (wrapped - min) / range;
    };

    const setProgressInLoop = (progress: number) => {
      if (!singleSetWidth) return;
      const min = -singleSetWidth;
      const max = 0;
      const range = max - min;
      x = min + range * progress;
      x = wrapValue(x);
      setX(x);
      if (dragRef.current) {
        dragRef.current.update();
      }
    };

    const measure = () => {
      const children = Array.from(track.children) as HTMLElement[];
      const setSize = Math.floor(children.length / repeatCount);
      const firstSetChildren = children.slice(0, setSize);
      const gap = getGap();

      if (!firstSetChildren.length) return;

      const prevProgress = getProgressInLoop();
      const widths = firstSetChildren.reduce(
        (sum, child) => sum + child.getBoundingClientRect().width,
        0
      );

      singleSetWidth = widths + gap * firstSetChildren.length;
      buildWrap();

      if (!Number.isFinite(prevProgress)) {
        x = wrapValue(0);
        setX(x);
      } else {
        setProgressInLoop(prevProgress);
      }
    };

    const scheduleMeasure = () => {
      if (resizeRaf) cancelAnimationFrame(resizeRaf);
      resizeRaf = requestAnimationFrame(() => {
        measure();
      });
    };

    const update = () => {
      if (!isDragging) {
        if (!(pauseOnHover && isPointerOver)) {
          x -= speed;
        }
        x += throwVelocity;
        throwVelocity *= 0.975;
        if (Math.abs(throwVelocity) < 0.01) {
          throwVelocity = 0;
        }
      }
      x = wrapValue(x);
      setX(x);
    };

    measure();

    const draggables = Draggable.create(track, {
      type: "x",
      allowContextMenu: true,
      dragClickables: true,
      onPress() {
        isDragging = true;
        throwVelocity = 0;
        this.x = x;
        lastDragX = this.x;
        lastDragTime = performance.now();
      },
      onDrag() {
        const now = performance.now();
        const dx = this.x - lastDragX;
        const dt = now - lastDragTime;
        x = wrapValue(this.x);
        setX(x);
        this.x = x;

        if (dt > 0) {
          const sampledVelocity = (dx / dt) * 16.67;
          // Apply minimal momentum only on high-speed intentional flicks
          if (Math.abs(sampledVelocity) > 2) {
            throwVelocity = gsap.utils.clamp(-25, 25, sampledVelocity * 0.8);
          } else {
            throwVelocity = 0;
          }
        }
        lastDragX = this.x;
        lastDragTime = now;
      },
      onRelease() {
        isDragging = false;
      },
    });

    dragRef.current = draggables[0] || null;

    const handleMouseEnter = () => {
      isPointerOver = true;
    };
    const handleMouseLeave = () => {
      isPointerOver = false;
    };

    if (pauseOnHover) {
      root.addEventListener("mouseenter", handleMouseEnter);
      root.addEventListener("mouseleave", handleMouseLeave);
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      event.preventDefault();
      x = wrapValue(x + (event.key === "ArrowLeft" ? 1 : -1) * root.clientWidth * 0.35);
      throwVelocity = 0;
      setX(x);
    };

    root.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", scheduleMeasure);

    const trackObserver = new ResizeObserver(() => {
      scheduleMeasure();
    });
    trackObserver.observe(track);
    observers.push(trackObserver);

    gsap.ticker.add(update);

    return () => {
      root.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", scheduleMeasure);
      if (pauseOnHover) {
        root.removeEventListener("mouseenter", handleMouseEnter);
        root.removeEventListener("mouseleave", handleMouseLeave);
      }
      gsap.ticker.remove(update);
      if (resizeRaf) cancelAnimationFrame(resizeRaf);
      observers.forEach((obs) => obs.disconnect());
      if (dragRef.current) {
        dragRef.current.kill();
        dragRef.current = null;
      }
    };
  }, [items, speed, repeatCount, pauseOnHover]);

  if (!items.length) return null;

  return (
    <div
      ref={rootRef}
      tabIndex={0}
      role="region"
      aria-label={label}
      className={`relative w-full overflow-hidden cursor-grab active:cursor-grabbing outline-none select-none ${className}`}
    >
      <div
        ref={trackRef}
        className="flex w-max items-center gap-3 py-1 will-change-transform"
      >
        {duplicatedItems.map((item, index) => {
          const originalIndex = index % items.length;
          const isSelected = selectedIndex === originalIndex;

          return (
            <button
              type="button"
              key={`${item.src}-${index}`}
              onClick={(e) => onItemClick?.(originalIndex, item, e.currentTarget.getBoundingClientRect())}
              className={`shrink-0 text-left transition-all rounded-sm overflow-hidden border cursor-pointer ${
                isSelected
                  ? "border-accent-hover ring-1 ring-accent-hover opacity-100"
                  : "border-neutral-800 opacity-70 hover:opacity-100 hover:border-neutral-700"
              } ${itemClassName}`}
              aria-label={item.caption || `Image ${originalIndex + 1}`}
              aria-hidden={index >= items.length ? "true" : undefined}
              tabIndex={index >= items.length ? -1 : 0}
            >
              <div className="relative aspect-video w-32 sm:w-40 lg:w-44 bg-neutral-900">
                <Image
                  src={item.src}
                  alt={item.caption || "Thumbnail"}
                  fill
                  sizes="180px"
                  className="object-cover"
                />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
