// ========== ELEMENT REFERENCES ==========
const voiceSelectSection = document.getElementById('voice-select-section');
const voiceSelectControls = document.getElementById('voice-select-controls');
const toggleVoiceSelect = document.getElementById('toggle-voice-select');
const toggleVoiceLabel = document.getElementById('toggle-voice-label');

const elWelcome  = document.getElementById('screen-welcome');
const elGame     = document.getElementById('screen-game');
const elFinish   = document.getElementById('screen-finish');

const formSetup  = document.getElementById('setup-form');
const inputName  = document.getElementById('playerName');
const btnDemo    = document.getElementById('btn-demo');

const categoryGrid = document.getElementById('category-grid');
const btnSelectAll = document.getElementById('btn-select-all');

const levelGrid = document.getElementById('level-grid');
const btnSelectAllLevels = document.getElementById('btn-select-all-levels');

const subtitleUI = document.getElementById('subtitle-ui');
const scoreUI    = document.getElementById('score-ui');
const uiPlayer   = document.getElementById('ui-player');

const promptWord = document.getElementById('prompt-word');
const promptImage = document.getElementById('prompt-image');
const btnSpeak   = document.getElementById('btn-speak');
const optionsGrid= document.getElementById('options-grid');
const feedback   = document.getElementById('feedback');

const btnSkip    = document.getElementById('btn-skip');
const btnSwitch  = document.getElementById('btn-switch');
const btnRestart = document.getElementById('btn-restart');

const toggleAutoplaySetup  = document.getElementById('toggle-autoplay');
const toggleAutoplayInGame = document.getElementById('toggle-autoplay-ingame');

// Spanish voice dropdown + refresh
const voiceSelectEs = document.getElementById('voice-select-es');
const btnRefreshVoices = document.getElementById('btn-refresh-voices');

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
  poolWords: [],         // filtered by categories + levels
  categories: [],        // selected categories
  levels: [],            // selected levels
  order: [],             // shuffled indices into poolWords
  round: 0,
  score: 0,
  currentText: '',
  currentLang: 'es-MX',
  awaiting: true,
  // voice prefs
  voices: [],
  spanishVoiceURI: '',   // saved user's choice (voiceURI); '' = auto
  showVoiceSelect: true
};

// ========== PERSIST PREFERENCES ==========
function savePrefs() {
  try {
    localStorage.setItem('bv_player', STATE.player);
    localStorage.setItem('bv_mode', STATE.mode);
    localStorage.setItem('bv_autoplay', String(STATE.autoplay));
    localStorage.setItem('bv_categories', JSON.stringify(STATE.categories));
    localStorage.setItem('bv_levels', JSON.stringify(STATE.levels));
    localStorage.setItem('bv_voice_es', STATE.spanishVoiceURI || '');
    localStorage.setItem('bv_show_voice_select', String(STATE.showVoiceSelect));
  } catch {}
}

