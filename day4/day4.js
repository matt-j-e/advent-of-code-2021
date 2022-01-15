let filename = "input.txt";
let test = 0
if (test) {
  filename = "test.txt";
}
const fs = require('fs');
try {
  input = fs.readFileSync(filename, 'utf8').split('\n');
} catch(e) {
  console.log(e);
}

// extract row 1 as the sequence of numbers
const seq = input.shift().split(',');
// remove the empty lines
input = input.filter(el => el !== "");
// build the bingo cards data structure
const cards = [];
while (input.length > 0) {
  const card = {};
  for (let i = 0; i < 5; i++) {
    card[`row${i}`] = input.shift().trim().replace(/ +/g, ",").split(",");
  }
  cards.push(card);
}
// console.log(cards);

const hasFiveCrosses = (arr) => {
  return arr.filter(el => el === 'x').length === 5;
}

checkForWinner = () => {
  let winner = false;
  for (card of cards) {
    if (hasFiveCrosses(card.row0)) winner = card;
    if (hasFiveCrosses(card.row1)) winner = card;
    if (hasFiveCrosses(card.row2)) winner = card;
    if (hasFiveCrosses(card.row3)) winner = card;
    if (hasFiveCrosses(card.row4)) winner = card;

    for (let i = 0; i < 5; i++) {
      if (
        card.row0[i] === 'x' &&
        card.row1[i] === 'x' &&
        card.row2[i] === 'x' &&
        card.row3[i] === 'x' &&
        card.row4[i] === 'x'
      ) {
        winner = card;
      }
    }
  }
  return winner;
};

markCards = (number) => {
  cards.forEach((card, i) => {
    card.row0.forEach((entry, j) => {
      if (entry === number) cards[i].row0[j] = 'x';
    });
    card.row1.forEach((entry, j) => {
      if (entry === number) cards[i].row1[j] = 'x';
    });
    card.row2.forEach((entry, j) => {
      if (entry === number) cards[i].row2[j] = 'x';
    });
    card.row3.forEach((entry, j) => {
      if (entry === number) cards[i].row3[j] = 'x';
    });
    card.row4.forEach((entry, j) => {
      if (entry === number) cards[i].row4[j] = 'x';
    });
  });
};


let sum = 0;
let winningCard;
for (number of seq) {
  markCards(number);
  winningCard = checkForWinner();
  if (winningCard) {
    break;
  }
}

winningCard.row0.forEach(number => {
  if (number !== 'x') sum += parseInt(number)
});
winningCard.row1.forEach(number => {
  if (number !== 'x') sum += parseInt(number)
});
winningCard.row2.forEach(number => {
  if (number !== 'x') sum += parseInt(number)
});
winningCard.row3.forEach(number => {
  if (number !== 'x') sum += parseInt(number)
});
winningCard.row4.forEach(number => {
  if (number !== 'x') sum += parseInt(number)
});

console.log("Answer a =", number * sum);

// Answer a = 35670

