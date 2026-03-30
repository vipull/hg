import { useState, useEffect, useCallback } from "react";

// ═══════════════════════════════════════════════════════
// DATA (kept compact — same content as before)
// ═══════════════════════════════════════════════════════

const SKIN_FOODS = [
  { name:"Amla / Gooseberry", emoji:"🟢", benefit:"Highest vitamin C — collagen, brightening, pigmentation control", usage:"1 amla murabba daily OR 1 tsp powder in water" },
  { name:"Aloe Vera Juice", emoji:"🌿", benefit:"Hydration from within, acne scars, anti-aging", usage:"2 tbsp + water empty stomach 3x/week" },
  { name:"Papaya", emoji:"🧡", benefit:"Papain clears dead skin, vitamin A for glow", usage:"1 cup morning 3-4x/week" },
  { name:"Cucumber + Tomato", emoji:"🥒", benefit:"Silica for elasticity, lycopene for sun protection", usage:"1 cup kachumber with every lunch" },
  { name:"Curd / Dahi", emoji:"🥛", benefit:"Probiotics = gut = clear skin, lactic acid glow", usage:"150g with lunch daily" },
  { name:"Sabja Seeds", emoji:"🌱", benefit:"Omega-3, detox, reduces body heat & acne", usage:"1 tsp soaked — add to any drink daily" },
  { name:"Carrot + Beetroot", emoji:"🥕", benefit:"Beta-carotene glow, blood purifier", usage:"Salad 3x/week or juice 2x/week" },
  { name:"Gulkand (Rose Jam)", emoji:"🌹", benefit:"Pitta coolant, blood purifier, acne reducer", usage:"1 tsp after lunch daily" },
  { name:"Turmeric + Pepper", emoji:"💛", benefit:"Curcumin anti-inflammatory, evens tone", usage:"In dal daily + haldi doodh 2x/week" },
  { name:"Soaked Almonds", emoji:"🥜", benefit:"Vitamin E — repairs cells, natural moisturizer", usage:"5-6 peeled daily morning" },
];

const FRUITS = [
  { name:"Mango (Alphonso/Kesar)", emoji:"🥭", benefit:"Vitamins A & C, digestion, immunity", bestTime:"With lunch only", cal:"~70/100g", tip:"Soak 30 min before eating", season:"Apr–Jun" },
  { name:"Watermelon", emoji:"🍉", benefit:"92% water, lycopene, skin hydration", bestTime:"Mid-morning 10:30 AM", cal:"~30/100g", tip:"Eat alone, not with meals", season:"Mar–Jun" },
  { name:"Muskmelon", emoji:"🍈", benefit:"Potassium, vitamin A, cooling", bestTime:"Morning/mid-morning", cal:"~34/100g", tip:"Black salt + roasted jeera", season:"Apr–Jun" },
  { name:"Papaya", emoji:"🧡", benefit:"Papain enzyme, skin brightener", bestTime:"Morning empty stomach", cal:"~43/100g", tip:"Best skin fruit — 3-4x/week", season:"Year-round" },
  { name:"Jamun", emoji:"🫐", benefit:"Blood sugar, iron, acne fighter", bestTime:"Post-lunch or 3 PM", cal:"~62/100g", tip:"No milk 30 min before/after", season:"May–Jul" },
  { name:"Pineapple", emoji:"🍍", benefit:"Bromelain, anti-inflammatory", bestTime:"Mid-morning snack", cal:"~50/100g", tip:"Black pepper + salt", season:"Mar–Jul" },
  { name:"Bael", emoji:"🍐", benefit:"Gut health, detox, blood purifier", bestTime:"Sharbat afternoon", cal:"~137/100g", tip:"Use jaggery not sugar", season:"Apr–Jun" },
  { name:"Kokum", emoji:"🟣", benefit:"Anti-inflammatory, anti-acidity", bestTime:"Sol kadhi with lunch", cal:"~60/100g", tip:"Kokum agal — Pune special", season:"Apr–Jun" },
];

const VEGS = [
  { name:"Lauki (Bottle Gourd)", emoji:"🫒", benefit:"96% water, cooling, weight loss", cooking:"Sabzi, kofta, raita, juice", tip:"Morning juice = weight loss + glow" },
  { name:"Tori (Ridge Gourd)", emoji:"🥬", benefit:"Blood purifier, light, skin clarity", cooking:"Sabzi, dal + tori, sambar", tip:"Don't peel completely" },
  { name:"Karela (Bitter Gourd)", emoji:"🥒", benefit:"Blood sugar, liver detox, acne fighter", cooking:"Stuffed, sabzi, chips", tip:"Salt water soak 20 min" },
  { name:"Cucumber", emoji:"🥒", benefit:"Silica for skin, cooling, hydrating", cooking:"Kachumber, raita, salad", tip:"With every meal" },
  { name:"Pumpkin (Kaddu)", emoji:"🎃", benefit:"Beta-carotene, fibre, immunity", cooking:"Sabzi, soup, halwa (jaggery)", tip:"Roast seeds as snack" },
  { name:"Bhindi (Okra)", emoji:"🌿", benefit:"Fibre, folate, vitamin C", cooking:"Dry sabzi, bharwa, sambar", tip:"Wash before cutting" },
  { name:"Parval", emoji:"🟢", benefit:"Low cal, blood purifier", cooking:"Dry sabzi, stuffed, in dal", tip:"Great with moong dal" },
  { name:"Tinda", emoji:"⚪", benefit:"Ultra light, cooling", cooking:"Sabzi, dry fry, in dal", tip:"Simple jeera-hing tadka" },
];

const DRINKS = [
  { name:"Chaas / Mattha", emoji:"🥛", benefit:"Probiotics, cooling, digestion", recipe:"200ml curd + 100ml water + jeera + mint + salt + hing", bestTime:"Post-lunch", cal:"~45", prot:"3g" },
  { name:"Aam Panna", emoji:"🥭", benefit:"Prevents heatstroke, electrolytes", recipe:"Raw mango boiled + jaggery (1 tsp) + jeera + black salt", bestTime:"2-3 PM", cal:"~60", prot:"1g" },
  { name:"Sattu Sharbat", emoji:"💪", benefit:"High protein, sustained energy", recipe:"2 tbsp sattu + cold water + lemon + black salt", bestTime:"Mid-morning/post-lunch", cal:"~120", prot:"7g" },
  { name:"Jaljeera", emoji:"🌿", benefit:"Digestive, appetite booster", recipe:"Jeera + pudina + dry mango + black salt + water", bestTime:"Before lunch", cal:"~15", prot:"1g" },
  { name:"Nimbu Pani", emoji:"🍋", benefit:"Vitamin C, electrolytes, skin", recipe:"Lemon + water + black salt + pinch honey", bestTime:"Anytime", cal:"~20", prot:"0g" },
  { name:"Coconut Water", emoji:"🥥", benefit:"Natural electrolytes, skin hydration", recipe:"Fresh tender coconut — as is", bestTime:"10 AM / post-workout", cal:"~45", prot:"2g" },
  { name:"Kokum Sharbat", emoji:"🟣", benefit:"Anti-inflammatory, cooling", recipe:"Kokum syrup + cold water + black salt", bestTime:"With/after lunch", cal:"~40", prot:"1g" },
  { name:"Sabja Lemon Water", emoji:"🌱", benefit:"Cooling, fibre, reduces acne", recipe:"1 tsp sabja + cold water + lemon + honey pinch", bestTime:"Anytime", cal:"~25", prot:"2g" },
];

