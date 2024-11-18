import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";
import "./hax-card.js";

export class HaxSearch extends DDDSuper(I18NMixin(LitElement)) {
  constructor() {
    super();
    this.isLoading = false;
    this.results = [];
    this.inputUrl = '';
    this.apiUrl = '';
    this.siteInfo = null;
    this.errorMessage = '';
  }

  static get properties() {
    return {
      isLoading: { type: Boolean, reflect: true },
      results: { type: Array },
      inputUrl: { type: String },
      apiUrl: { type: String },
      siteInfo: { type: Object },
      errorMessage: { type: String },
    };
  }

  static get styles() {
    return [super.styles, css`
      :host {
        display: block;
      }

      .wrapper {
        display: flex;
        flex-direction: column;
        gap: var(--ddd-spacing-5);
        max-width: 1200px;
        margin: auto;
        align-items: center;
      }

      .title {
        text-align: center;
      }

      .form {
        display: flex;
        gap: var(--ddd-spacing-4);
        width: 100%;
        max-width: 700px;
        }

      .form input {
        flex: 1;
        padding: var(--ddd-spacing-4);
        border: 1px solid var(--ddd-theme-default-limestoneMaxLight);
        border-radius: var(--ddd-spacing-2);
        font-size: var(--ddd-spacing-4);
      }

      .form button {
        background-color: var(--ddd-theme-default-beaverBlue);
        color: var(--ddd-theme-default-white);
        border: none;
        border-radius: var(--ddd-spacing-2);
        padding: var(--ddd-spacing-5);
        cursor: pointer;
        font-size: var(--ddd-spacing-4);
        font-weight: var(--ddd-font-weight-bold);
      }

      .form button:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }

      .message {
        color: var(--ddd-theme-default-error);
        text-align: center;
        font-size: var(--ddd-spacing-3);
        margin-top: var(--ddd-spacing-5);
      }

      .summary {
        text-align: center;
        margin-top: var(--ddd-spacing-7);
        background: var(--ddd-theme-default-card);
        padding: var(--ddd-spacing-6);
        border-radius: var(--ddd-spacing-2);
      }

      .summary h2 {
        font-size: var(--ddd-spacing-6);
        font-weight: var(--ddd-font-weight-bold);
      }

      .grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: var(--ddd-spacing-5);
        margin-top: var(--ddd-spacing-6);
        width: 100%;
      }
    `];
  }

  sanitizeUrl(rawUrl) {
    try {
      let formattedUrl = rawUrl.trim();
      if (!formattedUrl.startsWith('http')) {
        formattedUrl = 'https://' + formattedUrl;
      }
      const urlObj = new URL(formattedUrl);
      if (!urlObj.pathname.endsWith('site.json')) {
        urlObj.pathname = urlObj.pathname.replace(/\/?$/, '/site.json');
      }
      return urlObj.toString();
    } catch (error) {
      return null;
    }
  }

  async fetchSiteData(event) {
    event.preventDefault();
    const inputElement = this.shadowRoot.querySelector('input');
    const processedUrl = this.sanitizeUrl(inputElement.value);

    if (!processedUrl) {
      this.errorMessage = 'Invalid URL. Please provide a valid HAX site URL.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.siteInfo = null;
    this.results = [];

    try {
      const response = await fetch(processedUrl);
      if (!response.ok) throw new Error('Failed to load site data.');

      const siteData = await response.json();
      this.siteInfo = siteData.metadata.site;
      this.results = siteData.items;
      this.apiUrl = processedUrl.replace('site.json', '');
    } catch (err) {
      this.errorMessage = err.message;
    } finally {
      this.isLoading = false;
    }
  }

  formatTimestampToDate(timestamp) {
    return new Date(timestamp * 1000).toLocaleString();
  }

  render() {
    return html`
      <div class="wrapper">
        <h1 class="title">Analyze Your HAX Site</h1>

        <form class="form" @submit=${this.fetchSiteData}>
          <input
            type="text"
            placeholder="Enter HAX site URL..."
            ?disabled=${this.isLoading}
          />
          <button type="submit" ?disabled=${this.isLoading}>
            ${this.isLoading ? 'Analyzing...' : 'Analyze'}
          </button>
        </form>

        ${this.errorMessage ? html`<div class="message">${this.errorMessage}</div>` : ''}

        ${this.siteInfo ? html`
          <div class="summary">
            <h2>${this.siteInfo.name}</h2>
            <p>${this.siteInfo.description}</p>
            <p><strong>Theme:</strong> ${this.siteInfo.theme}</p>
            <p><strong>Created:</strong> ${this.formatTimestampToDate(this.siteInfo.created)}</p>
            <p><strong>Last Updated:</strong> ${this.formatTimestampToDate(this.siteInfo.updated)}</p>
          </div>
        ` : ''}

        <div class="grid">
          ${this.results.map(item => html`
            <hax-card
              .title=${item.title}
              .description=${item.description}
              .slug=${item.slug}
              .baseUrl=${this.apiUrl}
              .metadata=${item.metadata}
              .location=${item.location}
            ></hax-card>
          `)}
        </div>
      </div>
    `;
  }

  static get tag() {
    return 'hax-search';
  }
}

customElements.define(HaxSearch.tag, HaxSearch);
