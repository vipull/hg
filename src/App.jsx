import { useState, useEffect, useCallback, useRef, useMemo } from "react";

// ═══ DATA ═══
const SKIN=[{n:"Amla",e:"🟢",b:"Highest vitamin C — collagen & brightening",u:"1 murabba or 1 tsp powder daily"},{n:"Aloe Vera",e:"🌿",b:"Hydration, acne scars, anti-aging",u:"2 tbsp juice 3x/week"},{n:"Papaya",e:"🧡",b:"Papain clears dead skin, glow",u:"1 cup 3-4x/week"},{n:"Cucumber+Tomato",e:"🥒",b:"Silica + lycopene",u:"Kachumber every lunch"},{n:"Curd",e:"🥛",b:"Probiotics = clear skin",u:"150g daily"},{n:"Sabja Seeds",e:"🌱",b:"Omega-3, detox",u:"1 tsp in drink"},{n:"Carrot+Beet",e:"🥕",b:"Beta-carotene, purifier",u:"3x/week"},{n:"Gulkand",e:"🌹",b:"Pitta coolant, acne reducer",u:"1 tsp after lunch"},{n:"Turmeric",e:"💛",b:"Anti-inflammatory",u:"In dal + haldi doodh"},{n:"Almonds",e:"🥜",b:"Vitamin E",u:"5-6 peeled daily"}];
const FRU=[{n:"Mango",e:"🥭",b:"Vitamin A&C",t:"Lunch only",c:"70",tip:"Soak 30min",s:"Apr–Jun"},{n:"Watermelon",e:"🍉",b:"92% water",t:"10:30 AM",c:"30",tip:"Eat alone",s:"Mar–Jun"},{n:"Muskmelon",e:"🍈",b:"Potassium",t:"Morning",c:"34",tip:"Black salt",s:"Apr–Jun"},{n:"Papaya",e:"🧡",b:"Skin brightener",t:"Morning",c:"43",tip:"3-4x/week",s:"Year"},{n:"Jamun",e:"🫐",b:"Blood sugar",t:"3 PM",c:"62",tip:"No milk nearby",s:"May–Jul"},{n:"Pineapple",e:"🍍",b:"Bromelain",t:"Mid-morning",c:"50",tip:"Pepper+salt",s:"Mar–Jul"},{n:"Bael",e:"🍐",b:"Gut detox",t:"Sharbat",c:"137",tip:"Jaggery only",s:"Apr–Jun"},{n:"Kokum",e:"🟣",b:"Anti-inflammatory",t:"With lunch",c:"60",tip:"Sol kadhi",s:"Apr–Jun"}];
const VEG=[{n:"Lauki",e:"🫒",b:"96% water, cooling",c:"Sabzi, kofta, juice",tip:"Morning juice"},{n:"Tori",e:"🥬",b:"Blood purifier",c:"Sabzi, dal+tori",tip:"Don't peel fully"},{n:"Karela",e:"🌶️",b:"Blood sugar",c:"Stuffed, sabzi",tip:"Salt soak"},{n:"Cucumber",e:"🥒",b:"Silica, hydrating",c:"Kachumber, raita",tip:"Every meal"},{n:"Pumpkin",e:"🎃",b:"Beta-carotene",c:"Sabzi, soup",tip:"Roast seeds"},{n:"Bhindi",e:"🌿",b:"Fibre, folate",c:"Dry sabzi",tip:"Wash→cut"},{n:"Parval",e:"🟢",b:"Low cal",c:"Dry sabzi",tip:"With moong dal"},{n:"Tinda",e:"⚪",b:"Ultra light",c:"Sabzi",tip:"Jeera-hing"}];
const DRK=[{n:"Chaas",e:"🥛",b:"Probiotics",r:"Curd+water+jeera+mint",c:"45",p:"3g"},{n:"Aam Panna",e:"🥭",b:"Heatstroke prevention",r:"Raw mango+jaggery",c:"60",p:"1g"},{n:"Sattu",e:"💪",b:"Protein",r:"Sattu+water+lemon",c:"120",p:"7g"},{n:"Jaljeera",e:"🌿",b:"Digestive",r:"Jeera+pudina",c:"15",p:"1g"},{n:"Nimbu Pani",e:"🍋",b:"Vitamin C",r:"Lemon+water+salt",c:"20",p:"0g"},{n:"Coconut Water",e:"🥥",b:"Electrolytes",r:"Fresh coconut",c:"45",p:"2g"},{n:"Kokum",e:"🟣",b:"Anti-inflammatory",r:"Kokum+water",c:"40",p:"1g"},{n:"Sabja Water",e:"🌱",b:"Cooling",r:"Sabja+water+lemon",c:"25",p:"2g"}];
const SUP=[{n:"Sabja Seeds",b:"Cooling, omega-3",u:"1 tsp daily"},{n:"Gulkand",b:"Pitta coolant",u:"After lunch"},{n:"Sattu",b:"Protein 20g/100g",u:"Sharbat"},{n:"Kairi",b:"Vitamin C",u:"Panna, chutney"},{n:"Pudina",b:"Cooling",u:"Chutney, chaas"},{n:"Amla",b:"Highest vit C",u:"Murabba"},{n:"Saunf",b:"Anti-bloating",u:"After meals"},{n:"Aloe Vera",b:"Hydration",u:"Juice 3x/week"}];
const RUL=[{i:"🚶",t:"Walk 15 min after lunch",d:"Blood sugar + skin"},{i:"💧",t:"3.5L water daily",d:"Hydration = glow"},{i:"🥭",t:"Mango with lunch only",d:"100g max"},{i:"🚫",t:"Zero refined sugar",d:"Jaggery if needed"},{i:"😴",t:"Sleep by 10 PM",d:"Skin repairs 10–2am"},{i:"🧊",t:"Cooling drink 3 PM",d:"Rotate weekly"},{i:"🥒",t:"Cucumber salad every lunch",d:"Silica"},{i:"☀️",t:"Sunscreen SPF 30+",d:"Daily"},{i:"🧡",t:"Papaya 3-4x/week",d:"Brightening"},{i:"🌹",t:"Gulkand after lunch",d:"Blood purifier"}];

