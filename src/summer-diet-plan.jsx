import { useState, useEffect } from "react";

const SKIN_FOODS = [
  { name: "Amla / Indian Gooseberry", emoji: "🟢", benefit: "Highest natural vitamin C — collagen production, pigmentation control, brightening", usage: "1 amla murabba daily OR 1 tsp amla powder in water morning" },
  { name: "Aloe Vera Juice", emoji: "🌿", benefit: "Hydration from within, reduces acne scars, anti-aging", usage: "2 tbsp fresh aloe juice + water on empty stomach (3x/week)" },
  { name: "Papaya", emoji: "🧡", benefit: "Papain enzyme clears dead skin, vitamin A for glow", usage: "1 cup morning 3–4 times/week as mid-morning fruit" },
  { name: "Cucumber + Tomato", emoji: "🥒", benefit: "Silica for skin elasticity, lycopene for sun protection", usage: "Daily in kachumber salad — minimum 1 cup with lunch" },
  { name: "Curd / Dahi", emoji: "🥛", benefit: "Probiotics = gut health = clear skin, lactic acid glow", usage: "1 katori (150ml) with lunch daily — non-negotiable" },
  { name: "Sabja Seeds (Basil Seeds)", emoji: "🌱", benefit: "Omega-3 fatty acids, detox, reduces body heat & acne", usage: "1 tsp soaked in water — add to any drink daily" },
  { name: "Carrots + Beetroot", emoji: "🥕", benefit: "Beta-carotene = natural glow, blood purifier", usage: "Carrot-beet salad 3x/week OR fresh juice 2x/week" },
  { name: "Gulkand (Rose Jam)", emoji: "🌹", benefit: "Ayurvedic blood purifier, pitta coolant, acne reducer", usage: "1 tsp after lunch — cools body, clears skin from inside" },
  { name: "Turmeric + Black Pepper", emoji: "💛", benefit: "Curcumin anti-inflammatory, evens skin tone", usage: "Pinch in dal/sabzi daily + haldi doodh 2x/week before bed" },
  { name: "Soaked Almonds", emoji: "🥜", benefit: "Vitamin E — repairs skin cells, natural moisturizer", usage: "5–6 soaked almonds daily morning — peel skin before eating" },
];

const SUMMER_FRUITS = [
  { name: "Mango (Alphonso/Kesar)", emoji: "🥭", benefit: "Vitamins A & C, boosts immunity, aids digestion", bestTime: "With lunch only", cal: "~70 kcal/100g", tip: "Soak in water 30 min before eating to reduce heat", season: "Apr–Jun" },
  { name: "Watermelon (Tarbooz)", emoji: "🍉", benefit: "92% water, lycopene for heart & skin, low calorie", bestTime: "Mid-morning 10:30 AM", cal: "~30 kcal/100g", tip: "Eat alone on empty stomach — not with meals", season: "Mar–Jun" },
  { name: "Muskmelon (Kharbooja)", emoji: "🍈", benefit: "Potassium, vitamin A, cooling, skin hydration", bestTime: "Morning or mid-morning", cal: "~34 kcal/100g", tip: "Sprinkle black salt + roasted jeera", season: "Apr–Jun" },
  { name: "Papaya (Papita)", emoji: "🧡", benefit: "Papain enzyme, vitamin C, skin brightener", bestTime: "Morning empty stomach", cal: "~43 kcal/100g", tip: "Best skin-glow fruit — eat 3-4x/week", season: "Year-round" },
  { name: "Jamun (Indian Blackberry)", emoji: "🫐", benefit: "Blood sugar control, iron, antioxidants, acne fighter", bestTime: "Post-lunch or 3 PM", cal: "~62 kcal/100g", tip: "Don't drink milk 30 min before/after", season: "May–Jul" },
  { name: "Pineapple (Ananas)", emoji: "🍍", benefit: "Bromelain, anti-inflammatory, skin repair", bestTime: "Mid-morning snack", cal: "~50 kcal/100g", tip: "Sprinkle black pepper + salt", season: "Mar–Jul" },
  { name: "Bael (Wood Apple)", emoji: "🍐", benefit: "Gut health, detox, blood purifier, skin clarity", bestTime: "As sharbat afternoon", cal: "~137 kcal/100g", tip: "Use jaggery not sugar", season: "Apr–Jun" },
  { name: "Kokum", emoji: "🟣", benefit: "Anti-inflammatory, prevents dehydration, acidity", bestTime: "Sol kadhi with lunch", cal: "~60 kcal/100g", tip: "Maharashtrian classic — kokum agal", season: "Apr–Jun" },
];

const SUMMER_VEGS = [
  { name: "Lauki (Bottle Gourd)", emoji: "🫒", benefit: "96% water, cooling, weight loss, skin hydration", cooking: "Sabzi, kofta, raita, juice", tip: "Morning juice on empty stomach = weight loss + glow" },
  { name: "Tori (Ridge Gourd)", emoji: "🥬", benefit: "Blood purifier, light, skin clarity", cooking: "Sabzi, dal + tori, sambar", tip: "Don't peel completely — skin has nutrients" },
  { name: "Karela (Bitter Gourd)", emoji: "🥒", benefit: "Blood sugar control, liver detox, acne fighter", cooking: "Stuffed, sabzi, chips, juice", tip: "Soak in salt water 20 min for less bitterness" },
  { name: "Cucumber (Kheera/Kakdi)", emoji: "🥒", benefit: "Silica for skin, cooling, hydrating", cooking: "Kachumber, raita, salad, juice", tip: "Eat with every meal — skin + digestion magic" },
  { name: "Pumpkin (Kaddu)", emoji: "🎃", benefit: "Beta-carotene = skin glow, fibre, immunity", cooking: "Sabzi, soup, halwa (jaggery)", tip: "Roast pumpkin seeds — zinc for skin repair" },
  { name: "Bhindi (Okra)", emoji: "🌿", benefit: "Fibre, folate, vitamin C, gut-skin axis", cooking: "Dry sabzi, bharwa, in sambar", tip: "Wash before cutting — prevents sliminess" },
  { name: "Parval (Pointed Gourd)", emoji: "🟢", benefit: "Low cal, blood purifier, digestive", cooking: "Dry sabzi, stuffed, dal + parval", tip: "Pairs perfectly with moong dal" },
  { name: "Tinda (Apple Gourd)", emoji: "⚪", benefit: "Ultra light, cooling, summer upset stomach remedy", cooking: "Sabzi, dry fry, in dal", tip: "Simple jeera-hing tadka is best" },
];

const SUMMER_DRINKS = [
  { name: "Chaas / Mattha", emoji: "🥛", benefit: "Probiotics, digestion, cools body instantly", recipe: "200ml curd + 100ml water + roasted jeera + mint + salt + hing", bestTime: "Post-lunch", cal: "~45 kcal", protein: "~3g" },
  { name: "Aam Panna", emoji: "🥭", benefit: "Prevents heatstroke, electrolytes, vitamin C", recipe: "1 raw mango (boiled) + jaggery (1 tsp) + jeera + black salt + water", bestTime: "2-3 PM", cal: "~60 kcal", protein: "~1g" },
  { name: "Sattu Sharbat", emoji: "💪", benefit: "High protein, sustained energy, pitta coolant", recipe: "2 tbsp sattu + cold water + lemon + black salt + jeera", bestTime: "Mid-morning or post-lunch", cal: "~120 kcal", protein: "~7g" },
  { name: "Jaljeera", emoji: "🌿", benefit: "Digestion, appetite booster, nausea relief", recipe: "Jeera + pudina + dry mango powder + black salt + cold water", bestTime: "Before lunch", cal: "~15 kcal", protein: "~1g" },
  { name: "Nimbu Pani (no sugar)", emoji: "🍋", benefit: "Vitamin C, electrolytes, skin brightener", recipe: "1 lemon + water + black salt + pinch honey only", bestTime: "Anytime", cal: "~20 kcal", protein: "~0g" },
  { name: "Coconut Water", emoji: "🥥", benefit: "Natural electrolytes, potassium, skin hydration", recipe: "Fresh tender coconut — as is", bestTime: "10 AM or post-workout", cal: "~45 kcal", protein: "~2g" },
  { name: "Kokum Sharbat", emoji: "🟣", benefit: "Anti-inflammatory, anti-acidity, cooling", recipe: "Kokum syrup + cold water + black salt + jeera", bestTime: "With/after lunch", cal: "~40 kcal", protein: "~1g" },
  { name: "Sabja Lemon Water", emoji: "🌱", benefit: "Cooling seeds, fibre, reduces body heat & acne", recipe: "1 tsp soaked sabja + cold water + lemon + pinch honey", bestTime: "Anytime", cal: "~25 kcal", protein: "~2g" },
];

