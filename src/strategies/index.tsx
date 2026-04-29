import comfyStrategy from "./themes/comfy";
import defaultStrategy from "./themes/default";
import type { ThemeStrategy } from "./types";

const strategyMap: Record<string, ThemeStrategy> = {
  comfyui: comfyStrategy
};

export function getStrategy(themeVariant?: string): ThemeStrategy {
  if (!themeVariant) {
    return defaultStrategy;
  }

  return strategyMap[themeVariant] ?? defaultStrategy;
}
