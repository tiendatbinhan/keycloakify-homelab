import { kcSanitize } from "keycloakify/lib/kcSanitize";

export function RenderMessage(props: { type: "success" | "warning" | "error" | "info"; summary: string }) {
  return (
    <div className="flex flex-row p-4 mb-4 rounded-lg border-2 border-red-400">
      <i className="comfyStrategy messageIcon" />
      <div className="text-red-400" dangerouslySetInnerHTML={{ __html: kcSanitize(props.summary) }} />
    </div>
  );
}
