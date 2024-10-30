const cells = document.querySelectorAll('.cell');
const restartButton = document.getElementById('restart');
const line = document.querySelector('.line');
let currentPlayer = 'X';
let gameState = Array(9).fill(null);
let gameActive = true;

const winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6]             // Diagonals
];

function handleClick(event) {
  const cellIndex = event.target.getAttribute('data-index');

  if (gameState[cellIndex] || !gameActive) return;

  gameState[cellIndex] = currentPlayer;
  event.target.textContent = currentPlayer;

  if (checkWin()) {
    drawLine();
    alert(`Player ${currentPlayer} wins!`);
    gameActive = false;
  } else if (!gameState.includes(null)) {
    gameActive = false;
    alert('It\'s a draw!');
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  }
}

function checkWin() {
  return winningCombinations.some(combination => {
    if (combination.every(index => gameState[index] === currentPlayer)) {
      winningCombination = combination; // Store the winning combination
      return true;
    }
    return false;
  });
}

function drawLine() {
  const [a, b, c] = winningCombination;

  line.style.display = 'block';

  if (a % 3 === 0 && b % 3 === 1 && c % 3 === 2) {
    // Horizontal line
    line.style.top = `${50 + Math.floor(a / 3) * 100}px`;
    line.style.transform = 'rotate(0deg)';
  } else if (a < 3 && b < 6 && c < 9 && a % 3 === b % 3) {
    // Vertical line
    line.style.left = `${50 + (a % 3) * 100}px`;
    line.style.top = '0';
    line.style.height = '300px';
    line.style.width = '5px';
  } else if (a === 0 && c === 8) {
    // Diagonal from top-left to bottom-right
    line.style.top = '0';
    line.style.left = '0';
    line.style.width = '350px';
    line.style.transform = 'rotate(45deg)';
  } else if (a === 2 && c === 6) {
    // Diagonal from top-right to bottom-left
    line.style.top = '0';
    line.style.right = '0';
    line.style.width = '350px';
    line.style.transform = 'rotate(-45deg)';
  }
}

function restartGame() {
  gameState.fill(null);
  cells.forEach(cell => cell.textContent = '');
  currentPlayer = 'X';
  gameActive = true;
  line.style.display = 'none'; // Hide line on restart
  line.style.width = '300px';
  line.style.height = '5px';
  line.style.transform = 'rotate(0deg)';
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
restartButton.addEventListener('click', restartGame);
