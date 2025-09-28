'use client';
import React, { useEffect, useRef } from 'react';

interface FollowCursorProps {
  color?: string;
  imageFilter?: string;
}

const FollowCursor: React.FC<FollowCursorProps> = ({
  color = '#323232a6',
  imageFilter = 'blur(2px) brightness(0.7)',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const hoveredRef = useRef(false);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrame: number;
    let width = window.innerWidth;
    let height = window.innerHeight;
    let cursor = { x: width / 2, y: height / 2 };
    let dot = { x: width / 2, y: height / 2, radius: 10, speed: 0.2 };

    canvas.width = width;
    canvas.height = height;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    );
    if (prefersReducedMotion.matches) return;

    // Track hover only on mousemove
    const onMouseMove = (e: MouseEvent) => {
      cursor.x = e.clientX;
      cursor.y = e.clientY;

      const element = document.elementFromPoint(cursor.x, cursor.y);
      hoveredRef.current = !!element && element.tagName === 'IMG';
    };

    const onWindowResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    const updateDot = () => {
      // Smooth movement
      dot.x += (cursor.x - dot.x) * dot.speed;
      dot.y += (cursor.y - dot.y) * dot.speed;

      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = color;
      ctx.filter = hoveredRef.current ? imageFilter : 'none';
      ctx.beginPath();
      ctx.arc(dot.x, dot.y, dot.radius, 0, 2 * Math.PI);
      ctx.fill();
      ctx.closePath();
    };

    const loop = () => {
      updateDot();
      animationFrame = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('resize', onWindowResize);

    loop();

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onWindowResize);
    };
  }, [color, imageFilter]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-[999] hidden sm:block"
    />
  );
};

export default FollowCursor;