const SUPERS = [
  { name:"Sabja Seeds", benefit:"Cooling, omega-3, fibre, skin detox", usage:"1 tsp soaked in any drink daily" },
  { name:"Gulkand", benefit:"Pitta coolant, blood purifier, acne reducer", usage:"1 tsp after lunch" },
  { name:"Sattu Flour", benefit:"Plant protein ~20g/100g, low GI", usage:"Sharbat, paratha, litti" },
  { name:"Raw Mango (Kairi)", benefit:"Vitamin C, heatstroke prevention", usage:"Aam panna, chutney, pickle" },
  { name:"Pudina (Mint)", benefit:"Cooling, digestion, anti-inflammatory", usage:"Chutney, raita, chaas — daily" },
  { name:"Amla", benefit:"Highest vitamin C, anti-aging", usage:"Murabba, powder, pickle" },
  { name:"Saunf (Fennel)", benefit:"Cooling, anti-bloating, detox", usage:"After meals, in water" },
  { name:"Aloe Vera", benefit:"Hydration, acne scars", usage:"2 tbsp juice 3x/week morning" },
];

const RULES = [
  { icon:"🚶‍♂️", text:"Walk 10–15 mins after lunch", detail:"Controls blood sugar, improves skin circulation" },
  { icon:"💧", text:"3.5L water daily", detail:"Hydration = skin glow — dehydration = dullness" },
  { icon:"🥭", text:"Mango only with lunch (100g)", detail:"With meal = slower sugar absorption" },
  { icon:"🍬", text:"Zero refined sugar", detail:"Tiny jaggery only; sugar = dull skin" },
  { icon:"😴", text:"Sleep by 10 PM", detail:"Skin repairs 10pm–2am" },
  { icon:"🧊", text:"1 cooling drink at 3 PM daily", detail:"Rotate: chaas, aam panna, sattu, jaljeera" },
  { icon:"🥒", text:"Cucumber-tomato salad every lunch", detail:"Silica + lycopene for skin" },
  { icon:"☀️", text:"Sunscreen SPF 30+ daily", detail:"Sun damage undoes all dietary benefits" },
  { icon:"🧡", text:"Papaya 3-4x/week", detail:"Best food for skin brightening" },
  { icon:"🌹", text:"1 tsp gulkand after lunch", detail:"Ayurvedic blood purifier" },
];

// ═══ SWAPS ═══
const SWAPS = {
  preWorkout: ["5 soaked almonds + 1 walnut (~80 kcal)","1 small banana (~90 kcal)","4 almonds + 2 cashews (~85 kcal)","1 tbsp soaked chia + water (~60 kcal)","5 almonds + 3 raisins (~80 kcal)","½ banana + 3 almonds (~85 kcal)","1 small apple (~70 kcal)","4 walnut halves (~80 kcal)","1 tbsp peanut butter + water (~95 kcal)","Dates (2) + 3 almonds (~90 kcal)"],
  breakfast: ["Moong dal chilla (2) + mint chutney + curd (~340 kcal, P:18g)","Besan chilla (2) + green chutney + curd (~340 kcal, P:18g)","Vegetable poha + peanuts + lemon + sprouts (~350 kcal, P:14g)","Upma + coconut chutney + sprouted moong (~340 kcal, P:13g)","Ragi dosa (2) + peanut chutney + curd (~350 kcal, P:14g)","Idli (3) + sambar + coconut chutney (~360 kcal, P:13g)","Uttapam (2) + sambar + mint chutney (~360 kcal, P:13g)","Thalipeeth + curd + pickle — Pune special (~340 kcal, P:14g)","Vegetable dalia + curd + lemon (~330 kcal, P:13g)","Sabudana khichdi + peanuts + curd (~370 kcal, P:12g)"],
  midMorning: ["Papaya 1 cup + sabja seeds (~75 kcal)","Watermelon 1.5 cups (~75 kcal)","Coconut water 1 glass (~45 kcal)","Muskmelon 1 cup + black salt (~35 kcal)","Pineapple slices + black pepper (~60 kcal)","Papaya + turmeric pinch (~65 kcal)","Coconut water + 4 almonds (~75 kcal)","Carrot-beet juice small glass (~80 kcal)","Fruit chaat (seasonal) + black salt (~70 kcal)","Watermelon + mint + sabja (~80 kcal)"],
  lunch: ["2 roti + moong dal + bhindi + kachumber + curd (~530 kcal, P:18g)","2 roti + chole + tori sabzi + salad + curd (~550 kcal, P:20g)","2 roti + rajma + lauki sabzi + kachumber + curd (~560 kcal, P:22g)","2 roti + palak dal + tinda + salad + curd (~500 kcal, P:17g)","2 roti + chana dal + parval sabzi + raita (~510 kcal, P:18g)","2 roti + dal fry + pumpkin sabzi + kachumber + curd (~510 kcal, P:17g)","2 roti + sambar + bhindi dry + salad + curd (~520 kcal, P:16g)","2 roti + palak paneer + kachumber + curd (~550 kcal, P:20g)","2 roti + besan-taak curry + salad + curd (~490 kcal, P:16g)","2 roti + paneer curry + tori sabzi + raita (~560 kcal, P:22g)"],
  coolDrink: ["Chaas — jeera + pudina (300ml) (~45 kcal)","Aam panna — raw mango + jaggery (~60 kcal)","Sattu sharbat — lemon + jeera (~120 kcal, P:7g)","Jaljeera — cumin-mint cooler (~15 kcal)","Nimbu pani — black salt + mint (~20 kcal)","Coconut water + sabja seeds (~50 kcal)","Kokum sharbat (~40 kcal)","Bael sharbat — jaggery (~70 kcal)","Sabja lemon water (~25 kcal)","Watermelon juice + sabja (no sugar) (~50 kcal)"],
  evening: ["Green tea + roasted chana (30g) (~130 kcal)","Tea + roasted makhana + black pepper (~100 kcal)","Tea + kurmura bhel + onion + lemon (~130 kcal)","Tea + sprouts chaat + lemon + onion (~140 kcal)","Tea + bhel puri (homemade) (~130 kcal)","Tea + chana jor garam + lemon (~130 kcal)","Tea + sing bhujia (dry peanuts 25g) (~140 kcal)","Tea + poha chivda (homemade 35g) (~155 kcal)","Tea + baked mathri (2 small) + pickle (~150 kcal)","Tea + til-gur chikki (1 small) (~120 kcal)"],
  dinner: ["2 roti + paneer bhurji + cucumber (~420 kcal, P:21g)","Lauki soup + grilled paneer tikka (~320 kcal, P:18g)","2 roti + tori sabzi + raita (~340 kcal, P:12g)","Moong dal + tinda sabzi (no roti) (~280 kcal, P:15g)","Palak paneer + 1 roti + salad (~380 kcal, P:22g)","Moong dal cheela (2) + chutney (~300 kcal, P:18g)","2 roti + besan-taak curry + cucumber (~360 kcal, P:14g)","Paneer curry + 1 roti + salad (~400 kcal, P:20g)","Tomato soup + paneer bhurji + salad (~340 kcal, P:18g)","2 roti + mix veg (lauki-tori-tinda) (~350 kcal, P:12g)"],
  sundayDinner: ["Palak paneer rice + raita (~520 kcal, P:18g)","Paneer curry + 2 roti + salad (~480 kcal, P:22g)","Chole bhature (2 small) + lassi (~600 kcal, P:18g)","Pav bhaji (2 pav) + onion salad (~550 kcal, P:14g)","Dal makhani + 2 roti + raita (~500 kcal, P:18g)","Paneer tikka masala + 2 roti + curd (~520 kcal, P:24g)","Besan-taak curry + 2 roti + papad (~420 kcal, P:16g)","Palak paneer + 2 roti + raita (~500 kcal, P:22g)","Veg biryani + raita + papad (~530 kcal, P:14g)","Paneer butter masala (light) + 2 roti (~540 kcal, P:22g)"],
};

