"use client";
import { useEffect, useRef } from "react";


const DotTravelAnimation = () => {
     const canvasRef = useRef<HTMLCanvasElement | null>(null);
      interface Connection {
       xA: number; yA: number;
       xB: number; yB: number;
       progress: number;
       speed: number;
       delay: number; // Number of frames to wait before starting
       isSettled: boolean;
     }

    
     useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 1. Define connections with different delays
    const connections: Connection[] = [
      { xA: 50,  yA: 50,  xB: 300, yB: 100, progress: 0, speed: 0.005, delay: 0,   isSettled: false },
      { xA: 100, yA: 300, xB: 400, yB: 250, progress: 0, speed: 0.008, delay: 40,  isSettled: false }, // Starts after ~0.6s
      { xA: 500, yA: 50,  xB: 200, yB: 350, progress: 0, speed: 0.003, delay: 90,  isSettled: false }, // Starts after ~1.5s
      { xA: 600, yA: 300, xB: 100, yB: 100, progress: 0, speed: 0.006, delay: 150, isSettled: false }, // Starts after ~2.5s
    ];

    const blueColor = '#3182ce';

    const drawNode = (x: number, y: number, alpha: number = 1) => {
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.beginPath();
      ctx.shadowBlur = 15;
      ctx.shadowColor = blueColor;
      ctx.arc(x, y, 6, 0, Math.PI * 2);
      ctx.fillStyle = blueColor;
      ctx.fill();
      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      connections.forEach((conn) => {
        // Only start moving if delay is finished
        if (conn.delay > 0) {
          conn.delay -= 1; // Count down
          // Optional: Draw a "faded" Point A to show where it WILL start
          drawNode(conn.xA, conn.yA, 0.2); 
          return; 
        }

        // Draw Point A (full brightness now that it's active)
        drawNode(conn.xA, conn.yA);

        const curX = conn.xA + (conn.xB - conn.xA) * conn.progress;
        const curY = conn.yA + (conn.yB - conn.yA) * conn.progress;

        // Draw Line
        ctx.beginPath();
        ctx.lineWidth=5;
        ctx.moveTo(conn.xA, conn.yA);
        ctx.lineTo(curX, curY);
        ctx.strokeStyle = blueColor;
        ctx.globalAlpha = 0.3;
        ctx.stroke();
        ctx.globalAlpha = 1.0;

        // Draw Traveler
        drawNode(curX, curY);

        if (conn.progress < 1) {
          conn.progress += conn.speed;
        } else {
          conn.progress = 1;
          conn.isSettled = true;
        }
      });

      const allSettled = connections.every(c => c.isSettled);
      if (!allSettled) {
        requestAnimationFrame(animate);
      }
    };

    animate();
  }, []);
    // Your animation logic goes here (drawing circles/lines)
    // and updating them using requestAnimationFrame
  
  return (
    <canvas
      ref={canvasRef}
      width={800}
      height={400}
      style={{ background: "brand.login", borderRadius: '8px' }} // Dark dashboard theme
    />
  )
}

export default DotTravelAnimation