const SUPERFOODS = [
  { name: "Sabja Seeds (Basil Seeds)", benefit: "Body cooling, omega-3, fibre, skin detox", usage: "1 tsp soaked — add to any drink daily" },
  { name: "Gulkand (Rose Petal Jam)", benefit: "Pitta coolant, blood purifier, acne reducer", usage: "1 tsp after lunch — clears skin from inside" },
  { name: "Sattu Flour", benefit: "Plant protein (~20g/100g), low GI, cooling", usage: "Sharbat, paratha stuffing, litti" },
  { name: "Raw Mango (Kairi)", benefit: "Vitamin C, prevents heat stroke, digestion", usage: "Aam panna, pickle, chutney, dal with kairi" },
  { name: "Pudina (Mint)", benefit: "Cooling, digestion, skin anti-inflammatory", usage: "Chutney, raita, chaas, salad — daily" },
  { name: "Amla (Gooseberry)", benefit: "Highest vitamin C, collagen, anti-aging", usage: "Murabba, powder in water, pickle" },
  { name: "Fennel Seeds (Saunf)", benefit: "Cooling, anti-bloating, skin detox", usage: "Chew after meals, in water, in thandai" },
  { name: "Aloe Vera", benefit: "Internal hydration, acne scars, anti-aging", usage: "2 tbsp juice + water, 3x/week morning" },
];

const mk = (slot,time,icon,main,qty,cal,swap,note,prot) => ({slot,time,icon,main,qty,cal,swap,note,prot});

// ──── WEEK 1: 30 Mar – 5 Apr 2026 ────
const W1 = [
  { day:"Monday", date:"30 Mar", totalCal:"~2450", meals: [
    mk("Pre-Workout","5:30 AM","🏋️","Soaked almonds (peeled) + walnut","5 almonds + 1 walnut","~80","OR 1 small banana (~90 kcal)","Peel almond skin — better nutrient absorption"),
    mk("Breakfast","7:30 AM","🍳","Moong dal chilla + mint chutney + curd","2 chilla + 2 tbsp chutney + 100g curd","~320","SWAP: Besan chilla (2) + green chutney + curd","Add Ensure supplement","~18g"),
    mk("Mid-Morning","10:30 AM","🍉","Papaya (for skin glow)","1 cup (~150g)","~65","SWAP: Watermelon 1 cup (~200g) ~60 kcal","Papaya 3-4x/week for skin brightening"),
    mk("Lunch","12:30 PM","🍛","2 roti + moong dal + bhindi sabzi + kachumber + curd","2 roti + 1 katori dal + 1 katori sabzi + 1 cup salad + 150g curd","~530","SWAP: 2 roti + masoor dal + tori sabzi + cucumber raita","Mango 100g with lunch + 1 tsp gulkand after meal","~18g"),
    mk("Cool Drink","3:00 PM","🧊","Chaas — jeera + pudina buttermilk","1 tall glass (~300ml)","~45","SWAP: Kokum sharbat ~40 kcal OR Sabja lemon water ~25 kcal"),
    mk("Evening","4:30 PM","☕","Green tea + roasted chana","1 cup tea + 30g chana","~130","SWAP: Tea + roasted makhana (1 handful ~25g) ~100 kcal","No sugar in tea — use 0 or stevia"),
    mk("Dinner","7:30 PM","🌙","Lauki soup + paneer tikka (grilled) + cucumber","1 bowl soup + 80g paneer + 1 cup cucumber","~320","SWAP: Tomato soup + 2 roti + tori sabzi ~330 kcal","Light dinner = feel fresh next morning, better skin","~18g"),
  ]},
  { day:"Tuesday", date:"31 Mar", totalCal:"~2400", meals: [
    mk("Pre-Workout","5:30 AM","🏋️","Soaked almonds + walnut","5 almonds + 1 walnut","~80","OR 1 small banana"),
    mk("Breakfast","7:30 AM","🍳","Vegetable poha + peanuts + lemon + sprouts","1.5 cup poha + 1 tbsp peanuts + 50g sprouts","~340","SWAP: Upma + coconut chutney + sprouted moong","Add Ensure","~14g"),
    mk("Mid-Morning","10:30 AM","🍉","Coconut water + 4 almonds","1 coconut (~200ml) + 4 almonds","~75","SWAP: Muskmelon 1 cup + black salt ~35 kcal"),
    mk("Lunch","12:30 PM","🍛","2 roti + chole + onion-cucumber kachumber + curd","2 roti + 1 katori chole + 1 cup salad + 150g curd","~550","SWAP: 2 roti + chana dal + lauki sabzi + raita","Mango 100g","~20g"),
    mk("Cool Drink","3:00 PM","🧊","Nimbu pani (no sugar, black salt + mint)","1 glass (~300ml)","~20","SWAP: Aam panna (jaggery, not sugar) ~60 kcal"),
    mk("Evening","4:30 PM","☕","Tea + kurmura (puffed rice) chivda","1 cup tea + 1 small bowl chivda (~40g)","~170","SWAP: Tea + roasted peanut-chana mix (30g) ~150 kcal","Homemade chivda — not packaged"),
    mk("Dinner","7:30 PM","🌙","Moong dal khichdi + curd + papad","1.5 katori khichdi + 100g curd + 1 papad","~350","SWAP: Dalia khichdi + raita ~340 kcal","Lightest dinner option — great for feeling fresh","~14g"),
  ]},
  { day:"Wednesday", date:"1 Apr", totalCal:"~2380", meals: [
    mk("Pre-Workout","5:30 AM","🏋️","Soaked almonds + walnut","5 almonds + 1 walnut","~80","OR 1 small banana"),
    mk("Breakfast","7:30 AM","🍳","Ragi dosa (2) + peanut chutney + curd","2 dosa + 2 tbsp chutney + 100g curd","~330","SWAP: Jowar roti (2) + green chutney + curd","Add Ensure — Ragi = calcium + iron for skin","~14g"),
    mk("Mid-Morning","10:30 AM","🍉","Watermelon slices","1.5 cups (~250g)","~75","SWAP: Papaya 1 cup ~65 kcal"),
    mk("Lunch","12:30 PM","🍛","2 roti + dal fry + lauki sabzi + kachumber + curd","2 roti + 1 katori dal + 1 katori sabzi + salad + 150g curd","~500","SWAP: 2 roti + palak dal + tinda sabzi + raita","Mango 100g","~17g"),
    mk("Cool Drink","3:00 PM","🧊","Sattu sharbat (salt + lemon + jeera)","2 tbsp sattu + 1 glass water","~120","SWAP: Coconut water + sabja seeds ~50 kcal","~7g"),
    mk("Evening","4:30 PM","☕","Tea + til-gur chikki (small)","1 cup tea + 1 small piece (~20g)","~120","SWAP: Tea + roasted makhana (25g) ~100 kcal","Sesame = zinc + calcium for skin"),
    mk("Dinner","7:30 PM","🌙","2 roti + tori sabzi + cucumber raita","2 roti + 1 katori sabzi + 100g raita","~340","SWAP: Parval sabzi + 2 roti + salad ~330 kcal","Gourds at dinner = lightest digestion","~12g"),
  ]},
  { day:"Thursday", date:"2 Apr", totalCal:"~2420", meals: [
    mk("Pre-Workout","5:30 AM","🏋️","Soaked almonds + walnut","5 almonds + 1 walnut","~80","OR 1 small banana"),
    mk("Breakfast","7:30 AM","🍳","Idli (3) + sambar + coconut chutney","3 idli + 1 katori sambar + 2 tbsp chutney","~350","SWAP: Uttapam (2) + sambar + chutney","Add Ensure","~13g"),
    mk("Mid-Morning","10:30 AM","🍉","Papaya + pinch turmeric","1 cup papaya + pinch haldi","~65","SWAP: Carrot-beet juice (small glass ~150ml) ~80 kcal","Turmeric + papaya = skin brightening combo"),
    mk("Lunch","12:30 PM","🍛","2 roti + rajma + kachumber salad + curd","2 roti + 1 katori rajma + 1 cup salad + 150g curd","~560","SWAP: 2 roti + dal makhani (light) + cucumber raita","Mango 100g — no sugar items today","~22g"),
    mk("Cool Drink","3:00 PM","🧊","Aam panna (raw mango + jaggery)","1 glass (~300ml)","~60","SWAP: Bael sharbat (jaggery) ~70 kcal"),
    mk("Evening","4:30 PM","☕","Tea + sprouts chaat + lemon + onion","1 cup tea + 1 small bowl sprouts (~60g)","~140","SWAP: Tea + bhuna chana jor garam (30g) ~130 kcal","Sprouts = plant protein + skin collagen"),
    mk("Dinner","7:30 PM","🌙","Lauki soup + paneer tikka (grilled)","1 bowl soup + 80g paneer + salad","~320","SWAP: Mixed veg soup + paneer bhurji (small) ~340 kcal","","~18g"),
  ]},
  { day:"Friday", date:"3 Apr", totalCal:"~2400", meals: [
    mk("Pre-Workout","5:30 AM","🏋️","Soaked almonds + walnut","5 almonds + 1 walnut","~80","OR 1 small banana"),
    mk("Breakfast","7:30 AM","🍳","Oats + cold milk + chia seeds + almonds","40g oats + 200ml milk + 1 tsp chia + 4 almonds","~350","SWAP: Vegetable dalia + curd ~330 kcal","Add Ensure — Oats only 1x this week","~15g"),
    mk("Mid-Morning","10:30 AM","🍉","Coconut water","1 tender coconut (~250ml)","~45","SWAP: Muskmelon 1 cup ~35 kcal"),
    mk("Lunch","12:30 PM","🍛","2 roti + dal + lauki sabzi + kachumber + curd","2 roti + 1 katori dal + 1 katori sabzi + salad + 150g curd","~500","SWAP: 2 roti + chana dal + tinda sabzi + raita","Mango 100g","~17g"),
    mk("Cool Drink","3:00 PM","🧊","Chaas — pudina buttermilk","1 tall glass (~300ml)","~45","SWAP: Jaljeera ~15 kcal"),
    mk("Evening","4:30 PM","☕","Tea + mathri (baked, 2 small) + pickle","1 cup tea + 2 small baked mathri (~30g)","~150","SWAP: Tea + chana dal namkeen (25g) ~135 kcal","Baked not fried — traditional Marwari snack"),
    mk("Dinner","7:30 PM","🌙","Moong dal + tinda sabzi + salad","1 katori dal + 1 katori sabzi + cucumber","~310","SWAP: Masoor dal + lauki sabzi ~320 kcal","No roti with dal-sabzi dinner = ultra light","~16g"),
  ]},
  { day:"Saturday", date:"4 Apr", totalCal:"~2380", meals: [
    mk("Pre-Workout","5:30 AM","🏋️","Soaked almonds + walnut","5 almonds + 1 walnut","~80","OR 1 small banana"),
    mk("Breakfast","7:30 AM","🍳","Sabudana khichdi + peanuts + curd","1.5 katori khichdi + 1 tbsp peanuts + 100g curd","~370","SWAP: Poha + sev + peanuts + lemon ~350 kcal","Add Ensure","~12g"),
    mk("Mid-Morning","10:30 AM","🍉","Papaya + sabja seeds","1 cup papaya + 1 tsp soaked sabja","~75","SWAP: Watermelon 1.5 cups ~75 kcal","Papaya + sabja = best skin combo"),
    mk("Lunch","12:30 PM","🍛","2 roti + sambar + bhindi dry + kachumber + curd","2 roti + 1 katori sambar + 1 katori bhindi + salad + 150g curd","~520","SWAP: 2 roti + dal + pumpkin sabzi + raita","Mango 100g + 1 tsp gulkand after meal","~16g"),
    mk("Cool Drink","3:00 PM","🧊","Jaljeera (cumin-mint cooler)","1 glass (~300ml)","~15","SWAP: Sabja lemon water ~25 kcal"),
    mk("Evening","4:30 PM","☕","Tea + dry roasted peanuts + chana","1 cup tea + mixed 30g","~145","SWAP: Tea + kurmura bhel + lemon + onion ~130 kcal","Peanuts = biotin for skin & hair"),
    mk("Dinner","7:30 PM","🌙","Tomato soup + grilled paneer + salad","1 bowl soup + 80g paneer + 1 cup salad","~330","SWAP: Lauki soup + paneer tikka ~320 kcal","","~19g"),
  ]},
  { day:"Sunday", date:"5 Apr", totalCal:"~2250", meals: [
    mk("Pre-Workout","5:30 AM","🏋️","Almonds + walnut OR banana","5 almonds + 1 walnut","~80","Rest day — skip if sleeping in"),
    mk("Breakfast","9:00 AM","🍳","Besan chilla (2) + mint chutney + curd","2 chilla + chutney + 100g curd","~330","SWAP: Masala dosa + chutney ~340 kcal","Add Ensure","~16g"),
    mk("Mid-Morning","11:00 AM","🍉","Seasonal fruit plate","1 cup mixed (watermelon + papaya)","~80","SWAP: Coconut water + 4 almonds ~75 kcal"),
    mk("Lunch","12:30 PM","🍛","Home-style thali — 2 roti + dal + sabzi + curd","2 roti + 1 katori dal + 1 katori sabzi + 150g curd","~500","SWAP: Curd + 2 roti + sabzi + pickle","Mango 100g","~16g"),
    mk("Cool Drink","3:00 PM","🧊","Watermelon juice + sabja (no sugar)","1 glass (~300ml)","~50","SWAP: Coconut water / thandai ~60 kcal"),
    mk("Evening","4:30 PM","☕","Tea + murmura chivda (homemade)","1 cup tea + small bowl (~35g)","~140","SWAP: Tea + makhana + peanuts ~130 kcal"),
    mk("Dinner","7:00 PM","🌙","Early — moong dal soup + salad","1 big bowl soup + cucumber-tomato salad","~250","SWAP: Lauki soup + small paneer tikka ~280 kcal","Sunday dinner ultra light for Monday energy","~12g"),
  ]},
];

