// This class serves purpose of abstracting canvas painting logic to hook
import { useState, useEffect, useRef } from "react";

export const canvasWidth = 256;
export const canvasHeight = 128;

// Get an 32-step rgb color array sorted by hue
const getSortedRGBs = () => {
  // Array of 32768 rgb colors (32*32*32)
  let colors = [];
  for (let r = 8; r <= 256; r += 8) {
    for (let g = 8; g <= 256; g += 8) {
      for (let b = 8; b <= 256; b += 8) {
        colors.push({ r, g, b });
      }
    }
  }

  // Sort rgb colors by hue
  return colors
    .map((color, index) => {
      // Convert to HSL and keep track of original index
      return { color: rgbToHsl(color), index };
    })
    .sort((a, b) => {
      // Sort by hue
      return b.color.h - a.color.h;
    })
    .map((c) => {
      // Retrieve original RGB color
      return colors[c.index];
    });
};

// Converts {r,g,b} color to {h,s,l}
const rgbToHsl = (rgb) => {
  let { r, g, b } = rgb;
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h,
    s,
    l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    // eslint-disable-next-line default-case
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }
  return { h: h * 360, s: s * 100, l: l * 100 };
};

// Paint color array to canvas
const draw = (ctx, colors, location) => {
  // console.log(colors);
  colors.forEach((color, index) => {
    const { r, g, b } = color;
    ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
    ctx.fillRect((Math.floor(index / canvasHeight) + location.x) % canvasWidth, index % canvasHeight, 1, 1);
  });
};

export const useCanvas = () => {
  const canvasRef = useRef(null);
  const [coordinates, setCoordinates] = useState([]);
  let colors = getSortedRGBs();

  useEffect(() => {
    const canvasObj = canvasRef.current;
    const ctx = canvasObj.getContext("2d");
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    draw(ctx, colors, coordinates);
  });

  return [coordinates, setCoordinates, canvasRef, canvasWidth, canvasHeight];
};
