# GameBoard Project

This project is a simple grid-based game built using LitElement. The player navigates through obstacles to reach a prize within a specified time limit. The difficulty level affects the number of obstacles and the time available to complete the level.

## Features

- Grid-based game with obstacles and a prize
- Adjustable difficulty level
- Timer-based gameplay
- Pathfinding algorithm ensures the player can always reach the prize
- Modal displays "You Win!!" or "Game Over" messages

## Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/yourusername/gameboard.git
    cd gameboard
    ```

2. **Install dependencies:**

    Ensure you have Node.js and npm installed. Then, run:

    ```bash
    npm install
    ```

3. **Run the project:**

    ```bash
    npm start
    ```

    This will start a local development server and open the project in your default web browser.

## Usage

1. **Navigate the player:**

    Use the arrow keys (`ArrowUp`, `ArrowDown`, `ArrowLeft`, `ArrowRight`) to move the player around the grid.

2. **Reach the prize:**

    Navigate through the obstacles to reach the prize before the timer runs out.

3. **Adjust difficulty:**

    You can adjust the difficulty level by changing the `difficulty` property in the `GameBoard` class. Higher difficulty levels will increase the number of obstacles and decrease the time available.

## Code Overview

### `GameBoard` Class

- **Properties:**
  - `rows` and `columns`: Dimensions of the grid.
  - `grid`: 2D array representing the grid cells.
  - `playerIndexX` and `playerIndexY`: Player's position.
  - `prizeIndexX` and `prizeIndexY`: Prize's position.
  - `cellWidth` and `cellHeight`: Dimensions of each cell.
  - `difficulty`: Difficulty level affecting obstacles and timer.
  - `prizeVisible`: Visibility of the prize (blinking effect).
  - `showModal`: Visibility of the modal.
  - `timer`: Time left to complete the level.
  - `gameOver`: Game over state.

- **Methods:**
  - `firstUpdated()`: Initializes the game board and starts the timer.
  - `startTimer()`: Starts the timer based on difficulty.
  - `stopTimer()`: Stops the timer.
  - `randomizeObstacles()`: Generates obstacles ensuring a valid path to the prize.
  - `isPathAvailable()`, `heuristic()`, `getNeighbors()`: Pathfinding algorithm to check valid paths.
  - `ensurePlayerNotOnObstacle()`, `ensurePrizeNotOnObstacle()`: Ensures player and prize are not placed on obstacles.
  - `drawGrid()`, `drawPlayer()`, `drawPrize()`: Draws the grid, player, and prize on the canvas.
  - `handleKeyPress()`: Handles player movement.
  - `checkWin()`: Checks if the player has reached the prize.
  - `closeModal()`: Closes the modal and resets the game.
  - `resetGame()`: Resets the game state.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## Contact

For any questions or feedback, please contact roccocolangelo@gmail.com
