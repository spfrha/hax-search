import type { Components, JSX } from "../types/interface";

interface WebSocialShare extends Components.WebSocialShare, HTMLElement {}
export const WebSocialShare: {
  prototype: WebSocialShare;
  new (): WebSocialShare;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
