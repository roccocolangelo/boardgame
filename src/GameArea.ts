import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import './Lion';
import './Pipe';

@customElement('game-area')
export class GameArea extends LitElement {
  static override styles = css`
    .game-area {
      width: 80vw; /* Reduced width */
      height: 80vh; /* Reduced height */
      background-color: skyblue;
      overflow: hidden;
      position: relative;
      margin: auto; /* Center the game area */
      border: 2px solid black; /* Optional: Add a border for better visibility */
    }
    flappy-lion {
      --lion-top: 50px;
      --lion-left: 50px;
      width: 50px; /* Add width */
      height: 50px; /* Add height */
      position: absolute;
      top: var(--lion-top);
      left: var(--lion-left);
    }
    flappy-pipe {
      width: 50px;
      height: var(--pipe-height);
      position: absolute;
      top: 0;
      left: var(--pipe-left);
    }
    .modal {
      display: none; /* Hidden by default */
      position: fixed;
      z-index: 1;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      overflow: auto;
      background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
    }
    .modal-content {
      background-color: #fefefe;
      margin: 15% auto;
      padding: 20px;
      border: 1px solid #888;
      width: 80%;
      text-align: center;
      font-size: 2em;
      font-weight: bold;
    }
    .show {
      display: block; /* Show the modal */
    }
  `;

  lion: HTMLElement | null = null;
  pipe: HTMLElement | null = null;
  lionVelocity: number = 0;
  pipeSpeed: number = 0.5;
  gameInterval: number | undefined;

  override firstUpdated() {
    this.lion = this.shadowRoot!.querySelector('flappy-lion');
    this.pipe = this.shadowRoot!.querySelector('flappy-pipe');
    this.startGame();
  }

  startGame() {
    this.gameInterval = window.setInterval(() => {
      this.updateLion();
      this.updatePipe();
      this.checkCollision();
    }, 20);
  }

  updateLion() {
    if (this.lion) {
      const lionTop = parseFloat(getComputedStyle(this.lion).getPropertyValue('--lion-top')) || 0;
      this.lion.style.setProperty('--lion-top', `${lionTop}px`);
    }
  }

  updatePipe() {
    if (this.pipe) {
      const pipeLeft = parseFloat(getComputedStyle(this.pipe).getPropertyValue('--pipe-left')) || 0;
      this.pipe.style.setProperty('--pipe-left', `${pipeLeft - this.pipeSpeed}%`);
      if (pipeLeft < -10) {
        this.pipe.style.setProperty('--pipe-left', '100%');
        const randomHeight = Math.floor(Math.random() * (this.clientHeight - 50)) + 50; // Random height between 50px and game area height - 50px
        this.pipe.style.setProperty('--pipe-height', `${randomHeight}px`);
      }
    }
  }

  isColliding(rect1: DOMRect, rect2: DOMRect): boolean {
    const tolerance = -0.2; // 20% tolerance of collision
  
    const rect1Adjusted = {
      left: rect1.left - rect1.width * tolerance,
      right: rect1.right + rect1.width * tolerance,
      top: rect1.top - rect1.height * tolerance,
      bottom: rect1.bottom + rect1.height * tolerance,
    };
  
    const rect2Adjusted = {
      left: rect2.left - rect2.width * tolerance,
      right: rect2.right + rect2.width * tolerance,
      top: rect2.top - rect2.height * tolerance,
      bottom: rect2.bottom + rect2.height * tolerance,
    };
  
    return (
      rect1Adjusted.left < rect2Adjusted.right &&
      rect1Adjusted.right > rect2Adjusted.left &&
      rect1Adjusted.top < rect2Adjusted.bottom &&
      rect1Adjusted.bottom > rect2Adjusted.top
    );
  }
  
  checkCollision() {
    if (this.lion && this.pipe) {
      const lionRect = this.lion.getBoundingClientRect();
      const pipeRect = this.pipe.getBoundingClientRect();
  
      if (this.isColliding(lionRect, pipeRect)) {
        console.log('Collision detected!');
        this.endGame();
      }
    }
  }

  endGame() {
    clearInterval(this.gameInterval);
    console.log('Game Over');
    const modal = this.shadowRoot!.querySelector('.modal');
    if (modal) {
      modal.classList.add('show');
    }
  }

  handleKeyPress(event: KeyboardEvent) {
    if (this.lion) {
      const lionTop = parseFloat(getComputedStyle(this.lion).getPropertyValue('--lion-top')) || 0;
      const lionLeft = parseFloat(getComputedStyle(this.lion).getPropertyValue('--lion-left')) || 0;

      switch (event.code) {
        case 'ArrowUp':
          this.lion.style.setProperty('--lion-top', `${lionTop - 10}px`);
          break;
        case 'ArrowDown':
          this.lion.style.setProperty('--lion-top', `${lionTop + 10}px`);
          break;
        case 'ArrowLeft':
          this.lion.style.setProperty('--lion-left', `${lionLeft - 10}px`);
          break;
        case 'ArrowRight':
          this.lion.style.setProperty('--lion-left', `${lionLeft + 10}px`);
          break;
      }
    }
  }

  override connectedCallback() {
    super.connectedCallback();
    window.addEventListener('keydown', this.handleKeyPress.bind(this));
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('keydown', this.handleKeyPress.bind(this));
    clearInterval(this.gameInterval);
  }

  override render() {
    return html`
      <div class="game-area">
        <flappy-lion></flappy-lion>
        <flappy-pipe style="--pipe-left: 80%; --pipe-height: 150px;"></flappy-pipe>
      </div>
      <div class="modal">
        <div class="modal-content">
          Game Over
        </div>
      </div>
    `;
  }
}