const boxes = document.getElementsByClassName("box");

[...boxes].forEach((box) => {
  box.addEventListener("click", putXorO);
});

let play = "p1";
let win = false;
let redScore = 0;
let blueScore = 0;
const winTurnDraw = document.querySelector("h3");

function putXorO(event) {
  const place = event.target;
  const chance = document.getElementsByClassName("chance")[0];
  if (play === "p1") {
    chance.style.color = "blue";
    place.style.color = "red";
    place.innerText = "X";
    place.removeEventListener("click", putXorO);
    insert(Number(place.id), "X");
    play = "p2";
  } else {
    chance.style.color = "red";
    place.style.color = "blue";
    place.innerText = "O";
    place.removeEventListener("click", putXorO);
    insert(Number(place.id), "O");
    play = "p1";
  }

  if (checkWin()) {
    console.log(checkWin() + " won");
    win = true;
    if (checkWin() === "X") {
      redScore++;
      document.querySelector(".red_score").innerText = redScore;
    } else {
      blueScore++;
      document.querySelector(".blue_score").innerText = blueScore;
    }
    winTurnDraw.innerHTML = `<span class="winColor">${checkWin()} </span>Won`;
    gameOver();
  }
  if (checkFilled() && !win) {
    console.log("draw");
    winTurnDraw.innerText = "Match Draw !";
    gameOver();
  }
}

let board = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];
let gameOn = true;
let count = 0;

const gameOver = () => {
  [...boxes].forEach((box) => {
    box.removeEventListener("click", putXorO);
  });
};

const checkFilled = () => {
  for (let row = 0; row < 3; row++) {
    for (col = 0; col < 3; col++) {
      if (board[row][col] === "") return false;
    }
  }
  return true;
};

const insert = (grid, sym) => {
  if (grid === 1) board[0][0] = sym;
  else if (grid === 2) board[0][1] = sym;
  else if (grid === 3) board[0][2] = sym;
  else if (grid === 4) board[1][0] = sym;
  else if (grid === 5) board[1][1] = sym;
  else if (grid === 6) board[1][2] = sym;
  else if (grid === 7) board[2][0] = sym;
  else if (grid === 8) board[2][1] = sym;
  else board[2][2] = sym;
  console.log(board);
};

const checkWin = () => {
  for (let row = 0; row < 3; row++) {
    if (
      board[row][0] !== "" &&
      board[row][0] === board[row][1] &&
      board[row][1] === board[row][2]
    )
      return board[row][0];
  }
  for (let col = 0; col < 3; col++) {
    if (
      board[0][col] !== "" &&
      board[0][col] === board[1][col] &&
      board[1][col] === board[2][col]
    )
      return board[0][col];
  }
  if (
    board[0][0] !== "" &&
    board[0][0] === board[1][1] &&
    board[1][1] === board[2][2]
  )
    return board[0][0];
  if (
    board[0][2] !== "" &&
    board[0][2] === board[1][1] &&
    board[1][1] === board[2][0]
  )
    return board[0][2];

  return null;
};

const nextMatch = () => {
  board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  [...boxes].forEach((box) => {
    box.innerText = "";
    box.addEventListener("click", putXorO);
  });
  winTurnDraw.innerHTML = 'It\'s <span class="chance">Your</span> Turn';
  win = false;
};