const W2 = [
  { day:"Monday", date:"6 Apr", totalCal:"~2420", meals: [
    mk("Pre-Workout","5:30 AM","🏋️","Soaked almonds + walnut","5+1","~80","OR banana"),
    mk("Breakfast","7:30 AM","🍳","Vegetable upma + coconut chutney + sprouts","1.5 katori upma + 2 tbsp chutney + 50g sprouts","~340","SWAP: Poha + sev + peanuts + lemon ~350 kcal","Ensure","~13g"),
    mk("Mid-Morning","10:30 AM","🍉","Muskmelon + black salt","1 cup (~150g)","~50","SWAP: Coconut water ~45 kcal"),
    mk("Lunch","12:30 PM","🍛","2 roti + palak dal + tinda sabzi + kachumber + curd","2 roti + 1 katori + 1 katori + salad + 150g curd","~510","SWAP: 2 roti + dal tadka + parval sabzi + raita","Mango 100g","~18g"),
    mk("Cool Drink","3:00 PM","🧊","Sattu sharbat (jeera + lemon)","2 tbsp + 1 glass","~120","SWAP: Chaas ~45 kcal","~7g"),
    mk("Evening","4:30 PM","☕","Tea + bhel puri (homemade, no sev)","1 cup tea + small bowl","~140","SWAP: Tea + sprouts chaat ~140 kcal","Bhel = light, tangy, zero oil"),
    mk("Dinner","7:30 PM","🌙","2 roti + paneer do pyaza (low oil) + raita","2 roti + 80g paneer + 100g raita","~420","SWAP: Paneer tikka + lauki soup ~350 kcal","","~22g"),
  ]},
  { day:"Tuesday", date:"7 Apr", totalCal:"~2380", meals: [
    mk("Pre-Workout","5:30 AM","🏋️","Soaked almonds + walnut","5+1","~80","OR banana"),
    mk("Breakfast","7:30 AM","🍳","Besan chilla (2) + tomato chutney + curd","2 chilla + chutney + 100g curd","~340","SWAP: Moong dal chilla + green chutney ~350 kcal","Ensure","~18g"),
    mk("Mid-Morning","10:30 AM","🍉","Papaya","1 cup (~150g)","~65","SWAP: Carrot sticks + hummus (2 tbsp) ~80 kcal"),
    mk("Lunch","12:30 PM","🍛","2 roti + chole + parval sabzi + salad + curd","2 roti + 1 katori + 1 katori + salad + 150g curd","~540","SWAP: 2 roti + rajma + cucumber raita","Mango 100g","~21g"),
    mk("Cool Drink","3:00 PM","🧊","Coconut water + sabja","250ml + 1 tsp sabja","~50","SWAP: Kokum sharbat ~40 kcal"),
    mk("Evening","4:30 PM","☕","Tea + sing bhujia (dry roasted peanuts)","1 cup tea + 25g peanuts","~140","SWAP: Tea + til ladoo (1 small) ~120 kcal","Til = calcium + zinc for skin & bones"),
    mk("Dinner","7:30 PM","🌙","Dal + lauki sabzi (no roti)","1 katori masoor dal + 1 katori lauki","~280","SWAP: Tori sabzi + moong dal ~290 kcal","Roti-free dinner 2x/week = lighter mornings","~15g"),
  ]},
  { day:"Wednesday", date:"8 Apr", totalCal:"~2400", meals: [
    mk("Pre-Workout","5:30 AM","🏋️","Soaked almonds + walnut","5+1","~80","OR banana"),
    mk("Breakfast","7:30 AM","🍳","Dosa (2) + sambar + chutney","2 dosa + 1 katori sambar + chutney","~360","SWAP: Uttapam (2) + sambar ~350 kcal","Ensure","~13g"),
    mk("Mid-Morning","10:30 AM","🍉","Watermelon","1.5 cups (~250g)","~75","SWAP: Pineapple + black salt ~60 kcal"),
    mk("Lunch","12:30 PM","🍛","2 roti + dal fry + bhindi + kachumber + curd","2 roti + 1 katori + 1 katori + salad + 150g curd","~510","SWAP: 2 roti + dal + pumpkin sabzi + raita","Mango 100g","~17g"),
    mk("Cool Drink","3:00 PM","🧊","Aam panna (jaggery, no sugar)","1 glass","~60","SWAP: Bael sharbat ~70 kcal"),
    mk("Evening","4:30 PM","☕","Tea + chana jor garam + lemon","1 cup tea + 30g","~130","SWAP: Tea + murmura bhel ~130 kcal","Classic street snack made healthy at home"),
    mk("Dinner","7:30 PM","🌙","Palak paneer + 1 roti + salad","80g paneer + 1 roti + cucumber","~380","SWAP: Methi paneer + 1 roti ~370 kcal","1 roti only at dinner on heavy paneer days","~20g"),
  ]},
  { day:"Thursday", date:"9 Apr", totalCal:"~2350", meals: [
    mk("Pre-Workout","5:30 AM","🏋️","Soaked almonds + walnut","5+1","~80","OR banana"),
    mk("Breakfast","7:30 AM","🍳","Stuffed paratha (lauki) + curd + pickle","1 paratha + 100g curd + 1 tsp pickle","~350","SWAP: Paneer paratha + curd ~370 kcal","Ensure — lauki paratha = light + hydrating","~14g"),
    mk("Mid-Morning","10:30 AM","🍉","Coconut water","250ml","~45","SWAP: Papaya 1 cup ~65 kcal"),
    mk("Lunch","12:30 PM","🍛","2 roti + chana dal + tinda + salad + curd","2 roti + 1 katori + 1 katori + salad + 150g curd","~500","SWAP: 2 roti + moong dal + parval + raita","Mango 100g","~17g"),
    mk("Cool Drink","3:00 PM","🧊","Chaas (jeera + hing + mint)","1 tall glass","~45","SWAP: Nimbu pani ~20 kcal"),
    mk("Evening","4:30 PM","☕","Tea + roasted makhana + black pepper","1 cup tea + 25g makhana","~110","SWAP: Tea + dry fruit mix (15g) ~120 kcal","Makhana = low cal + good skin snack"),
    mk("Dinner","7:30 PM","🌙","Moong dal cheela (2) + chutney + salad","2 cheela + mint chutney + cucumber","~300","SWAP: Besan chilla + curd ~320 kcal","Cheela dinner = protein + ultra light","~18g"),
  ]},
  { day:"Friday", date:"10 Apr", totalCal:"~2400", meals: [
    mk("Pre-Workout","5:30 AM","🏋️","Soaked almonds + walnut","5+1","~80","OR banana"),
    mk("Breakfast","7:30 AM","🍳","Vegetable dalia + curd + lemon","1.5 katori dalia + 100g curd","~330","SWAP: Oats upma + peanuts + veggies ~340 kcal","Ensure — Dalia = fibre + light","~13g"),
    mk("Mid-Morning","10:30 AM","🍉","Papaya + turmeric pinch","1 cup","~65","SWAP: Muskmelon 1 cup ~35 kcal"),
    mk("Lunch","12:30 PM","🍛","2 roti + rajma + karela sabzi + kachumber + curd","2 roti + 1 katori + 1 katori + salad + 150g curd","~550","SWAP: 2 roti + lobia + lauki + raita","Mango 100g","~21g"),
    mk("Cool Drink","3:00 PM","🧊","Jaljeera","1 glass","~15","SWAP: Sabja lemon water ~25 kcal"),
    mk("Evening","4:30 PM","☕","Tea + poha chivda (homemade)","1 cup tea + 35g chivda","~155","SWAP: Tea + roasted peanuts (25g) ~140 kcal","Homemade thin poha chivda — not store bought"),
    mk("Dinner","7:30 PM","🌙","2 roti + mix veg (lauki-tori-tinda)","2 roti + 1.5 katori sabzi","~350","SWAP: Tori sabzi + 2 roti + raita ~360 kcal","Triple gourd combo = coolest dinner","~12g"),
  ]},
  { day:"Saturday", date:"11 Apr", totalCal:"~2380", meals: [
    mk("Pre-Workout","5:30 AM","🏋️","Soaked almonds + walnut","5+1","~80","OR banana"),
    mk("Breakfast","7:30 AM","🍳","Ragi porridge + almonds + banana","1.5 katori porridge + 4 almonds + ½ banana","~340","SWAP: Nachni satva + dry fruits ~330 kcal","Ensure — Ragi = calcium + skin glow","~12g"),
    mk("Mid-Morning","10:30 AM","🍉","Watermelon + mint","1.5 cups","~75","SWAP: Coconut water ~45 kcal"),
    mk("Lunch","12:30 PM","🍛","2 roti + sambar + pumpkin sabzi + salad + curd","2 roti + 1 katori + 1 katori + salad + 150g curd","~520","SWAP: 2 roti + dal + bhindi + raita","Mango 100g","~16g"),
    mk("Cool Drink","3:00 PM","🧊","Kokum sharbat","1 glass","~40","SWAP: Chaas ~45 kcal"),
    mk("Evening","4:30 PM","☕","Tea + kurmura bhel + onion + lemon","1 cup tea + small bowl","~130","SWAP: Tea + sprouts chaat ~140 kcal","Bhel = fibre + tangy, zero oil"),
    mk("Dinner","7:30 PM","🌙","Soup + paneer bhurji (small) + salad","1 bowl soup + 60g paneer + cucumber","~320","SWAP: Grilled paneer + salad + raita ~310 kcal","","~18g"),
  ]},
  { day:"Sunday", date:"12 Apr", totalCal:"~2200", meals: [
    mk("Pre-Workout","5:30 AM","🏋️","Almonds + walnut OR banana","5+1","~80","Rest day optional"),
    mk("Breakfast","9:00 AM","🍳","Masala dosa + chutney + sambar","1 dosa + chutney + sambar","~340","SWAP: Poha + sprouts ~330 kcal","Ensure","~13g"),
    mk("Mid-Morning","11:00 AM","🍉","Fruit plate — papaya + watermelon","1 cup mixed","~70","SWAP: Coconut water + almonds ~75 kcal"),
    mk("Lunch","12:30 PM","🍛","Home thali — 2 roti + dal + sabzi + curd + mango","Standard portions","~500","SWAP: Curd + 2 roti + sabzi","","~16g"),
    mk("Cool Drink","3:00 PM","🧊","Thandai (cold, no sugar — jaggery)","1 glass","~70","SWAP: Watermelon juice + sabja ~50 kcal"),
    mk("Evening","4:30 PM","☕","Tea + makhana + peanuts","1 cup tea + 20g each","~140","SWAP: Tea + homemade namkeen ~130 kcal"),
    mk("Dinner","7:00 PM","🌙","Early — dal soup + salad","1 big bowl + salad","~240","SWAP: Lauki soup + small paneer ~270 kcal","","~12g"),
  ]},
];