const mk = (slot,time,icon,main,qty,cal,swapKey,note,prot) => ({slot,time,icon,main,qty,cal,swapKey,note,prot});

// ═══ WEEKS DATA ═══
const W1 = [
  { day:"Monday",date:"30 Mar",totalCal:"~2450",meals:[
    mk("Pre-Workout","5:30 AM","🏋️","Soaked almonds (peeled) + walnut","5 almonds + 1 walnut","~80","preWorkout","Peel skin — better absorption"),
    mk("Breakfast","7:30 AM","🍳","Moong dal chilla + mint chutney + curd","2 chilla + 2 tbsp chutney + 100g curd","~340","breakfast","Add Ensure","~18g"),
    mk("Mid-Morning","10:30 AM","🍉","Papaya (skin glow)","1 cup (~150g)","~65","midMorning","Papaya 3-4x/week for brightening"),
    mk("Lunch","12:30 PM","🍛","2 roti + moong dal + bhindi + kachumber + curd","2 roti + 1 katori dal + 1 katori sabzi + salad + 150g curd","~530","lunch","Mango 100g + 1 tsp gulkand","~18g"),
    mk("Cool Drink","3:00 PM","🧊","Chaas — jeera + pudina buttermilk","1 tall glass (~300ml)","~45","coolDrink","Daily cooling slot"),
    mk("Evening","4:30 PM","☕","Green tea + roasted chana","1 cup + 30g chana","~130","evening","No sugar in tea"),
    mk("Dinner","7:30 PM","🌙","Lauki soup + grilled paneer tikka + cucumber","1 bowl + 80g paneer + 1 cup cucumber","~320","dinner","Light dinner = fresh morning","~18g"),
  ]},
  { day:"Tuesday",date:"31 Mar",totalCal:"~2400",meals:[
    mk("Pre-Workout","5:30 AM","🏋️","Soaked almonds + walnut","5+1","~80","preWorkout"),
    mk("Breakfast","7:30 AM","🍳","Vegetable poha + peanuts + sprouts","1.5 cup poha + 1 tbsp peanuts + 50g sprouts","~350","breakfast","Ensure","~14g"),
    mk("Mid-Morning","10:30 AM","🍉","Coconut water + 4 almonds","250ml + 4 almonds","~75","midMorning"),
    mk("Lunch","12:30 PM","🍛","2 roti + chole + onion-cucumber salad + curd","2 roti + 1 katori + salad + 150g curd","~550","lunch","Mango 100g","~20g"),
    mk("Cool Drink","3:00 PM","🧊","Nimbu pani — black salt + mint","1 glass (~300ml)","~20","coolDrink"),
    mk("Evening","4:30 PM","☕","Tea + kurmura chivda (homemade)","1 cup + 40g chivda","~170","evening","Homemade — not packaged"),
    mk("Dinner","7:30 PM","🌙","Moong dal khichdi + curd + papad","1.5 katori + 100g curd + 1 papad","~350","dinner","Lightest dinner option","~14g"),
  ]},
  { day:"Wednesday",date:"1 Apr",totalCal:"~2380",meals:[
    mk("Pre-Workout","5:30 AM","🏋️","Soaked almonds + walnut","5+1","~80","preWorkout"),
    mk("Breakfast","7:30 AM","🍳","Ragi dosa (2) + peanut chutney + curd","2 dosa + 2 tbsp + 100g curd","~350","breakfast","Ensure — Ragi = calcium + iron","~14g"),
    mk("Mid-Morning","10:30 AM","🍉","Watermelon slices","1.5 cups (~250g)","~75","midMorning"),
    mk("Lunch","12:30 PM","🍛","2 roti + palak paneer + kachumber + curd","2 roti + 1 katori + salad + 150g curd","~550","lunch","Mango 100g","~20g"),
    mk("Cool Drink","3:00 PM","🧊","Sattu sharbat (salt + lemon)","2 tbsp + glass","~120","coolDrink","","~7g"),
    mk("Evening","4:30 PM","☕","Tea + til-gur chikki (small)","1 cup + 20g","~120","evening","Sesame = zinc for skin"),
    mk("Dinner","7:30 PM","🌙","2 roti + tori sabzi + cucumber raita","2 roti + 1 katori + 100g raita","~340","dinner","Gourds at dinner = lightest","~12g"),
  ]},
  { day:"Thursday",date:"2 Apr",totalCal:"~2420",meals:[
    mk("Pre-Workout","5:30 AM","🏋️","Soaked almonds + walnut","5+1","~80","preWorkout"),
    mk("Breakfast","7:30 AM","🍳","Idli (3) + sambar + coconut chutney","3 idli + 1 katori sambar + chutney","~360","breakfast","Ensure","~13g"),
    mk("Mid-Morning","10:30 AM","🍉","Papaya + turmeric pinch","1 cup + pinch haldi","~65","midMorning","Turmeric + papaya = skin combo"),
    mk("Lunch","12:30 PM","🍛","2 roti + rajma + kachumber + curd","2 roti + 1 katori + salad + 150g curd","~560","lunch","Mango 100g","~22g"),
    mk("Cool Drink","3:00 PM","🧊","Aam panna (raw mango + jaggery)","1 glass","~60","coolDrink"),
    mk("Evening","4:30 PM","☕","Tea + sprouts chaat + lemon","1 cup + 60g sprouts","~140","evening","Sprouts = protein + collagen"),
    mk("Dinner","7:30 PM","🌙","2 roti + besan-taak curry + cucumber","2 roti + 1 katori + salad","~360","dinner","Maharashtrian classic","~14g"),
  ]},
  { day:"Friday",date:"3 Apr",totalCal:"~2400",meals:[
    mk("Pre-Workout","5:30 AM","🏋️","Soaked almonds + walnut","5+1","~80","preWorkout"),
    mk("Breakfast","7:30 AM","🍳","Oats + cold milk + chia + almonds","40g oats + 200ml milk + 1 tsp chia + 4 almonds","~350","breakfast","Ensure — Oats 1x/week only","~15g"),
    mk("Mid-Morning","10:30 AM","🍉","Coconut water","250ml","~45","midMorning"),
    mk("Lunch","12:30 PM","🍛","2 roti + dal + lauki sabzi + kachumber + curd","2 roti + 1 katori + 1 katori + salad + 150g curd","~500","lunch","Mango 100g","~17g"),
    mk("Cool Drink","3:00 PM","🧊","Chaas — pudina buttermilk","1 tall glass","~45","coolDrink"),
    mk("Evening","4:30 PM","☕","Tea + baked mathri (2) + pickle","1 cup + 30g","~150","evening","Baked not fried — Marwari style"),
    mk("Dinner","7:30 PM","🌙","Moong dal + tinda sabzi (no roti)","1 katori + 1 katori","~280","dinner","No-roti dinner = ultra light","~15g"),
  ]},
  { day:"Saturday",date:"4 Apr",totalCal:"~2380",meals:[
    mk("Pre-Workout","5:30 AM","🏋️","Soaked almonds + walnut","5+1","~80","preWorkout"),
    mk("Breakfast","7:30 AM","🍳","Thalipeeth + curd + pickle","1 thalipeeth + 100g curd + pickle","~340","breakfast","Ensure — Pune multigrain special","~14g"),
    mk("Mid-Morning","10:30 AM","🍉","Papaya + sabja seeds","1 cup + 1 tsp sabja","~75","midMorning","Best skin combo"),
    mk("Lunch","12:30 PM","🍛","2 roti + sambar + bhindi + kachumber + curd","2 roti + 1 katori + 1 katori + salad + 150g curd","~520","lunch","Mango 100g + gulkand","~16g"),
    mk("Cool Drink","3:00 PM","🧊","Jaljeera","1 glass","~15","coolDrink"),
    mk("Evening","4:30 PM","☕","Tea + dry roasted peanuts + chana","1 cup + 30g mix","~145","evening","Peanuts = biotin"),
    mk("Dinner","7:30 PM","🌙","Paneer curry + 1 roti + salad","80g paneer + 1 roti + cucumber","~400","dinner","","~20g"),
  ]},
  { day:"Sunday",date:"5 Apr",totalCal:"~2900",cheat:true,meals:[
    mk("Pre-Workout","5:30 AM","🏋️","Almonds + walnut OR banana","5+1","~80","preWorkout","Rest day — skip if sleeping in"),
    mk("Breakfast","9:00 AM","🍳","Chole bhature (2 small) OR masala dosa","Full plate","~450","breakfast","Ensure — Sunday treat!","~16g"),
    mk("Mid-Morning","11:00 AM","🍉","Mango milkshake (no sugar, small) + dry fruits","1 glass + 10g dry fruits","~170","midMorning","Sunday mango treat"),
    mk("Lunch","12:30 PM","🍛","Palak paneer rice + raita + papad + mango","1.5 katori rice + paneer + raita + papad","~650","lunch","Sunday rice allowed! Mango 150g","~20g"),
    mk("Cool Drink","3:00 PM","🧊","Thandai (cold, jaggery) OR mango lassi","1 tall glass","~120","coolDrink","Sunday special drink"),
    mk("Evening","5:00 PM","☕","Tea + samosa (1 baked) OR pakora (4-5)","1 cup + treat","~250","evening","Sunday treat — baked preferred"),
    mk("Dinner","8:00 PM","🌙","Pav bhaji (2 pav) OR paneer butter masala + 2 roti","Full serving","~550","sundayDinner","Cheat dinner — enjoy!","~18g"),
  ]},
];

