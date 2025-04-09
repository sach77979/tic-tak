document.addEventListener("DOMContentLoaded", () => {
    const board = document.getElementById("board");
    const cells = document.querySelectorAll(".cell");
    const statusText = document.getElementById("status");
    const resetButton = document.getElementById("reset");
    let currentPlayer = "X";
    let boardState = Array(9).fill(null);
    let gameActive = true;

    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6]
    ];

    function handleCellClick(event) {
        const index = event.target.getAttribute("data-index");
        if (boardState[index] || !gameActive) return;
        
        boardState[index] = currentPlayer;
        event.target.innerText = currentPlayer;
        event.target.classList.add(currentPlayer.toLowerCase());
        
        const winningCells = checkWinner();
        if (winningCells) {
            statusText.innerText = `🎉 Winner: ${currentPlayer}!`;
            gameActive = false;
            highlightWinningCells(winningCells);
            return;
        } else if (!boardState.includes(null)) {
            statusText.innerText = "😲 It's a draw!";
            gameActive = false;
            return;
        } 
        
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        statusText.innerText = `Next Player: ${currentPlayer}`;
    }

    function checkWinner() {
        for (let pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
                return pattern;
            }
        }
        return null;
    }

    function highlightWinningCells(winningCells) {
        winningCells.forEach(index => {
            cells[index].classList.add("win");
        });
    }

    function resetGame() {
        boardState.fill(null);
        cells.forEach(cell => {
            cell.innerText = "";
            cell.classList.remove("x", "o", "win");
        });
        currentPlayer = "X";
        statusText.innerText = `Next Player: ${currentPlayer}`;
        gameActive = true;
    }

    cells.forEach(cell => cell.addEventListener("click", handleCellClick));
    resetButton.addEventListener("click", resetGame);
});
