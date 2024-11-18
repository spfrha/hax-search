import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";

export class HaxCard extends DDDSuper(I18NMixin(LitElement)) {

  constructor() {
    super();
    this.title = '';
    this.description = '';
    this.slug = '';
    this.baseUrl = '';
    this.metadata = null;
  }

  static get properties() {
    return {
      title: { type: String },
      description: { type: String },
      slug: { type: String },
      baseUrl: { type: String },
      metadata: { type: Object }
    };
  }

  static get styles() {
    return [super.styles,css`
      :host {
        display: block;
        text-align: center;
      }

      .card {
        height: 400px;
        background: linear-gradient(to bottom right, #e09137, #8f94fb);
        border: 1px solid red;

      .content {
        padding: var(--ddd-spacing-4);
      }

      .title {
        text-align: center;
        font-size: var(--ddd-spacing-6);
        font-weight: var(--ddd-font-weight-bold);
      }

      .description {
        color: var(--ddd-theme-default-potential70);
        overflow: hidden;
        height: var(--ddd-spacing-24);
        max-height: var(--ddd-spacing-24);
      }

      .metadata {
        margin-top: var(--ddd-spacing-3);
        font-size: var(--ddd-spacing-4);
        color: var(--ddd-theme-default-potential50);
        margin-bottom: var(--ddd-spacing-4);
      }

      .actions {
        display: flex;
      }

      .button {
        padding: var(--ddd-spacing-3) var(--ddd-spacing-3);
        text-decoration: none;
      }

    `];
  }

  render() {
    const content = `${this.baseUrl}${this.slug}`;
    const sources = `${this.baseUrl}${this.location}`;

    return html`
      <div class="card">
        <div class="content">
          <div class="title">${this.title}</div>
        </div>
        ${this.metadata?.image ? html`
          <img src="${this.metadata.image}" alt="${this.title}" style="width: 322px; max-height: 200px; object-fit: cover;">
        ` : ''}
        <div class="content">
          <div class="description">${this.description}</div>
          <div class="metadata">
            <div>Updated: ${this.dateToString(this.metadata?.updated)}</div>
            <div class="spacer"></div>
            <div>Read time: ${this.metadata?.readtime} minute(s)</div>
          </div>
          <div class="actions">
            <a href="${content}" target="_blank" class="button primary">View Content</a>
            <a href="${sources}" target="_blank" class="button secondary">View Source</a>
          </div>
        </div>
      </div>
    `;
  }

  dateToString(timestamp){
    const date = new Date(timestamp * 1000);
    return date.toUTCString();
  }

  static get tag() {
    return "hax-card";
  }
}

customElements.define(HaxCard.tag, HaxCard);