const SW={
pw:["5 almonds + 1 walnut (~80)","1 small banana (~90)","4 almonds + 2 cashews (~85)","1 tbsp chia + water (~60)","5 almonds + 3 raisins (~80)","½ banana + 3 almonds (~85)","1 small apple (~70)","4 walnut halves (~80)","1 tbsp peanut butter (~95)","2 dates + 3 almonds (~90)","1 small pear (~60)","Trail mix (~100)","5 almonds + 1 fig (~85)","Mixed seeds 1 tbsp (~80)","½ cup milk + 4 almonds (~110)"],
bf:["Moong dal chilla (2) + chutney + curd (~340,P:18g)","Besan chilla (2) + chutney + curd (~340,P:18g)","Poha + peanuts + sprouts (~350,P:14g)","Upma + chutney + sprouts (~340,P:13g)","Ragi dosa (2) + chutney + curd (~350,P:14g)","Idli (3) + sambar + chutney (~360,P:13g)","Uttapam (2) + sambar (~360,P:13g)","Thalipeeth + curd (~340,P:14g)","Dalia + curd (~330,P:13g)","Sabudana khichdi + curd (~370,P:12g)"],
mm:["Papaya + sabja (~75)","Watermelon 1.5 cups (~75)","Coconut water (~45)","Muskmelon + black salt (~35)","Pineapple + pepper (~60)","Papaya + turmeric (~65)","Coconut water + almonds (~75)","Carrot-beet juice (~80)","Fruit chaat (~70)","Watermelon + sabja (~80)"],
lu:["2 roti + Palak Paneer + salad + curd (~550,P:20g)","2 roti + Daal Bhaji + kachumber + curd (~480,P:16g)","2 roti + Cabbage-Besan + dal + curd (~490,P:15g)","2 roti + Gobi sabzi + dal + curd (~500,P:15g)","2 roti + Paneer Butter Masala + salad (~580,P:22g)","2 roti + Besan-Capsicum + dal + curd (~490,P:16g)","2 roti + Chana Masala + salad + curd (~540,P:20g)","2 roti + Paneer Bhurji + curd (~550,P:22g)","2 roti + Jeera Aloo + dal + curd (~510,P:14g)","2 roti + Masala Bhindi + dal + curd (~500,P:16g)","2 roti + Chana Palak + salad + curd (~530,P:19g)","2 roti + Kadhi Pakora + salad (~520,P:14g)","2 roti + Aloo Gobi + dal + curd (~510,P:14g)","2 roti + Methi Matar Malai + curd (~540,P:16g)","2 roti + Malai Kofta + curd (~570,P:16g)","2 roti + Matar Paneer + curd (~560,P:22g)","2 roti + Aloo Chana Masala + curd (~530,P:18g)","2 roti + Dahi Shev Bhaji (~490,P:13g)","2 roti + Shev Bhaji + dal + curd (~500,P:14g)","2 roti + Lauki Chana Dal + curd (~500,P:17g)","2 roti + Rajma Masala + curd (~560,P:22g)","2 roti + Paneer Do Pyaza + curd (~550,P:20g)","Poori (3) + Bhaji + curd (~560,P:14g)","2 roti + Dum Aloo + dal + curd (~530,P:14g)","2 roti + Dal Makhani + curd (~540,P:18g)","2 roti + Paneer Makhani + salad (~570,P:22g)","2 roti + Green Moong Dal + sabzi + curd (~490,P:18g)","2 roti + Capsicum Masala + dal (~500,P:15g)","2 roti + Dahi Bhindi + curd (~490,P:14g)","2 roti + Baingan Bharta + dal (~500,P:15g)","2 roti + Achari Paneer + curd (~560,P:22g)","2 roti + Veg Korma + curd (~540,P:15g)","2 roti + Lauki Kofta + curd (~520,P:14g)","2 roti + Chawli Masala + curd (~520,P:18g)","2 roti + Kaju Curry + curd (~580,P:16g)","Pasta (wheat) + paneer (~520,P:16g)","2 roti + Soya Chunk Curry (~530,P:24g)","2 roti + Mushroom Matar (~500,P:16g)","2 roti + Bharwa Karela + dal (~510,P:16g)","2 roti + Paneer Tikka Masala + curd (~560,P:24g)","2 roti + Tinda Masala + dal (~490,P:15g)","2 roti + Mix Veg Curry + curd (~510,P:16g)","2 roti + Besan-Taak Curry + curd (~490,P:16g)","2 roti + Palak Dal + tinda + curd (~500,P:17g)","2 roti + Sambar + bhindi + curd (~520,P:16g)","2 roti + Chole + tori + curd (~550,P:20g)","2 roti + Rajma + lauki + curd (~560,P:22g)","2 roti + Moong Dal + bhindi + curd (~530,P:18g)","2 roti + Parval Dry + dal (~480,P:15g)","2 roti + Paneer Tikka + raita (~540,P:22g)"],
cd:["Chaas jeera+pudina (~45)","Aam panna jaggery (~60)","Sattu sharbat (~120,P:7g)","Jaljeera (~15)","Nimbu pani (~20)","Coconut water+sabja (~50)","Kokum sharbat (~40)","Bael sharbat (~70)","Sabja lemon water (~25)","Watermelon juice+sabja (~50)"],
ev:["Green tea + roasted chana (~130)","Tea + makhana + pepper (~100)","Tea + kurmura bhel (~130)","Tea + sprouts chaat (~140)","Tea + bhel puri (~130)","Tea + chana jor garam (~130)","Tea + sing bhujia (~140)","Tea + poha chivda (~155)","Tea + baked mathri (~150)","Tea + til-gur chikki (~120)"],
dn:["2 roti + Paneer Bhurji + cucumber (~420,P:21g)","Lauki soup + paneer tikka (~320,P:18g)","2 roti + Tori + raita (~340,P:12g)","Moong dal + tinda no roti (~280,P:15g)","Palak Paneer + 1 roti (~380,P:22g)","Moong dal cheela (2) (~300,P:18g)","2 roti + Besan-Taak Curry (~360,P:14g)","Paneer Curry + 1 roti (~400,P:20g)","Soup + Paneer Bhurji (~340,P:18g)","2 roti + Mix Veg lauki-tori (~350,P:12g)","2 roti + Daal Bhaji (~340,P:16g)","2 roti + Cabbage-Besan (~330,P:12g)","2 roti + Jeera Aloo + raita (~360,P:10g)","2 roti + Masala Bhindi (~350,P:14g)","2 roti + Aloo Gobi (~360,P:12g)","2 roti + Kadhi Pakora (~380,P:14g)","2 roti + Dahi Bhindi (~340,P:13g)","2 roti + Baingan Bharta (~350,P:12g)","2 roti + Chana Palak (~370,P:18g)","2 roti + Capsicum Masala (~340,P:12g)","2 roti + Green Moong Dal (~320,P:16g)","2 roti + Lauki Chana Dal (~350,P:16g)","2 roti + Shev Bhaji (~360,P:12g)","2 roti + Dahi Shev Bhaji (~350,P:12g)","2 roti + Gobi + dal (~350,P:14g)","2 roti + Achari Paneer (~400,P:20g)","2 roti + Chawli Masala (~370,P:17g)","2 roti + Matar Paneer (~400,P:20g)","2 roti + Soya Chunks (~380,P:22g)","2 roti + Mushroom Matar (~360,P:14g)","Khichdi + curd (~350,P:14g)","Dal + sabzi no roti (~280,P:15g)","2 roti + Dum Aloo (~380,P:12g)","2 roti + Rajma (~400,P:20g)","2 roti + Kaju Curry (~420,P:14g)","2 roti + Lauki Kofta (~370,P:14g)","2 roti + Malai Kofta (~400,P:14g)","2 roti + Paneer Makhani (~420,P:22g)","2 roti + Dal Makhani (~400,P:18g)","Soup + grilled paneer (~300,P:18g)","2 roti + Paneer Do Pyaza (~400,P:20g)","2 roti + Chana Masala (~380,P:18g)","2 roti + Palak Dal (~340,P:16g)","2 roti + Tinda Masala (~330,P:12g)","2 roti + Parval dry (~320,P:14g)","Pasta + salad (~380,P:12g)","2 roti + Bharwa Karela (~350,P:14g)","2 roti + Veg Korma (~380,P:14g)","2 roti + Methi Matar (~360,P:14g)","2 roti + Aloo Chana (~370,P:16g)"],
sd:["Palak Paneer Rice + raita (~520,P:18g)","Paneer Curry + 2 roti (~480,P:22g)","Chole Bhature (2) (~600,P:18g)","Pav Bhaji (2 pav) (~550,P:14g)","Dal Makhani + 2 roti (~500,P:18g)","Paneer Tikka Masala + 2 roti (~520,P:24g)","Kadhi Pakora + 2 roti (~480,P:16g)","Veg Biryani + raita (~530,P:14g)","Paneer Butter Masala + 2 roti (~540,P:22g)","Malai Kofta + 2 roti (~560,P:16g)","Poori (3) + Bhaji (~550,P:14g)","Methi Matar Malai + 2 roti (~520,P:16g)","Dum Aloo + 2 roti (~500,P:14g)","Paneer Makhani + 2 roti (~540,P:22g)","Kaju Curry + 2 roti (~560,P:16g)","Rajma + 2 roti (~520,P:22g)","Achari Paneer + 2 roti (~530,P:22g)","Veg Korma + 2 roti (~520,P:16g)","Palak Paneer + 2 roti (~500,P:22g)","Pasta + paneer + bread (~550,P:18g)"]};

