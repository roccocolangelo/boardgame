var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
let Lion = class Lion extends LitElement {
    render() {
        return html `<div class="lion"></div>`;
    }
};
Lion.styles = css `
    .lion {
      width: 40px;
      height: 40px;
      background-color: yellow;
      position: absolute;
      top: var(--lion-top, 50%);
      left: 20px;
    }
  `;
Lion = __decorate([
    customElement('flappy-lion')
], Lion);
export { Lion };
//# sourceMappingURL=Lion.js.map