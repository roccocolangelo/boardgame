import { css } from 'lit-element';

export const gameStyle = css`
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
  .modal {
    display: none;
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.4);
  }
  .modal-content {
    color:white;
    font-size:78px;
    background: url('asset/modal_bg.jpeg') no-repeat center center;
    background-size: cover;
    margin: 15% auto;
    padding: 20px;
    border: 5px solid #ffcc00; /* Cartoon-style border */
    border-radius: 15px; /* Rounded corners */
    width: 600px; /* Adjust width to fit background */
    height: 400px; /* Adjust height to fit background */
    text-align: center;
    font-family: 'Comic Sans MS', cursive, sans-serif; /* Fun font */
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5); /* Shadow for depth */
  }
  .modal.show {
    display: block;
  }
  .modal-content span {
    font-size: 24px; /* Larger close icon */
    color: #ff0000; /* Red color for close icon */
  }
`;