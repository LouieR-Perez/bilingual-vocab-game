// ========== ELEMENT REFERENCES ==========
const elWelcome  = document.getElementById('screen-welcome');
const elGame     = document.getElementById('screen-game');
const elFinish   = document.getElementById('screen-finish');

const formSetup  = document.getElementById('setup-form');
const inputName  = document.getElementById('playerName');
const btnDemo    = document.getElementById('btn-demo');

const categoryGrid = document.getElementById('category-grid');
const btnSelectAll = document.getElementById('btn-select-all');

const subtitleUI = document.getElementById('subtitle-ui');
const scoreUI    = document.getElementById('score-ui');
const uiPlayer   = document.getElementById('ui-player');

const promptWord = document.getElementById('prompt-word');
const btnSpeak   = document.getElementById('btn-speak');
const optionsGrid= document.getElementById('options-grid');
const feedback   = document.getElementById('feedback');

const btnSkip    = document.getElementById('btn-skip');
const btnSwitch  = document.getElementById('btn-switch');
const btnRestart = document.getElementById('btn-restart');

const toggleAutoplaySetup  = document.getElementById('toggle-autoplay');
const toggleAutoplayInGame = document.getElementById('toggle-autoplay-ingame');

const finishPlayer = document.getElementById('finish-player');
const finishScore  = document.getElementById('finish-score');
const finishReplay = document.getElementById('finish-replay');
const finishSwitch = document.getElementById('finish-switch');

// ========== GAME STATE ==========
const STATE = {
  player: '',
  mode: 'es',            // 'es' = learn Spanish, 'en' = learn English
  autoplay: false,       // auto-pronounce prompt
  allWords: WORDS,       // master list
  poolWords: [],         // filtered by categories
  categories: [],        // selected categories
  order: [],             // shuffled indices into poolWords
  round: 0,
  score: 0,
  currentText: '',
  currentLang: 'es-MX',
  awaiting: true,
};

// ========== PERSIST PREFERENCES ==========
function savePrefs() {
  try {
    localStorage.setItem('bv_player', STATE.player);
    localStorage.setItem('bv_mode', STATE.mode);
    localStorage.setItem('bv_autoplay', String(STATE.autoplay));
    localStorage.setItem('bv_categories', JSON.stringify(STATE.categories));
  } catch {}
}

function loadPrefs() {
  try {
    const p = localStorage.getItem('bv_player');
    const m = localStorage.getItem('bv_mode');
    const a = localStorage.getItem('bv_autoplay');
    const c = localStorage.getItem('bv_categories');
    if (p) inputName.value = p;
    if (m) document.getElementById(`mode-${m}`)?.setAttribute('checked', 'checked');
    if (a !== null) {
      const val = a === 'true';
      toggleAutoplaySetup.checked = val;
      STATE.autoplay = val;
    }
    if (c) {
      const cats = JSON.parse(c);
      STATE.categories = Array.isArray(cats) ? cats : [];
    }
  } catch {}
}

// ========== UTILS ==========
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function unique(arr) {
  return Array.from(new Set(arr));
}

// Randomly pick n items from an array (without replacement)
function pickN(array, n, exclude = []) {
  const pool = array.filter(v => !exclude.includes(v));
  const result = [];
  const copy = [...pool];
  while (result.length < n && copy.length) {
    const i = Math.floor(Math.random() * copy.length);
    result.push(copy.splice(i, 1)[0]);
  }
  return result;
}

