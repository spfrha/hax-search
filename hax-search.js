import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";
import "./hax-card.js";

export class haxSearch extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "hax-search";
  }

  constructor() {
    super();
    this.value = null;
    this.loading = false;
    this.metadata = [];
  }

  static get properties() {
    return {
      loading: { type: Boolean, reflect: true },
      metadata: { type: Array, },
      value: { type: String },
    };
  }

  static get styles() {
    return css`
      .search {
        display: flex;
        justify-content: center;
        height: 60px;
      }

      .results {
        visibility: visible;
        height: 600px;
      }

      input {
        font-size: 20px;
        line-height: var(--ddd-spacing-10);
        width: 700px;
      }

      a {
        text-decoration: none;
        color: var(--ddd-theme-default-link);
      }
      a:visited {
        text-decoration: none;
        color: var(--ddd-theme-default-link);
      }

      button {
        margin-left: var(--ddd-spacing-2);
        padding: var(--ddd-spacing-2) var(--ddd-spacing-4);
        font-size: var(--ddd-font-size-sm);
        color: var(--ddd-button-color);
        border: 1px;
        border-radius: var(--ddd-radius-md);
        cursor: pointer;
        transition: background-color 0.3s ease;
      }

      button:hover {
        background-color: var(--ddd-button-hover-blue, blue);
      }
    `;
  }

  inputChanged(e) {
    this.value = this.shadowRoot.querySelector('#input').value;
  }
  updated(changedProperties) {
    if (changedProperties.has('value') && this.value) {
      this.updateResults(this.value);
    }
    else if (changedProperties.has('value') && !this.value) {
      this.metadata = [];
    }
    if (changedProperties.has('metadata') && this.meatadata.length > 0) {
      console.log(this.metadata);
    }
  }

  jsonVerify(value) {
    if (!value.endsWith('.json')) {
        value += '.json';
    }
    return value;
}

  updateResults(value) {
    this.jsonVerify(value);
    this.loading = true;
      fetch(`${value}`).then(d => d.ok ? d.json(): {}).then(data => {
        if (data.metadata) {
          this.metadata = [];
          this.metadata = data.metadata.site;
          this.loading = false;
        }
    });
  }

  render() {
    return html`
    <section class="search-container">
      <form class="search-form" @submit="${(e) => e.preventDefault()}">
        <input
          type="text"
          placeholder="Search HAX"
          @input="${this.inputChanged}"
          aria-label="Search HAX"
        />
        <button type="button">Analyze</button>
      </form>
    </section>
    <section class="results-container">
      ${this.metadata.map((data, index) => html`
        <a href="${data.site[0].logo}" target="_blank" rel="noopener noreferrer">
          <hax-card
            .source="${data.site[0].logo}"
            .alt="${data.data[0].description}"
            .title="${data.data[0].title}"
            .desc="By: ${data.data[0].secondary_creator}"
          ></hax-card>
        </a>
      `)}
    </section>
  `;
}

  /**
   * haxProperties integration via file reference
   */
  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }

  static get tag() {
    return "hax-search";
  }
}

globalThis.customElements.define(haxSearch.tag, haxSearch);