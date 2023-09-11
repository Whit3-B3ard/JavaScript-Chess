const readline = require('readline');

const chessboard = [
  ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'],
  ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
  ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function prompt(message) {
  return new Promise((resolve) => {
    rl.question(message, (answer) => {
      resolve(answer);
    });
  });
}

function movePiece(startX, startY, endX, endY) {
  const piece = chessboard[startY][startX];

  if (isValidMove(startX, startY, endX, endY, piece)) {
    chessboard[endY][endX] = piece;
    chessboard[startY][startX] = ' ';
    return true;
  } else {
    return false;
  }
}

function isValidMove(startX, startY, endX, endY, piece) {
  // Implement your move validation logic here
  return true;
}

async function main() {
  const players = ['Player 1', 'Player 2'];
  let currentPlayerIndex = 0;

  while (true) {
    const playerName = players[currentPlayerIndex];
    console.log(`${playerName}, it's your turn.`);

    const moveInput = await prompt("Enter your move (e.g., 'e2 to e4' or 'quit' to exit): ");
    
    if (moveInput.toLowerCase() === 'quit') {
      break; // Exit the game loop if 'quit' is entered
    }

    const [startX, startY, endX, endY] = parseMoveInput(moveInput);

    if (movePiece(startX, startY, endX, endY)) {
      console.log(`Moved piece to ${String.fromCharCode(65 + endX)}${8 - endY}`);
      printChessboard();
      currentPlayerIndex = (currentPlayerIndex + 1) % players.length; // Switch to the other player
    } else {
      console.log(`Invalid move.`);
    }
  }

  rl.close();
}

function parseMoveInput(moveInput) {
  const [startSquare, endSquare] = moveInput.split(' to ');
  const startX = startSquare.charCodeAt(0) - 'a'.charCodeAt(0);
  const startY = 8 - parseInt(startSquare[1]);
  const endX = endSquare.charCodeAt(0) - 'a'.charCodeAt(0);
  const endY = 8 - parseInt(endSquare[1]);
  return [startX, startY, endX, endY];
}

function printChessboard() {
  console.log('Current Chessboard:');
  for (let row = 0; row < 8; row++) {
    console.log(chessboard[row].join(' '));
  }
}

main();
