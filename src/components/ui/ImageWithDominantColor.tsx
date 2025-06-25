import Image from "next/image";
import React, { useRef } from "react";

export default function ImageWithDominantColor({
  imageUrl,
  onDominantColorFound,
  ...props
}: {
  imageUrl: string;
  onDominantColorFound: (color: string) => void;
  [key: string]: any;
}) {
  const imgRef = useRef<HTMLImageElement>(null);

  const getDominantColor = async (): Promise<string> => {
    try {
      if (imgRef.current === null) return "";

      const width = imgRef.current.naturalWidth;
      const height = imgRef.current.naturalHeight;
      const sampleSize = Math.min(width, height, 100);

      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      canvas.width = sampleSize;
      canvas.height = sampleSize;
      context?.drawImage(imgRef.current, 0, 0, width, height);

      const pixelData = context?.getImageData(
        0,
        0,
        sampleSize,
        sampleSize
      ).data;
      if (pixelData === null || pixelData === undefined) return "";

      const colorMap: Record<string, number> = {};
      const colorRGB: Record<string, [number, number, number]> = {};

      for (let i = 0; i < pixelData.length; i += 4) {
        if (pixelData[i + 3] < 200) continue;

        const r = pixelData[i];
        const g = pixelData[i + 1];
        const b = pixelData[i + 2];

        // Skip les pixels trop proches du blanc/noir
        if ((r < 10 && g < 10 && b < 10) || (r > 245 && g > 245 && b > 245)) {
          continue;
        }

        const quantizedR = Math.round(r / 10) * 10;
        const quantizedG = Math.round(r / 10) * 10;
        const quantizedB = Math.round(r / 10) * 10;

        const colorKey = `${quantizedR}-${quantizedG}-${quantizedB}`;
        colorMap[colorKey] = (colorMap[colorKey] || 0) + 1;

        if (!colorRGB[colorKey]) {
          colorRGB[colorKey] = [r, g, b];
        } else {
          colorRGB[colorKey][0] = (colorRGB[colorKey][0] + r) / 2;
          colorRGB[colorKey][1] = (colorRGB[colorKey][1] + g) / 2;
          colorRGB[colorKey][2] = (colorRGB[colorKey][2] + b) / 2;
        }
      }

      let maxFrequency = 0;
      let dominantColorKey = "";
      for (const [colorKey, frequency] of Object.entries(colorMap)) {
        if (frequency > maxFrequency) {
          maxFrequency = frequency;
          dominantColorKey = colorKey;
        }
      }

      if (!dominantColorKey) {
        return "";
      }
      const [r, g, b] = colorRGB[dominantColorKey];

      const toHex = (value: number): string => {
        const hex = Math.round(value).toString(16);
        return hex.length === 1 ? "0" + hex : hex;
      };

      const hexColor = `#${toHex(r)}${toHex(g)}${toHex(b)}`;
      return hexColor;
    } catch (error) {
      console.error(error);
      return "";
    }
  };

  return (
    <Image
      {...props}
      src={imageUrl}
      alt={imageUrl}
      fill
      onLoad={() => {
        getDominantColor().then((color) => {
          if (color === "") return;
          onDominantColorFound(color);
        });
      }}
      ref={imgRef}
    />
  );
}
