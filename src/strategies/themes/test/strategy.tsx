import { ThemeStrategy } from "../../types";
import { TemplateRenderContext } from "../../types";
import "./style.css?url";

export const testStrategy: ThemeStrategy = {
  render(ctx: TemplateRenderContext) {
    const { kcContext, msg, children } = ctx;
    const { message } = kcContext;

    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center testStrategy">
        <div className="bg-gray-800 p-8 rounded-xl w-96">
          <h1 className="text-white text-2xl mb-4 text-center">{msg("loginTitle", "your account")}</h1>
          {message && <div className="text-red-400 mb-4">{message.summary}</div>}
          {children}
        </div>
      </div>
    );
  }
};
