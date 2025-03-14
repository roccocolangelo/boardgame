import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('game-board')
export class GameBoard extends LitElement {
  static override styles = css`
    canvas {
      border: 1px solid black;
      box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.2);
    }
  `;

  @property({ type: Number }) rows = 20;
  @property({ type: Number }) columns = 20;
  @property({ type: Array }) grid: boolean[][] = Array.from({ length: this.rows }, () => Array(this.columns).fill(false));
  @property({ type: Number }) playerIndexX = 10;
  @property({ type: Number }) playerIndexY = 10;
  @property({ type: Number }) cellWidth = 30; // doubled cell size
  @property({ type: Number }) cellHeight = 30; // doubled cell size

  private canvas!: HTMLCanvasElement;
  private ctx!: CanvasRenderingContext2D;

  override firstUpdated() {
    this.canvas = this.shadowRoot!.querySelector('canvas')!;
    this.ctx = this.canvas.getContext('2d')!;
    this.randomizeObstacles();
    this.ensurePlayerNotOnObstacle();
    this.drawGrid();
    window.addEventListener('keydown', this.handleKeyPress.bind(this));
  }

  randomizeObstacles() {
    for (let row = 0; row < this.rows; row++) {
      for (let column = 0; column < this.columns; column++) {
        if (Math.random() < 0.2) {
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

  drawGrid() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for (let row = 0; row < this.rows; row++) {
      for (let column = 0; column < this.columns; column++) {
        const cellX = this.cellWidth * column;
        const cellY = this.cellHeight * row;
        this.ctx.fillStyle = this.grid[row][column] ? 'red' : 'white';
        this.ctx.fillRect(cellX, cellY, this.cellWidth, this.cellHeight);
        this.ctx.strokeRect(cellX, cellY, this.cellWidth, this.cellHeight);
      }
    }
    this.drawPlayer();
  }

  drawPlayer() {
    const playerPixelX = this.playerIndexX * this.cellWidth;
    const playerPixelY = this.playerIndexY * this.cellHeight;
    this.ctx.fillStyle = 'green';
    this.ctx.fillRect(playerPixelX, playerPixelY, this.cellWidth, this.cellHeight);
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
  }

  override render() {
    return html`<canvas width="600" height="600"></canvas>`; // adjusted canvas size
  }
}