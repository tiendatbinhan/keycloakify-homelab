import type { TemplateProps } from "keycloakify/login/TemplateProps";
import type { KcContext } from "../login/KcContext";
import type { I18n } from "../login/i18n";
import type { getKcClsx } from "keycloakify/login/lib/kcClsx";
import { clsx } from "keycloakify/tools/clsx";

export type TemplateRenderContext = TemplateProps<KcContext, I18n> & {
  kcClsx: ReturnType<typeof getKcClsx>["kcClsx"];
  clsx: typeof clsx;
  currentLanguage: I18n["currentLanguage"];
  enabledLanguages: I18n["enabledLanguages"];
  msg: I18n["msg"];
  msgStr: I18n["msgStr"];
};

export interface ThemeStrategy {
  render: (ctx: TemplateRenderContext) => React.ReactNode;
}
