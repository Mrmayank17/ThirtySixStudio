import { useEffect, useRef, useState } from "react";
import React from "react"; 
import canvasImages from "./canvasImages.js";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

function Canvas({ details }) {
  const { startIndex, numImages, duration, size, top, left, zIndex } = details;

  const [index, setIndex] = useState({ value: startIndex });
  const [responsiveSize, setResponsiveSize] = useState(size);
  const canvasRef = useRef(null);

  // Handle responsive sizing
  useEffect(() => {
    const updateSize = () => {
      const width = window.innerWidth;
      
      // Mobile (< 640px): reduce to 40% of original size
      if (width < 640) {
        setResponsiveSize(size * 0.4);
      } 
      // Tablet (640px - 1024px): reduce to 60% of original size
      else if (width < 1024) {
        setResponsiveSize(size * 0.6);
      } 
      // Desktop: use 80% for better scaling
      else if (width < 1440) {
        setResponsiveSize(size * 0.8);
      }
      // Large desktop: original size
      else {
        setResponsiveSize(size);
      }
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, [size]);

  useGSAP(() => {
    gsap.to(index, {
      value: startIndex + numImages - 1,
      duration: duration,
      repeat: -1,
      ease: "linear",
      onUpdate: () => {
        setIndex({ value: Math.round(index.value) });
      },
    });

    gsap.from(canvasRef.current, {
      opacity: 0,
      duration: 1,
      ease: "power2.inOut",
    });
  });

  useEffect(() => {
    const scale = window.devicePixelRatio;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.src = canvasImages[index.value];
    img.onload = () => {
      canvas.width = canvas.offsetWidth * scale;
      canvas.height = canvas.offsetHeight * scale;
      canvas.style.width = canvas.offsetWidth + "px";
      canvas.style.height = canvas.offsetHeight + "px";

      ctx.scale(scale, scale);
      ctx.drawImage(img, 0, 0, canvas.offsetWidth, canvas.offsetHeight);
    };
  }, [index]);

  // Calculate responsive positioning
  const getResponsiveStyles = () => {
    const width = window.innerWidth;
    
    // Mobile adjustments
    if (width < 640) {
      return {
        width: `${responsiveSize * 1.8}px`,
        height: `${responsiveSize * 1.8}px`,
        top: `${top * 0.8}%`, // Adjust vertical positioning
        left: `${Math.max(5, Math.min(left, 90))}%`, // Keep within bounds
        zIndex: `${zIndex}`,
      };
    }
    
    // Tablet adjustments
    if (width < 1024) {
      return {
        width: `${responsiveSize * 1.8}px`,
        height: `${responsiveSize * 1.8}px`,
        top: `${top * 0.9}%`,
        left: `${left}%`,
        zIndex: `${zIndex}`,
      };
    }
    
    // Desktop - original behavior
    return {
      width: `${responsiveSize * 1.8}px`,
      height: `${responsiveSize * 1.8}px`,
      top: `${top}%`,
      left: `${left}%`,
      zIndex: `${zIndex}`,
    };
  };

  return (
    <canvas
      data-scroll
      data-scroll-speed={Math.random().toFixed(1)}
      ref={canvasRef}
      className="absolute"
      style={getResponsiveStyles()}
      id="canvas"
    ></canvas>
  );
}

export default Canvas;