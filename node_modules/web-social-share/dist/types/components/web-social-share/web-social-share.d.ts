import { EventEmitter } from '../../stencil-public-runtime';
import { WebSocialShareInput } from '../../types/web-social-share-input';
/**
 * @slot facebook - A slot to display an icon or text in the related social share button
 * @slot twitter - A slot to display an icon or text in the related social share button
 * @slot email - A slot to display an icon or text in the related social share button
 * @slot linkedin - A slot to display an icon or text in the related social share button
 * @slot pinterest - A slot to display an icon or text in the related social share button
 * @slot whatsapp - A slot to display an icon or text in the related social share button
 * @slot copy - A slot to display an icon or text in the related social share button
 * @slot hackernews - A slot to display an icon or text in the related social share button
 */
export declare class WebSocialShare {
  el: HTMLElement;
  /**
   * An event triggered when the modal is `closed`
   */
  closed: EventEmitter<void>;
  /**
   * Trigger the display, or close, of the action sheet which contains the social-share options
   */
  show: boolean;
  /**
   * The share options
   */
  share: WebSocialShareInput;
  private refContainer;
  private hide;
  private handleShare;
  render(): any;
  private renderTargets;
  private renderButtons;
  private renderButton;
  private renderName;
}
