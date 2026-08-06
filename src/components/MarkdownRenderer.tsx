import React from "react";
import { Renderer, type RendererInterface } from "react-native-marked";
import YoutubeCard from "./YoutubeCard";

function extractVideoId(src: string): string | null {
  const embedMatch = src.match(/youtube\.com\/embed\/([^?&"']+)/);
  if (embedMatch) return embedMatch[1];

  const watchMatch = src.match(/[?&]v=([^&"']+)/);
  if (watchMatch) return watchMatch[1];

  const shortMatch = src.match(/youtu\.be\/([^?&"']+)/);
  if (shortMatch) return shortMatch[1];

  return null;
}

function extractTitle(raw: string): string | undefined {
  const titleMatch = raw.match(/title=["']([^"']+)["']/);
  return titleMatch ? titleMatch[1] : undefined;
}

export default class CustomRenderer
  extends Renderer
  implements RendererInterface
{
  html(raw: string): React.ReactNode {
    const srcMatch = raw.match(/src=["'](https?:\/\/[^"']+)["']/);

    if (srcMatch) {
      const src = srcMatch[1];
      const isYoutube = src.includes("youtube.com") || src.includes("youtu.be");

      if (isYoutube) {
        const videoId = extractVideoId(src);
        const title = extractTitle(raw);

        if (videoId) {
          return <YoutubeCard key={videoId} videoId={videoId} title={title} />;
        }
      }
    }

    return null;
  }
}
