import { LitElement } from 'lit';
import './Lion';
import './Pipe';
export declare class GameArea extends LitElement {
    static styles: import("lit").CSSResult;
    lion: HTMLElement | null;
    pipe: HTMLElement | null;
    lionVelocity: number;
    pipeSpeed: number;
    gameInterval: number | undefined;
    firstUpdated(): void;
    startGame(): void;
    updateLion(): void;
    updatePipe(): void;
    isColliding(rect1: DOMRect, rect2: DOMRect): boolean;
    checkCollision(): void;
    endGame(): void;
    handleKeyPress(event: KeyboardEvent): void;
    connectedCallback(): void;
    disconnectedCallback(): void;
    render(): import("lit-html").TemplateResult<1>;
}
//# sourceMappingURL=GameArea.d.ts.map