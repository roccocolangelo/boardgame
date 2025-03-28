import { LitElement } from 'lit';
export declare class GameBoard extends LitElement {
    static styles: import("lit").CSSResult[];
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
    timer: number;
    gameOver: boolean;
    private intervalId;
    private canvas;
    private ctx;
    private playerImage;
    private obstacleImage;
    private prizeImage;
    firstUpdated(): void;
    startTimer(): void;
    stopTimer(): void;
    randomizeObstacles(): void;
    isPathAvailable(): boolean;
    heuristic(a: {
        x: number;
        y: number;
    }, b: {
        x: number;
        y: number;
    }): number;
    getNeighbors(node: {
        x: number;
        y: number;
    }): {
        x: number;
        y: number;
    }[];
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