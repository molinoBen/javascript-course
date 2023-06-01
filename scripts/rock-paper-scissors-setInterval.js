let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0,
};

updateScoreElement();

/*
  if (score === null) {
    score = {
      wins: 0,
      losses: 0,
      ties: 0,
    };
  }
  */

function pickComputer() {
  const computerChoice1 = Math.floor(Math.random() * 3 + 1);
  let computer = '';

  if (computerChoice1 == 1) {
    computer = 'Paper';
  } else if (computerChoice1 == 2) {
    computer = 'Rock';
  } else {
    computer = 'Scissors';
  }

  return computer;
}
let isAutoPlaying = false;
let intervalId;

function autoPlay() {
  if (!isAutoPlaying) {
    intervalId = setInterval(() => {
      const playermove = pickComputer();
      playGame(playermove);
    }, 1000);
    isAutoPlaying = true;
  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;
  }
}

document.querySelector('.js-rock-button').addEventListener('click', () => {
  playGame('Rock');
});
document.querySelector('.js-paper-button').addEventListener('click', () => {
  playGame('Paper');
});
document.querySelector('.js-scissors-button').addEventListener('click', () => {
  playGame('Scissors');
});
document.querySelector('.js-reset-button').addEventListener('click', () => {
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  localStorage.removeItem('score');
  updateScoreElement();
});
document.querySelector('.js-autoplay-button').addEventListener('click', () => {
  autoPlay();
});

document.body.addEventListener('keydown', (event) => {
  if (event.key === 'r') {
    playGame('Rock');
  } else if (event.key === 'p') {
    playGame('Paper');
  } else if (event.key === 's') {
    playGame('Scissors');
  }
});

function playGame(playerMove) {
  const computer = pickComputer();
  let result = '';
  if (playerMove === 'Scissors') {
    if (computer === 'Paper') {
      result = 'You win!';
    } else if (computer == 'Rock') {
      result = 'You lose.';
    } else {
      result = "it's a tie.";
    }
  } else if (playerMove === 'Paper') {
    if (computer === 'Paper') {
      result = "it's a tie.";
    } else if (computer == 'Rock') {
      result = 'You win!';
    } else {
      result = 'You lose.';
    }
  } else {
    if (computer === 'Paper') {
      result = 'You lose.';
    } else if (computer == 'Rock') {
      result = "it's a tie.";
    } else {
      result = 'You win!';
    }
  }

  if (result === 'You win!') {
    score.wins += 1;
  } else if (result === 'You lose.') {
    score.losses += 1;
  } else {
    score.ties += 1;
  }

  localStorage.setItem('score', JSON.stringify(score));

  updateScoreElement();

  document.querySelector('.js-result').innerHTML = `${result}`;

  document.querySelector(
    '.js-moves'
  ).innerHTML = `You<img src="images/${playerMove}-emoji.png" class="move-icon" /><img
    src="images/${computer}-emoji.png"
    class="move-icon">Computer`;
}

function updateScoreElement() {
  document.querySelector(
    '.js-score'
  ).innerHTML = `Win: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}