// Week 3 & 4 follow same patterns with rotation
const W3 = [
  { day:"Monday", date:"13 Apr", totalCal:"~2430", meals: [
    mk("Pre-Workout","5:30 AM","🏋️","Soaked almonds + walnut","5+1","~80","OR banana"),
    mk("Breakfast","7:30 AM","🍳","Vegetable poha + paneer cubes + lemon","1.5 cup poha + 40g paneer","~360","SWAP: Upma + sprouted moong ~340 kcal","Ensure","~16g"),
    mk("Mid-Morning","10:30 AM","🍉","Papaya + sabja seeds","1 cup + 1 tsp sabja","~75","SWAP: Watermelon 1.5 cups ~75 kcal"),
    mk("Lunch","12:30 PM","🍛","2 roti + dal + parval sabzi + kachumber + curd","Standard portions","~500","SWAP: 2 roti + moong dal + tinda + raita","Mango 100g","~17g"),
    mk("Cool Drink","3:00 PM","🧊","Jaljeera","1 glass","~15","SWAP: Chaas ~45 kcal"),
    mk("Evening","4:30 PM","☕","Tea + roasted chana + jaggery (tiny)","1 cup + 30g chana + 5g gur","~145","SWAP: Tea + sprouts chaat ~140 kcal","Jaggery = iron, not sugar — use tiny piece"),
    mk("Dinner","7:30 PM","🌙","2 roti + paneer capsicum (dry)","2 roti + 80g paneer + capsicum","~410","SWAP: Paneer tikka + soup ~350 kcal","","~20g"),
  ]},
  { day:"Tuesday", date:"14 Apr", totalCal:"~2350", meals: [
    mk("Pre-Workout","5:30 AM","🏋️","Soaked almonds + walnut","5+1","~80","OR banana"),
    mk("Breakfast","7:30 AM","🍳","Besan chilla (2) + mint chutney + curd","2 chilla + chutney + 100g curd","~340","SWAP: Moong dal chilla + chutney ~350","Ensure","~18g"),
    mk("Mid-Morning","10:30 AM","🍉","Coconut water + 4 almonds","250ml + 4 almonds","~75","SWAP: Muskmelon ~35 kcal"),
    mk("Lunch","12:30 PM","🍛","2 roti + chole + tori sabzi + salad + curd","Standard","~540","SWAP: 2 roti + chana dal + lauki + raita","Mango 100g","~20g"),
    mk("Cool Drink","3:00 PM","🧊","Aam panna (jaggery)","1 glass","~60","SWAP: Bael sharbat ~70 kcal"),
    mk("Evening","4:30 PM","☕","Tea + dry roasted peanuts + chana","1 cup + 30g mix","~145","SWAP: Tea + mathri (baked, 2 small) ~150 kcal"),
    mk("Dinner","7:30 PM","🌙","Lauki kofta (baked) + 1 roti","3 kofta + 1 roti + salad","~350","SWAP: Dal + tori sabzi + 1 roti ~330 kcal","","~14g"),
  ]},
  { day:"Wednesday", date:"15 Apr", totalCal:"~2400", meals: [
    mk("Pre-Workout","5:30 AM","🏋️","Soaked almonds + walnut","5+1","~80","OR banana"),
    mk("Breakfast","7:30 AM","🍳","Oats + cold milk + chia + papaya","40g oats + 200ml milk + 1 tsp chia + ½ cup papaya","~350","SWAP: Dalia + curd + dry fruits ~340 kcal","Ensure — Oats 1x this week only","~14g"),
    mk("Mid-Morning","10:30 AM","🍉","Watermelon","1.5 cups","~75","SWAP: Pineapple + black pepper ~60 kcal"),
    mk("Lunch","12:30 PM","🍛","2 roti + masoor dal + tinda + salad + curd","Standard","~490","SWAP: 2 roti + dal fry + pumpkin + raita","Mango 100g","~17g"),
    mk("Cool Drink","3:00 PM","🧊","Sattu sharbat","2 tbsp + glass","~120","SWAP: Nimbu pani ~20 kcal","~7g"),
    mk("Evening","4:30 PM","☕","Tea + makhana + pumpkin seeds","1 cup + 20g + 10g","~120","SWAP: Tea + kurmura bhel ~130 kcal"),
    mk("Dinner","7:30 PM","🌙","Palak paneer + 1 roti + salad","80g paneer + 1 roti + cucumber","~380","SWAP: Methi paneer + 1 roti ~370 kcal","","~22g"),
  ]},
  { day:"Thursday", date:"16 Apr", totalCal:"~2380", meals: [
    mk("Pre-Workout","5:30 AM","🏋️","Soaked almonds + walnut","5+1","~80","OR banana"),
    mk("Breakfast","7:30 AM","🍳","Uttapam (2) + sambar + chutney","2 uttapam + sambar + chutney","~360","SWAP: Dosa (2) + sambar ~350 kcal","Ensure","~13g"),
    mk("Mid-Morning","10:30 AM","🍉","Papaya + turmeric","1 cup + pinch","~65","SWAP: Carrot-beet juice ~80 kcal"),
    mk("Lunch","12:30 PM","🍛","2 roti + rajma + pumpkin sabzi + curd + salad","Standard","~550","SWAP: 2 roti + lobia + karela + raita","Mango 100g","~22g"),
    mk("Cool Drink","3:00 PM","🧊","Chaas (pudina + jeera)","1 tall glass","~45","SWAP: Kokum sharbat ~40 kcal"),
    mk("Evening","4:30 PM","☕","Tea + chana jor garam + lemon","1 cup + 30g","~130","SWAP: Tea + bhuna chana ~130 kcal"),
    mk("Dinner","7:30 PM","🌙","Moong dal soup + paneer grilled","1 bowl + 70g paneer + salad","~310","SWAP: Tomato soup + cottage cheese ~320 kcal","","~18g"),
  ]},
  { day:"Friday", date:"17 Apr", totalCal:"~2380", meals: [
    mk("Pre-Workout","5:30 AM","🏋️","Soaked almonds + walnut","5+1","~80","OR banana"),
    mk("Breakfast","7:30 AM","🍳","Paneer paratha + curd + pickle","1 paratha + 100g curd + pickle","~380","SWAP: Lauki paratha + curd ~350 kcal","Ensure","~16g"),
    mk("Mid-Morning","10:30 AM","🍉","Coconut water","250ml","~45","SWAP: Watermelon 1 cup ~50 kcal"),
    mk("Lunch","12:30 PM","🍛","2 roti + dal + bhindi + salad + curd","Standard","~500","SWAP: 2 roti + palak dal + tori + raita","Mango 100g","~17g"),
    mk("Cool Drink","3:00 PM","🧊","Nimbu pani + sabja","1 glass + 1 tsp sabja","~25","SWAP: Aam panna ~60 kcal"),
    mk("Evening","4:30 PM","☕","Tea + poha chivda (homemade)","1 cup + 35g","~155","SWAP: Tea + roasted peanuts ~140 kcal"),
    mk("Dinner","7:30 PM","🌙","Tori sabzi + 2 roti + salad","2 roti + 1 katori + cucumber","~340","SWAP: Parval sabzi + 2 roti ~330 kcal","","~12g"),
  ]},
  { day:"Saturday", date:"18 Apr", totalCal:"~2350", meals: [
    mk("Pre-Workout","5:30 AM","🏋️","Soaked almonds + walnut","5+1","~80","OR banana"),
    mk("Breakfast","7:30 AM","🍳","Sabudana khichdi + peanuts + curd","1.5 katori + peanuts + 100g curd","~370","SWAP: Thalipeeth + curd ~350 kcal","Ensure — Thalipeeth = Maharashtrian multigrain","~13g"),
    mk("Mid-Morning","10:30 AM","🍉","Fruit plate — papaya + muskmelon","1 cup mixed","~60","SWAP: Watermelon + mint ~75 kcal"),
    mk("Lunch","12:30 PM","🍛","2 roti + sambar + lauki + salad + curd","Standard","~510","SWAP: 2 roti + dal + tinda + raita","Mango 100g","~15g"),
    mk("Cool Drink","3:00 PM","🧊","Coconut water + sabja","250ml + sabja","~50","SWAP: Chaas ~45 kcal"),
    mk("Evening","4:30 PM","☕","Tea + sprouts chaat + onion + lemon","1 cup + 60g sprouts","~140","SWAP: Tea + til-gur chikki (small) ~120 kcal"),
    mk("Dinner","7:30 PM","🌙","Soup + paneer tikka + salad","1 bowl + 80g + salad","~330","SWAP: Grilled paneer wrap (1 roti) ~350 kcal","","~19g"),
  ]},
  { day:"Sunday", date:"19 Apr", totalCal:"~2200", meals: [
    mk("Pre-Workout","5:30 AM","🏋️","Almonds + walnut OR banana","5+1","~80","Rest day optional"),
    mk("Breakfast","9:00 AM","🍳","Masala dosa / thalipeeth + chutney","1 dosa or 1 thalipeeth + chutney","~340","SWAP: Poha + sprouts ~330 kcal","Ensure","~13g"),
    mk("Mid-Morning","11:00 AM","🍉","Seasonal fruit bowl","1 cup","~70","SWAP: Coconut water ~45 kcal"),
    mk("Lunch","12:30 PM","🍛","Home thali + seasonal fruit","Standard","~500","SWAP: Puri-bhaji (Sunday treat, 2 puri only)","","~16g"),
    mk("Cool Drink","3:00 PM","🧊","Kokum sharbat / thandai","1 glass","~50","SWAP: Watermelon + sabja ~50 kcal"),
    mk("Evening","4:30 PM","☕","Tea + makhana + peanuts","1 cup + 20g each","~140","SWAP: Tea + bhel ~130 kcal"),
    mk("Dinner","7:00 PM","🌙","Early — dal soup + salad","Big bowl + salad","~240","SWAP: Khichdi (small) + curd ~300 kcal","","~12g"),
  ]},
];

