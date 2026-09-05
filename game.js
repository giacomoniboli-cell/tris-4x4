
    const boardElement = document.querySelector("#board");
    const statusText = document.querySelector("#statusText");
    const turnDot = document.querySelector("#turnDot");
    const newMatchButton = document.querySelector("#newMatchButton");
    const resetBoardButton = document.querySelector("#resetBoardButton");
    const blackScore = document.querySelector("#blackScore");
    const whiteScore = document.querySelector("#whiteScore");
    const size = 4;
    const winLength = 4;
    const players = {
      black: "nero",
      white: "bianco"
    };

    let board = Array(size * size).fill(null);
    let currentPlayer = "black";
    let startingPlayer = "black";
    let activeStartingPlayer = "black";
    let roundFinished = false;
    let scores = {
      black: 0,
      white: 0
    };
    let gameOver = false;

    function buildBoard() {
      boardElement.innerHTML = "";

      for (let index = 0; index < board.length; index += 1) {
        const cell = document.createElement("button");
        cell.className = "cell";
        cell.type = "button";
        cell.dataset.index = String(index);
        cell.setAttribute("aria-label", `Casella ${index + 1}`);
        cell.addEventListener("click", () => play(index));
        boardElement.append(cell);
      }
    }

    function play(index) {
      if (gameOver || board[index]) {
        return;
      }

      board[index] = currentPlayer;
      render(index);

      const winningLine = findWinningLine();
      if (winningLine) {
        finishWin(currentPlayer, winningLine);
        return;
      }

      if (board.every(Boolean)) {
        finishDraw();
        return;
      }

      if (isForcedDraw()) {
        finishDraw();
        return;
      }

      currentPlayer = currentPlayer === "black" ? "white" : "black";
      updateStatus();
    }

    function render(animatedIndex = null) {
      board.forEach((player, index) => {
        const cell = boardElement.children[index];
        cell.innerHTML = "";
        cell.classList.remove("flip", "played");
        cell.disabled = Boolean(player) || gameOver;

        cell.setAttribute("aria-label", `Riga ${Math.floor(index / 4) + 1}, colonna ${index % 4 + 1}, ${player ? players[player] : 'vuota'}`);
        if (player) {
          const piece = document.createElement("span");
          piece.className = `piece ${player}`;
          piece.setAttribute("aria-hidden", "true");
          for (let layer = 0; layer < 9; layer++) {
            const disc = document.createElement("span");
            disc.style.setProperty("--z", `${layer * 2 + 2}px`);
            piece.append(disc);
          }
          cell.append(piece);
          if (index === animatedIndex) cell.classList.add("drop");
          else cell.classList.remove("drop");
        } else cell.classList.remove("drop");
      });
    }

    function findWinningLine() {
      const directions = [
        [0, 1],
        [1, 0],
        [1, 1],
        [1, -1]
      ];

      for (let row = 0; row < size; row += 1) {
        for (let col = 0; col < size; col += 1) {
          const start = board[row * size + col];
          if (!start) {
            continue;
          }

          for (const [rowStep, colStep] of directions) {
            const line = [];

            for (let offset = 0; offset < winLength; offset += 1) {
              const nextRow = row + rowStep * offset;
              const nextCol = col + colStep * offset;

              if (nextRow < 0 || nextRow >= size || nextCol < 0 || nextCol >= size) {
                break;
              }

              const nextIndex = nextRow * size + nextCol;
              if (board[nextIndex] !== start) {
                break;
              }

              line.push(nextIndex);
            }

            if (line.length === winLength) {
              return line;
            }
          }
        }
      }

      return null;
    }

    function getPossibleWinningLines() {
      const lines = [];

      for (let row = 0; row < size; row += 1) {
        lines.push(Array.from({ length: size }, (_, col) => row * size + col));
      }

      for (let col = 0; col < size; col += 1) {
        lines.push(Array.from({ length: size }, (_, row) => row * size + col));
      }

      lines.push(Array.from({ length: size }, (_, index) => index * size + index));
      lines.push(Array.from({ length: size }, (_, index) => index * size + (size - 1 - index)));

      return lines;
    }

    function isForcedDraw() {
      return getPossibleWinningLines().every((line) => {
        const linePlayers = new Set(line.map((index) => board[index]).filter(Boolean));
        return linePlayers.has("black") && linePlayers.has("white");
      });
    }

    function finishDraw() {
      const nextStarter = activeStartingPlayer === "black" ? "white" : "black";

      gameOver = true;
      roundFinished = true;
      startingPlayer = nextStarter;
      statusText.textContent = `Pareggio. Prossima apre il ${players[nextStarter]}`;
      turnDot.classList.toggle("white", currentPlayer === "white");
      disableEmptyCells();

      showResult();
    }

    function finishWin(winner, winningLine) {
      const nextStarter = winner === "black" ? "white" : "black";

      gameOver = true;
      roundFinished = true;
      scores[winner] += 1;
      startingPlayer = nextStarter;
      markWinningLine(winningLine);
      updateScoreboard();
      statusText.textContent = `Ha vinto il ${players[winner]}. Prossima apre il ${players[nextStarter]}`;
      disableEmptyCells();

      showResult();
    }

    function markWinningLine(line) {
      line.forEach((index) => {
        boardElement.children[index].classList.add("win");
      });
    }

    function disableEmptyCells() {
      Array.from(boardElement.children).forEach((cell, index) => {
        if (!board[index]) {
          cell.disabled = true;
        }
      });
    }

    function updateStatus() {
      statusText.textContent = `Tocca al ${players[currentPlayer]}`;
      turnDot.classList.toggle("white", currentPlayer === "white");
    }

    function updateScoreboard() {
      blackScore.textContent = scores.black;
      whiteScore.textContent = scores.white;
    }

    function resetBoard(advanceRound = false) {
      if (advanceRound && !roundFinished) {
        startingPlayer = activeStartingPlayer === "black" ? "white" : "black";
      }

      document.querySelector("#result").hidden = true;
      board = Array(size * size).fill(null);
      currentPlayer = startingPlayer;
      activeStartingPlayer = startingPlayer;
      roundFinished = false;
      gameOver = false;

      Array.from(boardElement.children).forEach((cell) => {
        cell.classList.remove("win");
      });

      render();
      updateStatus();
    }

    function newMatch() {
      scores = {
        black: 0,
        white: 0
      };
      startingPlayer = "black";
      updateScoreboard();
      resetBoard(false);
    }

    newMatchButton.addEventListener("click", newMatch);
    resetBoardButton.addEventListener("click", () => resetBoard(true));
    buildBoard();
    newMatch();

function showResult() {
  document.querySelector("#result").hidden = false;
  document.querySelector("#nextRoundButton").focus({ preventScroll: true });
}
document.querySelector("#nextRoundButton").addEventListener("click", () => {
  resetBoard(false);
  boardElement.children[0].focus({ preventScroll: true });
});
const rotation = document.querySelector("#rotation");
const tilt = document.querySelector("#tilt");
function updateView() {
  document.querySelector(".table").style.transform = `rotateX(${tilt.value}deg) rotateZ(${rotation.value}deg)`;
  document.querySelector("#viewButton").textContent = tilt.value === "0" && rotation.value === "0" ? "Vista 3D ↗" : "Vista dall’alto ↗";
}
rotation.addEventListener("input", updateView);
tilt.addEventListener("input", updateView);
document.querySelector("#viewButton").addEventListener("click", () => {
  const flat = tilt.value === "0" && rotation.value === "0";
  tilt.value = flat ? "42" : "0";
  rotation.value = flat ? "-25" : "0";
  updateView();
});