const W2 = [
  { day:"Monday",date:"6 Apr",totalCal:"~2420",meals:[
    mk("Pre-Workout","5:30 AM","🏋️","Soaked almonds + walnut","5+1","~80","preWorkout"),
    mk("Breakfast","7:30 AM","🍳","Vegetable upma + chutney + sprouts","1.5 katori + chutney + 50g sprouts","~340","breakfast","Ensure","~13g"),
    mk("Mid-Morning","10:30 AM","🍉","Muskmelon + black salt","1 cup","~50","midMorning"),
    mk("Lunch","12:30 PM","🍛","2 roti + palak dal + tinda + kachumber + curd","Standard","~510","lunch","Mango 100g","~18g"),
    mk("Cool Drink","3:00 PM","🧊","Sattu sharbat","2 tbsp + glass","~120","coolDrink","","~7g"),
    mk("Evening","4:30 PM","☕","Tea + bhel puri (homemade)","1 cup + small bowl","~140","evening"),
    mk("Dinner","7:30 PM","🌙","2 roti + paneer curry + raita","2 roti + 80g paneer + 100g raita","~420","dinner","","~22g"),
  ]},
  { day:"Tuesday",date:"7 Apr",totalCal:"~2380",meals:[
    mk("Pre-Workout","5:30 AM","🏋️","Soaked almonds + walnut","5+1","~80","preWorkout"),
    mk("Breakfast","7:30 AM","🍳","Besan chilla (2) + mint chutney + curd","2 chilla + chutney + 100g curd","~340","breakfast","Ensure","~18g"),
    mk("Mid-Morning","10:30 AM","🍉","Papaya","1 cup","~65","midMorning"),
    mk("Lunch","12:30 PM","🍛","2 roti + chole + parval sabzi + salad + curd","Standard","~540","lunch","Mango 100g","~20g"),
    mk("Cool Drink","3:00 PM","🧊","Coconut water + sabja","250ml + sabja","~50","coolDrink"),
    mk("Evening","4:30 PM","☕","Tea + sing bhujia (peanuts)","1 cup + 25g","~140","evening"),
    mk("Dinner","7:30 PM","🌙","Dal + lauki sabzi (no roti)","1 katori + 1 katori","~280","dinner","No-roti night","~15g"),
  ]},
  { day:"Wednesday",date:"8 Apr",totalCal:"~2400",meals:[
    mk("Pre-Workout","5:30 AM","🏋️","Soaked almonds + walnut","5+1","~80","preWorkout"),
    mk("Breakfast","7:30 AM","🍳","Dosa (2) + sambar + chutney","2 dosa + sambar + chutney","~360","breakfast","Ensure","~13g"),
    mk("Mid-Morning","10:30 AM","🍉","Watermelon","1.5 cups","~75","midMorning"),
    mk("Lunch","12:30 PM","🍛","2 roti + besan-taak curry + bhindi + kachumber + curd","Standard","~520","lunch","Mango 100g","~16g"),
    mk("Cool Drink","3:00 PM","🧊","Aam panna (jaggery)","1 glass","~60","coolDrink"),
    mk("Evening","4:30 PM","☕","Tea + chana jor garam + lemon","1 cup + 30g","~130","evening"),
    mk("Dinner","7:30 PM","🌙","Palak paneer + 1 roti + salad","80g paneer + 1 roti + cucumber","~380","dinner","","~22g"),
  ]},
  { day:"Thursday",date:"9 Apr",totalCal:"~2350",meals:[
    mk("Pre-Workout","5:30 AM","🏋️","Soaked almonds + walnut","5+1","~80","preWorkout"),
    mk("Breakfast","7:30 AM","🍳","Stuffed lauki paratha + curd","1 paratha + 100g curd + pickle","~350","breakfast","Ensure — lauki = light","~14g"),
    mk("Mid-Morning","10:30 AM","🍉","Coconut water","250ml","~45","midMorning"),
    mk("Lunch","12:30 PM","🍛","2 roti + chana dal + tinda + salad + curd","Standard","~500","lunch","Mango 100g","~17g"),
    mk("Cool Drink","3:00 PM","🧊","Chaas (jeera + hing)","1 tall glass","~45","coolDrink"),
    mk("Evening","4:30 PM","☕","Tea + roasted makhana + pepper","1 cup + 25g","~110","evening"),
    mk("Dinner","7:30 PM","🌙","Moong dal cheela (2) + chutney + salad","2 cheela + chutney + cucumber","~300","dinner","Cheela dinner = protein + light","~18g"),
  ]},
  { day:"Friday",date:"10 Apr",totalCal:"~2400",meals:[
    mk("Pre-Workout","5:30 AM","🏋️","Soaked almonds + walnut","5+1","~80","preWorkout"),
    mk("Breakfast","7:30 AM","🍳","Vegetable dalia + curd","1.5 katori + 100g curd","~330","breakfast","Ensure","~13g"),
    mk("Mid-Morning","10:30 AM","🍉","Papaya + turmeric","1 cup + pinch","~65","midMorning"),
    mk("Lunch","12:30 PM","🍛","2 roti + rajma + karela + kachumber + curd","Standard","~550","lunch","Mango 100g","~22g"),
    mk("Cool Drink","3:00 PM","🧊","Jaljeera","1 glass","~15","coolDrink"),
    mk("Evening","4:30 PM","☕","Tea + poha chivda (homemade)","1 cup + 35g","~155","evening"),
    mk("Dinner","7:30 PM","🌙","2 roti + mix veg (lauki-tori-tinda)","2 roti + 1.5 katori","~350","dinner","Triple gourd = coolest","~12g"),
  ]},
  { day:"Saturday",date:"11 Apr",totalCal:"~2380",meals:[
    mk("Pre-Workout","5:30 AM","🏋️","Soaked almonds + walnut","5+1","~80","preWorkout"),
    mk("Breakfast","7:30 AM","🍳","Ragi porridge + almonds + banana","1.5 katori + 4 almonds + ½ banana","~340","breakfast","Ensure — Ragi for glow","~12g"),
    mk("Mid-Morning","10:30 AM","🍉","Watermelon + mint","1.5 cups","~75","midMorning"),
    mk("Lunch","12:30 PM","🍛","2 roti + paneer curry + pumpkin + salad + curd","Standard","~560","lunch","Mango 100g","~22g"),
    mk("Cool Drink","3:00 PM","🧊","Kokum sharbat","1 glass","~40","coolDrink"),
    mk("Evening","4:30 PM","☕","Tea + kurmura bhel + onion + lemon","1 cup + small bowl","~130","evening"),
    mk("Dinner","7:30 PM","🌙","Tomato soup + paneer bhurji + salad","1 bowl + 60g paneer","~340","dinner","","~18g"),
  ]},
  { day:"Sunday",date:"12 Apr",totalCal:"~2850",cheat:true,meals:[
    mk("Pre-Workout","5:30 AM","🏋️","Almonds + banana","5+1 banana","~170","preWorkout","Rest day"),
    mk("Breakfast","9:00 AM","🍳","Masala dosa + chutney + sambar OR puri bhaji (3)","Full plate","~450","breakfast","Sunday brunch","~14g"),
    mk("Mid-Morning","11:00 AM","🍉","Mango milkshake (no sugar)","1 glass (~200ml) + dry fruits","~150","midMorning","Sunday mango treat"),
    mk("Lunch","12:30 PM","🍛","Paneer curry + 2 roti + raita + papad + mango","Full thali","~650","lunch","Bigger lunch","~22g"),
    mk("Cool Drink","3:00 PM","🧊","Thandai (cold, jaggery)","1 tall glass","~120","coolDrink"),
    mk("Evening","5:00 PM","☕","Tea + vada pav (1) OR samosa (1 baked)","1 cup + treat","~280","evening","Sunday street food"),
    mk("Dinner","8:00 PM","🌙","Dal makhani + 2 roti + raita OR veg biryani","Full serving","~520","sundayDinner","Sunday dinner — indulge","~18g"),
  ]},
];