const W4 = [
  { day:"Monday", date:"20 Apr", totalCal:"~2420", meals: [
    mk("Pre-Workout","5:30 AM","🏋️","Soaked almonds + walnut","5+1","~80","OR banana"),
    mk("Breakfast","7:30 AM","🍳","Moong dal chilla (2) + mint chutney + curd","2 chilla + chutney + 100g curd","~340","SWAP: Besan chilla + tomato chutney ~340 kcal","Ensure","~18g"),
    mk("Mid-Morning","10:30 AM","🍉","Papaya + sabja","1 cup + 1 tsp","~75","SWAP: Watermelon ~75 kcal"),
    mk("Lunch","12:30 PM","🍛","2 roti + dal + karela sabzi + kachumber + curd","Standard","~500","SWAP: 2 roti + dal + bhindi + raita","Mango 100g","~17g"),
    mk("Cool Drink","3:00 PM","🧊","Sattu sharbat","2 tbsp + glass","~120","SWAP: Aam panna ~60 kcal","~7g"),
    mk("Evening","4:30 PM","☕","Tea + chana jor garam + lemon","1 cup + 30g","~130","SWAP: Tea + bhel puri ~130 kcal"),
    mk("Dinner","7:30 PM","🌙","2 roti + paneer bhurji + cucumber","2 roti + 80g paneer + salad","~420","SWAP: Paneer tikka + lauki soup ~350 kcal","","~21g"),
  ]},
  { day:"Tuesday", date:"21 Apr", totalCal:"~2380", meals: [
    mk("Pre-Workout","5:30 AM","🏋️","Soaked almonds + walnut","5+1","~80","OR banana"),
    mk("Breakfast","7:30 AM","🍳","Vegetable upma + peanuts + sprouts","1.5 katori + 1 tbsp + 50g","~340","SWAP: Poha + sev + peanuts ~350 kcal","Ensure","~14g"),
    mk("Mid-Morning","10:30 AM","🍉","Coconut water","250ml","~45","SWAP: Muskmelon 1 cup ~35 kcal"),
    mk("Lunch","12:30 PM","🍛","2 roti + chole + tori sabzi + salad + curd","Standard","~540","SWAP: 2 roti + chana dal + lauki + raita","Watermelon 1 cup","~20g"),
    mk("Cool Drink","3:00 PM","🧊","Chaas (pudina + jeera)","1 tall glass","~45","SWAP: Nimbu pani ~20 kcal"),
    mk("Evening","4:30 PM","☕","Tea + kurmura bhel + onion + lemon","1 cup + small bowl","~130","SWAP: Tea + roasted makhana ~100 kcal"),
    mk("Dinner","7:30 PM","🌙","Masoor dal + tinda sabzi","1 katori + 1 katori","~280","SWAP: Moong dal + parval sabzi ~290 kcal","No-roti dinner = ultra light","~15g"),
  ]},
  { day:"Wednesday", date:"22 Apr", totalCal:"~2400", meals: [
    mk("Pre-Workout","5:30 AM","🏋️","Soaked almonds + walnut","5+1","~80","OR banana"),
    mk("Breakfast","7:30 AM","🍳","Ragi dosa (2) + peanut chutney + curd","2 dosa + chutney + 100g curd","~350","SWAP: Jowar roti + chutney + curd ~340 kcal","Ensure","~15g"),
    mk("Mid-Morning","10:30 AM","🍉","Papaya","1 cup","~65","SWAP: Pineapple + black pepper ~60 kcal"),
    mk("Lunch","12:30 PM","🍛","2 roti + dal fry + pumpkin sabzi + salad + curd","Standard","~510","SWAP: 2 roti + sambar + bhindi + raita","Mango 100g","~17g"),
    mk("Cool Drink","3:00 PM","🧊","Jaljeera","1 glass","~15","SWAP: Kokum sharbat ~40 kcal"),
    mk("Evening","4:30 PM","☕","Tea + sprouts chaat + lemon","1 cup + 60g sprouts","~140","SWAP: Tea + dry roasted peanuts ~140 kcal"),
    mk("Dinner","7:30 PM","🌙","Paneer tikka + tomato soup","80g paneer + 1 bowl soup + salad","~380","SWAP: Grilled paneer + lauki soup ~350 kcal","","~20g"),
  ]},
  { day:"Thursday", date:"23 Apr", totalCal:"~2380", meals: [
    mk("Pre-Workout","5:30 AM","🏋️","Soaked almonds + walnut","5+1","~80","OR banana"),
    mk("Breakfast","7:30 AM","🍳","Idli (3) + sambar + chutney","3 idli + sambar + chutney","~360","SWAP: Dosa (2) + sambar ~350 kcal","Ensure","~13g"),
    mk("Mid-Morning","10:30 AM","🍉","Muskmelon + black salt","1 cup","~35","SWAP: Watermelon ~75 kcal"),
    mk("Lunch","12:30 PM","🍛","2 roti + rajma + lauki sabzi + salad + curd","Standard","~550","SWAP: 2 roti + lobia + tori + raita","Mango 100g","~22g"),
    mk("Cool Drink","3:00 PM","🧊","Bael sharbat (jaggery)","1 glass","~70","SWAP: Chaas ~45 kcal"),
    mk("Evening","4:30 PM","☕","Tea + roasted chana + tiny gur","1 cup + 30g + 5g","~145","SWAP: Tea + sing bhujia ~140 kcal"),
    mk("Dinner","7:30 PM","🌙","Veg khichdi + curd + papad","1.5 katori + 100g curd + 1 papad","~350","SWAP: Dalia khichdi + raita ~340 kcal","","~14g"),
  ]},
  { day:"Friday", date:"24 Apr", totalCal:"~2380", meals: [
    mk("Pre-Workout","5:30 AM","🏋️","Soaked almonds + walnut","5+1","~80","OR banana"),
    mk("Breakfast","7:30 AM","🍳","Thalipeeth + curd + pickle","1 thalipeeth + 100g curd + pickle","~340","SWAP: Besan chilla + curd ~340 kcal","Ensure — Thalipeeth = Pune special multigrain","~14g"),
    mk("Mid-Morning","10:30 AM","🍉","Watermelon + mint","1.5 cups","~75","SWAP: Coconut water ~45 kcal"),
    mk("Lunch","12:30 PM","🍛","2 roti + palak dal + parval + salad + curd","Standard","~500","SWAP: 2 roti + moong dal + tinda + raita","Mango 100g","~18g"),
    mk("Cool Drink","3:00 PM","🧊","Coconut water + sabja","250ml + sabja","~50","SWAP: Sattu sharbat ~120 kcal"),
    mk("Evening","4:30 PM","☕","Tea + poha chivda (homemade)","1 cup + 35g","~155","SWAP: Tea + mathri (baked, 2) ~150 kcal"),
    mk("Dinner","7:30 PM","🌙","2 roti + mix veg (lauki-tori-tinda)","2 roti + 1.5 katori sabzi","~350","SWAP: Dal + sabzi (no roti) ~290 kcal","","~12g"),
  ]},
  { day:"Saturday", date:"25 Apr", totalCal:"~2370", meals: [
    mk("Pre-Workout","5:30 AM","🏋️","Soaked almonds + walnut","5+1","~80","OR banana"),
    mk("Breakfast","7:30 AM","🍳","Ragi porridge + almonds + banana","1.5 katori + 4 almonds + ½ banana","~340","SWAP: Nachni satva + dry fruits ~330 kcal","Ensure","~12g"),
    mk("Mid-Morning","10:30 AM","🍉","Papaya + turmeric","1 cup + pinch","~65","SWAP: Fruit plate ~70 kcal"),
    mk("Lunch","12:30 PM","🍛","2 roti + sambar + bhindi + salad + curd","Standard","~520","SWAP: 2 roti + dal + pumpkin + raita","Mango 100g","~16g"),
    mk("Cool Drink","3:00 PM","🧊","Aam panna (jaggery)","1 glass","~60","SWAP: Nimbu pani + sabja ~25 kcal"),
    mk("Evening","4:30 PM","☕","Tea + bhel puri (homemade)","1 cup + small bowl","~130","SWAP: Tea + sprouts chaat ~140 kcal"),
    mk("Dinner","7:30 PM","🌙","Soup + paneer bhurji + salad","1 bowl + 70g paneer + cucumber","~330","SWAP: Grilled paneer + raita ~310 kcal","","~18g"),
  ]},
  { day:"Sunday", date:"26 Apr", totalCal:"~2200", meals: [
    mk("Pre-Workout","5:30 AM","🏋️","Almonds + walnut OR banana","5+1","~80","Rest day optional"),
    mk("Breakfast","9:00 AM","🍳","Poha / dosa / thalipeeth","1 serving","~340","SWAP: Besan chilla + curd ~340 kcal","Ensure","~13g"),
    mk("Mid-Morning","11:00 AM","🍉","Seasonal fruit bowl + sabja","1 cup + sabja","~70","SWAP: Coconut water ~45 kcal"),
    mk("Lunch","12:30 PM","🍛","Home thali + seasonal fruit","Standard","~500","SWAP: Simple dal + sabzi + 2 roti + curd","","~16g"),
    mk("Cool Drink","3:00 PM","🧊","Thandai (jaggery, not sugar)","1 glass","~70","SWAP: Watermelon juice + sabja ~50 kcal"),
    mk("Evening","4:30 PM","☕","Tea + makhana + dry fruits","1 cup + 25g mix","~140","SWAP: Tea + bhel ~130 kcal"),
    mk("Dinner","7:00 PM","🌙","Early — moong dal soup + salad","Big bowl + salad","~240","SWAP: Lauki soup + small paneer ~270 kcal","Month finale — ultra light Sunday dinner","~12g"),
  ]},
];

