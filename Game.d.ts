import { LitElement } from 'lit';
export declare class GameBoard extends LitElement {
    static styles: import("lit").CSSResult;
    rows: number;
    columns: number;
    grid: boolean[][];
    playerIndexX: number;
    playerIndexY: number;
    cellWidth: number;
    cellHeight: number;
    private canvas;
    private ctx;
    firstUpdated(): void;
    randomizeObstacles(): void;
    ensurePlayerNotOnObstacle(): void;
    drawGrid(): void;
    drawPlayer(): void;
    handleKeyPress(event: KeyboardEvent): void;
    render(): import("lit-html").TemplateResult<1>;
}
//# sourceMappingURL=Game.d.ts.map