const W3 = W1.map((d,i) => ({...d, date:["13 Apr","14 Apr","15 Apr","16 Apr","17 Apr","18 Apr","19 Apr"][i]}));
const W4 = W2.map((d,i) => ({...d, date:["20 Apr","21 Apr","22 Apr","23 Apr","24 Apr","25 Apr","26 Apr"][i]}));

const WEEKS = [
  { week:1, label:"30 Mar – 5 Apr", days:W1 },
  { week:2, label:"6 – 12 Apr", days:W2 },
  { week:3, label:"13 – 19 Apr", days:W3 },
  { week:4, label:"20 – 26 Apr", days:W4 },
];

function findToday() {
  const now = new Date();
  const m = now.getMonth(), dt = now.getDate();
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  for (let wi = 0; wi < WEEKS.length; wi++)
    for (let di = 0; di < WEEKS[wi].days.length; di++) {
      const [day, mon] = WEEKS[wi].days[di].date.split(" ");
      if (months.indexOf(mon) === m && parseInt(day) === dt) return { wi, di };
    }
  return { wi:0, di:0 };
}

const DC = ["#22c55e","#3b82f6","#eab308","#f97316","#ef4444","#a855f7","#6b7280"];

// ═══ DRAWER CONTENT SECTIONS ═══
const DRAWER_SECTIONS = [
  { id:"skin", icon:"✨", label:"Skin", color:"#f59e0b" },
  { id:"fruits", icon:"🥭", label:"Fruits", color:"#f59e0b" },
  { id:"vegs", icon:"🥬", label:"Vegs", color:"#22c55e" },
  { id:"drinks", icon:"🧊", label:"Drinks", color:"#0ea5e9" },
  { id:"super", icon:"⚡", label:"Super", color:"#f59e0b" },
  { id:"rules", icon:"✅", label:"Rules", color:"#22c55e" },
];

