var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
let GameBoard = class GameBoard extends LitElement {
    constructor() {
        super(...arguments);
        this.rows = 20;
        this.columns = 20;
        this.grid = Array.from({ length: this.rows }, () => Array(this.columns).fill(false));
        this.playerIndexX = 10;
        this.playerIndexY = 10;
        this.prizeIndexX = Math.floor(Math.random() * 20);
        this.prizeIndexY = Math.floor(Math.random() * 20);
        this.cellWidth = 40; // updated cell size
        this.cellHeight = 40; // updated cell size
        this.playerImage = new Image();
        this.obstacleImage = new Image();
        this.prizeImage = new Image();
    }
    firstUpdated() {
        this.canvas = this.shadowRoot.querySelector('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.playerImage.src = 'asset/player.png';
        this.obstacleImage.src = 'asset/obstacle.jpeg';
        this.prizeImage.src = 'asset/prize.png';
        this.playerImage.onload = () => this.drawGrid(); // Ensure images are loaded before drawing
        this.obstacleImage.onload = () => this.drawGrid(); // Ensure images are loaded before drawing
        this.prizeImage.onload = () => this.drawGrid(); // Ensure images are loaded before drawing
        this.playerImage.onerror = () => console.error('Failed to load player image');
        this.obstacleImage.onerror = () => console.error('Failed to load obstacle image');
        this.prizeImage.onerror = () => console.error('Failed to load prize image');
        this.randomizeObstacles();
        this.ensurePlayerNotOnObstacle();
        this.ensurePrizeNotOnObstacle();
        window.addEventListener('keydown', this.handleKeyPress.bind(this));
    }
    randomizeObstacles() {
        const obstacleDensity = 0.3; // Adjust this value to set difficulty level
        for (let row = 0; row < this.rows; row++) {
            for (let column = 0; column < this.columns; column++) {
                if (Math.random() < obstacleDensity) {
                    this.grid[row][column] = true;
                }
            }
        }
    }
    ensurePlayerNotOnObstacle() {
        while (this.grid[this.playerIndexY][this.playerIndexX]) {
            this.playerIndexX = Math.floor(Math.random() * this.columns);
            this.playerIndexY = Math.floor(Math.random() * this.rows);
        }
    }
    ensurePrizeNotOnObstacle() {
        while (this.grid[this.prizeIndexY][this.prizeIndexX] || (this.prizeIndexX === this.playerIndexX && this.prizeIndexY === this.playerIndexY)) {
            this.prizeIndexX = Math.floor(Math.random() * this.columns);
            this.prizeIndexY = Math.floor(Math.random() * this.rows);
        }
    }
    drawGrid() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for (let row = 0; row < this.rows; row++) {
            for (let column = 0; column < this.columns; column++) {
                const cellX = this.cellWidth * column;
                const cellY = this.cellHeight * row;
                if (this.grid[row][column]) {
                    this.ctx.drawImage(this.obstacleImage, cellX, cellY, this.cellWidth, this.cellHeight);
                }
                else {
                    this.ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
                    this.ctx.fillRect(cellX, cellY, this.cellWidth, this.cellHeight);
                    this.ctx.strokeRect(cellX, cellY, this.cellWidth, this.cellHeight);
                }
            }
        }
        this.drawPlayer();
        this.drawPrize();
    }
    drawPlayer() {
        const playerPixelX = this.playerIndexX * this.cellWidth;
        const playerPixelY = this.playerIndexY * this.cellHeight;
        this.ctx.drawImage(this.playerImage, playerPixelX, playerPixelY, this.cellWidth, this.cellHeight);
    }
    drawPrize() {
        const prizePixelX = this.prizeIndexX * this.cellWidth;
        const prizePixelY = this.prizeIndexY * this.cellHeight;
        this.ctx.drawImage(this.prizeImage, prizePixelX, prizePixelY, this.cellWidth, this.cellHeight);
    }
    handleKeyPress(event) {
        switch (event.key) {
            case 'ArrowUp':
                if (this.playerIndexY > 0 && !this.grid[this.playerIndexY - 1][this.playerIndexX]) {
                    this.playerIndexY--;
                }
                break;
            case 'ArrowDown':
                if (this.playerIndexY < this.rows - 1 && !this.grid[this.playerIndexY + 1][this.playerIndexX]) {
                    this.playerIndexY++;
                }
                break;
            case 'ArrowLeft':
                if (this.playerIndexX > 0 && !this.grid[this.playerIndexY][this.playerIndexX - 1]) {
                    this.playerIndexX--;
                }
                break;
            case 'ArrowRight':
                if (this.playerIndexX < this.columns - 1 && !this.grid[this.playerIndexY][this.playerIndexX + 1]) {
                    this.playerIndexX++;
                }
                break;
        }
        this.drawGrid();
        this.checkWin();
    }
    checkWin() {
        if (this.playerIndexX === this.prizeIndexX && this.playerIndexY === this.prizeIndexY) {
            alert('Congratulations! You reached the prize!');
        }
    }
    render() {
        return html `<canvas width="800" height="800"></canvas>`; // adjusted canvas size
    }
};
GameBoard.styles = css `
    canvas {
      border: 1px solid black;
      box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.2);
    }
    .player {
      background-color: rgba(0, 128, 0, 0.5);
    }
    .obstacle {
      background-color: rgba(255, 0, 0, 0.5);
    }
    .cell {
      background-color: rgba(255, 255, 255, 0.5);
    }
    .prize {
      background-color: rgba(255, 215, 0, 0.5); /* Gold color for the prize */
    }
  `;
__decorate([
    property({ type: Number })
], GameBoard.prototype, "rows", void 0);
__decorate([
    property({ type: Number })
], GameBoard.prototype, "columns", void 0);
__decorate([
    property({ type: Array })
], GameBoard.prototype, "grid", void 0);
__decorate([
    property({ type: Number })
], GameBoard.prototype, "playerIndexX", void 0);
__decorate([
    property({ type: Number })
], GameBoard.prototype, "playerIndexY", void 0);
__decorate([
    property({ type: Number })
], GameBoard.prototype, "prizeIndexX", void 0);
__decorate([
    property({ type: Number })
], GameBoard.prototype, "prizeIndexY", void 0);
__decorate([
    property({ type: Number })
], GameBoard.prototype, "cellWidth", void 0);
__decorate([
    property({ type: Number })
], GameBoard.prototype, "cellHeight", void 0);
GameBoard = __decorate([
    customElement('game-board')
], GameBoard);
export { GameBoard };
//# sourceMappingURL=Game.js.map