// Web Speech API helper
function speak(text, lang) {
  if (!('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = lang;
  utter.rate = 0.95;
  utter.pitch = 1.0;

  // Try to select a Spanish voice for Spanish prompts
  if (lang.startsWith('es')) {
    const voices = window.speechSynthesis.getVoices();
    // Prefer Mexican Spanish, then Spain, then any Spanish
    let spanishVoice = voices.find(v => v.lang === 'es-MX')
      || voices.find(v => v.lang === 'es-ES')
      || voices.find(v => v.lang.startsWith('es'));
    if (spanishVoice) {
      utter.voice = spanishVoice;
    }
  }
  // For English, you can add similar logic if needed

  window.speechSynthesis.speak(utter);
}

// ========== CATEGORY UI ==========
function renderCategoryCheckboxes() {
  const selected = new Set(STATE.categories);
  categoryGrid.innerHTML = '';
  CATEGORIES.forEach((cat, i) => {
    const id = `cat-${i}`;
    const col = document.createElement('div');
    col.className = 'col-6 col-md-4 col-lg-3';
    col.innerHTML = `
      <div class="form-check">
        <input class="form-check-input cat-check" type="checkbox" id="${id}" value="${cat}" ${selected.has(cat) ? 'checked' : ''}>
        <label class="form-check-label" for="${id}">${cat}</label>
      </div>
    `;
    categoryGrid.appendChild(col);
  });
}

function getSelectedCategories() {
  return Array.from(document.querySelectorAll('.cat-check:checked')).map(cb => cb.value);
}

// ========== SCREENS ==========
function showWelcome() {
  elWelcome.classList.remove('d-none');
  elGame.classList.add('d-none');
  elFinish.classList.add('d-none');
}
function showGame() {
  elWelcome.classList.add('d-none');
  elGame.classList.remove('d-none');
  elFinish.classList.add('d-none');
}
function showFinish() {
  elWelcome.classList.add('d-none');
  elGame.classList.add('d-none');
  elFinish.classList.remove('d-none');
}

// ========== GAME CONTROL ==========
function buildPoolWords() {
  const chosen = STATE.categories.length ? STATE.categories : [...CATEGORIES];
  STATE.poolWords = WORDS.filter(w => chosen.includes(w.cat));
}

function makeOrder() {
  const idxs = STATE.poolWords.map((_, i) => i);
  return shuffle(idxs);
}

function startGame() {
  STATE.player = inputName.value.trim() || 'friend';
  STATE.autoplay = !!(toggleAutoplaySetup.checked);
  STATE.categories = getSelectedCategories();
  savePrefs();

  buildPoolWords();

  // Ensure we have at least 1 word and enough distractors.
  if (STATE.poolWords.length === 0) {
    // If nothing selected, default to all
    STATE.poolWords = [...WORDS];
  }

  STATE.mode = document.querySelector('input[name="mode"]:checked')?.value === 'en' ? 'en' : 'es';
  STATE.order = makeOrder();
  STATE.round = 0;
  STATE.score = 0;
  STATE.awaiting = true;

  // UI setup
  uiPlayer.textContent = STATE.player;
  subtitleUI.textContent = STATE.mode === 'es'
    ? 'Translate this Spanish word:'
    : 'Translate this English word:';
  toggleAutoplayInGame.checked = STATE.autoplay;

  feedback.textContent = '';
  feedback.classList.remove('text-success', 'text-danger');
  showGame();
  nextQuestion();
  updateScoreUI();
}

function updateScoreUI() {
  scoreUI.textContent = `Score: ${STATE.score} • Question ${Math.min(STATE.round + 1, STATE.poolWords.length)}/${STATE.poolWords.length}`;
}

function nextQuestion() {
  if (STATE.round >= STATE.order.length) {
    finishPlayer.textContent = STATE.player || 'friend';
    finishScore.textContent = `${STATE.score}/${STATE.poolWords.length}`;
    showFinish();
    return;
  }

  STATE.awaiting = true;
  feedback.textContent = '';
  feedback.classList.remove('text-success', 'text-danger');
  optionsGrid.innerHTML = '';

  const wordIdx = STATE.order[STATE.round];
  const pair = STATE.poolWords[wordIdx];

  // Determine prompt and correct answer based on mode
  const prompt = STATE.mode === 'es' ? pair.es : pair.en;
  const correct = STATE.mode === 'es' ? pair.en : pair.es;

  // Set prompt + TTS language
  promptWord.textContent = prompt;
  STATE.currentText = prompt;
  STATE.currentLang = STATE.mode === 'es' ? 'es-MX' : 'en-US';

  // Build distractor pool from selected categories; fallback to global pool if needed
  const selectedPool = STATE.mode === 'es'
    ? STATE.poolWords.map(w => w.en)
    : STATE.poolWords.map(w => w.es);

  let distractorPool = selectedPool.filter(w => w !== correct);
  if (distractorPool.length < 3) {
    const globalPool = (STATE.mode === 'es' ? WORDS.map(w => w.en) : WORDS.map(w => w.es))
      .filter(w => w !== correct);
    distractorPool = unique([...distractorPool, ...globalPool]);
  }

  const distractors = shuffle(distractorPool).slice(0, 3);
  const options = shuffle([correct, ...distractors]);

  // Render 4 option buttons (1 col xs, 2 cols md+)
  options.forEach((opt) => {
    const col = document.createElement('div');
    col.className = 'col-12 col-md-6';
    const btn = document.createElement('button');
    btn.className = 'btn btn-outline-primary w-100 option-btn';
    btn.type = 'button';
    btn.textContent = opt;
    btn.onclick = () => handleAnswer(opt === correct, btn);
    col.appendChild(btn);
    optionsGrid.appendChild(col);
  });

  // Auto-play if enabled and supported
  if (('speechSynthesis' in window) && (STATE.autoplay || toggleAutoplayInGame.checked)) {
    // small delay so user sees the word first
    setTimeout(() => speak(STATE.currentText, STATE.currentLang), 250);
  }

  updateScoreUI();
}

function handleAnswer(isCorrect, btn) {
  if (!STATE.awaiting) return;

  if (isCorrect) {
    STATE.score++;
    feedback.textContent = `That's correct, ${STATE.player}! 🎉`;
    feedback.classList.remove('text-danger');
    feedback.classList.add('text-success');
    STATE.round++;
    STATE.awaiting = false;
    updateScoreUI();
    setTimeout(nextQuestion, 500);
  } else {
    feedback.textContent = 'Try again!';
    feedback.classList.remove('text-success');
    feedback.classList.add('text-danger');
    btn.classList.add('shake');
    setTimeout(() => btn.classList.remove('shake'), 350);
  }
}

// ========== NAV / BUTTON EVENTS ==========
formSetup.addEventListener('submit', (e) => {
  e.preventDefault();
  startGame();
});

btnDemo.addEventListener('click', () => {
  inputName.value = inputName.value.trim() || 'Player';
  document.getElementById('mode-es').checked = true;
  // Select all categories for demo
  STATE.categories = [...CATEGORIES];
  renderCategoryCheckboxes();
  document.querySelectorAll('.cat-check').forEach(cb => cb.checked = true);
  toggleAutoplaySetup.checked = true;
  startGame();
});

btnSelectAll.addEventListener('click', () => {
  const current = getSelectedCategories();
  const selectAll = current.length !== CATEGORIES.length;
  document.querySelectorAll('.cat-check').forEach(cb => cb.checked = selectAll);
});

btnSkip.addEventListener('click', () => {
  STATE.round++;
  nextQuestion();
});

btnSwitch.addEventListener('click', () => {
  STATE.mode = STATE.mode === 'es' ? 'en' : 'es';
  savePrefs();
  // restart but keep categories & autoplay
  STATE.round = 0;
  STATE.score = 0;
  STATE.order = makeOrder();
  subtitleUI.textContent = STATE.mode === 'es'
    ? 'Translate this Spanish word:'
    : 'Translate this English word:';
  nextQuestion();
});

btnRestart.addEventListener('click', () => {
  // restart with same settings
  STATE.round = 0;
  STATE.score = 0;
  STATE.order = makeOrder();
  nextQuestion();
  updateScoreUI();
});

toggleAutoplayInGame.addEventListener('change', () => {
  STATE.autoplay = toggleAutoplayInGame.checked;
  toggleAutoplaySetup.checked = STATE.autoplay;
  savePrefs();
});

finishReplay.addEventListener('click', () => {
  STATE.round = 0;
  STATE.score = 0;
  STATE.order = makeOrder();
  showGame();
  nextQuestion();
  updateScoreUI();
});

finishSwitch.addEventListener('click', () => {
  STATE.mode = STATE.mode === 'es' ? 'en' : 'es';
  savePrefs();
  showGame();
  STATE.round = 0;
  STATE.score = 0;
  STATE.order = makeOrder();
  subtitleUI.textContent = STATE.mode === 'es'
    ? 'Translate this Spanish word:'
    : 'Translate this English word:';
  nextQuestion();
});

// New: Select new category button
const finishCategory = document.getElementById('finish-category');
if (finishCategory) {
  finishCategory.addEventListener('click', () => {
    showWelcome();
  });
}

// Hide speaker if TTS unsupported
if (!('speechSynthesis' in window)) {
  btnSpeak.classList.add('d-none');
} else {
  btnSpeak.addEventListener('click', () => {
    if (STATE.currentText) speak(STATE.currentText, STATE.currentLang);
  });
}

// Initialize category UI, load preferences, and seed defaults
loadPrefs();
renderCategoryCheckboxes();
// If we have saved categories, reflect them in the UI
if (STATE.categories.length) {
  document.querySelectorAll('.cat-check').forEach(cb => {
    cb.checked = STATE.categories.includes(cb.value);
  });
}
