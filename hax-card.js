import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";

export class haxCard extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "hax-card";
  }

  constructor() {
    super();
    this.title = '';
    this.source = '';
    this.alt = '';
    this.desc = '';
  }

  static get properties() {
    return {
      source: { type: String },
      title: { type: String },
      alt: { type: String },
      desc: { type: String }
    };
  }

  static get styles() {
    return [css`
      .card {
        display: inline-grid;
        width: var(--ddd-card-width, 240px);
        height: var(--ddd-card-height, 300px);
        font-size: var(--ddd-font-size-md);
        font-weight: var(--ddd-font-weight-bold);
        border: var(--ddd-border-sm) solid var(--ddd-border-color);
        border-radius: var(--ddd-radius-md);
        transition: background-color 0.2s ease;
      }
      .card:hover {
        background-color: var(--ddd-theme-default-keystoneYellow);
      }

      .title {
        padding: var(--ddd-spacing-2) var(--ddd-spacing-4);
        height: var(--ddd-spacing-10);
        text-align: center;
        color: var(--ddd-primary-color);
      }

      .desc {
        padding: var(--ddd-spacing-2) var(--ddd-spacing-4);
        height: var(--ddd-spacing-20);
        text-align: center;
        color: var(--ddd-secondary-color);
      }

      img {
        width: 100%;
        height: var(--ddd-image-height, 180px);
        display: block;
        border-top-left-radius: var(--ddd-radius-md);
        border-top-right-radius: var(--ddd-radius-md);
      }

      a {
        text-decoration: none;
        color: inherit;
      }
    `];
  }

  render() {
    return html`
      <div class="card">
        <img src="${this.source}" alt="${this.alt}" />
        <div class="title">${this.title}</div>
        <div class="desc">${this.desc}</div>
      </div>
    `;
  }

}
