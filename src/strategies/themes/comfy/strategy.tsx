import { ThemeStrategy, TemplateRenderContext } from "../../types";
import ComfyuiLogo from "../../../assets/images/comfyui-text.svg?react";
import "./styles.css";
import "@fontsource/arimo/400.css";
import { RenderQuote } from "../../components/comfy/RenderQuote";
import { RenderMessage } from "../../components/comfy/RenderMessage";

export const comfyStrategy: ThemeStrategy = {
  render: (ctx: TemplateRenderContext) => {
    const { kcContext, children } = ctx;
    const { message } = kcContext;

    return (
      <div className="comfyStrategy">
        <div className="mainBackground">
          <ComfyuiLogo className="w-auto h-16 text-[#f2ff59] mb-6" />
          <RenderQuote />
          {message && <RenderMessage type={message.type} summary={message.summary} />}
          <div className="border-2 border-[#f2ff59] p-8 rounded-xl w-4/12 flex flex-col">{children}</div>
        </div>
      </div>
    );
  },
  documentTitle: "Sign in to ComfyUI"
};
