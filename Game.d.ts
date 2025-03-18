import { LitElement } from 'lit';
export declare class GameBoard extends LitElement {
    static styles: import("lit").CSSResult;
    rows: number;
    columns: number;
    grid: boolean[][];
    playerIndexX: number;
    playerIndexY: number;
    prizeIndexX: number;
    prizeIndexY: number;
    cellWidth: number;
    cellHeight: number;
    difficulty: number;
    prizeVisible: boolean;
    showModal: boolean;
    private canvas;
    private ctx;
    private playerImage;
    private obstacleImage;
    private prizeImage;
    firstUpdated(): void;
    randomizeObstacles(): void;
    ensurePlayerNotOnObstacle(): void;
    ensurePrizeNotOnObstacle(): void;
    drawGrid(): void;
    drawPlayer(): void;
    drawPrize(): void;
    handleKeyPress(event: KeyboardEvent): void;
    checkWin(): void;
    closeModal(): void;
    resetGame(): void;
    render(): import("lit-html").TemplateResult<1>;
}
//# sourceMappingURL=Game.d.ts.map