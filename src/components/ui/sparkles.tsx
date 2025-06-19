import React, { useRef, useEffect } from "react";

interface Sparkle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  delay: number;
  color: string;
}

interface SparklesCoreProps {
  id?: string;
  className?: string;
  background?: string;
  minSize?: number;
  maxSize?: number;
  particleDensity?: number;
  particleColor?: string;
}

export const SparklesCore: React.FC<SparklesCoreProps> = ({
  id,
  className = "",
  background = "transparent",
  minSize = 1.0,
  maxSize = 1.5,
  particleDensity = 60,
  particleColor = "#FFD700", // gold
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const particles = useRef<Sparkle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let width = canvas.width = canvas.offsetWidth;
    let height = canvas.height = canvas.offsetHeight;

    // Generate sparkles
    particles.current = Array.from({ length: particleDensity }, (_, i) => ({
      id: i,
      x: Math.random() * width,
      y: Math.random() * height,
      size: minSize + Math.random() * (maxSize - minSize),
      opacity: 0.7 + Math.random() * 0.3,
      delay: Math.random() * 0.5,
      color: particleColor,
    }));

    let start: number | null = null;
    function animateSparkles(ts: number) {
      if (!start) start = ts;
      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = "lighter";
      for (const p of particles.current) {
        // Animate sparkle twinkle
        const twinkle = 0.5 + 0.5 * Math.sin((ts / 400 + p.delay * 10 + p.id) * 2);
        ctx.globalAlpha = p.opacity * twinkle;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * twinkle, 0, 2 * Math.PI);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8 * twinkle;
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";
      animationRef.current = requestAnimationFrame(animateSparkles);
    }
    animationRef.current = requestAnimationFrame(animateSparkles);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [minSize, maxSize, particleDensity, particleColor]);

  return (
    <canvas
      id={id}
      ref={canvasRef}
      className={className}
      style={{ width: "100%", height: "100%", display: "block", background }}
      width={300}
      height={100}
    />
  );
}; 