const MI={pw:"🏋️‍♂️",bf:"🥣",mm:"🍉",lu:"🍱",cd:"❄️",ev:"🫖",dn:"🌃",sd:"🌃"};
const ML={pw:"Pre-Workout",bf:"Breakfast",mm:"Mid-Morning",lu:"Lunch",cd:"Cool Drink",ev:"Evening Snack",dn:"Dinner",sd:"Dinner"};
// Time slots in minutes from midnight for next-meal detection
const TM={pw:330,bf:450,mm:630,lu:750,cd:900,ev:990,dn:1170,sd:1200};

const mk=(s,t,main,qty,cal,sk,note,p)=>({s,t,main,qty,cal,sk,note,p});

// ═══ GROCERY EXTRACTION ═══
const GROCERY_MAP = {
  "Palak Paneer": { v:["Spinach (palak) 200g","Paneer 100g","Onion","Tomato","Green chilli","Ginger-garlic"], f:[], g:["Cream 1 tbsp","Oil","Salt","Garam masala"] },
  "Daal Bhaji": { v:["Toor dal 1 cup","Onion","Tomato","Coriander leaves"], f:[], g:["Turmeric","Red chilli","Hing","Oil","Salt"] },
  "Kadhi Pakora": { v:["Besan 1 cup","Curd 2 cups","Onion","Spinach leaves"], f:[], g:["Turmeric","Red chilli","Mustard seeds","Curry leaves","Oil"] },
  "Chana Masala": { v:["Kabuli chana 1 cup","Onion 2","Tomato 2","Ginger-garlic"], f:[], g:["Chana masala powder","Amchur","Oil","Salt","Coriander"] },
  "Rajma Masala": { v:["Rajma 1 cup","Onion 2","Tomato 2","Ginger-garlic"], f:[], g:["Rajma masala","Bay leaf","Oil","Salt","Cream 1 tsp"] },
  "Matar Paneer": { v:["Green peas 1 cup","Paneer 100g","Onion","Tomato","Ginger-garlic"], f:[], g:["Garam masala","Turmeric","Oil","Cream 1 tsp"] },
  "Aloo Gobi": { v:["Cauliflower 1 small","Potato 2","Onion","Tomato","Green chilli"], f:[], g:["Turmeric","Jeera","Oil","Salt","Coriander leaves"] },
  "Besan-Taak Curry": { v:["Besan 3 tbsp","Curd 2 cups"], f:[], g:["Turmeric","Mustard seeds","Curry leaves","Hing","Oil","Salt"] },
  "Methi Matar Malai": { v:["Methi leaves 1 bunch","Green peas 1 cup","Onion","Cashew 6-8"], f:[], g:["Cream 2 tbsp","Garam masala","Oil","Salt"] },
  "Malai Kofta": { v:["Paneer 100g","Potato 1","Onion","Tomato","Cashew 6-8"], f:[], g:["Cream 2 tbsp","Garam masala","Oil","Salt","Coriander"] },
  "default_lunch": { v:["Seasonal sabzi vegetable","Onion 2","Tomato 2","Cucumber 1","Coriander bunch","Green chilli","Ginger-garlic paste"], f:["Mango 100g","Lemon 2"], g:["Wheat flour (atta) 100g","Curd 200g","Dal 1 cup","Oil","Salt","Turmeric","Jeera","Red chilli powder"] },
  "default_dinner": { v:["Seasonal sabzi vegetable","Cucumber 1","Onion 1","Coriander"], f:[], g:["Wheat flour 80g","Oil","Salt","Spices"] },
  "default_bf": { v:["Onion 1","Tomato 1","Green chilli","Coriander"], f:[], g:["As per breakfast type","Oil","Salt"] },
};

