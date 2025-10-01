// Bilingual words grouped by categories and levels (Beginner, Moderate, Expert).
// Each word: en, es, cat, level, img
// Notes:
// - Images for common nouns use Wikimedia (kid-friendly).
// - Images for Colors/Numbers use simple tiles from via.placeholder.com (easy & consistent).

const WORDS = [
  // ===== Beginner (K–2) =====
  // Animals
  { en: "dog",       es: "perro",       cat: "Animals",  level: "Beginner", img: "https://upload.wikimedia.org/wikipedia/commons/6/6e/Golde33443.jpg" },
  { en: "cat",       es: "gato",        cat: "Animals",  level: "Beginner", img: "https://upload.wikimedia.org/wikipedia/commons/3/3a/Cat03.jpg" },
  { en: "bird",      es: "pájaro",      cat: "Animals",  level: "Beginner", img: "https://upload.wikimedia.org/wikipedia/commons/b/b3/Female_house_sparrow_at_Kodai.jpg" },
  { en: "fish",      es: "pez",         cat: "Animals",  level: "Beginner", img: "https://upload.wikimedia.org/wikipedia/commons/a/ad/Amphiprion_ocellaris_%28Clown_anemonefish%29_by_Nick_Hobgood.jpg" },

  // Food
  { en: "apple",     es: "manzana",     cat: "Food",     level: "Beginner", img: "https://upload.wikimedia.org/wikipedia/commons/1/15/Red_Apple.jpg" },
  { en: "bread",     es: "pan",         cat: "Food",     level: "Beginner", img: "https://upload.wikimedia.org/wikipedia/commons/f/f7/Breads_of_Moskovskaya_Oblast._img_006.jpg" },
  { en: "milk",      es: "leche",       cat: "Food",     level: "Beginner", img: "https://upload.wikimedia.org/wikipedia/commons/0/0e/Milk_glass.jpg" },
  { en: "cheese",    es: "queso",       cat: "Food",     level: "Beginner", img: "https://upload.wikimedia.org/wikipedia/commons/0/04/Kraft_Singles.jpg" },

  // Household
  { en: "chair",     es: "silla",       cat: "Household",level: "Beginner", img: "https://upload.wikimedia.org/wikipedia/commons/8/83/Side_Chair_MET_213686.jpg" },
  { en: "table",     es: "mesa",        cat: "Household",level: "Beginner", img: "https://upload.wikimedia.org/wikipedia/commons/3/31/Dinner_table_side_pine_wood_large_table_2.png" },
  { en: "window",    es: "ventana",     cat: "Household",level: "Beginner", img: "https://upload.wikimedia.org/wikipedia/commons/6/64/Open-air_Museum_Vyso%C4%8Dina_%28by_Pudelek%29_02.jpg" },
  { en: "door",      es: "puerta",      cat: "Household",level: "Beginner", img: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Yellow_Door%2C_Red_Door._-_geograph.org.uk_-_526824.jpg" },

  // School
  { en: "book",      es: "libro",       cat: "School",   level: "Beginner", img: "https://upload.wikimedia.org/wikipedia/commons/9/9c/Books_for_free_2023_20230302_095511.jpg" },
  { en: "pencil",    es: "lápiz",       cat: "School",   level: "Beginner", img: "https://upload.wikimedia.org/wikipedia/commons/5/5c/Yellow-pencil.svg" },
  { en: "teacher",   es: "maestro",     cat: "School",   level: "Beginner", img: "https://upload.wikimedia.org/wikipedia/commons/9/9a/Teaching_icon.png" },
  { en: "school",    es: "escuela",     cat: "School",   level: "Beginner", img: "https://upload.wikimedia.org/wikipedia/commons/d/d4/A_Hayesville_High_School_classroom_in_Clay_County%2C_N.C.%2C_in_2004.jpg" },

  // Nature
  { en: "sun",       es: "sol",         cat: "Nature",   level: "Beginner", img: "https://upload.wikimedia.org/wikipedia/commons/0/0b/Sun_in_the_sands.jpg" },
  { en: "moon",      es: "luna",        cat: "Nature",   level: "Beginner", img: "https://upload.wikimedia.org/wikipedia/commons/d/dd/Full_Moon_Luc_Viatour.jpg" },
  { en: "water",     es: "agua",        cat: "Nature",   level: "Beginner", img: "https://upload.wikimedia.org/wikipedia/commons/1/11/Drops_Impact.jpg" },
  { en: "tree",      es: "árbol",       cat: "Nature",   level: "Beginner", img: "https://upload.wikimedia.org/wikipedia/commons/d/db/Leaning_trees_over_the_grassy_hillock_of_Nodong-ri_tombs_clouds_and_blue_sky_in_Gyeongju_South_Korea.jpg" },

  // Travel / Places
  { en: "car",       es: "coche",       cat: "Travel",   level: "Beginner", img: "https://upload.wikimedia.org/wikipedia/commons/f/f9/Nissan_Skyline_GTR_R34%2C_Bangladesh._%2828331206878%29.jpg" },
  { en: "house",     es: "casa",        cat: "Travel",   level: "Beginner", img: "https://upload.wikimedia.org/wikipedia/commons/c/c9/Ranch_style_home_in_Salinas%2C_California.JPG" },
  { en: "street",    es: "calle",       cat: "Travel",   level: "Beginner", img: "https://upload.wikimedia.org/wikipedia/commons/5/51/Wilfrid_Road_-_High_Street_-_geograph.org.uk_-_4989624.jpg" },
  { en: "city",      es: "ciudad",      cat: "Travel",   level: "Beginner", img: "https://upload.wikimedia.org/wikipedia/commons/d/de/St_Louis_night_expblend.jpg" },

  // Colors (Beginner)
  { en: "red",       es: "rojo",        cat: "Colors",   level: "Beginner", img: "https://via.placeholder.com/200/FF0000/FFFFFF?text=red" },
  { en: "blue",      es: "azul",        cat: "Colors",   level: "Beginner", img: "https://via.placeholder.com/200/1E3A8A/FFFFFF?text=blue" },
  { en: "green",     es: "verde",       cat: "Colors",   level: "Beginner", img: "https://via.placeholder.com/200/15803D/FFFFFF?text=green" },
  { en: "yellow",    es: "amarillo",    cat: "Colors",   level: "Beginner", img: "https://via.placeholder.com/200/F59E0B/000000?text=yellow" },
  { en: "black",     es: "negro",       cat: "Colors",   level: "Beginner", img: "https://via.placeholder.com/200/000000/FFFFFF?text=black" },
  { en: "white",     es: "blanco",      cat: "Colors",   level: "Beginner", img: "https://via.placeholder.com/200/FFFFFF/000000?text=white" },

  // Numbers (Beginner 0–10)
  { en: "zero",      es: "cero",        cat: "Numbers",  level: "Beginner", img: "https://via.placeholder.com/200/ffffff/000000?text=0" },
  { en: "one",       es: "uno",         cat: "Numbers",  level: "Beginner", img: "https://via.placeholder.com/200/ffffff/000000?text=1" },
  { en: "two",       es: "dos",         cat: "Numbers",  level: "Beginner", img: "https://via.placeholder.com/200/ffffff/000000?text=2" },
  { en: "three",     es: "tres",        cat: "Numbers",  level: "Beginner", img: "https://via.placeholder.com/200/ffffff/000000?text=3" },
  { en: "four",      es: "cuatro",      cat: "Numbers",  level: "Beginner", img: "https://via.placeholder.com/200/ffffff/000000?text=4" },
  { en: "five",      es: "cinco",       cat: "Numbers",  level: "Beginner", img: "https://via.placeholder.com/200/ffffff/000000?text=5" },
  { en: "six",       es: "seis",        cat: "Numbers",  level: "Beginner", img: "https://via.placeholder.com/200/ffffff/000000?text=6" },
  { en: "seven",     es: "siete",       cat: "Numbers",  level: "Beginner", img: "https://via.placeholder.com/200/ffffff/000000?text=7" },
  { en: "eight",     es: "ocho",        cat: "Numbers",  level: "Beginner", img: "https://via.placeholder.com/200/ffffff/000000?text=8" },
  { en: "nine",      es: "nueve",       cat: "Numbers",  level: "Beginner", img: "https://via.placeholder.com/200/ffffff/000000?text=9" },
  { en: "ten",       es: "diez",        cat: "Numbers",  level: "Beginner", img: "https://via.placeholder.com/200/ffffff/000000?text=10" },

  // ===== Moderate (Grades 3–6) =====
  // Animals
  { en: "horse",     es: "caballo",     cat: "Animals",  level: "Moderate", img: "https://upload.wikimedia.org/wikipedia/commons/1/19/Horse_in_wind.jpg" },
  { en: "cow",       es: "vaca",        cat: "Animals",  level: "Moderate", img: "https://upload.wikimedia.org/wikipedia/commons/5/50/Cow_female_black_white.jpg" },
  { en: "rabbit",    es: "conejo",      cat: "Animals",  level: "Moderate", img: "https://upload.wikimedia.org/wikipedia/commons/1/1a/Oryctolagus_cuniculus_Rcdo.jpg" },
  { en: "duck",      es: "pato",        cat: "Animals",  level: "Moderate", img: "https://upload.wikimedia.org/wikipedia/commons/6/6e/Mallard2.jpg" },

  // Food
  { en: "rice",      es: "arroz",       cat: "Food",     level: "Moderate", img: "https://upload.wikimedia.org/wikipedia/commons/6/6f/Cooked_Rice.jpg" },
  { en: "egg",       es: "huevo",       cat: "Food",     level: "Moderate", img: "https://upload.wikimedia.org/wikipedia/commons/6/6b/Egg_%28white%29.jpg" },
  { en: "banana",    es: "plátano",     cat: "Food",     level: "Moderate", img: "https://upload.wikimedia.org/wikipedia/commons/8/8a/Banana-Single.jpg" },
  { en: "orange",    es: "naranja",     cat: "Food",     level: "Moderate", img: "https://upload.wikimedia.org/wikipedia/commons/c/c4/Orange-Fruit-Pieces.jpg" },

  // Household
  { en: "bed",       es: "cama",        cat: "Household",level: "Moderate", img: "https://upload.wikimedia.org/wikipedia/commons/6/67/Bed_in_a_bedroom.jpg" },
  { en: "lamp",      es: "lámpara",     cat: "Household",level: "Moderate", img: "https://upload.wikimedia.org/wikipedia/commons/1/15/Modern_desk_lamp.jpg" },
  { en: "kitchen",   es: "cocina",      cat: "Household",level: "Moderate", img: "https://upload.wikimedia.org/wikipedia/commons/2/25/Kitchen_Panorama.jpg" },
  { en: "bathroom",  es: "baño",        cat: "Household",level: "Moderate", img: "https://upload.wikimedia.org/wikipedia/commons/6/63/Bathroom_Interior.jpg" },

  // Nature
  { en: "mountain",  es: "montaña",     cat: "Nature",   level: "Moderate", img: "https://upload.wikimedia.org/wikipedia/commons/8/84/Mount_Everest_as_seen_from_Drukair2_PLW_edit.jpg" },
  { en: "river",     es: "río",         cat: "Nature",   level: "Moderate", img: "https://upload.wikimedia.org/wikipedia/commons/0/0e/River_Ribble_from_Preston_Lancashire.jpg" },
  { en: "flower",    es: "flor",        cat: "Nature",   level: "Moderate", img: "https://upload.wikimedia.org/wikipedia/commons/4/40/Rose_Red_ol.jpg" },
  { en: "rain",      es: "lluvia",      cat: "Nature",   level: "Moderate", img: "https://upload.wikimedia.org/wikipedia/commons/6/6f/Raindrops_on_window.jpg" },

  // School/Travel
  { en: "backpack",  es: "mochila",     cat: "School",   level: "Moderate", img: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Backpack_blue.jpg" },
  { en: "bus",       es: "autobús",     cat: "Travel",   level: "Moderate", img: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Stagecoach_in_Oxfordshire_bus_36764.jpg" },
  { en: "train",     es: "tren",        cat: "Travel",   level: "Moderate", img: "https://upload.wikimedia.org/wikipedia/commons/6/66/IC_225_train_91_052_King%27s_Cross_2001-06-30.jpg" },
  { en: "park",      es: "parque",      cat: "Travel",   level: "Moderate", img: "https://upload.wikimedia.org/wikipedia/commons/6/64/Central_Park_New_York_City_New_York_23_crop.jpg" },

  // Colors (Moderate)
  { en: "orange",    es: "naranja",     cat: "Colors",   level: "Moderate", img: "https://via.placeholder.com/200/F97316/000000?text=orange" },
  { en: "purple",    es: "morado",      cat: "Colors",   level: "Moderate", img: "https://via.placeholder.com/200/7C3AED/FFFFFF?text=purple" },
  { en: "pink",      es: "rosa",        cat: "Colors",   level: "Moderate", img: "https://via.placeholder.com/200/F472B6/000000?text=pink" },
  { en: "brown",     es: "café",        cat: "Colors",   level: "Moderate", img: "https://via.placeholder.com/200/6B4226/FFFFFF?text=brown" },
  { en: "gray",      es: "gris",        cat: "Colors",   level: "Moderate", img: "https://via.placeholder.com/200/9CA3AF/000000?text=gray" },

  // Numbers (Moderate 11–20)
  { en: "eleven",    es: "once",        cat: "Numbers",  level: "Moderate", img: "https://via.placeholder.com/200/ffffff/000000?text=11" },
  { en: "twelve",    es: "doce",        cat: "Numbers",  level: "Moderate", img: "https://via.placeholder.com/200/ffffff/000000?text=12" },
  { en: "thirteen",  es: "trece",       cat: "Numbers",  level: "Moderate", img: "https://via.placeholder.com/200/ffffff/000000?text=13" },
  { en: "fourteen",  es: "catorce",     cat: "Numbers",  level: "Moderate", img: "https://via.placeholder.com/200/ffffff/000000?text=14" },
  { en: "fifteen",   es: "quince",      cat: "Numbers",  level: "Moderate", img: "https://via.placeholder.com/200/ffffff/000000?text=15" },
  { en: "sixteen",   es: "dieciséis",   cat: "Numbers",  level: "Moderate", img: "https://via.placeholder.com/200/ffffff/000000?text=16" },
  { en: "seventeen", es: "diecisiete",  cat: "Numbers",  level: "Moderate", img: "https://via.placeholder.com/200/ffffff/000000?text=17" },
  { en: "eighteen",  es: "dieciocho",   cat: "Numbers",  level: "Moderate", img: "https://via.placeholder.com/200/ffffff/000000?text=18" },
  { en: "nineteen",  es: "diecinueve",  cat: "Numbers",  level: "Moderate", img: "https://via.placeholder.com/200/ffffff/000000?text=19" },
  { en: "twenty",    es: "veinte",      cat: "Numbers",  level: "Moderate", img: "https://via.placeholder.com/200/ffffff/000000?text=20" },

  // ===== Expert (Grades 7–12) =====
  // Animals
  { en: "eagle",     es: "águila",      cat: "Animals",  level: "Expert",   img: "https://upload.wikimedia.org/wikipedia/commons/1/1a/Bald_Eagle_Portrait.jpg" },
  { en: "dolphin",   es: "delfín",      cat: "Animals",  level: "Expert",   img: "https://upload.wikimedia.org/wikipedia/commons/0/0a/Dolphin1.jpg" },
  { en: "lion",      es: "león",        cat: "Animals",  level: "Expert",   img: "https://upload.wikimedia.org/wikipedia/commons/7/73/Lion_waiting_in_Namibia.jpg" },
  { en: "butterfly", es: "mariposa",    cat: "Animals",  level: "Expert",   img: "https://upload.wikimedia.org/wikipedia/commons/7/7a/Monarch_Butterfly_Danaus_plexippus_on_Butterfly_Bush_Buddleja_davidii.jpg" },

  // Food
  { en: "strawberry",es: "fresa",       cat: "Food",     level: "Expert",   img: "https://upload.wikimedia.org/wikipedia/commons/2/29/PerfectStrawberry.jpg" },
  { en: "corn",      es: "maíz",        cat: "Food",     level: "Expert",   img: "https://upload.wikimedia.org/wikipedia/commons/4/4c/Corncobs.jpg" },
  { en: "soup",      es: "sopa",        cat: "Food",     level: "Expert",   img: "https://upload.wikimedia.org/wikipedia/commons/1/1f/Soup_in_a_white_bowl.jpg" },
  { en: "chocolate", es: "chocolate",   cat: "Food",     level: "Expert",   img: "https://upload.wikimedia.org/wikipedia/commons/7/70/Chocolate_%28blue_background%29.jpg" },

  // Household
  { en: "refrigerator", es: "refrigerador", cat: "Household", level: "Expert", img: "https://upload.wikimedia.org/wikipedia/commons/8/8e/Refrigerator-Transparent-PNG.png" },
  { en: "mirror",    es: "espejo",      cat: "Household",level: "Expert",   img: "https://upload.wikimedia.org/wikipedia/commons/4/4d/Mirror_interior.jpg" },
  { en: "stairs",    es: "escaleras",   cat: "Household",level: "Expert",   img: "https://upload.wikimedia.org/wikipedia/commons/f/f0/Modern_staircase.jpg" },
  { en: "ceiling",   es: "techo",       cat: "Household",level: "Expert",   img: "https://upload.wikimedia.org/wikipedia/commons/5/5d/Ceiling_with_lamp.jpg" },

  // Nature
  { en: "volcano",   es: "volcán",      cat: "Nature",   level: "Expert",   img: "https://upload.wikimedia.org/wikipedia/commons/0/02/Volcano_Lava_Sample.jpg" },
  { en: "desert",    es: "desierto",    cat: "Nature",   level: "Expert",   img: "https://upload.wikimedia.org/wikipedia/commons/2/20/Sahara_Desert.jpg" },
  { en: "island",    es: "isla",        cat: "Nature",   level: "Expert",   img: "https://upload.wikimedia.org/wikipedia/commons/e/e4/Small_Island_Philippines.jpg" },
  { en: "forest",    es: "bosque",      cat: "Nature",   level: "Expert",   img: "https://upload.wikimedia.org/wikipedia/commons/7/79/Conifer_forest_near_Kootenay_Creek.jpg" },

  // School/Abstract
  { en: "history",   es: "historia",    cat: "School",   level: "Expert",   img: "https://upload.wikimedia.org/wikipedia/commons/7/73/History_books.jpg" },
  { en: "science",   es: "ciencia",     cat: "School",   level: "Expert",   img: "https://upload.wikimedia.org/wikipedia/commons/f/f1/Laboratory_glassware.jpg" },
  { en: "country",   es: "país",        cat: "Travel",   level: "Expert",   img: "https://upload.wikimedia.org/wikipedia/commons/1/1a/Globe_illustration.png" },
  { en: "language",  es: "idioma",      cat: "School",   level: "Expert",   img: "https://upload.wikimedia.org/wikipedia/commons/2/2a/Multilingual_sign_singapore.jpg" },

  // Colors (Expert)
  { en: "turquoise", es: "turquesa",    cat: "Colors",   level: "Expert",   img: "https://via.placeholder.com/200/06B6D4/000000?text=turquoise" },
  { en: "violet",    es: "violeta",     cat: "Colors",   level: "Expert",   img: "https://via.placeholder.com/200/8B5CF6/FFFFFF?text=violet" },
  { en: "beige",     es: "beige",       cat: "Colors",   level: "Expert",   img: "https://via.placeholder.com/200/F5F5DC/000000?text=beige" },
  { en: "silver",    es: "plata",       cat: "Colors",   level: "Expert",   img: "https://via.placeholder.com/200/C0C0C0/000000?text=silver" },
  { en: "gold",      es: "oro",         cat: "Colors",   level: "Expert",   img: "https://via.placeholder.com/200/FFD700/000000?text=gold" },
  { en: "maroon",    es: "guinda",      cat: "Colors",   level: "Expert",   img: "https://via.placeholder.com/200/800000/FFFFFF?text=maroon" },

  // Numbers (Expert – larger steps)
  { en: "thirty",    es: "treinta",     cat: "Numbers",  level: "Expert",   img: "https://via.placeholder.com/200/ffffff/000000?text=30" },
  { en: "forty",     es: "cuarenta",    cat: "Numbers",  level: "Expert",   img: "https://via.placeholder.com/200/ffffff/000000?text=40" },
  { en: "fifty",     es: "cincuenta",   cat: "Numbers",  level: "Expert",   img: "https://via.placeholder.com/200/ffffff/000000?text=50" },
  { en: "one hundred", es: "cien",      cat: "Numbers",  level: "Expert",   img: "https://via.placeholder.com/200/ffffff/000000?text=100" },
  { en: "one thousand", es: "mil",      cat: "Numbers",  level: "Expert",   img: "https://via.placeholder.com/200/ffffff/000000?text=1000" },
];

// Derived lists for filters (your UI reads these automatically)
const CATEGORIES = Array.from(new Set(WORDS.map(w => w.cat))).sort();
const LEVELS = Array.from(new Set(WORDS.map(w => w.level))).sort();
