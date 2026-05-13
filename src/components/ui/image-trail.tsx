"use client";

import {
  Children,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  AnimationSequence,
  motion,
  Target,
  Transition,
  useAnimate,
  useAnimationFrame,
} from "framer-motion";

type TrailSegment = [Target, Transition];
export type TrailAnimationSequence = TrailSegment[];

interface ImageTrailProps {
  children: React.ReactNode;
  containerRef: React.RefObject<HTMLElement | null>;
  newOnTop?: boolean;
  rotationRange?: number;
  animationSequence?: TrailAnimationSequence;
  interval?: number;
  autoPlay?: boolean;
}

interface TrailItem {
  id: string;
  x: number;
  y: number;
  rotation: number;
  child: React.ReactNode;
}

const DEFAULT_SEQUENCE: TrailAnimationSequence = [
  [{ scale: 1, opacity: 1 }, { duration: 0.14, ease: "circOut" }],
  [{ scale: 0.55, opacity: 0 }, { duration: 0.7, ease: "circIn" }],
];

function makeId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export function ImageTrail({
  children,
  containerRef,
  newOnTop = true,
  rotationRange = 14,
  animationSequence = DEFAULT_SEQUENCE,
  interval = 110,
  autoPlay = false,
}: ImageTrailProps) {
  const [items, setItems] = useState<TrailItem[]>([]);
  const childrenArray = useMemo(() => Children.toArray(children), [children]);
  const indexRef = useRef(0);
  const mousePosRef = useRef<{ x: number; y: number } | null>(null);
  const lastPosRef = useRef<{ x: number; y: number } | null>(null);
  const lastAddRef = useRef(0);

  const addItem = useCallback(
    (x: number, y: number) => {
      if (childrenArray.length === 0) return;
      const child = childrenArray[indexRef.current];
      indexRef.current = (indexRef.current + 1) % childrenArray.length;
      const item: TrailItem = {
        id: makeId(),
        x,
        y,
        rotation: (Math.random() - 0.5) * rotationRange * 2,
        child,
      };
      setItems((prev) => (newOnTop ? [...prev, item] : [item, ...prev]));
    },
    [childrenArray, newOnTop, rotationRange]
  );

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((it) => it.id !== id));
  }, []);

  useEffect(() => {
    if (autoPlay) return;
    const el = containerRef.current;
    if (!el) return;
    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      mousePosRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };
    const onLeave = () => {
      mousePosRef.current = null;
      lastPosRef.current = null;
    };
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [containerRef, autoPlay]);

  useAnimationFrame((time) => {
    if (autoPlay) {
      if (time - lastAddRef.current < interval * 3) return;
      const el = containerRef.current;
      if (!el) return;
      const w = el.offsetWidth;
      const h = el.offsetHeight;
      if (w === 0 || h === 0) return;
      lastAddRef.current = time;
      const x = w * (0.12 + Math.random() * 0.76);
      const y = h * (0.18 + Math.random() * 0.64);
      addItem(x, y);
      return;
    }

    const pos = mousePosRef.current;
    if (!pos) return;
    const last = lastPosRef.current;
    if (last && last.x === pos.x && last.y === pos.y) return;
    lastPosRef.current = pos;
    if (time - lastAddRef.current < interval) return;
    lastAddRef.current = time;
    addItem(pos.x, pos.y);
  });

  return (
    <>
      {items.map((item) => (
        <TrailItemView
          key={item.id}
          item={item}
          sequence={animationSequence}
          onComplete={removeItem}
        />
      ))}
    </>
  );
}

interface TrailItemViewProps {
  item: TrailItem;
  sequence: TrailAnimationSequence;
  onComplete: (id: string) => void;
}

function TrailItemView({ item, sequence, onComplete }: TrailItemViewProps) {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    const fullSequence = sequence.map((seg) => [
      scope.current,
      ...seg,
    ]) as AnimationSequence;
    animate(fullSequence).then(() => onComplete(item.id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.div
      ref={scope}
      className="pointer-events-none absolute"
      style={{
        left: item.x,
        top: item.y,
        rotate: item.rotation,
        translateX: "-50%",
        translateY: "-50%",
        opacity: 0,
        scale: 0.55,
      }}
    >
      {item.child}
    </motion.div>
  );
}
