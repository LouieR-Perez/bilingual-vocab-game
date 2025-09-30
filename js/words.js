// Bilingual words grouped by categories.
// Add more words or categories as you like.
const WORDS = [
  // Animals
  { en: "dog",     es: "perro",      cat: "Animals",   img: "https://upload.wikimedia.org/wikipedia/commons/6/6e/Golde33443.jpg" },
  { en: "cat",     es: "gato",       cat: "Animals",   img: "https://upload.wikimedia.org/wikipedia/commons/3/3a/Cat03.jpg" },
  { en: "bird",    es: "pájaro",     cat: "Animals",   img: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Bird_on_a_branch.jpg" },
  { en: "fish",    es: "pez",        cat: "Animals",   img: "https://upload.wikimedia.org/wikipedia/commons/1/12/Fish_01.jpg" },

  // Food
  { en: "apple",   es: "manzana",    cat: "Food",      img: "https://upload.wikimedia.org/wikipedia/commons/1/15/Red_Apple.jpg" },
  { en: "bread",   es: "pan",        cat: "Food",      img: "https://upload.wikimedia.org/wikipedia/commons/0/0f/Bread_1.jpg" },
  { en: "milk",    es: "leche",      cat: "Food",      img: "https://upload.wikimedia.org/wikipedia/commons/6/6d/Milk_glass.jpg" },
  { en: "cheese",  es: "queso",      cat: "Food",      img: "https://upload.wikimedia.org/wikipedia/commons/4/4c/Cheese.jpg" },

  // Household
  { en: "chair",   es: "silla",      cat: "Household", img: "https://upload.wikimedia.org/wikipedia/commons/8/8b/Chair.jpg" },
  { en: "table",   es: "mesa",       cat: "Household", img: "https://upload.wikimedia.org/wikipedia/commons/6/6b/Table.jpg" },
  { en: "window",  es: "ventana",    cat: "Household", img: "https://upload.wikimedia.org/wikipedia/commons/2/2e/Window.jpg" },
  { en: "door",    es: "puerta",     cat: "Household", img: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Door.jpg" },

  // School
  { en: "book",    es: "libro",      cat: "School",    img: "https://upload.wikimedia.org/wikipedia/commons/1/1d/Book.jpg" },
  { en: "pencil",  es: "lápiz",      cat: "School",    img: "https://upload.wikimedia.org/wikipedia/commons/0/0b/Pencil.jpg" },
  { en: "teacher", es: "maestro",    cat: "School",    img: "https://upload.wikimedia.org/wikipedia/commons/9/9e/Teacher.jpg" },
  { en: "school",  es: "escuela",    cat: "School",    img: "https://upload.wikimedia.org/wikipedia/commons/3/3c/School.jpg" },

  // Nature
  { en: "sun",     es: "sol",        cat: "Nature",    img: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Sun.jpg" },
  { en: "moon",    es: "luna",       cat: "Nature",    img: "https://upload.wikimedia.org/wikipedia/commons/0/0c/Moon.jpg" },
  { en: "water",   es: "agua",       cat: "Nature",    img: "https://upload.wikimedia.org/wikipedia/commons/7/7e/Water.jpg" },
  { en: "tree",    es: "árbol",      cat: "Nature",    img: "https://upload.wikimedia.org/wikipedia/commons/2/2b/Tree.jpg" },

  // Travel / Places
  { en: "car",     es: "coche",      cat: "Travel",    img: "https://upload.wikimedia.org/wikipedia/commons/7/7e/Car.jpg" },
  { en: "house",   es: "casa",       cat: "Travel",    img: "https://upload.wikimedia.org/wikipedia/commons/5/5c/House.jpg" },
  { en: "street",  es: "calle",      cat: "Travel",    img: "https://upload.wikimedia.org/wikipedia/commons/2/2d/Street.jpg" },
  { en: "city",    es: "ciudad",     cat: "Travel",    img: "https://upload.wikimedia.org/wikipedia/commons/1/1a/City.jpg" },
];

// Derive the list of categories from the words.
const CATEGORIES = Array.from(new Set(WORDS.map(w => w.cat))).sort();
