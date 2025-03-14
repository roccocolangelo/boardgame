import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('game-board')
export class GameBoard extends LitElement {
  static override styles = css`
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

  @property({ type: Number }) rows = 20;
  @property({ type: Number }) columns = 20;
  @property({ type: Array }) grid: boolean[][] = Array.from({ length: this.rows }, () => Array(this.columns).fill(false));
  @property({ type: Number }) playerIndexX = 10;
  @property({ type: Number }) playerIndexY = 10;
  @property({ type: Number }) prizeIndexX = Math.floor(Math.random() * 20);
  @property({ type: Number }) prizeIndexY = Math.floor(Math.random() * 20);
  @property({ type: Number }) cellWidth = 40; // updated cell size
  @property({ type: Number }) cellHeight = 40; // updated cell size
  @property({ type: Number }) difficulty = 0.3; // parameter to set difficulty level

  private canvas!: HTMLCanvasElement;
  private ctx!: CanvasRenderingContext2D;
  private playerImage = new Image();
  private obstacleImage = new Image();
  private prizeImage = new Image();

  override firstUpdated() {
    this.canvas = this.shadowRoot!.querySelector('canvas')!;
    this.ctx = this.canvas.getContext('2d')!;
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
    for (let row = 0; row < this.rows; row++) {
      for (let column = 0; column < this.columns; column++) {
        if (Math.random() < this.difficulty) {
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
        } else {
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

  handleKeyPress(event: KeyboardEvent) {
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

  override render() {
    return html`<canvas width="800" height="800"></canvas>`; // adjusted canvas size
  }
}