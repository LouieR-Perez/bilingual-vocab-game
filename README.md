# Bilingual Vocab Game

An interactive vocabulary game to help users practice English (US) and Spanish (Mexico).  
Now includes:
- **Text-to-Speech**: click the speaker to hear the prompt word (ES: es-MX, EN: en-US)
- **Auto-play pronunciation** toggle
- **Category filters** (pick one or more)
- **Mobile-friendly** layout (Bootstrap 5)

## Features
- Enter your name and choose which language to learn (English or Spanish).
- Select one or more categories to build your quiz.
- Flashcard-style questions with 4 choices (1 correct + 3 distractors).
- Friendly feedback messages and running score.
- Pronunciation button + auto-play (uses the Web Speech API).
- Saves your name, mode, categories, and autoplay preference.

## Tech Stack
- HTML5, CSS3, Bootstrap 5
- JavaScript (Vanilla) + Web Speech API (`speechSynthesis`)

## File Structure
```
bilingual-vocab-game/
├── index.html        # Main entry point
├── css/
│   └── styles.css    # Custom styling
└── js/
    ├── words.js      # Word list (EN ↔ ES)
    └── game.js       # Game logic
```


## How to Run
1. Download/clone the repo.
2. Open `index.html` in your browser (no server needed).
3. Enter your name, select language + categories, and start!

> Text-to-Speech voice availability depends on the browser/OS. Chrome/Edge usually support `en-US` and `es-MX`.

## Deployment
You can easily deploy this on [GitHub Pages](https://pages.github.com/):
1. Push the repo to GitHub.
2. In your repo settings, enable **GitHub Pages** (select `main` branch, `/root` folder).
3. Visit your published URL and start learning!

## Roadmap Ideas
- More categories (numbers, colors, verbs)
- Streaks, levels, progress summary
- Auto-play answers and/or option pronunciations
- Per-category completion badges

---
Happy learning! 🎉
