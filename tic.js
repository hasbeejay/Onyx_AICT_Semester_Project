
const cells = document.querySelectorAll('.cell');
const currentPlayerDisplay = document.getElementById('current-player');
const resetButton = document.getElementById('reset-button');

let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameOver = false;

cells.forEach(cell => {
    cell.addEventListener('click', () => handleCellClick(cell));
});

function handleCellClick(cell) {
    const index = cell.getAttribute('data-index');
    
    // If the cell is already taken or game is over, return
    if (board[index] !== '' || gameOver) return;
    
    // Mark the cell with the current player's symbol
    board[index] = currentPlayer;
    cell.textContent = currentPlayer;
    
    // Check if there's a winner
    if (checkWinner()) {
        gameOver = true;
        setTimeout(() => alert(`${currentPlayer} Wins!`), 100);
    } else if (board.every(cell => cell !== '')) {
        gameOver = true;
        setTimeout(() => alert('It\'s a Draw!'), 100);
    } else {
        // Switch player
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        currentPlayerDisplay.textContent = currentPlayer;
    }
}

function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];
    
    return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        return board[a] && board[a] === board[b] && board[a] === board[c];
    });
}

resetButton.addEventListener('click', resetGame);

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameOver = false;
    currentPlayerDisplay.textContent = currentPlayer;
    cells.forEach(cell => cell.textContent = '');
}