const WEEKS = [
  { week:1, label:"30 Mar – 5 Apr", days: W1 },
  { week:2, label:"6 – 12 Apr", days: W2 },
  { week:3, label:"13 – 19 Apr", days: W3 },
  { week:4, label:"20 – 26 Apr", days: W4 },
];

const RULES = [
  { icon:"🚶‍♂️", text:"Walk 10–15 mins after lunch", detail:"Controls blood sugar, aids digestion, improves skin circulation" },
  { icon:"💧", text:"3.5L water daily (summer)", detail:"Hydration = skin glow — dehydration causes dullness & breakouts" },
  { icon:"🥭", text:"Mango only with lunch (100g max)", detail:"With meal = slower sugar absorption; alone = sugar spike" },
  { icon:"🍬", text:"Zero refined sugar", detail:"Use tiny jaggery only when needed; sugar = inflammation = dull skin" },
  { icon:"😴", text:"Sleep by 10 PM", detail:"Skin repairs between 10pm–2am — non-negotiable for glow" },
  { icon:"🧊", text:"1 cooling drink daily at 3 PM", detail:"Rotate: chaas > aam panna > sattu > jaljeera > nimbu pani" },
  { icon:"🥒", text:"Cucumber + tomato salad with every lunch", detail:"Silica + lycopene = skin elasticity + sun protection" },
  { icon:"☀️", text:"Sunscreen before going out", detail:"SPF 30+ daily — sun damage undoes all dietary benefits" },
  { icon:"🧡", text:"Papaya 3-4x/week mid-morning", detail:"Best single food for skin brightening — papain enzyme" },
  { icon:"🌹", text:"1 tsp gulkand after lunch", detail:"Ayurvedic blood purifier — clears pitta, reduces acne" },
];

const DC=["#22c55e","#3b82f6","#eab308","#f97316","#ef4444","#a855f7","#6b7280"];

