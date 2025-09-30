const elWelcome = document.getElementById('screen-welcome');
const elGame = document.getElementById('screen-game');
const formSetup = document.getElementById('setup-form');
const inputName = document.getElementById('playerName');
const optionsGrid = document.getElementById('options-grid');
const promptWord = document.getElementById('prompt-word');
const feedback = document.getElementById('feedback');
const btnRestart = document.getElementById('btn-restart');

const STATE = { player: '', mode: 'es', score: 0, round: 0, order: [] };

formSetup.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(formSetup);
  STATE.player = inputName.value.trim() || 'friend';
  STATE.mode = formData.get('mode');
  startGame();
});

btnRestart.addEventListener('click', () => startGame());

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function startGame() {
  STATE.score = 0;
  STATE.round = 0;
  STATE.order = shuffle([...Array(WORDS.length).keys()]);
  elWelcome.classList.add('d-none');
  elGame.classList.remove('d-none');
  nextQuestion();
}

function nextQuestion() {
  if (STATE.round >= STATE.order.length) {
    feedback.textContent = `Game over! ${STATE.player}, your score: ${STATE.score}`;
    return;
  }
  const idx = STATE.order[STATE.round];
  const word = WORDS[idx];
  const prompt = STATE.mode === 'es' ? word.es : word.en;
  const correct = STATE.mode === 'es' ? word.en : word.es;
  promptWord.textContent = prompt;
  const pool = STATE.mode === 'es' ? WORDS.map(w => w.en) : WORDS.map(w => w.es);
  const options = shuffle([correct, ...pool.filter(w => w !== correct).slice(0, 3)]);
  optionsGrid.innerHTML = '';
  options.forEach(opt => {
    const col = document.createElement('div');
    col.className = 'col-12 col-md-6';
    const btn = document.createElement('button');
    btn.className = 'btn btn-outline-primary w-100 option-btn';
    btn.textContent = opt;
    btn.onclick = () => handleAnswer(opt === correct);
    col.appendChild(btn);
    optionsGrid.appendChild(col);
  });
}

function handleAnswer(isCorrect) {
  if (isCorrect) {
    STATE.score++;
    feedback.textContent = `That's correct, ${STATE.player}!`;
    STATE.round++;
    setTimeout(nextQuestion, 500);
  } else {
    feedback.textContent = 'Try again!';
  }
}