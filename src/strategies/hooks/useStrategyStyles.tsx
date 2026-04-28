import { useEffect } from "react";
import type { ThemeStrategy } from "../types";

export function useStrategyStyles(strategy: ThemeStrategy) {
  useEffect(() => {
    if (!strategy.cssUrl) {
        return;
    }

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = strategy.cssUrl;
    document.head.appendChild(link);
    
    return () => {
        document.head.removeChild(link)
    };
  }, [strategy.cssUrl]);
}