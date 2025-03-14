import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('flappy-lion')
export class Lion extends LitElement {
  static override styles = css`
    .lion {
      width: 40px;
      height: 40px;
      background-color: yellow;
      position: absolute;
      top: var(--lion-top, 50%);
      left: 20px;
    }
  `;

  override render() {
    return html`<div class="lion"></div>`;
  }
}