import { useEffect } from "react";
import { clsx } from "keycloakify/tools/clsx";
import type { TemplateProps } from "keycloakify/login/TemplateProps";
import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import { useSetClassName } from "keycloakify/tools/useSetClassName";
import { useInitialize } from "keycloakify/login/Template.useInitialize";
import type { I18n } from "./i18n";
import type { KcContext } from "./KcContext";
import { getStrategy } from "../strategies";
import { TemplateRenderContext } from "../strategies/types";
import defaultStrategy from "../strategies/themes/default";

export default function Template(props: TemplateProps<KcContext, I18n>) {
  const { documentTitle, bodyClassName, kcContext, i18n, classes } = props;

  let { doUseDefaultCss } = props;

  const strategy = getStrategy(kcContext.client.attributes.themeVariant);

  if (!(strategy === defaultStrategy)) {
    doUseDefaultCss = false;
  }

  const { kcClsx } = getKcClsx({ doUseDefaultCss, classes });

  const { msg, msgStr, currentLanguage, enabledLanguages } = i18n;

  const { realm } = kcContext;

  useEffect(() => {
    document.title = documentTitle ?? msgStr("loginTitle", realm.displayName || realm.name);
  }, []);

  useSetClassName({
    qualifiedName: "html",
    className: kcClsx("kcHtmlClass")
  });

  useSetClassName({
    qualifiedName: "body",
    className: bodyClassName ?? kcClsx("kcBodyClass")
  });

  const { isReadyToRender } = useInitialize({ kcContext, doUseDefaultCss });

  if (!isReadyToRender) {
    return null;
  }

  const ctx: TemplateRenderContext = { ...props, kcClsx, clsx, msg, msgStr, currentLanguage, enabledLanguages };

  return <>{strategy.render(ctx)}</>;
}
