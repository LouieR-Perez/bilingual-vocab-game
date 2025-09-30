// Bilingual words grouped by categories.
// Add more words or categories as you like.
const WORDS = [
  // Animals
  { en: "dog",     es: "perro",      cat: "Animals",   img: "https://upload.wikimedia.org/wikipedia/commons/6/6e/Golde33443.jpg" },
  { en: "cat",     es: "gato",       cat: "Animals",   img: "https://upload.wikimedia.org/wikipedia/commons/3/3a/Cat03.jpg" },
  { en: "bird",    es: "pájaro",     cat: "Animals",   img: "https://upload.wikimedia.org/wikipedia/commons/b/b3/Female_house_sparrow_at_Kodai.jpg" },
  { en: "fish",    es: "pez",        cat: "Animals",   img: "https://upload.wikimedia.org/wikipedia/commons/a/ad/Amphiprion_ocellaris_%28Clown_anemonefish%29_by_Nick_Hobgood.jpg" },

  // Food
  { en: "apple",   es: "manzana",    cat: "Food",      img: "https://upload.wikimedia.org/wikipedia/commons/1/15/Red_Apple.jpg" },
  { en: "bread",   es: "pan",        cat: "Food",      img: "https://upload.wikimedia.org/wikipedia/commons/f/f7/Breads_of_Moskovskaya_Oblast._img_006.jpg" },
  { en: "milk",    es: "leche",      cat: "Food",      img: "https://upload.wikimedia.org/wikipedia/commons/0/0e/Milk_glass.jpg" },
  { en: "cheese",  es: "queso",      cat: "Food",      img: "https://upload.wikimedia.org/wikipedia/commons/0/04/Kraft_Singles.jpg" },

  // Household
  { en: "chair",   es: "silla",      cat: "Household", img: "https://upload.wikimedia.org/wikipedia/commons/8/83/Side_Chair_MET_213686.jpg" },
  { en: "table",   es: "mesa",       cat: "Household", img: "https://upload.wikimedia.org/wikipedia/commons/3/31/Dinner_table_side_pine_wood_large_table_2.png" },
  { en: "window",  es: "ventana",    cat: "Household", img: "https://upload.wikimedia.org/wikipedia/commons/6/64/Open-air_Museum_Vyso%C4%8Dina_%28by_Pudelek%29_02.jpg" },
  { en: "door",    es: "puerta",     cat: "Household", img: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Yellow_Door%2C_Red_Door._-_geograph.org.uk_-_526824.jpg" },

  // School
  { en: "book",    es: "libro",      cat: "School",    img: "https://upload.wikimedia.org/wikipedia/commons/9/9c/Books_for_free_2023_20230302_095511.jpg" },
  { en: "pencil",  es: "lápiz",      cat: "School",    img: "https://upload.wikimedia.org/wikipedia/commons/5/5c/Yellow-pencil.svg" },
  { en: "teacher", es: "maestro",    cat: "School",    img: "https://upload.wikimedia.org/wikipedia/commons/9/9a/Teaching_icon.png" },
  { en: "school",  es: "escuela",    cat: "School",    img: "https://upload.wikimedia.org/wikipedia/commons/d/d4/A_Hayesville_High_School_classroom_in_Clay_County%2C_N.C.%2C_in_2004.jpg" },

  // Nature
  { en: "sun",     es: "sol",        cat: "Nature",    img: "https://upload.wikimedia.org/wikipedia/commons/0/0b/Sun_in_the_sands.jpg" },
  { en: "moon",    es: "luna",       cat: "Nature",    img: "https://upload.wikimedia.org/wikipedia/commons/d/dd/Full_Moon_Luc_Viatour.jpg" },
  { en: "water",   es: "agua",       cat: "Nature",    img: "https://upload.wikimedia.org/wikipedia/commons/1/11/Drops_Impact.jpg" },
  { en: "tree",    es: "árbol",      cat: "Nature",    img: "https://upload.wikimedia.org/wikipedia/commons/d/db/Leaning_trees_over_the_grassy_hillock_of_Nodong-ri_tombs_clouds_and_blue_sky_in_Gyeongju_South_Korea.jpg" },

  // Travel / Places
  { en: "car",     es: "coche",      cat: "Travel",    img: "https://upload.wikimedia.org/wikipedia/commons/f/f9/Nissan_Skyline_GTR_R34%2C_Bangladesh._%2828331206878%29.jpg" },
  { en: "house",   es: "casa",       cat: "Travel",    img: "https://upload.wikimedia.org/wikipedia/commons/c/c9/Ranch_style_home_in_Salinas%2C_California.JPG" },
  { en: "street",  es: "calle",      cat: "Travel",    img: "https://upload.wikimedia.org/wikipedia/commons/5/51/Wilfrid_Road_-_High_Street_-_geograph.org.uk_-_4989624.jpg" },
  { en: "city",    es: "ciudad",     cat: "Travel",    img: "https://upload.wikimedia.org/wikipedia/commons/d/de/St_Louis_night_expblend.jpg" },
];

// Derive the list of categories from the words.
const CATEGORIES = Array.from(new Set(WORDS.map(w => w.cat))).sort();
