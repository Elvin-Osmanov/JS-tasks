'use strict';

// let message = document.querySelector('.message');

// let number = documnet.querySelector('.number');
// let score = documnet.querySelector('score');

let secretnumber = Math.trunc(Math.random() * 20 + 1);

let score = 20;
let highscore = 0;

const displayMessage = message =>
  (document.querySelector('.message').textContent = message);

let checkButton = document.querySelector('.check');
checkButton.addEventListener('click', () => {
  const guess = Number(document.querySelector('.guess').value);

  if (!guess) {
    displayMessage('No number!');
  } else if (guess === secretnumber) {
    displayMessage('Correct Number!');
    document.querySelector('.number').textContent = secretnumber;
    document.querySelector('body').style.backgroundColor = '#60b347';
    document.querySelector('.number').style.width = '30rem';
    if (score > highscore) {
      highscore = score;

      document.querySelector('.highscore').textContent = highscore;
    }
  } else if (guess !== secretnumber) {
    if (score > 1) {
      displayMessage(guess > secretnumber ? 'Too high' : 'Too low');

      score--;
      document.querySelector('.score').textContent = score;
    } else {
      displayMessage('You lost the game');
      document.querySelector('.score').textContent = 0;
    }
  } else if (guess > 20 || guess < 1) {
    displayMessage('Number is not ia given range');
  }
});

let againButton = document.querySelector('.again');

againButton.addEventListener('click', () => {
  score = 20;
  secretnumber = Math.trunc(Math.random() * 20 + 1);
  const guess = (document.querySelector('.guess').value = '');
  displayMessage('Start guessing...');
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
  document.querySelector('.score').textContent = score;
  document.querySelector('.number').textContent = '?';
});
