import defaultStrategy from "./themes/default";
import testStrategy from "./themes/test";
import type { ThemeStrategy } from "./types";

const strategyMap: Record<string, ThemeStrategy> = {
  "test": testStrategy
};

export function getStrategy(themeVariant?: string): ThemeStrategy {
  if (!themeVariant) {
    return defaultStrategy;
  }
  
  return strategyMap[themeVariant] ?? defaultStrategy;
}