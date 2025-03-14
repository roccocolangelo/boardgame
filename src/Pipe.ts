import { LitElement, html, css,  } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('flappy-pipe')
export class Pipe extends LitElement {
    static override styles = css`
    .pipe {
      width: 60px;
      height: var(--pipe-height, 200px);
      background-color: green;
      position: absolute;
      bottom: 0;
      left: var(--pipe-left, 100%);
    }
  `;

  override render() {
    return html`<div class="pipe"></div>`;
  }
}