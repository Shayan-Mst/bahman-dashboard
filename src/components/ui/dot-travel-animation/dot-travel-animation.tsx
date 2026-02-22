"use client";
import { useEffect, useRef } from "react";


const DotTravelAnimation = () => {
     const canvasRef = useRef<HTMLCanvasElement | null>(null);
      interface Connection {
       xA: number; yA: number;
       xB: number; yB: number;
       fillStyle : string,
       progress: number;
       speed: number;
       delay: number; // Number of frames to wait before starting
       isSettled: boolean;
     }
    
     const colors = ["#fec711", "#0aab75", "#f46906"]; // Yellow, Teal, Red
    // 1. Define connections with different delays
    const connections: Connection[] = [
      { xA: 100,  yA: 50,  xB: 150, yB: 200, progress: 0, speed: 0.005, delay: 0, fillStyle : colors[0] ,  isSettled: false },
      { xA: 100, yA: 200, xB: 250, yB: 50, progress: 0, speed: 0.008, delay: 40,fillStyle : colors[1] ,  isSettled: false }, // Starts after ~0.6s
      { xA: 250, yA: 50,  xB: 300, yB: 150, progress: 0, speed: 0.006, delay: 170, fillStyle : colors[1] , isSettled: false }, // Starts after ~1.5s
      { xA: 350, yA: 25, xB: 200, yB: 200, progress: 0, speed: 0.006, delay: 150,fillStyle : colors[2] , isSettled: false }, // Starts after ~2.5s
    ];

     useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const drawNode = (x: number, y: number, color:string,alpha: number = 1) => {
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.beginPath();
      ctx.shadowBlur = 11;
      ctx.shadowColor = color;
      ctx.arc(x, y, 3, 0, Math.PI * 2);
      ctx.fillStyle = color;
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
          drawNode(conn.xA, conn.yA,conn.fillStyle ,0.2); 
          return; 
        }

        // Draw Point A (full brightness now that it's active)
        drawNode(conn.xA, conn.yA,conn.fillStyle);

        const curX = conn.xA + (conn.xB - conn.xA) * conn.progress;
        const curY = conn.yA + (conn.yB - conn.yA) * conn.progress;

        // Draw Line
        ctx.beginPath();
        ctx.lineWidth=2;
        ctx.moveTo(conn.xA, conn.yA);
        ctx.lineTo(curX, curY);
        ctx.strokeStyle = conn.fillStyle;
        ctx.globalAlpha = 0.3;
        ctx.stroke();
        ctx.globalAlpha = 1.0;

        // Draw Traveler
        drawNode(curX, curY,conn.fillStyle);

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
      width={475}
      height={290}
      style={{ background: "brand.login", borderRadius: '8px' }} // Dark dashboard theme
    />
  )
}

export default DotTravelAnimation