export default function App(){
  const[wk,sW]=useState(0);
  const[dy,sD]=useState(0);
  const[tab,sT]=useState("plan");
  const[sw,sS]=useState({});
  useEffect(()=>{sD(0);sS({})},[wk]);
  useEffect(()=>{sS({})},[dy]);
  const w=WEEKS[wk],d=w.days[dy],c=DC[dy];
  const tg=i=>sS(p=>({...p,[i]:!p[i]}));
  const P=({a,cl,children,onClick,sx})=>(<button onClick={onClick} style={{padding:"8px 14px",borderRadius:10,fontSize:11,fontWeight:a?700:500,border:a?`2px solid ${cl}`:"2px solid #1e1e1e",background:a?`${cl}14`:"#131313",color:a?cl:"#555",cursor:"pointer",transition:"all .2s",fontFamily:"inherit",whiteSpace:"nowrap",...sx}}>{children}</button>);
  return(
    <div style={{minHeight:"100vh",background:"#080808",fontFamily:"'Segoe UI','Noto Sans',sans-serif",color:"#e5e5e5",paddingBottom:50}}>
      {/* HEADER */}
      <div style={{background:"linear-gradient(170deg,#1a0f00 0%,#080808 60%)",borderBottom:"1px solid #f59e0b18",padding:"18px 16px 12px"}}>
        <div style={{maxWidth:660,margin:"0 auto"}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <div style={{fontSize:28,lineHeight:1}}>☀️</div>
            <div style={{flex:1}}>
              <div style={{fontSize:9,letterSpacing:4,color:"#f59e0b",fontWeight:800,textTransform:"uppercase"}}>Summer Diet Plan 2026</div>
              <div style={{fontSize:18,fontWeight:700,color:"#fff",marginTop:2}}>30 March – 26 April</div>
              <div style={{fontSize:10,color:"#555",marginTop:2}}>🌿 Vegetarian • Age 42 • DOB: 17 May 1983 • Pune</div>
            </div>
            <div style={{background:"#f59e0b0c",border:"1px solid #f59e0b25",borderRadius:10,padding:"6px 12px",textAlign:"center"}}>
              <div style={{fontSize:8,color:"#777",letterSpacing:1}}>TARGET</div>
              <div style={{fontSize:13,fontWeight:800,color:"#f59e0b"}}>~2400</div>
              <div style={{fontSize:8,color:"#666"}}>KCAL/DAY</div>
            </div>
          </div>
          <div style={{display:"flex",gap:8,marginTop:8,flexWrap:"wrap"}}>
            {[{l:"✨ Skin Glow",cl:"#f59e0b"},{l:"🪶 Feel Light",cl:"#22c55e"},{l:"🚫 Zero Sugar",cl:"#ef4444"},{l:"🌿 No Rice Lunch",cl:"#0ea5e9"}].map((b,i)=><span key={i} style={{fontSize:9,color:b.cl,background:`${b.cl}10`,border:`1px solid ${b.cl}22`,padding:"3px 8px",borderRadius:6,fontWeight:600}}>{b.l}</span>)}
          </div>
        </div>
      </div>

      {/* WEEKS */}
      <div style={{maxWidth:660,margin:"0 auto",padding:"8px 16px 0",display:"flex",gap:5,overflowX:"auto",scrollbarWidth:"none"}}>
        {WEEKS.map((x,i)=><P key={i} a={wk===i} cl="#f59e0b" onClick={()=>sW(i)} sx={{flex:"1 0 auto"}}><div style={{fontSize:8,opacity:.6,marginBottom:1}}>WEEK {x.week}</div><div>{x.label}</div></P>)}
      </div>

      {/* TABS */}
      <div style={{maxWidth:660,margin:"0 auto",padding:"8px 16px 4px",display:"flex",gap:5,overflowX:"auto",scrollbarWidth:"none"}}>
        {[{id:"plan",l:"📋 Plan"},{id:"skin",l:"✨ Skin Foods"},{id:"fruits",l:"🥭 Fruits"},{id:"vegs",l:"🥬 Vegs"},{id:"drinks",l:"🧊 Drinks"},{id:"super",l:"⚡ Super"},{id:"rules",l:"✅ Rules"}].map(t=><P key={t.id} a={tab===t.id} cl={c} onClick={()=>sT(t.id)}>{t.l}</P>)}
      </div>

      <div style={{maxWidth:660,margin:"0 auto",padding:"6px 16px 0"}}>

        {/* DAILY PLAN */}
        {tab==="plan"&&<>
          <div style={{display:"flex",gap:4,marginBottom:10,overflowX:"auto",scrollbarWidth:"none"}}>
            {w.days.map((x,i)=><P key={i} a={dy===i} cl={DC[i]} onClick={()=>sD(i)}><div style={{fontSize:8,opacity:.6}}>{x.date}</div><div>{x.day.slice(0,3)}</div></P>)}
          </div>
          <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:8}}>
            <div style={{width:5,height:28,borderRadius:3,background:c}}/>
            <div style={{flex:1}}><div style={{fontSize:16,fontWeight:700,color:"#fff"}}>{d.day}</div><div style={{fontSize:10,color:"#666"}}>{d.date} 2026 — Week {w.week}</div></div>
            <div style={{background:`${c}10`,border:`1px solid ${c}25`,borderRadius:8,padding:"5px 10px",textAlign:"center"}}>
              <div style={{fontSize:8,color:"#777"}}>TOTAL</div>
              <div style={{fontSize:13,fontWeight:800,color:c}}>{d.totalCal}</div>
              <div style={{fontSize:7,color:"#555"}}>KCAL</div>
            </div>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:6}}>
            {d.meals.map((m,i)=>{const cool=m.slot==="Cool Drink";const ac=cool?"#0ea5e9":c;const sv=sw[i];return(
              <div key={i} style={{background:cool?"#0ea5e906":"#111",borderRadius:12,border:`1px solid ${cool?"#0ea5e920":"#1c1c1c"}`,overflow:"hidden",animation:`fd .25s ease ${i*.03}s both`}}>
                <div style={{padding:"11px 12px",display:"flex",alignItems:"flex-start",gap:8,position:"relative"}}>
                  <div style={{position:"absolute",left:0,top:0,bottom:0,width:3,background:ac,opacity:.5}}/>
                  <div style={{fontSize:18,width:24,textAlign:"center",flexShrink:0,marginTop:1}}>{m.icon}</div>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:4,flexWrap:"wrap",gap:3}}>
                      <span style={{fontSize:11,fontWeight:700,color:"#ccc"}}>{m.slot}</span>
                      <div style={{display:"flex",gap:4,alignItems:"center",flexWrap:"wrap"}}>
                        {m.cal&&<span style={{fontSize:8,color:"#f59e0b",background:"#f59e0b10",padding:"2px 5px",borderRadius:4,fontWeight:700}}>{m.cal} kcal</span>}
                        {m.prot&&<span style={{fontSize:8,color:"#22c55e",background:"#22c55e10",padding:"2px 5px",borderRadius:4,fontWeight:600}}>P:{m.prot}</span>}
                        <span style={{fontSize:8,color:ac,background:`${ac}0e`,padding:"2px 6px",borderRadius:4,fontWeight:600}}>{m.time}</span>
                      </div>
                    </div>
                    <div style={{fontSize:12,color:"#bbb",lineHeight:1.5}}>{m.main}</div>
                    {m.qty&&<div style={{fontSize:10,color:"#777",marginTop:3}}>📏 {m.qty}</div>}
                    {m.note&&<div style={{fontSize:10,color:"#666",marginTop:3,fontStyle:"italic"}}>💡 {m.note}</div>}
                    {m.swap&&<button onClick={()=>tg(i)} style={{marginTop:5,fontSize:9,color:ac,background:`${ac}0a`,border:`1px solid ${ac}20`,borderRadius:5,padding:"2px 8px",cursor:"pointer",fontFamily:"inherit",fontWeight:600}}>{sv?"▾ Hide":"⇄ Swap"}</button>}
                  </div>
                </div>
                {sv&&m.swap&&<div style={{background:`${ac}06`,borderTop:`1px solid ${ac}12`,padding:"8px 12px 8px 44px"}}><div style={{fontSize:10.5,color:"#999"}}><span style={{color:ac,fontWeight:600}}>↻</span> {m.swap}</div></div>}
              </div>
            )})}
          </div>
          <div style={{marginTop:10,background:"#0d0d0d",borderRadius:10,border:"1px solid #1a1a1a",padding:"10px",display:"flex",justifyContent:"space-around"}}>
            {[{l:"Total Cal",v:d.totalCal,cl:"#f59e0b"},{l:"Protein",v:"~70–85g",cl:"#22c55e"},{l:"Water",v:"3.5L",cl:"#0ea5e9"},{l:"Meals",v:"7 slots",cl:"#a855f7"}].map((s,i)=><div key={i} style={{textAlign:"center"}}><div style={{fontSize:13,fontWeight:800,color:s.cl}}>{s.v}</div><div style={{fontSize:8,color:"#555",marginTop:1}}>{s.l}</div></div>)}
          </div>
        </>}

        {/* SKIN FOODS */}
        {tab==="skin"&&<div>
          <div style={{fontSize:12,fontWeight:700,color:"#f59e0b",marginBottom:8}}>✨ Top 10 Foods for Skin Glow & Complexion</div>
          <div style={{fontSize:10,color:"#888",marginBottom:10,lineHeight:1.5}}>These foods are integrated throughout your 4-week plan. Consistency for 30 days will show visible improvement in skin texture, brightness, and reduced pigmentation.</div>
          {SKIN_FOODS.map((s,i)=><div key={i} style={{background:"#111",borderRadius:12,border:"1px solid #1c1c1c",padding:"12px 14px",marginBottom:7,animation:`fd .25s ease ${i*.04}s both`}}>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}><span style={{fontSize:22}}>{s.emoji}</span><div style={{fontSize:12,fontWeight:700,color:"#ddd"}}>{s.name}</div></div>
            <div style={{fontSize:11,color:"#999",lineHeight:1.5}}>{s.benefit}</div>
            <div style={{fontSize:10,color:"#f59e0b",marginTop:4}}>📌 {s.usage}</div>
          </div>)}
        </div>}

        {/* FRUITS */}
        {tab==="fruits"&&<div>
          <div style={{fontSize:12,fontWeight:700,color:"#f59e0b",marginBottom:8}}>🥭 Summer Fruits — Pune (April–June)</div>
          {SUMMER_FRUITS.map((f,i)=><div key={i} style={{background:"#111",borderRadius:12,border:"1px solid #1c1c1c",padding:"12px 14px",marginBottom:7,animation:`fd .25s ease ${i*.04}s both`}}>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}><span style={{fontSize:22}}>{f.emoji}</span><div style={{flex:1}}><div style={{fontSize:12,fontWeight:700,color:"#ddd"}}>{f.name}</div><div style={{fontSize:9,color:"#666"}}>{f.season} • {f.cal}</div></div></div>
            <div style={{fontSize:11,color:"#999",lineHeight:1.4}}>✦ {f.benefit}</div>
            <div style={{fontSize:10,color:"#0ea5e9",marginTop:3}}>⏰ {f.bestTime}</div>
            <div style={{fontSize:10,color:"#777",marginTop:3,fontStyle:"italic"}}>💡 {f.tip}</div>
          </div>)}
        </div>}

        {/* VEGS */}
        {tab==="vegs"&&<div>
          <div style={{fontSize:12,fontWeight:700,color:"#22c55e",marginBottom:8}}>🥬 Summer Vegetables — Cooling & Light</div>
          {SUMMER_VEGS.map((v,i)=><div key={i} style={{background:"#111",borderRadius:12,border:"1px solid #1c1c1c",padding:"12px 14px",marginBottom:7,animation:`fd .25s ease ${i*.04}s both`}}>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}><span style={{fontSize:20}}>{v.emoji}</span><div style={{fontSize:12,fontWeight:700,color:"#ddd"}}>{v.name}</div></div>
            <div style={{fontSize:11,color:"#999",lineHeight:1.4}}>✦ {v.benefit}</div>
            <div style={{fontSize:10,color:"#22c55e",marginTop:3}}>🍳 {v.cooking}</div>
            <div style={{fontSize:10,color:"#777",marginTop:3,fontStyle:"italic"}}>💡 {v.tip}</div>
          </div>)}
        </div>}

        {/* DRINKS */}
        {tab==="drinks"&&<div>
          <div style={{fontSize:12,fontWeight:700,color:"#0ea5e9",marginBottom:8}}>🧊 Summer Cooling Drinks (No Sugar)</div>
          {SUMMER_DRINKS.map((x,i)=><div key={i} style={{background:"#0ea5e906",borderRadius:12,border:"1px solid #0ea5e918",padding:"12px 14px",marginBottom:7,animation:`fd .25s ease ${i*.04}s both`}}>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}><span style={{fontSize:22}}>{x.emoji}</span><div style={{flex:1}}><div style={{fontSize:12,fontWeight:700,color:"#ddd"}}>{x.name}</div><div style={{fontSize:9,color:"#0ea5e9"}}>{x.cal} • P:{x.protein}</div></div><span style={{fontSize:8,color:"#777",background:"#fff08",padding:"2px 6px",borderRadius:4}}>⏰ {x.bestTime}</span></div>
            <div style={{fontSize:11,color:"#999",lineHeight:1.4}}>✦ {x.benefit}</div>
            <div style={{fontSize:10,color:"#666",marginTop:4,background:"#ffffff05",borderRadius:6,padding:"6px 8px"}}>📝 {x.recipe}</div>
          </div>)}
          <div style={{marginTop:12,background:"#0ea5e908",borderRadius:12,border:"1px solid #0ea5e918",padding:"14px"}}>
            <div style={{fontSize:11,fontWeight:700,color:"#0ea5e9",marginBottom:8}}>💧 Hydration Schedule</div>
            {[{t:"5:30 AM",d:"Warm water + lemon (1 glass)",i:"🌅"},{t:"7:30 AM",d:"Water with breakfast (1–2 glasses)",i:"🍳"},{t:"10:30 AM",d:"Coconut water / fruit / water",i:"🥥"},{t:"12:00 PM",d:"Water before lunch (1 glass)",i:"💧"},{t:"1:00 PM",d:"Chaas / buttermilk with lunch",i:"🥛"},{t:"3:00 PM",d:"Cooling drink — see daily plan",i:"🧊"},{t:"5:00 PM",d:"Water / nimbu pani (1 glass)",i:"🍋"},{t:"7:00 PM",d:"Water before dinner (1 glass)",i:"💧"},{t:"9:00 PM",d:"Small glass — not too much before bed",i:"🌙"}].map((h,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:8,marginBottom:5}}><span style={{fontSize:12}}>{h.i}</span><span style={{fontSize:9,color:"#0ea5e9",fontWeight:600,minWidth:50}}>{h.t}</span><div style={{width:4,height:4,borderRadius:"50%",background:"#0ea5e9",opacity:.4}}/><span style={{fontSize:10,color:"#888"}}>{h.d}</span></div>)}
          </div>
        </div>}

        {/* SUPERFOODS */}
        {tab==="super"&&<div>
          <div style={{fontSize:12,fontWeight:700,color:"#f59e0b",marginBottom:8}}>⚡ Ayurvedic Superfoods for Summer</div>
          {SUPERFOODS.map((s,i)=><div key={i} style={{background:"#111",borderRadius:12,border:"1px solid #1c1c1c",padding:"12px 14px",marginBottom:7,animation:`fd .25s ease ${i*.04}s both`}}>
            <div style={{fontSize:12,fontWeight:700,color:"#ddd",marginBottom:3}}>✦ {s.name}</div>
            <div style={{fontSize:11,color:"#999",lineHeight:1.4}}>{s.benefit}</div>
            <div style={{fontSize:10,color:"#f59e0b",marginTop:3}}>🍽️ {s.usage}</div>
          </div>)}
          <div style={{marginTop:12,background:"#f59e0b08",borderRadius:12,border:"1px solid #f59e0b18",padding:"14px"}}>
            <div style={{fontSize:11,fontWeight:700,color:"#f59e0b",marginBottom:8}}>☀️ Pune Summer Tips</div>
            {["Sabja seeds in every drink — 1 tsp soaked","Keep kairi chutney in fridge — daily with lunch","Coconut oil on head before sleep — natural cooling","Gourds for dinner — lauki, tori, tinda = lightest","Onion-kachumber with lime at every lunch","Curd rice on overheated days — instant relief","Matka water > fridge water — Ayurvedic cooling","Cotton clothes only — synthetic traps heat","Avoid tea empty stomach — always with snack","Haldi doodh 2x/week before bed — skin repair"].map((t,i)=><div key={i} style={{fontSize:10,color:"#888",lineHeight:1.5,display:"flex",gap:6,marginBottom:2}}><span style={{color:"#f59e0b",flexShrink:0}}>{i+1}.</span><span>{t}</span></div>)}
          </div>
        </div>}

        {/* RULES */}
        {tab==="rules"&&<div>
          <div style={{fontSize:12,fontWeight:700,color:"#22c55e",marginBottom:8}}>✅ Daily Non-Negotiables — Summer 2026</div>
          {RULES.map((r,i)=><div key={i} style={{background:"#111",borderRadius:12,border:"1px solid #1c1c1c",padding:"12px 14px",marginBottom:7,animation:`fd .25s ease ${i*.04}s both`}}>
            <div style={{display:"flex",alignItems:"center",gap:10}}><span style={{fontSize:22,flexShrink:0}}>{r.icon}</span><div><div style={{fontSize:12,fontWeight:700,color:"#ccc"}}>{r.text}</div><div style={{fontSize:10,color:"#666",marginTop:2}}>{r.detail}</div></div></div>
          </div>)}
          <div style={{marginTop:12,background:"#ef444408",borderRadius:12,border:"1px solid #ef444418",padding:"14px"}}>
            <div style={{fontSize:11,fontWeight:700,color:"#ef4444",marginBottom:8}}>🚫 Strictly Avoid</div>
            {["Refined sugar in any form — use tiny jaggery if needed","Deep fried food — samosa, pakora, vada pav","Cold drinks, soda, packaged juice — zero nutrition","Ice cream & kulfi — dairy + sugar = acne + mucus","Bakery items — maida, trans fats, empty calories","Spicy food at night — acidity, bad sleep, dull skin","Mango at night — body heat, skin breakouts","Heavy dal (rajma/chole) at dinner — hard to digest","Packaged namkeen — preservatives, excess salt","Rice at lunch — replaced with extra roti + more sabzi"].map((t,i)=><div key={i} style={{fontSize:10,color:"#999",lineHeight:1.5,display:"flex",gap:6,marginBottom:2}}><span style={{color:"#ef4444",flexShrink:0}}>✗</span><span>{t}</span></div>)}
          </div>
        </div>}
      </div>
      <style>{`@keyframes fd{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}button{font-family:inherit}::-webkit-scrollbar{display:none}`}</style>
    </div>
  );
}
