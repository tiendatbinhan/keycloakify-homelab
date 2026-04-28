import { ThemeStrategy, TemplateRenderContext } from "../../types";
import ComfyuiLogo from "../../../assets/comfyui-text.svg?react";
import "./styles.css"
import { useGetQuote } from "../../hooks/useGetQuotes";
import { kcSanitize } from "keycloakify/lib/kcSanitize";

function RenderQuote() {
  const quote = useGetQuote();

  return <>
    {quote && 
      <div className="flex flex-col items-center justify-center mb-6">
        <p className="text-base text-[#f2ff59] italic">"{quote.text}"</p>
        <p className="text-xs text-white not-italic self-end">{quote.author}</p>
      </div>
    }
  </>
}

function RenderMessage(props: {type: "success" | "warning" | "error" | "info", summary: string}) {
  return <div className="flex flex-row p-4 mb-4 rounded-lg border-2 border-red-400">
    <i className="comfyStrategy messageIcon" />
    <div className="text-red-400" dangerouslySetInnerHTML={{ __html: kcSanitize(props.summary) }}/>
  </div>
}

export const comfyStrategy: ThemeStrategy = {
  render: (ctx: TemplateRenderContext) => {
    const { kcContext, children } = ctx;
    const { message } = kcContext;

    return (
      <div className="comfyStrategy">
        <div className="mainBackground">
          <ComfyuiLogo className="w-auto h-16 text-[#f2ff59] mb-6" />
          <RenderQuote />
          {message && <RenderMessage type={message.type} summary={message.summary}/>}
          <div className="border-2 border-[#f2ff59] p-8 rounded-xl w-4/12 flex flex-col">
            {children}
          </div>
        </div>
      </div>
    )
  }
}
