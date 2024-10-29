import { html, fixture, expect } from '@open-wc/testing';
import "../hax-search.js";

describe("haxSearch test", () => {
  let element;
  beforeEach(async () => {
    element = await fixture(html`
      <hax-search
        title="title"
      ></hax-search>
    `);
  });

  it("basic will it blend", async () => {
    expect(element).to.exist;
  });

  it("passes the a11y audit", async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
