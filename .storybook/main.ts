import type { StorybookConfig } from "@storybook/react-vite";
import { mergeConfig } from "vite";

const config: StorybookConfig = {
    stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
    addons: [],
    framework: {
        name: "@storybook/react-vite",
        options: {}
    },
    staticDirs: ["../public"],
    viteFinal: async (config) => {
        const { default: svgr } = await import("vite-plugin-svgr");
        return mergeConfig(config, {
            plugins: [svgr()],
        });
    },
};
export default config;
