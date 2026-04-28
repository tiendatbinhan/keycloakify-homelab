import comfyStrategy from "./themes/comfy";
import defaultStrategy from "./themes/default";
import testStrategy from "./themes/test";
import type { ThemeStrategy } from "./types";

const strategyMap: Record<string, ThemeStrategy> = {
  "test": testStrategy,
  "comfy": comfyStrategy,
};

export function getStrategy(themeVariant?: string): ThemeStrategy {
  if (!themeVariant) {
    return defaultStrategy;
  }
  
  return strategyMap[themeVariant] ?? defaultStrategy;
}