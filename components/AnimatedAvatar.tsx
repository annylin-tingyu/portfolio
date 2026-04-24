"use client";

import Lottie from "lottie-react";
import { useEffect, useRef, useState } from "react";

type AnimatedAvatarProps = {
  src: string;
  speed?: number;
  className?: string;
  style?: React.CSSProperties;
};

export function AnimatedAvatar({
  src,
  speed = 0.6,
  className,
  style,
}: AnimatedAvatarProps) {
  const [animationData, setAnimationData] = useState<unknown | null>(null);
  const lottieRef = useRef<{
    setSpeed?: (value: number) => void;
  } | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      const response = await fetch(src);
      if (!response.ok) return;
      const json = (await response.json()) as unknown;
      if (!cancelled) setAnimationData(json);
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [src]);

  useEffect(() => {
    lottieRef.current?.setSpeed?.(speed);
  }, [speed, animationData]);

  if (!animationData) return null;

  return (
    <Lottie
      animationData={animationData}
      loop
      autoplay
      lottieRef={lottieRef}
      className={className}
      style={style}
    />
  );
}