function loadPrefs() {
  try {
    const p = localStorage.getItem('bv_player');
    const m = localStorage.getItem('bv_mode');
    const a = localStorage.getItem('bv_autoplay');
    const c = localStorage.getItem('bv_categories');
    const l = localStorage.getItem('bv_levels');
    const v = localStorage.getItem('bv_voice_es');
    const s = localStorage.getItem('bv_show_voice_select');

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
    if (l) {
      const lv = JSON.parse(l);
      STATE.levels = Array.isArray(lv) ? lv : [];
    }
    if (typeof v === 'string') STATE.spanishVoiceURI = v;
    if (typeof s === 'string') STATE.showVoiceSelect = (s === 'true');
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
function getAllVoices() {
  return new Promise((resolve) => {
    const synth = window.speechSynthesis;
    let voices = synth.getVoices();
    if (voices && voices.length) return resolve(voices);
    const onChange = () => {
      voices = synth.getVoices();
      if (voices && voices.length) {
        synth.removeEventListener('voiceschanged', onChange);
        resolve(voices);
      }
    };
    synth.addEventListener('voiceschanged', onChange);
    setTimeout(() => resolve(synth.getVoices() || []), 600);
  });
}

// Voice dropdown
async function populateVoiceSelectEs() {
  if (!('speechSynthesis' in window) || !voiceSelectEs) return;
  STATE.voices = await getAllVoices();
  const spanish = STATE.voices.filter(v => (v.lang || '').toLowerCase().startsWith('es'));
  voiceSelectEs.innerHTML = '<option value="">Auto (device default)</option>';
  spanish.sort((a, b) => {
    const la = (a.lang || ''), lb = (b.lang || '');
    if (la !== lb) return la.localeCompare(lb);
    return (a.name || '').localeCompare(b.name || '');
  });
  spanish.forEach(v => {
    const opt = document.createElement('option');
    opt.value = v.voiceURI;
    opt.textContent = `${v.name} — ${v.lang}`;
    voiceSelectEs.appendChild(opt);
  });
  if (STATE.spanishVoiceURI) {
    const match = Array.from(voiceSelectEs.options).find(o => o.value === STATE.spanishVoiceURI);
    voiceSelectEs.value = match ? STATE.spanishVoiceURI : '';
  }
}

// Speak helper
async function speak(text, lang) {
  if (!('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang  = lang;
  utter.rate  = 0.9;
  utter.pitch = 1.0;

  if (lang.toLowerCase().startsWith('es')) {
    if (!STATE.voices.length) STATE.voices = await getAllVoices();
    let chosen = null;
    if (STATE.spanishVoiceURI) {
      chosen = STATE.voices.find(v => v.voiceURI === STATE.spanishVoiceURI);
    }
    if (!chosen) {
      const voices = STATE.voices;
      const esmx = voices.find(v => (v.lang || '').toLowerCase() === 'es-mx');
      const esus = voices.find(v => (v.lang || '').toLowerCase() === 'es-us');
      const eses = voices.find(v => (v.lang || '').toLowerCase() === 'es-es');
      chosen = esmx || esus || eses || voices.find(v => (v.lang || '').toLowerCase().startsWith('es')) || null;
    }
    if (chosen) utter.voice = chosen;
  }

  window.speechSynthesis.speak(utter);
}

// ========== FILTER UI ==========
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
function renderLevelCheckboxes() {
  const selected = new Set(STATE.levels.length ? STATE.levels : LEVELS);
  levelGrid.innerHTML = '';
  LEVELS.forEach((lvl, i) => {
    const id = `lvl-${i}`;
    const col = document.createElement('div');
    col.className = 'col-6 col-md-4';
    col.innerHTML = `
      <div class="form-check">
        <input class="form-check-input lvl-check" type="checkbox" id="${id}" value="${lvl}" ${selected.has(lvl) ? 'checked' : ''}>
        <label class="form-check-label" for="${id}">${lvl}</label>
      </div>
    `;
    levelGrid.appendChild(col);
  });
}
function getSelectedCategories() {
  return Array.from(document.querySelectorAll('.cat-check:checked')).map(cb => cb.value);
}
function getSelectedLevels() {
  return Array.from(document.querySelectorAll('.lvl-check:checked')).map(cb => cb.value);
}

// ========== SCREENS ==========
function showWelcome(){ elWelcome.classList.remove('d-none'); elGame.classList.add('d-none'); elFinish.classList.add('d-none'); }
function showGame(){ elWelcome.classList.add('d-none'); elGame.classList.remove('d-none'); elFinish.classList.add('d-none'); }
function showFinish(){ elWelcome.classList.add('d-none'); elGame.classList.add('d-none'); elFinish.classList.remove('d-none'); }

// ========== GAME CONTROL ==========
function buildPoolWords() {
  const chosenCats = STATE.categories.length ? STATE.categories : [...CATEGORIES];
  const chosenLvls = STATE.levels.length ? STATE.levels : [...LEVELS];
  STATE.poolWords = WORDS.filter(w => chosenCats.includes(w.cat) && chosenLvls.includes(w.level));
}
function makeOrder() {
  const idxs = STATE.poolWords.map((_, i) => i);
  return shuffle(idxs);
}

function startGame() {
  STATE.player = inputName.value.trim() || 'friend';
  STATE.autoplay = !!(toggleAutoplaySetup.checked);
  STATE.categories = getSelectedCategories();
  STATE.levels = getSelectedLevels();
  savePrefs();

  buildPoolWords();
  if (STATE.poolWords.length === 0) {
    // If nothing matches (e.g., no levels checked), default to all
    STATE.poolWords = [...WORDS];
  }

  STATE.mode = document.querySelector('input[name="mode"]:checked')?.value === 'en' ? 'en' : 'es';
  STATE.order = makeOrder();
  STATE.round = 0;
  STATE.score = 0;
  STATE.awaiting = true;

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

  // Prompt/answer based on mode
  const prompt = STATE.mode === 'es' ? pair.es : pair.en;
  const correct = STATE.mode === 'es' ? pair.en : pair.es;

  // Prompt text + image
  promptWord.textContent = prompt;
  STATE.currentText = prompt;
  STATE.currentLang = STATE.mode === 'es' ? 'es-MX' : 'en-US';

  if (pair.img) {
    promptImage.src = pair.img;
    promptImage.alt = `Image of ${prompt}`;
    promptImage.style.display = '';
  } else {
    promptImage.src = '';
    promptImage.alt = '';
    promptImage.style.display = 'none';
  }

  // Build options (1 correct + 3 distractors) from filtered pool
  const pool = STATE.mode === 'es' ? STATE.poolWords.map(w => w.en) : STATE.poolWords.map(w => w.es);
  let distractorPool = pool.filter(w => w !== correct);
  if (distractorPool.length < 3) {
    const globalPool = (STATE.mode === 'es' ? WORDS.map(w => w.en) : WORDS.map(w => w.es)).filter(w => w !== correct);
    distractorPool = unique([...distractorPool, ...globalPool]);
  }
  const distractors = shuffle(distractorPool).slice(0, 3);
  const options = shuffle([correct, ...distractors]);

  // Render buttons (1 col on xs, 2 cols md+)
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

  // Auto-play if enabled
  if (('speechSynthesis' in window) && (STATE.autoplay || toggleAutoplayInGame.checked)) {
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

// ========== EVENTS ==========
formSetup.addEventListener('submit', (e) => {
  e.preventDefault();
  startGame();
});

btnDemo.addEventListener('click', async () => {
  inputName.value = inputName.value.trim() || 'Player';
  document.getElementById('mode-es').checked = true;
  // Select all categories and levels for demo
  STATE.categories = [...CATEGORIES];
  STATE.levels = [...LEVELS];
  renderCategoryCheckboxes();
  renderLevelCheckboxes();
  document.querySelectorAll('.cat-check').forEach(cb => cb.checked = true);
  document.querySelectorAll('.lvl-check').forEach(cb => cb.checked = true);
  toggleAutoplaySetup.checked = true;

  await populateVoiceSelectEs();
  const opt = Array.from(voiceSelectEs.options).find(o => /es-MX/i.test(o.textContent));
  if (opt) voiceSelectEs.value = opt.value;
  STATE.spanishVoiceURI = voiceSelectEs.value;
  savePrefs();
  startGame();
});

btnSelectAll.addEventListener('click', () => {
  const current = getSelectedCategories();
  const selectAll = current.length !== CATEGORIES.length;
  document.querySelectorAll('.cat-check').forEach(cb => cb.checked = selectAll);
});
btnSelectAllLevels.addEventListener('click', () => {
  const current = getSelectedLevels();
  const selectAll = current.length !== LEVELS.length;
  document.querySelectorAll('.lvl-check').forEach(cb => cb.checked = selectAll);
});

btnSkip.addEventListener('click', () => {
  STATE.round++;
  nextQuestion();
});

btnSwitch.addEventListener('click', () => {
  STATE.mode = STATE.mode === 'es' ? 'en' : 'es';
  savePrefs();
  STATE.round = 0;
  STATE.score = 0;
  STATE.order = makeOrder();
  subtitleUI.textContent = STATE.mode === 'es'
    ? 'Translate this Spanish word:'
    : 'Translate this English word:';
  nextQuestion();
});

btnRestart.addEventListener('click', () => {
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

// Finish screen
finishReplay?.addEventListener('click', () => {
  STATE.round = 0;
  STATE.score = 0;
  STATE.order = makeOrder();
  showGame();
  nextQuestion();
  updateScoreUI();
});
finishSwitch?.addEventListener('click', () => {
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
document.getElementById('finish-category')?.addEventListener('click', () => showWelcome());

// Speaker
if (!('speechSynthesis' in window)) {
  btnSpeak.classList.add('d-none');
} else {
  btnSpeak.addEventListener('click', () => {
    if (STATE.currentText) speak(STATE.currentText, STATE.currentLang);
  });
}

// Voice dropdown + refresh
voiceSelectEs?.addEventListener('change', () => {
  STATE.spanishVoiceURI = voiceSelectEs.value;
  savePrefs();
});
btnRefreshVoices?.addEventListener('click', () => populateVoiceSelectEs());

// Init
loadPrefs();
renderCategoryCheckboxes();
renderLevelCheckboxes();

// Restore saved checks
if (STATE.categories.length) {
  document.querySelectorAll('.cat-check').forEach(cb => cb.checked = STATE.categories.includes(cb.value));
} else {
  // default: all categories checked
  document.querySelectorAll('.cat-check').forEach(cb => cb.checked = true);
}
if (STATE.levels.length) {
  document.querySelectorAll('.lvl-check').forEach(cb => cb.checked = STATE.levels.includes(cb.value));
} else {
  // default: all levels checked
  document.querySelectorAll('.lvl-check').forEach(cb => cb.checked = true);
}

// Show/hide Spanish voice selector area
if (voiceSelectControls && toggleVoiceSelect && toggleVoiceLabel) {
  voiceSelectControls.style.display = STATE.showVoiceSelect ? '' : 'none';
  toggleVoiceSelect.checked = STATE.showVoiceSelect;
  toggleVoiceLabel.textContent = STATE.showVoiceSelect ? 'Hide' : 'Unhide';
  toggleVoiceSelect.addEventListener('change', () => {
    STATE.showVoiceSelect = toggleVoiceSelect.checked;
    voiceSelectControls.style.display = STATE.showVoiceSelect ? '' : 'none';
    toggleVoiceLabel.textContent = STATE.showVoiceSelect ? 'Hide' : 'Unhide';
    savePrefs();
  });
}

// Populate voices (handle late availability on mobile)
if ('speechSynthesis' in window) {
  populateVoiceSelectEs();
  window.speechSynthesis.addEventListener('voiceschanged', populateVoiceSelectEs);
}