function extractGrocery(meals) {
  let vegs = new Set(), fruits = new Set(), grocery = new Set();
  const addSet = (set, items) => items.forEach(i => set.add(i));

  meals.forEach(ml => {
    const main = ml.main.toLowerCase();
    // Always needed
    addSet(grocery, ["Oil","Salt","Turmeric","Jeera"]);

    if (ml.s === "pw") { addSet(grocery, ["Almonds 30g","Walnuts 10g"]); }
    if (ml.s === "bf") { addSet(grocery, ["Ensure supplement"]); addSet(vegs, ["Onion","Tomato","Green chilli","Coriander"]); }
    if (ml.s === "mm") {
      if (main.includes("papaya")) fruits.add("Papaya 1");
      if (main.includes("watermelon")) fruits.add("Watermelon 500g");
      if (main.includes("coconut")) fruits.add("Tender coconut 1");
      if (main.includes("muskmelon")) fruits.add("Muskmelon 1");
      if (main.includes("mango")) fruits.add("Mango 1");
      if (main.includes("sabja")) grocery.add("Sabja seeds");
    }
    if (ml.s === "lu") {
      addSet(vegs, ["Cucumber 1","Onion 2","Tomato 2","Coriander bunch","Green chilli","Ginger-garlic"]);
      addSet(grocery, ["Wheat atta","Curd 200g","Oil"]);
      if (main.includes("mango")) fruits.add("Mango 1 (100g)");
      // Specific sabzis
      if (main.includes("palak paneer")) { vegs.add("Spinach (palak) 200g"); grocery.add("Paneer 100g"); }
      if (main.includes("bhindi") || main.includes("masala bhindi")) vegs.add("Bhindi 200g");
      if (main.includes("kadhi")) { grocery.add("Besan 1 cup"); grocery.add("Curd 2 cups"); }
      if (main.includes("rajma")) grocery.add("Rajma 1 cup");
      if (main.includes("chole") || main.includes("chana masala")) grocery.add("Chana 1 cup");
      if (main.includes("chana palak")) { grocery.add("Chana 1 cup"); vegs.add("Spinach 200g"); }
      if (main.includes("aloo gobi")) { vegs.add("Cauliflower 1"); vegs.add("Potato 2"); }
      if (main.includes("matar paneer")) { vegs.add("Green peas 1 cup"); grocery.add("Paneer 100g"); }
      if (main.includes("paneer do pyaza") || main.includes("paneer butter") || main.includes("achari paneer") || main.includes("paneer curry") || main.includes("paneer makhani") || main.includes("paneer tikka") || main.includes("paneer bhurji")) grocery.add("Paneer 200g");
      if (main.includes("tori")) vegs.add("Tori 200g");
      if (main.includes("lauki")) vegs.add("Lauki 300g");
      if (main.includes("tinda")) vegs.add("Tinda 200g");
      if (main.includes("parval")) vegs.add("Parval 200g");
      if (main.includes("karela")) vegs.add("Karela 200g");
      if (main.includes("pumpkin")) vegs.add("Pumpkin 200g");
      if (main.includes("besan-taak") || main.includes("besan-capsicum")) { grocery.add("Besan"); grocery.add("Curd 2 cups"); }
      if (main.includes("dal makhani")) grocery.add("Urad dal 1 cup");
      if (main.includes("malai kofta")) { grocery.add("Paneer 100g"); vegs.add("Potato 1"); grocery.add("Cashew 8"); grocery.add("Cream"); }
      if (main.includes("methi matar")) { vegs.add("Methi 1 bunch"); vegs.add("Green peas 1 cup"); grocery.add("Cream"); }
      if (main.includes("baingan")) vegs.add("Baingan 2");
      if (main.includes("gobi sabzi") || main.includes("gobi +")) vegs.add("Cauliflower 1");
      if (main.includes("veg korma")) { vegs.add("Mixed vegs 300g"); grocery.add("Cashew 6"); grocery.add("Cream"); }
      if (main.includes("sambar")) { grocery.add("Sambar powder"); grocery.add("Toor dal 1 cup"); }
      if (main.includes("moong dal") || main.includes("green moong")) grocery.add("Moong dal 1 cup");
      if (main.includes("pasta")) grocery.add("Wheat pasta 100g");
      if (main.includes("poori") || main.includes("puri")) grocery.add("Wheat atta (extra for poori)");
      if (main.includes("soya")) grocery.add("Soya chunks 50g");
      if (main.includes("mushroom")) vegs.add("Mushroom 100g");
      if (main.includes("kaju") || main.includes("cashew")) grocery.add("Cashew 50g");
      if (main.includes("dum aloo")) vegs.add("Baby potato 200g");
      if (main.includes("dal ") && !main.includes("makhani") && !main.includes("chana")) grocery.add("Toor/Masoor dal 1 cup");
      if (main.includes("capsicum")) vegs.add("Capsicum 2");
      if (main.includes("cabbage")) vegs.add("Cabbage ¼ head");
      if (main.includes("shev bhaji") || main.includes("dahi shev")) { grocery.add("Thin sev 50g"); vegs.add("Onion 2"); }
      if (main.includes("chawli")) grocery.add("Chawli 1 cup");
      if (main.includes("lauki kofta")) { vegs.add("Lauki 300g"); grocery.add("Besan"); }
      if (main.includes("jeera aloo")) vegs.add("Potato 3");
    }
    if (ml.s === "cd") {
      if (main.includes("chaas") || main.includes("buttermilk")) { grocery.add("Curd (extra) 200g"); grocery.add("Mint leaves"); }
      if (main.includes("aam panna") || main.includes("raw mango")) fruits.add("Raw mango (kairi) 1");
      if (main.includes("sattu")) grocery.add("Sattu flour 50g");
      if (main.includes("jaljeera")) grocery.add("Jaljeera powder");
      if (main.includes("nimbu") || main.includes("lemon")) fruits.add("Lemon 2");
      if (main.includes("coconut")) fruits.add("Tender coconut 1");
      if (main.includes("kokum")) grocery.add("Kokum syrup");
      if (main.includes("bael")) fruits.add("Bael fruit 1");
      if (main.includes("thandai")) grocery.add("Thandai powder / mix");
      if (main.includes("sabja")) grocery.add("Sabja seeds");
      if (main.includes("watermelon")) fruits.add("Watermelon 500g");
    }
    if (ml.s === "ev") {
      grocery.add("Tea/Green tea");
      if (main.includes("chana")) grocery.add("Roasted chana 50g");
      if (main.includes("makhana")) grocery.add("Makhana 30g");
      if (main.includes("peanut") || main.includes("sing")) grocery.add("Peanuts 30g");
      if (main.includes("kurmura") || main.includes("bhel")) grocery.add("Puffed rice (kurmura) 50g");
      if (main.includes("sprouts")) grocery.add("Moong sprouts 60g");
      if (main.includes("poha chivda")) grocery.add("Thin poha 50g");
      if (main.includes("mathri")) grocery.add("Baked mathri");
      if (main.includes("til") || main.includes("chikki")) grocery.add("Til-gur chikki");
      if (main.includes("samosa")) grocery.add("Baked samosa 1");
      if (main.includes("vada pav")) grocery.add("Vada pav 1");
      if (main.includes("pakora")) grocery.add("Besan for pakora");
    }
    if (ml.s === "dn" || ml.s === "sd") {
      addSet(vegs, ["Cucumber 1","Coriander"]);
      addSet(grocery, ["Wheat atta","Oil"]);
      if (main.includes("paneer")) grocery.add("Paneer 100g");
      if (main.includes("lauki")) vegs.add("Lauki 200g");
      if (main.includes("tori")) vegs.add("Tori 200g");
      if (main.includes("tinda")) vegs.add("Tinda 200g");
      if (main.includes("moong dal") || main.includes("moong")) grocery.add("Moong dal 1 cup");
      if (main.includes("khichdi")) { grocery.add("Moong dal ½ cup"); grocery.add("Rice ½ cup"); }
      if (main.includes("soup")) vegs.add("Mixed vegs for soup");
      if (main.includes("pav bhaji")) { vegs.add("Mixed vegs 300g"); grocery.add("Pav 2"); grocery.add("Butter"); }
      if (main.includes("biryani")) { vegs.add("Mixed vegs 200g"); grocery.add("Basmati rice 1 cup"); grocery.add("Biryani masala"); }
      if (main.includes("dal makhani")) { grocery.add("Urad dal 1 cup"); grocery.add("Butter"); grocery.add("Cream"); }
      if (main.includes("chole bhature")) { grocery.add("Chana 1 cup"); grocery.add("Maida for bhature"); }
      if (main.includes("pasta")) grocery.add("Wheat pasta 100g");
      if (main.includes("besan-taak") || main.includes("kadhi")) { grocery.add("Besan"); grocery.add("Curd 2 cups"); }
      if (main.includes("baingan")) vegs.add("Baingan 2");
      if (main.includes("bhindi")) vegs.add("Bhindi 150g");
      if (main.includes("gobi")) vegs.add("Cauliflower 1");
      if (main.includes("aloo") || main.includes("jeera aloo")) vegs.add("Potato 2");
      if (main.includes("capsicum")) vegs.add("Capsicum 1");
      if (main.includes("cabbage")) vegs.add("Cabbage ¼ head");
      if (main.includes("rajma")) grocery.add("Rajma 1 cup");
      if (main.includes("chana masala") || main.includes("aloo chana")) grocery.add("Chana 1 cup");
      if (main.includes("kaju")) grocery.add("Cashew 50g");
      if (main.includes("malai kofta")) { grocery.add("Paneer 100g"); vegs.add("Potato 1"); grocery.add("Cashew 8"); }
    }
  });
  return { vegs: [...vegs].sort(), fruits: [...fruits].sort(), grocery: [...grocery].sort() };
}

