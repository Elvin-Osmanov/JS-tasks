'use strict';

const score0 = document.querySelector('#score--0');
const score1 = document.querySelector('#score--1');
const dice = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const current0 = document.querySelector('#current--0');
const current1 = document.querySelector('#current--1');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const players = document.querySelectorAll('.player');

let scores, currentScore, gameIsPlaying, activePlayer;

const reset = () => {
  gameIsPlaying = true;
  dice.classList.add('hidden');
  score0.textContent = 0;
  score1.textContent = 0;
  currentScore = 0;
  current0.textContent = 0;
  current1.textContent = 0;
  scores = [0, 0];
  activePlayer = 0;
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
};
reset();

const changeplayer = () => {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};

score0.textContent = 0;
score1.textContent = 0;
dice.classList.add('hidden');

btnRoll.addEventListener('click', () => {
  if (gameIsPlaying) {
    let diceRandom = Math.trunc(Math.random() * 6) + 1;

    dice.classList.remove('hidden');
    dice.src = `images/dice-${diceRandom}.png`;
    if (diceRandom !== 1) {
      currentScore += diceRandom;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      changeplayer();
    }
  }
});

btnHold.addEventListener('click', () => {
  if (gameIsPlaying) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 100) {
      gameIsPlaying = false;
      dice.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      changeplayer();
    }
  }
});

btnNew.addEventListener('click', reset);