// ═══════════════════════════════════════════════════════
// APP
// ═══════════════════════════════════════════════════════
export default function App() {
  const init = findToday();
  const [wk,sW] = useState(init.wi);
  const [dy,sD] = useState(init.di);
  const [swapIdx,sSI] = useState({});
  const [drawer,setDrawer] = useState(null); // null or section id

  useEffect(() => { sD(wk===init.wi ? init.di : 0); sSI({}); }, [wk]);
  useEffect(() => { sSI({}); }, [dy]);

  const w = WEEKS[wk], d = w.days[dy], c = DC[dy];

  const cycleSwap = useCallback((i, key) => {
    sSI(p => {
      const cur = p[i] ?? -1;
      const opts = SWAPS[key];
      return opts ? { ...p, [i]: (cur+1)%opts.length } : p;
    });
  }, []);

  const P = ({ a, cl, children, onClick, sx }) => (
    <button onClick={onClick} style={{ padding:"10px 16px", borderRadius:12, fontSize:14, fontWeight:a?700:500, border:a?`2px solid ${cl}`:"2px solid #1e1e1e", background:a?`${cl}14`:"#131313", color:a?cl:"#555", cursor:"pointer", transition:"all .2s", fontFamily:"inherit", whiteSpace:"nowrap", WebkitTapHighlightColor:"transparent", ...sx }}>{children}</button>
  );

  // ─── DRAWER CONTENT RENDERER ───
  const renderDrawer = (id) => {
    if (id === "skin") return SKIN_FOODS.map((s,i)=><div key={i} style={{background:"#151515",borderRadius:14,border:"1px solid #222",padding:"14px 16px",marginBottom:8}}><div style={{display:"flex",alignItems:"center",gap:10,marginBottom:6}}><span style={{fontSize:26}}>{s.emoji}</span><div style={{fontSize:15,fontWeight:700,color:"#ddd"}}>{s.name}</div></div><div style={{fontSize:13,color:"#999",lineHeight:1.6}}>{s.benefit}</div><div style={{fontSize:12,color:"#f59e0b",marginTop:6}}>📌 {s.usage}</div></div>);
    if (id === "fruits") return FRUITS.map((f,i)=><div key={i} style={{background:"#151515",borderRadius:14,border:"1px solid #222",padding:"14px 16px",marginBottom:8}}><div style={{display:"flex",alignItems:"center",gap:10,marginBottom:6}}><span style={{fontSize:26}}>{f.emoji}</span><div style={{flex:1}}><div style={{fontSize:15,fontWeight:700,color:"#ddd"}}>{f.name}</div><div style={{fontSize:11,color:"#666"}}>{f.season} • {f.cal}</div></div></div><div style={{fontSize:13,color:"#999",lineHeight:1.5}}>✦ {f.benefit}</div><div style={{fontSize:12,color:"#0ea5e9",marginTop:4}}>⏰ {f.bestTime}</div><div style={{fontSize:12,color:"#777",marginTop:4,fontStyle:"italic"}}>💡 {f.tip}</div></div>);
    if (id === "vegs") return VEGS.map((v,i)=><div key={i} style={{background:"#151515",borderRadius:14,border:"1px solid #222",padding:"14px 16px",marginBottom:8}}><div style={{display:"flex",alignItems:"center",gap:10,marginBottom:6}}><span style={{fontSize:24}}>{v.emoji}</span><div style={{fontSize:15,fontWeight:700,color:"#ddd"}}>{v.name}</div></div><div style={{fontSize:13,color:"#999",lineHeight:1.5}}>✦ {v.benefit}</div><div style={{fontSize:12,color:"#22c55e",marginTop:4}}>🍳 {v.cooking}</div><div style={{fontSize:12,color:"#777",marginTop:4,fontStyle:"italic"}}>💡 {v.tip}</div></div>);
    if (id === "drinks") return (<>{DRINKS.map((x,i)=><div key={i} style={{background:"#0d1a20",borderRadius:14,border:"1px solid #0ea5e920",padding:"14px 16px",marginBottom:8}}><div style={{display:"flex",alignItems:"center",gap:10,marginBottom:6}}><span style={{fontSize:26}}>{x.emoji}</span><div style={{flex:1}}><div style={{fontSize:15,fontWeight:700,color:"#ddd"}}>{x.name}</div><div style={{fontSize:11,color:"#0ea5e9"}}>{x.cal} kcal • P:{x.prot}</div></div></div><div style={{fontSize:13,color:"#999",lineHeight:1.5}}>✦ {x.benefit}</div><div style={{fontSize:12,color:"#666",marginTop:5,background:"#ffffff06",borderRadius:8,padding:"8px 10px"}}>📝 {x.recipe}</div></div>)}</>);
    if (id === "super") return (<>{SUPERS.map((s,i)=><div key={i} style={{background:"#151515",borderRadius:14,border:"1px solid #222",padding:"14px 16px",marginBottom:8}}><div style={{fontSize:15,fontWeight:700,color:"#ddd",marginBottom:4}}>✦ {s.name}</div><div style={{fontSize:13,color:"#999",lineHeight:1.5}}>{s.benefit}</div><div style={{fontSize:12,color:"#f59e0b",marginTop:4}}>🍽️ {s.usage}</div></div>)}<div style={{marginTop:8,background:"#1a1400",borderRadius:14,border:"1px solid #f59e0b20",padding:"16px"}}><div style={{fontSize:14,fontWeight:700,color:"#f59e0b",marginBottom:10}}>☀️ Pune Tips</div>{["Sabja seeds in every drink","Kairi chutney daily with lunch","Coconut oil on head before sleep","Gourds for dinner — lightest","Onion-kachumber with lime daily","Curd rice on overheated days","Matka water > fridge water","Cotton clothes only","Avoid tea empty stomach","Haldi doodh 2x/week"].map((t,i)=><div key={i} style={{fontSize:13,color:"#888",lineHeight:1.7,display:"flex",gap:8,marginBottom:2}}><span style={{color:"#f59e0b"}}>{i+1}.</span><span>{t}</span></div>)}</div></>);
    if (id === "rules") return (<>{RULES.map((r,i)=><div key={i} style={{background:"#151515",borderRadius:14,border:"1px solid #222",padding:"14px 16px",marginBottom:8}}><div style={{display:"flex",alignItems:"center",gap:14}}><span style={{fontSize:28,flexShrink:0}}>{r.icon}</span><div><div style={{fontSize:14,fontWeight:700,color:"#ccc"}}>{r.text}</div><div style={{fontSize:12,color:"#666",marginTop:3}}>{r.detail}</div></div></div></div>)}<div style={{marginTop:8,background:"#1a0a0a",borderRadius:14,border:"1px solid #ef444420",padding:"16px"}}><div style={{fontSize:14,fontWeight:700,color:"#ef4444",marginBottom:10}}>🚫 Avoid</div>{["Refined sugar","Deep fried (except Sunday)","Cold drinks, soda","Ice cream weekdays","Bakery items","Spicy at night","Mango at night","Heavy dal at dinner","Packaged namkeen","Rice at lunch"].map((t,i)=><div key={i} style={{fontSize:13,color:"#999",lineHeight:1.7,display:"flex",gap:8,marginBottom:2}}><span style={{color:"#ef4444"}}>✗</span><span>{t}</span></div>)}</div></>);
    return null;
  };

  const drawerInfo = DRAWER_SECTIONS.find(s => s.id === drawer);

  return (
    <div style={{ minHeight:"100vh", background:"#080808", fontFamily:"'Segoe UI','Noto Sans',sans-serif", color:"#e5e5e5", paddingBottom:90 }}>

      {/* ═══ HEADER ═══ */}
      <div style={{ background:"linear-gradient(170deg,#1a0f00 0%,#080808 60%)", borderBottom:"1px solid #f59e0b18", padding:"20px 16px 14px" }}>
        <div style={{ maxWidth:700, margin:"0 auto", display:"flex", alignItems:"center", gap:12 }}>
          <div style={{ fontSize:32, lineHeight:1 }}>☀️</div>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:10, letterSpacing:4, color:"#f59e0b", fontWeight:800 }}>SUMMER DIET 2026</div>
            <div style={{ fontSize:20, fontWeight:700, color:"#fff", marginTop:2 }}>30 March – 26 April</div>
            <div style={{ fontSize:12, color:"#666", marginTop:2 }}>🌿 Vegetarian • Age 42 • Pune</div>
          </div>
          <div style={{ background:"#f59e0b0c", border:"1px solid #f59e0b25", borderRadius:10, padding:"6px 12px", textAlign:"center" }}>
            <div style={{ fontSize:9, color:"#777" }}>TARGET</div>
            <div style={{ fontSize:15, fontWeight:800, color:"#f59e0b" }}>~2400</div>
            <div style={{ fontSize:8, color:"#666" }}>KCAL</div>
          </div>
        </div>
      </div>

      {/* ═══ WEEK TABS ═══ */}
      <div style={{ maxWidth:700, margin:"0 auto", padding:"10px 16px 0", display:"flex", gap:6, overflowX:"auto", scrollbarWidth:"none" }}>
        {WEEKS.map((x,i) => <P key={i} a={wk===i} cl="#f59e0b" onClick={()=>sW(i)} sx={{flex:"1 0 auto"}}><div style={{fontSize:10,opacity:.6,marginBottom:2}}>WK {x.week}</div><div>{x.label}</div></P>)}
      </div>

      {/* ═══ DAY TABS ═══ */}
      <div style={{ maxWidth:700, margin:"0 auto", padding:"8px 16px 0", display:"flex", gap:5, overflowX:"auto", scrollbarWidth:"none" }}>
        {w.days.map((x,i) => <P key={i} a={dy===i} cl={DC[i]} onClick={()=>sD(i)}><div style={{fontSize:10,opacity:.6}}>{x.date}</div><div style={{fontSize:15,fontWeight:dy===i?800:500}}>{x.day.slice(0,3)}</div></P>)}
      </div>

      {/* ═══ DAY HEADER ═══ */}
      <div style={{ maxWidth:700, margin:"0 auto", padding:"12px 16px 0" }}>
        <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:10 }}>
          <div style={{ width:6, height:36, borderRadius:4, background:c }} />
          <div style={{ flex:1 }}>
            <div style={{ display:"flex", alignItems:"center", gap:10 }}>
              <span style={{ fontSize:22, fontWeight:700, color:"#fff" }}>{d.day}</span>
              {d.cheat && <span style={{ fontSize:12, background:"#ef444422", color:"#ef4444", padding:"4px 14px", borderRadius:20, fontWeight:700, letterSpacing:.5 }}>🎉 CHEAT DAY</span>}
            </div>
            <div style={{ fontSize:13, color:"#666", marginTop:2 }}>{d.date} 2026 — Week {w.week}</div>
          </div>
          <div style={{ background:`${d.cheat?"#ef4444":"#f59e0b"}0c`, border:`1px solid ${d.cheat?"#ef4444":"#f59e0b"}25`, borderRadius:10, padding:"6px 14px", textAlign:"center" }}>
            <div style={{ fontSize:9, color:"#777" }}>TOTAL</div>
            <div style={{ fontSize:17, fontWeight:800, color:d.cheat?"#ef4444":c }}>{d.totalCal}</div>
            <div style={{ fontSize:8, color:"#555" }}>KCAL</div>
          </div>
        </div>
      </div>

      {/* ═══ MEAL CARDS (always visible) ═══ */}
      <div style={{ maxWidth:700, margin:"0 auto", padding:"0 16px" }}>
        <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
          {d.meals.map((m,i) => {
            const cool = m.slot==="Cool Drink";
            const ac = cool ? "#0ea5e9" : c;
            const opts = SWAPS[m.swapKey];
            const si = swapIdx[i];
            const showing = si !== undefined && si >= 0;

            return (
              <div key={i} style={{ background:cool?"#0a1418":"#111", borderRadius:14, border:`1px solid ${cool?"#0ea5e922":"#1e1e1e"}`, overflow:"hidden", animation:`fd .3s ease ${i*.04}s both` }}>
                <div style={{ padding:"14px 16px", display:"flex", alignItems:"flex-start", gap:12, position:"relative" }}>
                  <div style={{ position:"absolute", left:0, top:0, bottom:0, width:4, background:ac, opacity:.5 }} />
                  <div style={{ fontSize:26, width:32, textAlign:"center", flexShrink:0, marginTop:2 }}>{m.icon}</div>
                  <div style={{ flex:1, minWidth:0 }}>
                    {/* slot header */}
                    <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:6, flexWrap:"wrap", gap:4 }}>
                      <span style={{ fontSize:15, fontWeight:700, color:"#ccc" }}>{m.slot}</span>
                      <div style={{ display:"flex", gap:5, alignItems:"center", flexWrap:"wrap" }}>
                        {m.cal && <span style={{ fontSize:11, color:"#f59e0b", background:"#f59e0b10", padding:"3px 8px", borderRadius:6, fontWeight:700 }}>{m.cal}</span>}
                        {m.prot && <span style={{ fontSize:11, color:"#22c55e", background:"#22c55e10", padding:"3px 8px", borderRadius:6, fontWeight:600 }}>P:{m.prot}</span>}
                        <span style={{ fontSize:11, color:ac, background:`${ac}0e`, padding:"3px 8px", borderRadius:6, fontWeight:600 }}>{m.time}</span>
                      </div>
                    </div>
                    <div style={{ fontSize:15, color:"#bbb", lineHeight:1.6 }}>{m.main}</div>
                    {m.qty && <div style={{ fontSize:12, color:"#777", marginTop:4 }}>📏 {m.qty}</div>}
                    {m.note && <div style={{ fontSize:12, color:"#666", marginTop:4, fontStyle:"italic" }}>💡 {m.note}</div>}
                    {opts && (
                      <button onClick={()=>cycleSwap(i,m.swapKey)} style={{ marginTop:8, fontSize:13, color:ac, background:`${ac}0a`, border:`1px solid ${ac}25`, borderRadius:8, padding:"7px 14px", cursor:"pointer", fontFamily:"inherit", fontWeight:600, display:"flex", alignItems:"center", gap:6, WebkitTapHighlightColor:"transparent" }}>
                        <span style={{fontSize:16}}>⇄</span>
                        <span>{showing ? `Option ${si+1}/10 — tap next` : "Tap for 10 swap options"}</span>
                      </button>
                    )}
                  </div>
                </div>
                {showing && opts && (
                  <div style={{ background:`${ac}06`, borderTop:`1px solid ${ac}15`, padding:"12px 16px 12px 60px" }}>
                    <div style={{ fontSize:14, color:"#bbb", lineHeight:1.5 }}>
                      <span style={{ color:ac, fontWeight:700, marginRight:8 }}>↻ #{si+1}:</span>
                      {opts[si]}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Day summary */}
        <div style={{ marginTop:14, background:"#0d0d0d", borderRadius:14, border:"1px solid #1a1a1a", padding:"16px", display:"flex", justifyContent:"space-around" }}>
          {[
            { l:"Total",v:d.totalCal,cl:d.cheat?"#ef4444":"#f59e0b" },
            { l:"Protein",v:d.cheat?"~90g":"~75g",cl:"#22c55e" },
            { l:"Water",v:"3.5L",cl:"#0ea5e9" },
            { l:"Meals",v:"7",cl:"#a855f7" },
          ].map((s,i) => <div key={i} style={{textAlign:"center"}}><div style={{fontSize:18,fontWeight:800,color:s.cl}}>{s.v}</div><div style={{fontSize:10,color:"#555",marginTop:2}}>{s.l}</div></div>)}
        </div>

        {d.cheat && (
          <div style={{ marginTop:10, background:"#ef444408", borderRadius:14, border:"1px solid #ef444422", padding:"14px 16px" }}>
            <div style={{ fontSize:15, fontWeight:700, color:"#ef4444", marginBottom:6 }}>🎉 Cheat Day Rules</div>
            <div style={{ fontSize:14, color:"#999", lineHeight:1.7 }}>One fried item max, extra walk after meals, drink 4L water today. Monday is reset!</div>
          </div>
        )}
      </div>

      {/* ═══ FLOATING BOTTOM ICON BAR ═══ */}
      <div style={{
        position:"fixed", bottom:0, left:0, right:0, zIndex:100,
        background:"linear-gradient(to top, #0a0a0a 80%, transparent)",
        paddingTop:20, paddingBottom:12,
      }}>
        <div style={{
          maxWidth:420, margin:"0 auto", display:"flex", justifyContent:"space-around",
          background:"#161616", borderRadius:20, border:"1px solid #2a2a2a",
          padding:"8px 6px", boxShadow:"0 -4px 30px rgba(0,0,0,.6)",
          marginLeft:16, marginRight:16,
        }}>
          {DRAWER_SECTIONS.map(s => (
            <button key={s.id} onClick={() => setDrawer(drawer===s.id ? null : s.id)} style={{
              display:"flex", flexDirection:"column", alignItems:"center", gap:3,
              background: drawer===s.id ? `${s.color}15` : "transparent",
              border: drawer===s.id ? `1px solid ${s.color}40` : "1px solid transparent",
              borderRadius:14, padding:"8px 10px", cursor:"pointer",
              fontFamily:"inherit", WebkitTapHighlightColor:"transparent",
              transition:"all .2s", minWidth:48,
            }}>
              <span style={{ fontSize:22 }}>{s.icon}</span>
              <span style={{ fontSize:10, fontWeight:600, color: drawer===s.id ? s.color : "#666", letterSpacing:.3 }}>{s.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ═══ DRAWER OVERLAY ═══ */}
      {drawer && (
        <div style={{ position:"fixed", inset:0, zIndex:200, display:"flex", flexDirection:"column" }}>
          {/* Backdrop */}
          <div onClick={()=>setDrawer(null)} style={{ flex:"0 0 auto", height:"8vh", background:"rgba(0,0,0,.7)", backdropFilter:"blur(4px)" }} />
          {/* Sheet */}
          <div style={{
            flex:1, background:"#0c0c0c", borderRadius:"24px 24px 0 0",
            border:"1px solid #2a2a2a", borderBottom:"none",
            display:"flex", flexDirection:"column", overflow:"hidden",
            animation:"slideUp .3s ease",
          }}>
            {/* Drag handle + header */}
            <div style={{ padding:"12px 20px 10px", borderBottom:"1px solid #1e1e1e", flexShrink:0 }}>
              <div style={{ width:40, height:4, borderRadius:2, background:"#333", margin:"0 auto 12px" }} />
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                  <span style={{ fontSize:24 }}>{drawerInfo?.icon}</span>
                  <span style={{ fontSize:18, fontWeight:700, color:drawerInfo?.color }}>{
                    drawer==="skin"?"Skin Glow Foods":
                    drawer==="fruits"?"Summer Fruits":
                    drawer==="vegs"?"Summer Vegetables":
                    drawer==="drinks"?"Cooling Drinks":
                    drawer==="super"?"Superfoods & Tips":
                    "Daily Rules"
                  }</span>
                </div>
                <button onClick={()=>setDrawer(null)} style={{
                  width:36, height:36, borderRadius:10, border:"1px solid #333",
                  background:"#1a1a1a", color:"#888", fontSize:18, cursor:"pointer",
                  display:"flex", alignItems:"center", justifyContent:"center",
                  fontFamily:"inherit", WebkitTapHighlightColor:"transparent",
                }}>✕</button>
              </div>
            </div>
            {/* Scrollable content */}
            <div style={{ flex:1, overflow:"auto", padding:"16px 20px 100px", scrollbarWidth:"none" }}>
              {renderDrawer(drawer)}
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fd{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
        @keyframes slideUp{from{transform:translateY(100%)}to{transform:translateY(0)}}
        button{font-family:inherit}
        ::-webkit-scrollbar{display:none}
      `}</style>
    </div>
  );
}