function downloadList(title, data) {
  let txt = `🛒 ${title}\n${"═".repeat(40)}\n\n`;
  if (data.vegs.length) { txt += `🥬 VEGETABLES\n${data.vegs.map(v=>`  ☐ ${v}`).join("\n")}\n\n`; }
  if (data.fruits.length) { txt += `🥭 FRUITS\n${data.fruits.map(f=>`  ☐ ${f}`).join("\n")}\n\n`; }
  if (data.grocery.length) { txt += `🛍️ GROCERY & PANTRY\n${data.grocery.map(g=>`  ☐ ${g}`).join("\n")}\n\n`; }
  txt += `\n📅 Generated from Diet Plan 2026`;
  const blob = new Blob([txt], { type:"text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = title.replace(/[^a-zA-Z0-9]/g,"_") + ".txt";
  a.click(); URL.revokeObjectURL(url);
}

// ═══ 28 DAYS ═══
const D=[
{day:"Mon",date:"30 Mar",tc:"~2,450",meals:[mk("pw","5:30 AM","Soaked almonds (peeled) + walnut","5 almonds + 1 walnut","80","pw","Peel for absorption"),mk("bf","7:30 AM","Moong dal chilla + mint chutney + curd","2 chilla + 2 tbsp + 100g curd","340","bf","+ Ensure","18g"),mk("mm","10:30 AM","Papaya (skin glow)","1 cup ~150g","65","mm","3-4x/week"),mk("lu","12:30 PM","2 roti + Palak Paneer + kachumber + curd","2 roti + 1 katori + salad + 150g curd","550","lu","🥭 Mango 100g + gulkand","20g"),mk("cd","3:00 PM","Chaas — jeera + pudina","1 glass ~300ml","45","cd","Daily cooling"),mk("ev","4:30 PM","Green tea + roasted chana","1 cup + 30g","130","ev","Zero sugar"),mk("dn","7:30 PM","Lauki soup + grilled paneer tikka","1 bowl + 80g paneer","320","dn","Light = fresh morning","18g")]},
{day:"Tue",date:"31 Mar",tc:"~2,400",meals:[mk("pw","5:30 AM","Soaked almonds + walnut","5+1","80","pw"),mk("bf","7:30 AM","Poha + peanuts + sprouts","1.5 cup + 50g","350","bf","+ Ensure","14g"),mk("mm","10:30 AM","Coconut water + 4 almonds","250ml + 4","75","mm"),mk("lu","12:30 PM","2 roti + Chana Masala + salad + curd","Standard","540","lu","🥭 Mango 100g","20g"),mk("cd","3:00 PM","Nimbu pani — black salt","1 glass","20","cd"),mk("ev","4:30 PM","Tea + kurmura chivda","1 cup + 40g","170","ev"),mk("dn","7:30 PM","2 roti + Daal Bhaji","2 roti + 1 katori","340","dn","","16g")]},
{day:"Wed",date:"1 Apr",tc:"~2,380",meals:[mk("pw","5:30 AM","Soaked almonds + walnut","5+1","80","pw"),mk("bf","7:30 AM","Ragi dosa (2) + chutney + curd","2 + 100g curd","350","bf","+ Ensure","14g"),mk("mm","10:30 AM","Watermelon","1.5 cups","75","mm"),mk("lu","12:30 PM","2 roti + Kadhi Pakora + salad","Standard","520","lu","🥭 Mango 100g","14g"),mk("cd","3:00 PM","Sattu sharbat","2 tbsp + glass","120","cd","","7g"),mk("ev","4:30 PM","Tea + til-gur chikki","1 cup + 20g","120","ev"),mk("dn","7:30 PM","2 roti + Tori + raita","Standard","340","dn","Gourds = lightest","12g")]},
{day:"Thu",date:"2 Apr",tc:"~2,420",meals:[mk("pw","5:30 AM","Soaked almonds + walnut","5+1","80","pw"),mk("bf","7:30 AM","Idli (3) + sambar + chutney","3 + sambar","360","bf","+ Ensure","13g"),mk("mm","10:30 AM","Papaya + turmeric","1 cup + pinch","65","mm","Skin combo"),mk("lu","12:30 PM","2 roti + Rajma Masala + kachumber + curd","Standard","560","lu","🥭 Mango 100g","22g"),mk("cd","3:00 PM","Aam panna (jaggery)","1 glass","60","cd"),mk("ev","4:30 PM","Tea + sprouts chaat","1 cup + 60g","140","ev"),mk("dn","7:30 PM","2 roti + Besan-Taak Curry + cucumber","Standard","360","dn","","14g")]},
{day:"Fri",date:"3 Apr",tc:"~2,400",meals:[mk("pw","5:30 AM","Soaked almonds + walnut","5+1","80","pw"),mk("bf","7:30 AM","Oats + milk + chia + almonds","40g + 200ml + chia + 4","350","bf","+ Ensure · 1x/week","15g"),mk("mm","10:30 AM","Coconut water","250ml","45","mm"),mk("lu","12:30 PM","2 roti + Aloo Gobi + dal + curd","Standard","510","lu","🥭 Mango 100g","14g"),mk("cd","3:00 PM","Chaas — pudina","1 glass","45","cd"),mk("ev","4:30 PM","Tea + baked mathri","1 cup + 30g","150","ev"),mk("dn","7:30 PM","Moong dal + tinda — no roti","1 katori each","280","dn","Ultra light","15g")]},
{day:"Sat",date:"4 Apr",tc:"~2,380",meals:[mk("pw","5:30 AM","Soaked almonds + walnut","5+1","80","pw"),mk("bf","7:30 AM","Thalipeeth + curd","1 + 100g curd","340","bf","+ Ensure","14g"),mk("mm","10:30 AM","Papaya + sabja","1 cup + 1 tsp","75","mm","Best skin combo"),mk("lu","12:30 PM","2 roti + Matar Paneer + kachumber + curd","Standard","560","lu","🥭 Mango 100g","22g"),mk("cd","3:00 PM","Jaljeera","1 glass","15","cd"),mk("ev","4:30 PM","Tea + peanuts + chana","1 cup + 30g","145","ev"),mk("dn","7:30 PM","Paneer Curry + 1 roti","80g + 1 roti","400","dn","","20g")]},
{day:"Sun",date:"5 Apr",tc:"~2,900",cheat:true,meals:[mk("pw","5:30 AM","Almonds + banana","5+banana","170","pw","Rest day"),mk("bf","9:00 AM","Chole Bhature (2 small) OR masala dosa","Full plate","450","bf","🎉 Treat!","16g"),mk("mm","11:00 AM","Mango milkshake + dry fruits","1 glass","170","mm"),mk("lu","12:30 PM","Palak Paneer Rice + raita + papad + mango 150g","Full serving","650","lu","🎉 Sunday rice!","20g"),mk("cd","3:00 PM","Thandai OR mango lassi","1 tall glass","120","cd"),mk("ev","5:00 PM","Tea + samosa (1 baked)","Treat","250","ev","🎉 Street food!"),mk("dn","8:00 PM","Pav Bhaji OR Paneer Butter Masala + 2 roti","Full","550","sd","🎉 Indulge!","18g")]},
{day:"Mon",date:"6 Apr",tc:"~2,420",meals:[mk("pw","5:30 AM","Soaked almonds + walnut","5+1","80","pw"),mk("bf","7:30 AM","Upma + chutney + sprouts","1.5 katori + 50g","340","bf","+ Ensure","13g"),mk("mm","10:30 AM","Muskmelon + black salt","1 cup","50","mm"),mk("lu","12:30 PM","2 roti + Paneer Do Pyaza + salad + curd","Standard","550","lu","🥭 Mango 100g","20g"),mk("cd","3:00 PM","Sattu sharbat","Glass","120","cd","","7g"),mk("ev","4:30 PM","Tea + bhel puri","1 cup + bowl","140","ev"),mk("dn","7:30 PM","2 roti + Baingan Bharta + curd","Standard","350","dn","","12g")]},
{day:"Tue",date:"7 Apr",tc:"~2,380",meals:[mk("pw","5:30 AM","Soaked almonds + walnut","5+1","80","pw"),mk("bf","7:30 AM","Besan chilla (2) + chutney + curd","2 + 100g","340","bf","+ Ensure","18g"),mk("mm","10:30 AM","Papaya","1 cup","65","mm"),mk("lu","12:30 PM","2 roti + Methi Matar Malai + curd","Standard","540","lu","🥭 Mango 100g","16g"),mk("cd","3:00 PM","Coconut water + sabja","250ml","50","cd"),mk("ev","4:30 PM","Tea + sing bhujia","1 cup + 25g","140","ev"),mk("dn","7:30 PM","Dal + lauki — no roti","1 katori each","280","dn","No-roti night","15g")]},
{day:"Wed",date:"8 Apr",tc:"~2,400",meals:[mk("pw","5:30 AM","Soaked almonds + walnut","5+1","80","pw"),mk("bf","7:30 AM","Dosa (2) + sambar","2 + sambar","360","bf","+ Ensure","13g"),mk("mm","10:30 AM","Watermelon","1.5 cups","75","mm"),mk("lu","12:30 PM","2 roti + Achari Paneer + salad + curd","Standard","560","lu","🥭 Mango 100g","22g"),mk("cd","3:00 PM","Aam panna","1 glass","60","cd"),mk("ev","4:30 PM","Tea + chana jor garam","1 cup + 30g","130","ev"),mk("dn","7:30 PM","Palak Paneer + 1 roti","80g + 1 roti","380","dn","","22g")]},
{day:"Thu",date:"9 Apr",tc:"~2,350",meals:[mk("pw","5:30 AM","Soaked almonds + walnut","5+1","80","pw"),mk("bf","7:30 AM","Lauki paratha + curd","1 + 100g","350","bf","+ Ensure","14g"),mk("mm","10:30 AM","Coconut water","250ml","45","mm"),mk("lu","12:30 PM","2 roti + Lauki Chana Dal + salad + curd","Standard","500","lu","🥭 Mango 100g","17g"),mk("cd","3:00 PM","Chaas (jeera)","1 glass","45","cd"),mk("ev","4:30 PM","Tea + makhana","1 cup + 25g","110","ev"),mk("dn","7:30 PM","Moong dal cheela (2) + chutney","2 cheela","300","dn","Protein + light","18g")]},
{day:"Fri",date:"10 Apr",tc:"~2,400",meals:[mk("pw","5:30 AM","Soaked almonds + walnut","5+1","80","pw"),mk("bf","7:30 AM","Dalia + curd","1.5 katori + 100g","330","bf","+ Ensure","13g"),mk("mm","10:30 AM","Papaya + turmeric","1 cup","65","mm"),mk("lu","12:30 PM","2 roti + Malai Kofta + salad + curd","Standard","570","lu","🥭 Mango 100g","16g"),mk("cd","3:00 PM","Jaljeera","1 glass","15","cd"),mk("ev","4:30 PM","Tea + poha chivda","1 cup + 35g","155","ev"),mk("dn","7:30 PM","2 roti + Mix Veg (lauki-tori-tinda)","Standard","350","dn","Triple gourd","12g")]},
{day:"Sat",date:"11 Apr",tc:"~2,380",meals:[mk("pw","5:30 AM","Soaked almonds + walnut","5+1","80","pw"),mk("bf","7:30 AM","Ragi porridge + almonds","1.5 katori + 4","340","bf","+ Ensure","12g"),mk("mm","10:30 AM","Watermelon + mint","1.5 cups","75","mm"),mk("lu","12:30 PM","2 roti + Veg Korma + salad + curd","Standard","540","lu","🥭 Mango 100g","15g"),mk("cd","3:00 PM","Kokum sharbat","1 glass","40","cd"),mk("ev","4:30 PM","Tea + kurmura bhel","1 cup + bowl","130","ev"),mk("dn","7:30 PM","Soup + Paneer Bhurji + salad","1 bowl + 60g","340","dn","","18g")]},
{day:"Sun",date:"12 Apr",tc:"~2,850",cheat:true,meals:[mk("pw","5:30 AM","Almonds + banana","5+banana","170","pw","Rest"),mk("bf","9:00 AM","Masala dosa OR puri bhaji (3)","Full plate","450","bf","🎉 Brunch!","14g"),mk("mm","11:00 AM","Mango milkshake + dry fruits","1 glass","150","mm"),mk("lu","12:30 PM","Paneer Butter Masala + 2 roti + raita + mango","Full thali","650","lu","🎉 Big lunch!","22g"),mk("cd","3:00 PM","Thandai (jaggery)","1 glass","120","cd"),mk("ev","5:00 PM","Tea + vada pav","Treat","280","ev"),mk("dn","8:00 PM","Dal Makhani + 2 roti + raita","Full","520","sd","🎉 Indulge!","18g")]},
];
const D3=D.slice(0,7).map((x,i)=>({...x,date:["13 Apr","14 Apr","15 Apr","16 Apr","17 Apr","18 Apr","19 Apr"][i]}));
const D4=D.slice(7,14).map((x,i)=>({...x,date:["20 Apr","21 Apr","22 Apr","23 Apr","24 Apr","25 Apr","26 Apr"][i]}));
const DAYS=[...D,...D3,...D4];

const FN={Mon:"Monday",Tue:"Tuesday",Wed:"Wednesday",Thu:"Thursday",Fri:"Friday",Sat:"Saturday",Sun:"Sunday"};
const DC=["#16a34a","#2563eb","#ca8a04","#ea580c","#dc2626","#9333ea","#737373"];
const DS=[{id:"skin",icon:"✨",label:"Skin",cl:"#f59e0b"},{id:"fruits",icon:"🥭",label:"Fruits",cl:"#f59e0b"},{id:"vegs",icon:"🥬",label:"Vegs",cl:"#16a34a"},{id:"drinks",icon:"🧊",label:"Drinks",cl:"#0ea5e9"},{id:"super",icon:"⚡",label:"Super",cl:"#f59e0b"},{id:"rules",icon:"✅",label:"Rules",cl:"#16a34a"}];

function findToday(){const n=new Date(),mo=n.getMonth(),dt=n.getDate(),ms=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];for(let i=0;i<DAYS.length;i++){const[d,mn]=DAYS[i].date.split(" ");if(ms.indexOf(mn)===mo&&parseInt(d)===dt)return i}return 0}

function getNextMealIdx(meals){
  const now=new Date(),mins=now.getHours()*60+now.getMinutes();
  for(let i=0;i<meals.length;i++){
    const tm=TM[meals[i].s];
    if(tm&&mins<tm) return i;
  }
  return -1; // all done
}

export default function App(){
  const ti=findToday();
  const[di,sD]=useState(ti);
  const[sw,sSW]=useState({});
  const[dr,sDr]=useState(null);
  const sr=useRef(null);
  const[now,sNow]=useState(Date.now());
  // Refresh every minute for next-meal tracking
  useEffect(()=>{const iv=setInterval(()=>sNow(Date.now()),60000);return()=>clearInterval(iv)},[]);
  useEffect(()=>{sSW({})},[di]);
  useEffect(()=>{if(sr.current?.children[di])sr.current.children[di].scrollIntoView({behavior:"smooth",inline:"center",block:"nearest"})},[di]);

  const d=DAYS[di],dow=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].indexOf(d.day),c=DC[dow];
  const isToday = di===ti;
  const nextMeal = isToday ? getNextMealIdx(d.meals) : -1;
  const cyc=useCallback((i,k)=>{sSW(p=>{const o=SW[k];if(!o)return p;return{...p,[i]:((p[i]??-1)+1)%o.length}})},[]);
  const drI=DS.find(x=>x.id===dr);
  const G=["linear-gradient(135deg,#f0fdf4,#dcfce7)","linear-gradient(135deg,#eff6ff,#dbeafe)","linear-gradient(135deg,#fefce8,#fef9c3)","linear-gradient(135deg,#fff7ed,#ffedd5)","linear-gradient(135deg,#fef2f2,#fee2e2)","linear-gradient(135deg,#faf5ff,#f3e8ff)","linear-gradient(135deg,#fafafa,#f5f5f5)"];

  // Grocery data
  const dayGrocery = useMemo(()=>extractGrocery(d.meals),[di]);
  const weekStart = Math.floor(di/7)*7;
  const weekGrocery = useMemo(()=>{
    let all=[];
    for(let i=weekStart;i<Math.min(weekStart+7,DAYS.length);i++) all.push(...DAYS[i].meals);
    return extractGrocery(all);
  },[weekStart]);

  const mcg=(sk)=>sk==="cd"?"linear-gradient(135deg,#f0f9ff,#e0f2fe)":sk==="dn"||sk==="sd"?"linear-gradient(135deg,#fefce8,#fef3c7)":"white";

  const renderDr=(id)=>{
    const C=({children})=><div style={{background:"white",borderRadius:16,padding:"16px",marginBottom:10,boxShadow:"0 1px 4px rgba(0,0,0,.06)"}}>{children}</div>;
    if(id==="skin")return SKIN.map((s,i)=><C key={i}><div style={{display:"flex",alignItems:"center",gap:10,marginBottom:6}}><span style={{fontSize:28}}>{s.e}</span><div style={{fontSize:16,fontWeight:700,color:"#1a1a1a"}}>{s.n}</div></div><div style={{fontSize:14,color:"#555",lineHeight:1.6}}>{s.b}</div><div style={{fontSize:13,color:"#b45309",marginTop:6,fontWeight:600}}>📌 {s.u}</div></C>);
    if(id==="fruits")return FRU.map((f,i)=><C key={i}><div style={{display:"flex",alignItems:"center",gap:10,marginBottom:6}}><span style={{fontSize:28}}>{f.e}</span><div style={{flex:1}}><div style={{fontSize:16,fontWeight:700}}>{f.n}</div><div style={{fontSize:12,color:"#888"}}>{f.s} · ~{f.c} kcal</div></div></div><div style={{fontSize:14,color:"#555",lineHeight:1.5}}>{f.b}</div><div style={{fontSize:13,color:"#0369a1",marginTop:4}}>⏰ {f.t}</div><div style={{fontSize:13,color:"#777",marginTop:3}}>💡 {f.tip}</div></C>);
    if(id==="vegs")return VEG.map((v,i)=><C key={i}><div style={{display:"flex",alignItems:"center",gap:10,marginBottom:6}}><span style={{fontSize:24}}>{v.e}</span><div style={{fontSize:16,fontWeight:700}}>{v.n}</div></div><div style={{fontSize:14,color:"#555"}}>{v.b}</div><div style={{fontSize:13,color:"#15803d",marginTop:4}}>🍳 {v.c}</div><div style={{fontSize:13,color:"#777",marginTop:3}}>💡 {v.tip}</div></C>);
    if(id==="drinks")return DRK.map((x,i)=><C key={i}><div style={{display:"flex",alignItems:"center",gap:10,marginBottom:6}}><span style={{fontSize:28}}>{x.e}</span><div style={{flex:1}}><div style={{fontSize:16,fontWeight:700}}>{x.n}</div><div style={{fontSize:12,color:"#0369a1"}}>~{x.c} kcal · P:{x.p}</div></div></div><div style={{fontSize:14,color:"#555"}}>{x.b}</div><div style={{fontSize:13,color:"#666",marginTop:5,background:"#f8fafc",borderRadius:8,padding:"8px 10px"}}>📝 {x.r}</div></C>);
    if(id==="super")return<>{SUP.map((s,i)=><C key={i}><div style={{fontSize:16,fontWeight:700,marginBottom:4}}>{s.n}</div><div style={{fontSize:14,color:"#555"}}>{s.b}</div><div style={{fontSize:13,color:"#b45309",marginTop:4}}>🍽️ {s.u}</div></C>)}</>;
    if(id==="rules")return<>{RUL.map((r,i)=><C key={i}><div style={{display:"flex",alignItems:"center",gap:14}}><span style={{fontSize:28}}>{r.i}</span><div><div style={{fontSize:15,fontWeight:700}}>{r.t}</div><div style={{fontSize:13,color:"#777",marginTop:2}}>{r.d}</div></div></div></C>)}</>;
    return null;
  };

  const DlBtn=({label,icon,onClick})=><button onClick={onClick} style={{display:"flex",alignItems:"center",gap:8,padding:"10px 16px",borderRadius:14,background:"white",border:"1.5px solid rgba(0,0,0,.08)",boxShadow:"0 1px 4px rgba(0,0,0,.04)",cursor:"pointer",fontFamily:"inherit",fontSize:13,fontWeight:700,color:"#333",WebkitTapHighlightColor:"transparent",transition:"all .15s"}}><span style={{fontSize:18}}>{icon}</span>{label}</button>;

  return(
    <div style={{minHeight:"100vh",background:G[dow],fontFamily:"'DM Sans',system-ui,sans-serif",color:"#1a1a1a",paddingBottom:90,transition:"background .4s"}}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet"/>

      {/* HEADER */}
      <div style={{padding:"20px 20px 14px",background:"rgba(255,255,255,.6)",backdropFilter:"blur(20px)",borderBottom:"1px solid rgba(0,0,0,.06)",position:"sticky",top:0,zIndex:50}}>
        <div style={{maxWidth:500,margin:"0 auto",display:"flex",alignItems:"center",gap:14}}>
          <div style={{width:48,height:48,borderRadius:14,background:`linear-gradient(135deg,${c}22,${c}44)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,boxShadow:`0 4px 12px ${c}30`,transition:"all .3s"}}>🍽️</div>
          <div style={{flex:1}}>
            <div style={{fontSize:12,fontWeight:700,color:c,letterSpacing:2,textTransform:"uppercase"}}>Summer 2026</div>
            <div style={{fontSize:24,fontWeight:800,color:"#111",letterSpacing:-.5}}>Diet Plan</div>
          </div>
          <div style={{background:"white",borderRadius:14,padding:"8px 14px",textAlign:"center",boxShadow:"0 2px 8px rgba(0,0,0,.06)"}}>
            <div style={{fontSize:10,fontWeight:600,color:"#999",letterSpacing:1}}>DAY</div>
            <div style={{fontSize:22,fontWeight:800,color:c}}>{di+1}</div>
            <div style={{fontSize:9,color:"#bbb"}}>of 28</div>
          </div>
        </div>
      </div>

      {/* DAY SCROLLER */}
      <div ref={sr} style={{maxWidth:520,margin:"0 auto",padding:"12px 20px",display:"flex",gap:8,overflowX:"auto",scrollbarWidth:"none"}}>
        {DAYS.map((x,i)=>{const dw=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].indexOf(x.day),it=i===ti,a=i===di,cl=DC[dw];return(
          <button key={i} onClick={()=>sD(i)} style={{flex:"0 0 auto",padding:"10px 14px",borderRadius:16,minWidth:58,textAlign:"center",background:a?"white":x.cheat?"#fef2f2":"rgba(255,255,255,.4)",border:a?`2.5px solid ${cl}`:it?`2px dashed ${cl}80`:"2px solid transparent",boxShadow:a?`0 4px 16px ${cl}25`:"none",cursor:"pointer",transition:"all .2s",fontFamily:"inherit",WebkitTapHighlightColor:"transparent",transform:a?"scale(1.05)":"scale(1)"}}>
            <div style={{fontSize:10,fontWeight:600,color:a?cl:"#aaa"}}>{x.date.split(" ")[0]}</div>
            <div style={{fontSize:16,fontWeight:a?800:600,color:a?cl:"#888"}}>{x.day}</div>
            {x.cheat&&<div style={{fontSize:8,fontWeight:800,color:"#ef4444",marginTop:2}}>🎉 CHEAT</div>}
            {it&&!a&&<div style={{width:6,height:6,borderRadius:3,background:cl,margin:"4px auto 0"}}/>}
          </button>
        )})}
      </div>

      {/* DAY HEADER */}
      <div style={{maxWidth:500,margin:"0 auto",padding:"4px 20px 0"}}>
        <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:12}}>
          <div style={{width:50,height:50,borderRadius:16,background:`linear-gradient(135deg,${c}15,${c}30)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:24}}>{d.cheat?"🎉":"📅"}</div>
          <div style={{flex:1}}>
            <div style={{fontSize:22,fontWeight:800,color:"#111"}}>{FN[d.day]}</div>
            <div style={{fontSize:14,color:"#999",marginTop:1}}>{d.date} 2026 · Day {di+1}</div>
          </div>
          <div style={{background:d.cheat?"linear-gradient(135deg,#fecaca,#fca5a5)":"white",borderRadius:14,padding:"8px 16px",textAlign:"center",boxShadow:"0 2px 8px rgba(0,0,0,.06)"}}>
            <div style={{fontSize:10,fontWeight:700,color:d.cheat?"#991b1b":"#888"}}>TOTAL</div>
            <div style={{fontSize:18,fontWeight:800,color:d.cheat?"#dc2626":c}}>{d.tc}</div>
          </div>
        </div>
      </div>

      {/* GROCERY DOWNLOAD BUTTONS */}
      <div style={{maxWidth:500,margin:"0 auto",padding:"0 20px 10px",display:"flex",gap:8,overflowX:"auto",scrollbarWidth:"none"}}>
        <DlBtn icon="📋" label="Today's List" onClick={()=>downloadList(`Grocery_${d.date}_${d.day}`,dayGrocery)}/>
        <DlBtn icon="📦" label="Week's List" onClick={()=>downloadList(`Grocery_Week_${Math.floor(di/7)+1}`,weekGrocery)}/>
        <DlBtn icon="🥬" label={`${dayGrocery.vegs.length} vegs`} onClick={()=>downloadList(`Vegetables_${d.date}`,{vegs:dayGrocery.vegs,fruits:[],grocery:[]})}/>
        <DlBtn icon="🥭" label={`${dayGrocery.fruits.length} fruits`} onClick={()=>downloadList(`Fruits_${d.date}`,{vegs:[],fruits:dayGrocery.fruits,grocery:[]})}/>
      </div>

      {/* MEALS */}
      <div style={{maxWidth:500,margin:"0 auto",padding:"0 20px"}}>
        {d.meals.map((ml,i)=>{
          const sk=ml.s,opts=SW[sk],si=sw[i],sh=si!==undefined&&si>=0;
          const accent=sk==="cd"?"#0284c7":sk==="dn"||sk==="sd"?"#a16207":c;
          const isNext = i===nextMeal;
          return(
            <div key={i} style={{
              background:mcg(sk),borderRadius:20,marginBottom:10,overflow:"hidden",
              boxShadow:isNext?`0 0 0 2.5px ${accent}, 0 4px 20px ${accent}30`:"0 2px 12px rgba(0,0,0,.04)",
              border:isNext?"none":"1px solid rgba(0,0,0,.04)",
              animation:`rise .4s ease ${i*.05}s both`,
              position:"relative",
            }}>
              {/* NEXT UP badge */}
              {isNext&&<div style={{position:"absolute",top:12,right:14,background:`linear-gradient(135deg,${accent},${accent}cc)`,color:"white",fontSize:10,fontWeight:800,padding:"4px 10px",borderRadius:8,letterSpacing:.5,zIndex:2,display:"flex",alignItems:"center",gap:4}}>
                <span style={{fontSize:12}}>⏰</span> NEXT UP
              </div>}
              <div style={{padding:"16px 18px",display:"flex",gap:14}}>
                <div style={{width:44,height:44,borderRadius:14,background:`linear-gradient(135deg,${accent}15,${accent}30)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0}}>{MI[sk]}</div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:6,gap:6,flexWrap:"wrap"}}>
                    <span style={{fontSize:14,fontWeight:700,color:"#333"}}>{ML[sk]}</span>
                    <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                      <span style={{fontSize:11,fontWeight:700,color:"white",background:`linear-gradient(135deg,${accent},${accent}cc)`,padding:"3px 10px",borderRadius:8}}>{ml.cal} kcal</span>
                      {ml.p&&<span style={{fontSize:11,fontWeight:700,color:"#15803d",background:"#dcfce7",padding:"3px 10px",borderRadius:8}}>P: {ml.p}</span>}
                      <span style={{fontSize:11,fontWeight:600,color:"#888",background:"rgba(0,0,0,.04)",padding:"3px 10px",borderRadius:8}}>🕐 {ml.t}</span>
                    </div>
                  </div>
                  <div style={{fontSize:15,fontWeight:600,color:"#222",lineHeight:1.6}}>{ml.main}</div>
                  {ml.qty&&<div style={{fontSize:13,color:"#888",marginTop:5}}>📏 {ml.qty}</div>}
                  {ml.note&&<div style={{fontSize:13,color:"#999",marginTop:4,fontStyle:"italic"}}>💡 {ml.note}</div>}
                  {opts&&<button onClick={()=>cyc(i,sk)} style={{marginTop:10,fontSize:13,fontWeight:700,color:accent,background:`${accent}08`,border:`1.5px solid ${accent}25`,borderRadius:12,padding:"8px 16px",cursor:"pointer",fontFamily:"inherit",display:"flex",alignItems:"center",gap:8,WebkitTapHighlightColor:"transparent"}}>
                    <span style={{fontSize:18}}>🔄</span>
                    <span>{sh?`#${si+1}/${opts.length} — tap next`:`${opts.length} options`}</span>
                  </button>}
                </div>
              </div>
              {sh&&opts&&<div style={{background:`${accent}06`,borderTop:`1px solid ${accent}10`,padding:"12px 18px 12px 76px"}}><div style={{fontSize:14,fontWeight:600,color:"#444",lineHeight:1.5}}><span style={{color:accent,fontWeight:800}}>#{si+1} →</span> {opts[si]}</div></div>}
            </div>
          );
        })}

        {/* Summary */}
        <div style={{background:"white",borderRadius:20,padding:"18px",marginTop:6,boxShadow:"0 2px 12px rgba(0,0,0,.04)",display:"flex",justifyContent:"space-around"}}>
          {[{l:"🔥 Calories",v:d.tc,cl:d.cheat?"#dc2626":c},{l:"💪 Protein",v:d.cheat?"~90g":"~75g",cl:"#15803d"},{l:"💧 Water",v:"3.5L",cl:"#0284c7"},{l:"🍽️ Meals",v:"7",cl:"#7c3aed"}].map((x,i)=><div key={i} style={{textAlign:"center"}}><div style={{fontSize:18,fontWeight:800,color:x.cl}}>{x.v}</div><div style={{fontSize:11,color:"#aaa",marginTop:3,fontWeight:600}}>{x.l}</div></div>)}
        </div>
        {d.cheat&&<div style={{background:"linear-gradient(135deg,#fef2f2,#fee2e2)",borderRadius:20,padding:"18px",marginTop:10,border:"1px solid #fecaca"}}><div style={{fontSize:16,fontWeight:800,color:"#dc2626",marginBottom:6}}>🎉 Cheat Day Rules</div><div style={{fontSize:14,color:"#666",lineHeight:1.7}}>One fried max · Extra walk · 4L water · Monday = reset!</div></div>}
      </div>

      {/* BOTTOM BAR */}
      <div style={{position:"fixed",bottom:0,left:0,right:0,zIndex:100,padding:"0 16px 14px",background:"linear-gradient(to top,rgba(255,255,255,.95) 70%,transparent)"}}>
        <div style={{maxWidth:420,margin:"0 auto",display:"flex",justifyContent:"space-around",background:"white",borderRadius:22,padding:"8px",boxShadow:"0 -2px 20px rgba(0,0,0,.08)",border:"1px solid rgba(0,0,0,.06)"}}>
          {DS.map(x=><button key={x.id} onClick={()=>sDr(dr===x.id?null:x.id)} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:2,background:dr===x.id?`${x.cl}12`:"transparent",border:dr===x.id?`1.5px solid ${x.cl}40`:"1.5px solid transparent",borderRadius:16,padding:"8px 10px",cursor:"pointer",fontFamily:"inherit",WebkitTapHighlightColor:"transparent",transition:"all .2s",minWidth:50}}><span style={{fontSize:22}}>{x.icon}</span><span style={{fontSize:10,fontWeight:700,color:dr===x.id?x.cl:"#bbb"}}>{x.label}</span></button>)}
        </div>
      </div>

      {/* DRAWER */}
      {dr&&<div style={{position:"fixed",inset:0,zIndex:200,display:"flex",flexDirection:"column"}}>
        <div onClick={()=>sDr(null)} style={{flex:"0 0 auto",height:"6vh",background:"rgba(0,0,0,.3)",backdropFilter:"blur(8px)"}}/>
        <div style={{flex:1,background:"#f8fafc",borderRadius:"28px 28px 0 0",display:"flex",flexDirection:"column",overflow:"hidden",animation:"su .3s ease",boxShadow:"0 -8px 40px rgba(0,0,0,.1)"}}>
          <div style={{padding:"14px 24px 12px",flexShrink:0}}>
            <div style={{width:44,height:5,borderRadius:3,background:"#ddd",margin:"0 auto 14px"}}/>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
              <div style={{display:"flex",alignItems:"center",gap:12}}><span style={{fontSize:26}}>{drI?.icon}</span><span style={{fontSize:20,fontWeight:800,color:"#111"}}>{dr==="skin"?"Skin Glow":dr==="fruits"?"Summer Fruits":dr==="vegs"?"Summer Vegs":dr==="drinks"?"Cooling Drinks":dr==="super"?"Superfoods":"Daily Rules"}</span></div>
              <button onClick={()=>sDr(null)} style={{width:40,height:40,borderRadius:12,border:"none",background:"#f1f5f9",color:"#999",fontSize:18,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"inherit",fontWeight:700}}>✕</button>
            </div>
          </div>
          <div style={{flex:1,overflow:"auto",padding:"8px 24px 100px",scrollbarWidth:"none"}}>{renderDr(dr)}</div>
        </div>
      </div>}

      <style>{`
        @keyframes rise{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
        @keyframes su{from{transform:translateY(100%)}to{transform:translateY(0)}}
        button{font-family:'DM Sans',system-ui,sans-serif}
        ::-webkit-scrollbar{display:none}
        *{-webkit-font-smoothing:antialiased}
      `}</style>
    </div>
  );
}
