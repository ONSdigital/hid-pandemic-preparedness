import type { Asset } from "@localTypes/Asset";

export interface VideoProps {
  title: string;
  url: string;
  start?: number;
  end?: number;
  transcript?: Asset;
}
