document.addEventListener("DOMContentLoaded", function() {
  const board = document.getElementById("board");
  const status = document.getElementById("status");
  const resetButton = document.getElementById("reset-btn");
  const player1Input = document.getElementById("player1-name");
  const player2Input = document.getElementById("player2-name");

  let currentPlayer = "X";
  let gameBoard = ["", "", "", "", "", "", "", "", ""];
  let player1Name = "";
  let player2Name = "";

  player1Input.addEventListener("input", function() {
    player1Name = player1Input.value;
  });

  player2Input.addEventListener("input", function() {
    player2Name = player2Input.value;
  });

  function renderBoard() {
    board.innerHTML = "";
    gameBoard.forEach((cell, index) => {
      const cellElement = document.createElement("div");
      cellElement.classList.add("cell");
      cellElement.textContent = cell;
      cellElement.addEventListener("click", () => handleCellClick(index));
      board.appendChild(cellElement);
    });
  }

  function handleCellClick(index) {
    if (gameBoard[index] === "" && !checkWinner()) {
      gameBoard[index] = currentPlayer;
      renderBoard();
      displayWinner();
      if (!checkWinner()) {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
      }
    }
  }

  function displayWinner() {
    if (checkWinner()) {
      if (currentPlayer === "X") {
        status.textContent = `${player1Name} wins!`;
      } else {
        status.textContent = `${player2Name} wins!`;
      }
      highlightWinningLine();
    } else if (gameBoard.every(cell => cell !== "")) {
      status.textContent = "It's a draw!";
    } else {
      status.textContent = `${currentPlayer === "X" ? player2Name : player1Name}'s turn`;
    }
  }

  function checkWinner() {
    const winConditions = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6] // diagonals
    ];

    for (const condition of winConditions) {
      const [a, b, c] = condition;
      if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
        return true;
      }
    }
    return false;
  }

  function highlightWinningLine() {
    const winConditions = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6] // diagonals
    ];

    for (const condition of winConditions) {
      const [a, b, c] = condition;
      if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
        const cells = [a, b, c].map(index => board.children[index]);
        cells.forEach(cell => cell.classList.add('win-animation'));
      }
    }
  }

  function resetGame() {
    currentPlayer = "X";
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    renderBoard();
    status.textContent = `${player1Name}'s turn`;
    resetWinningLine();
  }

  function resetWinningLine() {
    board.querySelectorAll('.cell').forEach(cell => cell.classList.remove('win-animation'));
  }

  resetButton.addEventListener("click", resetGame);

  renderBoard();
  status.textContent = `${player1Name}'s turn`;
});
