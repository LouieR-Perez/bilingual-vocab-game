// Bilingual words grouped by categories.
// Add more words or categories as you like.
const WORDS = [
  // Animals
  { en: "dog",     es: "perro",      cat: "Animals" },
  { en: "cat",     es: "gato",       cat: "Animals" },
  { en: "bird",    es: "pájaro",     cat: "Animals" },
  { en: "fish",    es: "pez",        cat: "Animals" },

  // Food
  { en: "apple",   es: "manzana",    cat: "Food" },
  { en: "bread",   es: "pan",        cat: "Food" },
  { en: "milk",    es: "leche",      cat: "Food" },
  { en: "cheese",  es: "queso",      cat: "Food" },

  // Household
  { en: "chair",   es: "silla",      cat: "Household" },
  { en: "table",   es: "mesa",       cat: "Household" },
  { en: "window",  es: "ventana",    cat: "Household" },
  { en: "door",    es: "puerta",     cat: "Household" },

  // School
  { en: "book",    es: "libro",      cat: "School" },
  { en: "pencil",  es: "lápiz",      cat: "School" },
  { en: "teacher", es: "maestro",    cat: "School" },
  { en: "school",  es: "escuela",    cat: "School" },

  // Nature
  { en: "sun",     es: "sol",        cat: "Nature" },
  { en: "moon",    es: "luna",       cat: "Nature" },
  { en: "water",   es: "agua",       cat: "Nature" },
  { en: "tree",    es: "árbol",      cat: "Nature" },

  // Travel / Places
  { en: "car",     es: "coche",      cat: "Travel" },
  { en: "house",   es: "casa",       cat: "Travel" },
  { en: "street",  es: "calle",      cat: "Travel" },
  { en: "city",    es: "ciudad",     cat: "Travel" },
];

// Derive the list of categories from the words.
const CATEGORIES = Array.from(new Set(WORDS.map(w => w.cat))).sort();
