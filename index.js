const cells = document.querySelectorAll('.cell');
const restartButton = document.getElementById('restart');
const line = document.querySelector('.line');
const playerTurnText = document.getElementById('player-turn');

let currentPlayer = 'X';
let gameState = Array(9).fill(null);
let gameActive = true;
let winningCombination = null;

const winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6]             // Diagonals
];

function handleClick(event) {
  const index = +event.target.dataset.index;

  if (!gameActive || gameState[index]) return;

  gameState[index] = currentPlayer;
  event.target.textContent = currentPlayer;

  if (checkWin()) {
    drawLine(winningCombination);
    setTimeout(() => alert(`Player ${currentPlayer} wins!`), 100);
    playerTurnText.textContent = `Player ${currentPlayer} wins!`;
    gameActive = false;
  } else if (!gameState.includes(null)) {
    setTimeout(() => alert(`It's a draw!`), 100);
    playerTurnText.textContent = `It's a draw!`;
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    playerTurnText.textContent = `Player ${currentPlayer}'s turn`;
  }
}


function checkWin() {
  for (const combo of winningCombinations) {
    const [a, b, c] = combo;
    if (
      gameState[a] &&
      gameState[a] === gameState[b] &&
      gameState[a] === gameState[c]
    ) {
      winningCombination = combo;
      return true;
    }
  }
  return false;
}

function drawLine([a, , c]) {
  if (!line) return;

  const cell = cells[0];
  const cellSize = cell.offsetWidth;
  const gap = 5; // your .game-board gap value
  const board = document.querySelector('.game-board');
  const centerOffset = cellSize / 2;
  const padding = cellSize * 0.5; // amount to extend on both sides

  const positions = [a, c].map(index => {
    const row = Math.floor(index / 3);
    const col = index % 3;
    return {
      x: col * (cellSize + gap) + centerOffset,
      y: row * (cellSize + gap) + centerOffset
    };
  });

  const [start, end] = positions;
  const deltaX = end.x - start.x;
  const deltaY = end.y - start.y;

  const angle = Math.atan2(deltaY, deltaX);
  const length = Math.sqrt(deltaX ** 2 + deltaY ** 2) + padding * 2;

  const adjustedX = start.x - padding * Math.cos(angle);
  const adjustedY = start.y - padding * Math.sin(angle);

  line.style.display = 'block';
  line.style.width = `${length}px`;
  line.style.height = '5px';
  line.style.left = `${adjustedX}px`;
  line.style.top = `${adjustedY}px`;
  line.style.transform = `rotate(${angle * (180 / Math.PI)}deg)`;
  line.style.transformOrigin = '0 50%';
}



function restartGame() {
  gameState.fill(null);
  currentPlayer = 'X';
  gameActive = true;
  winningCombination = null;

  cells.forEach(cell => cell.textContent = '');
  if (line) {
    line.style.display = 'none';
    line.style.width = '0';
    line.style.height = '5px';
    line.style.transform = 'none';
  }
  playerTurnText.textContent = `Player X's turn`;
}



cells.forEach((cell, index) => {
  cell.dataset.index = index;
  cell.addEventListener('click', handleClick);
});

restartButton.addEventListener('click', restartGame);
