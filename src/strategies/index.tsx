import { defaultStrategy } from "./themes/default.strategy";
import type { ThemeStrategy } from "./types";

const strategyMap: Record<string, ThemeStrategy> = {

};

export function getStrategy(themeVariant?: string): ThemeStrategy {
  if (!themeVariant) {
    return defaultStrategy;
  }
  
  return strategyMap[themeVariant] ?? defaultStrategy;
}