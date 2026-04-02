import { useState, useEffect, useCallback, useRef, useMemo } from "react";

// ═══ DATA ═══
const SKIN=[{n:"Amla",e:"🟢",b:"Highest vitamin C — collagen & brightening",u:"1 murabba or 1 tsp powder daily"},{n:"Aloe Vera",e:"🌿",b:"Hydration, acne scars, anti-aging",u:"2 tbsp juice 3x/week"},{n:"Papaya",e:"🧡",b:"Papain clears dead skin, glow",u:"1 cup 3-4x/week"},{n:"Cucumber+Tomato",e:"🥒",b:"Silica + lycopene",u:"Kachumber every lunch"},{n:"Curd",e:"🥛",b:"Probiotics = clear skin",u:"150g daily"},{n:"Sabja Seeds",e:"🌱",b:"Omega-3, detox",u:"1 tsp in drink"},{n:"Carrot+Beet",e:"🥕",b:"Beta-carotene, purifier",u:"3x/week"},{n:"Gulkand",e:"🌹",b:"Pitta coolant, acne reducer",u:"1 tsp after lunch"},{n:"Turmeric",e:"💛",b:"Anti-inflammatory",u:"In dal + haldi doodh"},{n:"Almonds",e:"🥜",b:"Vitamin E",u:"5-6 peeled daily"}];
const FRU=[{n:"Mango",e:"🥭",b:"Vitamin A&C",t:"Lunch only",c:"70",tip:"Soak 30min",s:"Apr–Jun"},{n:"Watermelon",e:"🍉",b:"92% water",t:"10:30 AM",c:"30",tip:"Eat alone",s:"Mar–Jun"},{n:"Muskmelon",e:"🍈",b:"Potassium",t:"Morning",c:"34",tip:"Black salt",s:"Apr–Jun"},{n:"Papaya",e:"🧡",b:"Skin brightener",t:"Morning",c:"43",tip:"3-4x/week",s:"Year"},{n:"Jamun",e:"🫐",b:"Blood sugar",t:"3 PM",c:"62",tip:"No milk nearby",s:"May–Jul"},{n:"Pineapple",e:"🍍",b:"Bromelain",t:"Mid-morning",c:"50",tip:"Pepper+salt",s:"Mar–Jul"},{n:"Bael",e:"🍐",b:"Gut detox",t:"Sharbat",c:"137",tip:"Jaggery only",s:"Apr–Jun"},{n:"Kokum",e:"🟣",b:"Anti-inflammatory",t:"With lunch",c:"60",tip:"Sol kadhi",s:"Apr–Jun"}];
const VEG=[{n:"Lauki",e:"🫒",b:"96% water, cooling",c:"Sabzi, kofta, juice",tip:"Morning juice"},{n:"Tori",e:"🥬",b:"Blood purifier",c:"Sabzi, dal+tori",tip:"Don't peel fully"},{n:"Karela",e:"🌶️",b:"Blood sugar",c:"Stuffed, sabzi",tip:"Salt soak"},{n:"Cucumber",e:"🥒",b:"Silica, hydrating",c:"Kachumber, raita",tip:"Every meal"},{n:"Pumpkin",e:"🎃",b:"Beta-carotene",c:"Sabzi, soup",tip:"Roast seeds"},{n:"Bhindi",e:"🌿",b:"Fibre, folate",c:"Dry sabzi",tip:"Wash→cut"},{n:"Parval",e:"🟢",b:"Low cal",c:"Dry sabzi",tip:"With moong dal"},{n:"Tinda",e:"⚪",b:"Ultra light",c:"Sabzi",tip:"Jeera-hing"}];
const DRK=[{n:"Chaas",e:"🥛",b:"Probiotics",r:"Curd+water+jeera+mint",c:"45",p:"3g"},{n:"Aam Panna",e:"🥭",b:"Heatstroke prevention",r:"Raw mango+jaggery",c:"60",p:"1g"},{n:"Sattu",e:"💪",b:"Protein",r:"Sattu+water+lemon",c:"120",p:"7g"},{n:"Jaljeera",e:"🌿",b:"Digestive",r:"Jeera+pudina",c:"15",p:"1g"},{n:"Nimbu Pani",e:"🍋",b:"Vitamin C",r:"Lemon+water+salt",c:"20",p:"0g"},{n:"Coconut Water",e:"🥥",b:"Electrolytes",r:"Fresh coconut",c:"45",p:"2g"},{n:"Kokum",e:"🟣",b:"Anti-inflammatory",r:"Kokum+water",c:"40",p:"1g"},{n:"Sabja Water",e:"🌱",b:"Cooling",r:"Sabja+water+lemon",c:"25",p:"2g"}];
const SUP=[{n:"Sabja Seeds",b:"Cooling, omega-3",u:"1 tsp daily"},{n:"Gulkand",b:"Pitta coolant",u:"After lunch"},{n:"Sattu",b:"Protein 20g/100g",u:"Sharbat"},{n:"Kairi",b:"Vitamin C",u:"Panna, chutney"},{n:"Pudina",b:"Cooling",u:"Chutney, chaas"},{n:"Amla",b:"Highest vit C",u:"Murabba"},{n:"Saunf",b:"Anti-bloating",u:"After meals"},{n:"Aloe Vera",b:"Hydration",u:"Juice 3x/week"}];
const RUL=[{i:"🚶",t:"Walk 15 min after lunch",d:"Blood sugar + skin"},{i:"💧",t:"3.5L water daily",d:"Hydration = glow"},{i:"🥭",t:"Mango with lunch only",d:"100g max"},{i:"🚫",t:"Zero refined sugar",d:"Jaggery if needed"},{i:"😴",t:"Sleep by 10 PM",d:"Skin repairs 10–2am"},{i:"🧊",t:"Cooling drink 3 PM",d:"Rotate weekly"},{i:"🥒",t:"Cucumber salad every lunch",d:"Silica"},{i:"☀️",t:"Sunscreen SPF 30+",d:"Daily"},{i:"🧡",t:"Papaya 3-4x/week",d:"Brightening"},{i:"🌹",t:"Gulkand after lunch",d:"Blood purifier"}];

const SW={pw:["5 almonds + 1 walnut (~80)","1 small banana (~90)","4 almonds + 2 cashews (~85)","1 tbsp chia + water (~60)","5 almonds + 3 raisins (~80)","½ banana + 3 almonds (~85)","1 small apple (~70)","4 walnut halves (~80)","1 tbsp peanut butter (~95)","2 dates + 3 almonds (~90)","1 small pear (~60)","Trail mix (~100)","5 almonds + 1 fig (~85)","Mixed seeds 1 tbsp (~80)","½ cup milk + 4 almonds (~110)"],bf:["Moong dal chilla (2) + chutney + curd (~340,P:18g)","Besan chilla (2) + chutney + curd (~340,P:18g)","Poha + peanuts + sprouts (~350,P:14g)","Upma + chutney + sprouts (~340,P:13g)","Ragi dosa (2) + chutney + curd (~350,P:14g)","Idli (3) + sambar + chutney (~360,P:13g)","Uttapam (2) + sambar (~360,P:13g)","Thalipeeth + curd (~340,P:14g)","Dalia + curd (~330,P:13g)","Sabudana khichdi + curd (~370,P:12g)"],mm:["Papaya + sabja (~75)","Watermelon 1.5c (~75)","Coconut water (~45)","Muskmelon + salt (~35)","Pineapple + pepper (~60)","Papaya + turmeric (~65)","Coconut water + almonds (~75)","Carrot-beet juice (~80)","Fruit chaat (~70)","Watermelon + sabja (~80)"],lu:["2 roti+Palak Paneer+salad+curd (~550,P:20g)","2 roti+Daal Bhaji+curd (~480,P:16g)","2 roti+Cabbage-Besan+dal+curd (~490,P:15g)","2 roti+Gobi+dal+curd (~500,P:15g)","2 roti+Paneer Butter Masala+salad (~580,P:22g)","2 roti+Besan-Capsicum+dal (~490,P:16g)","2 roti+Chana Masala+curd (~540,P:20g)","2 roti+Paneer Bhurji+curd (~550,P:22g)","2 roti+Jeera Aloo+dal+curd (~510,P:14g)","2 roti+Masala Bhindi+dal (~500,P:16g)","2 roti+Chana Palak+curd (~530,P:19g)","2 roti+Kadhi Pakora (~520,P:14g)","2 roti+Aloo Gobi+dal (~510,P:14g)","2 roti+Methi Matar Malai+curd (~540,P:16g)","2 roti+Malai Kofta+curd (~570,P:16g)","2 roti+Matar Paneer+curd (~560,P:22g)","2 roti+Aloo Chana Masala+curd (~530,P:18g)","2 roti+Dahi Shev Bhaji (~490,P:13g)","2 roti+Shev Bhaji+dal (~500,P:14g)","2 roti+Lauki Chana Dal+curd (~500,P:17g)","2 roti+Rajma Masala+curd (~560,P:22g)","2 roti+Paneer Do Pyaza+curd (~550,P:20g)","Poori(3)+Bhaji+curd (~560,P:14g)","2 roti+Dum Aloo+dal (~530,P:14g)","2 roti+Dal Makhani+curd (~540,P:18g)","2 roti+Paneer Makhani (~570,P:22g)","2 roti+Green Moong Dal+sabzi (~490,P:18g)","2 roti+Capsicum Masala+dal (~500,P:15g)","2 roti+Dahi Bhindi+curd (~490,P:14g)","2 roti+Baingan Bharta+dal (~500,P:15g)","2 roti+Achari Paneer+curd (~560,P:22g)","2 roti+Veg Korma+curd (~540,P:15g)","2 roti+Lauki Kofta+curd (~520,P:14g)","2 roti+Chawli Masala+curd (~520,P:18g)","2 roti+Kaju Curry+curd (~580,P:16g)","Pasta(wheat)+paneer (~520,P:16g)","2 roti+Soya Chunks (~530,P:24g)","2 roti+Mushroom Matar (~500,P:16g)","2 roti+Bharwa Karela+dal (~510,P:16g)","2 roti+Paneer Tikka Masala (~560,P:24g)","2 roti+Tinda Masala+dal (~490,P:15g)","2 roti+Mix Veg+curd (~510,P:16g)","2 roti+Besan-Taak Curry (~490,P:16g)","2 roti+Palak Dal+tinda (~500,P:17g)","2 roti+Sambar+bhindi (~520,P:16g)","2 roti+Chole+tori+curd (~550,P:20g)","2 roti+Rajma+lauki+curd (~560,P:22g)","2 roti+Moong Dal+bhindi (~530,P:18g)","2 roti+Parval+dal (~480,P:15g)","2 roti+Paneer Tikka+raita (~540,P:22g)"],cd:["Chaas jeera+pudina (~45)","Aam panna (~60)","Sattu sharbat (~120,P:7g)","Jaljeera (~15)","Nimbu pani (~20)","Coconut+sabja (~50)","Kokum sharbat (~40)","Bael sharbat (~70)","Sabja water (~25)","Watermelon+sabja (~50)"],ev:["Green tea+chana (~130)","Tea+makhana (~100)","Tea+kurmura bhel (~130)","Tea+sprouts chaat (~140)","Tea+bhel puri (~130)","Tea+chana jor garam (~130)","Tea+sing bhujia (~140)","Tea+poha chivda (~155)","Tea+baked mathri (~150)","Tea+til chikki (~120)"],dn:["2 roti+Paneer Bhurji+cucumber (~420,P:21g)","Lauki soup+paneer tikka (~320,P:18g)","2 roti+Tori+raita (~340,P:12g)","Moong dal+tinda no roti (~280,P:15g)","Palak Paneer+1 roti (~380,P:22g)","Moong dal cheela(2) (~300,P:18g)","2 roti+Besan-Taak (~360,P:14g)","Paneer Curry+1 roti (~400,P:20g)","Soup+Paneer Bhurji (~340,P:18g)","2 roti+Mix Veg (~350,P:12g)","2 roti+Daal Bhaji (~340,P:16g)","2 roti+Cabbage-Besan (~330,P:12g)","2 roti+Jeera Aloo+raita (~360,P:10g)","2 roti+Masala Bhindi (~350,P:14g)","2 roti+Aloo Gobi (~360,P:12g)","2 roti+Kadhi Pakora (~380,P:14g)","2 roti+Dahi Bhindi (~340,P:13g)","2 roti+Baingan Bharta (~350,P:12g)","2 roti+Chana Palak (~370,P:18g)","2 roti+Capsicum Masala (~340,P:12g)","2 roti+Green Moong Dal (~320,P:16g)","2 roti+Lauki Chana Dal (~350,P:16g)","2 roti+Shev Bhaji (~360,P:12g)","2 roti+Achari Paneer (~400,P:20g)","2 roti+Chawli Masala (~370,P:17g)","2 roti+Matar Paneer (~400,P:20g)","2 roti+Soya Chunks (~380,P:22g)","Khichdi+curd (~350,P:14g)","Dal+sabzi no roti (~280,P:15g)","2 roti+Dum Aloo (~380,P:12g)","2 roti+Rajma (~400,P:20g)","2 roti+Kaju Curry (~420,P:14g)","2 roti+Lauki Kofta (~370,P:14g)","2 roti+Malai Kofta (~400,P:14g)","2 roti+Paneer Makhani (~420,P:22g)","2 roti+Dal Makhani (~400,P:18g)","Soup+paneer (~300,P:18g)","2 roti+Paneer Do Pyaza (~400,P:20g)","2 roti+Chana Masala (~380,P:18g)","2 roti+Palak Dal (~340,P:16g)","2 roti+Tinda Masala (~330,P:12g)","Pasta+salad (~380,P:12g)","2 roti+Bharwa Karela (~350,P:14g)","2 roti+Veg Korma (~380,P:14g)","2 roti+Mushroom Matar (~360,P:14g)","2 roti+Methi Matar (~360,P:14g)","2 roti+Gobi+dal (~350,P:14g)","2 roti+Dahi Shev (~350,P:12g)","2 roti+Aloo Chana (~370,P:16g)","2 roti+Parval+dal (~320,P:14g)"],sd:["Palak Paneer Rice+raita (~520,P:18g)","Paneer Curry+2 roti (~480,P:22g)","Chole Bhature(2) (~600,P:18g)","Pav Bhaji(2 pav) (~550,P:14g)","Dal Makhani+2 roti (~500,P:18g)","Paneer Tikka Masala+2 roti (~520,P:24g)","Kadhi Pakora+2 roti (~480,P:16g)","Veg Biryani+raita (~530,P:14g)","Paneer Butter Masala+2 roti (~540,P:22g)","Malai Kofta+2 roti (~560,P:16g)","Poori(3)+Bhaji (~550,P:14g)","Methi Matar Malai+2 roti (~520,P:16g)","Dum Aloo+2 roti (~500,P:14g)","Paneer Makhani+2 roti (~540,P:22g)","Kaju Curry+2 roti (~560,P:16g)","Rajma+2 roti (~520,P:22g)","Achari Paneer+2 roti (~530,P:22g)","Veg Korma+2 roti (~520,P:16g)","Palak Paneer+2 roti (~500,P:22g)","Pasta+paneer+bread (~550,P:18g)"]};

const MI={pw:"🏋️‍♂️",bf:"🥣",mm:"🍉",lu:"🍱",cd:"❄️",ev:"🫖",dn:"🌃",sd:"🌃"};
const ML={pw:"Pre-Workout",bf:"Breakfast",mm:"Mid-Morning",lu:"Lunch",cd:"Cool Drink",ev:"Evening Snack",dn:"Dinner",sd:"Dinner"};
const TM={pw:330,bf:450,mm:630,lu:780,cd:900,ev:990,dn:1170,sd:1200};

const mk=(s,t,main,qty,cal,sk,note,p)=>({s,t,main,qty,cal,sk,note,p});

// ═══ MEDICINE — positioned in timeline ═══
// D3: before breakfast on Sundays (between pw and bf) — time ~7:00 AM = 420 min
// B12: evening after snack before dinner — time ~7:00 PM = 1140 min
const MED_D3 = { id:"d3", name:"Vitamin D3", time:"7:00 AM", icon:"☀️", color:"#ea580c", position:"before_bf", note:"Before breakfast", mins:420 };
const MED_B12 = { id:"b12", name:"Vitamin B12", time:"7:00 PM", icon:"💊", color:"#7c3aed", position:"before_dn", note:"After dinner", mins:1140 };

function getMedsForDay(day, di) {
  const meds = [];
  // B12 every day — positioned before dinner
  meds.push({ ...MED_B12, detail: "Daily supplement" });
  // D3 only on Sundays, 8 doses total
  if (day.day === "Sun") {
    const sunIdx = Math.floor(di / 7);
    if (sunIdx < 8) meds.push({ ...MED_D3, detail: `Dose ${sunIdx + 1} of 8` });
  }
  return meds;
}

function extractGrocery(meals){let v=new Set(),f=new Set(),g=new Set();const a=(s,arr)=>arr.forEach(i=>s.add(i));meals.forEach(ml=>{const m=ml.main.toLowerCase();a(g,["Oil","Salt","Turmeric","Jeera"]);if(ml.s==="pw")a(g,["Almonds 30g","Walnuts 10g"]);if(ml.s==="bf"){a(g,["Ensure"]);a(v,["Onion","Tomato","Green chilli","Coriander"]);}if(ml.s==="mm"){if(m.includes("papaya"))f.add("Papaya 1");if(m.includes("watermelon"))f.add("Watermelon 500g");if(m.includes("coconut"))f.add("Tender coconut 1");if(m.includes("muskmelon"))f.add("Muskmelon 1");if(m.includes("mango"))f.add("Mango 1");if(m.includes("sabja"))g.add("Sabja seeds");}if(ml.s==="lu"){a(v,["Cucumber 1","Onion 2","Tomato 2","Coriander","Green chilli","Ginger-garlic"]);a(g,["Wheat atta","Curd 200g"]);if(m.includes("mango"))f.add("Mango 100g");if(m.includes("palak paneer")){v.add("Spinach 200g");g.add("Paneer 100g");}if(m.includes("bhindi"))v.add("Bhindi 200g");if(m.includes("kadhi")){g.add("Besan");g.add("Curd extra");}if(m.includes("rajma"))g.add("Rajma 1 cup");if(m.includes("chole")||m.includes("chana masala"))g.add("Chana 1 cup");if(m.includes("chana palak")){g.add("Chana 1 cup");v.add("Spinach 200g");}if(m.includes("aloo gobi")){v.add("Cauliflower 1");v.add("Potato 2");}if(m.includes("matar paneer")){v.add("Peas 1 cup");g.add("Paneer 100g");}if(m.includes("paneer"))g.add("Paneer 200g");if(m.includes("tori"))v.add("Tori 200g");if(m.includes("lauki"))v.add("Lauki 300g");if(m.includes("tinda"))v.add("Tinda 200g");if(m.includes("karela"))v.add("Karela 200g");if(m.includes("besan"))g.add("Besan");if(m.includes("dal makhani"))g.add("Urad dal");if(m.includes("malai kofta")){g.add("Paneer 100g");g.add("Cashew 8");g.add("Cream");}if(m.includes("methi matar")){v.add("Methi 1 bunch");v.add("Peas 1 cup");g.add("Cream");}if(m.includes("baingan"))v.add("Baingan 2");if(m.includes("gobi"))v.add("Cauliflower 1");if(m.includes("korma")){v.add("Mixed vegs 300g");g.add("Cashew 6");}if(m.includes("sambar"))g.add("Toor dal");if(m.includes("moong"))g.add("Moong dal");if(m.includes("pasta"))g.add("Wheat pasta");if(m.includes("soya"))g.add("Soya chunks 50g");if(m.includes("mushroom"))v.add("Mushroom 100g");if(m.includes("kaju"))g.add("Cashew 50g");if(m.includes("dum aloo"))v.add("Baby potato 200g");if(m.includes("capsicum"))v.add("Capsicum 2");if(m.includes("cabbage"))v.add("Cabbage ¼");if(m.includes("shev"))g.add("Thin sev 50g");if(m.includes("chawli"))g.add("Chawli 1 cup");if(m.includes("jeera aloo"))v.add("Potato 3");if(m.includes("parval"))v.add("Parval 200g");}if(ml.s==="cd"){if(m.includes("chaas"))g.add("Curd extra 200g");if(m.includes("aam")||m.includes("raw"))f.add("Raw mango 1");if(m.includes("sattu"))g.add("Sattu 50g");if(m.includes("jaljeera"))g.add("Jaljeera powder");if(m.includes("nimbu")||m.includes("lemon"))f.add("Lemon 2");if(m.includes("coconut"))f.add("Coconut 1");if(m.includes("kokum"))g.add("Kokum syrup");if(m.includes("bael"))f.add("Bael 1");if(m.includes("thandai"))g.add("Thandai mix");if(m.includes("sabja"))g.add("Sabja seeds");if(m.includes("watermelon"))f.add("Watermelon 500g");}if(ml.s==="ev"){g.add("Tea");if(m.includes("chana"))g.add("Roasted chana 50g");if(m.includes("makhana"))g.add("Makhana 30g");if(m.includes("peanut")||m.includes("sing"))g.add("Peanuts 30g");if(m.includes("kurmura")||m.includes("bhel"))g.add("Kurmura 50g");if(m.includes("sprouts"))g.add("Sprouts 60g");if(m.includes("poha"))g.add("Thin poha 50g");if(m.includes("mathri"))g.add("Mathri");if(m.includes("til")||m.includes("chikki"))g.add("Til chikki");if(m.includes("samosa"))g.add("Samosa 1");if(m.includes("vada"))g.add("Vada pav 1");}if(ml.s==="dn"||ml.s==="sd"){a(v,["Cucumber 1"]);a(g,["Wheat atta"]);if(m.includes("paneer"))g.add("Paneer 100g");if(m.includes("lauki"))v.add("Lauki 200g");if(m.includes("tori"))v.add("Tori 200g");if(m.includes("moong"))g.add("Moong dal");if(m.includes("khichdi")){g.add("Moong dal");g.add("Rice ½ cup");}if(m.includes("soup"))v.add("Mixed vegs");if(m.includes("pav bhaji")){v.add("Mixed vegs");g.add("Pav 2");g.add("Butter");}if(m.includes("biryani")){v.add("Mixed vegs");g.add("Basmati rice");g.add("Biryani masala");}if(m.includes("dal makhani")){g.add("Urad dal");g.add("Butter");}if(m.includes("bhature"))g.add("Chana 1 cup");}});return{v:[...v].sort(),f:[...f].sort(),g:[...g].sort()};}

// ═══ 28 DAYS ═══
const D=[
{day:"Mon",date:"30 Mar",tc:"~2,450",meals:[mk("pw","5:30 AM","Soaked almonds + walnut","5+1","80","pw","Peel for absorption"),mk("bf","7:30 AM","Moong dal chilla + chutney + curd","2 chilla + 100g curd","340","bf","+ Ensure","18g"),mk("mm","10:30 AM","Papaya","1 cup","65","mm","Skin glow"),mk("lu","1:00 PM","2 roti + Palak Paneer + kachumber + curd","Standard","550","lu","🥭 Mango 100g","20g"),mk("cd","3:00 PM","Chaas — jeera + pudina","1 glass","45","cd"),mk("ev","4:30 PM","Green tea + roasted chana","1 cup + 30g","130","ev"),mk("dn","7:30 PM","Lauki soup + paneer tikka","1 bowl + 80g","320","dn","Light dinner","18g")]},
{day:"Tue",date:"31 Mar",tc:"~2,400",meals:[mk("pw","5:30 AM","Soaked almonds + walnut","5+1","80","pw"),mk("bf","7:30 AM","Poha + peanuts + sprouts","1.5 cup + 50g","350","bf","+ Ensure","14g"),mk("mm","10:30 AM","Coconut water + 4 almonds","250ml","75","mm"),mk("lu","1:00 PM","2 roti + Chana Masala + salad + curd","Standard","540","lu","🥭 Mango 100g","20g"),mk("cd","3:00 PM","Nimbu pani","1 glass","20","cd"),mk("ev","4:30 PM","Tea + kurmura chivda","1 cup + 40g","170","ev"),mk("dn","7:30 PM","2 roti + Daal Bhaji","Standard","340","dn","","16g")]},
{day:"Wed",date:"1 Apr",tc:"~2,380",meals:[mk("pw","5:30 AM","Soaked almonds + walnut","5+1","80","pw"),mk("bf","7:30 AM","Ragi dosa (2) + chutney + curd","2 + 100g","350","bf","+ Ensure","14g"),mk("mm","10:30 AM","Watermelon","1.5 cups","75","mm"),mk("lu","1:00 PM","2 roti + Kadhi Pakora + salad","Standard","520","lu","🥭 Mango 100g","14g"),mk("cd","3:00 PM","Sattu sharbat","1 glass","120","cd","","7g"),mk("ev","4:30 PM","Tea + til chikki","1 cup + 20g","120","ev"),mk("dn","7:30 PM","2 roti + Tori + raita","Standard","340","dn","","12g")]},
{day:"Thu",date:"2 Apr",tc:"~2,420",meals:[mk("pw","5:30 AM","Soaked almonds + walnut","5+1","80","pw"),mk("bf","7:30 AM","Idli (3) + sambar","3 + sambar","360","bf","+ Ensure","13g"),mk("mm","10:30 AM","Papaya + turmeric","1 cup","65","mm"),mk("lu","1:00 PM","2 roti + Rajma Masala + kachumber + curd","Standard","560","lu","🥭 Mango 100g","22g"),mk("cd","3:00 PM","Aam panna","1 glass","60","cd"),mk("ev","4:30 PM","Tea + sprouts chaat","1 cup + 60g","140","ev"),mk("dn","7:30 PM","2 roti + Besan-Taak Curry","Standard","360","dn","","14g")]},
{day:"Fri",date:"3 Apr",tc:"~2,400",meals:[mk("pw","5:30 AM","Soaked almonds + walnut","5+1","80","pw"),mk("bf","7:30 AM","Oats + milk + chia","40g + 200ml","350","bf","+ Ensure · 1x/week","15g"),mk("mm","10:30 AM","Coconut water","250ml","45","mm"),mk("lu","1:00 PM","2 roti + Aloo Gobi + dal + curd","Standard","510","lu","🥭 Mango 100g","14g"),mk("cd","3:00 PM","Chaas","1 glass","45","cd"),mk("ev","4:30 PM","Tea + baked mathri","1 cup + 30g","150","ev"),mk("dn","7:30 PM","Moong dal + tinda — no roti","1 katori each","280","dn","Ultra light","15g")]},
{day:"Sat",date:"4 Apr",tc:"~2,380",meals:[mk("pw","5:30 AM","Soaked almonds + walnut","5+1","80","pw"),mk("bf","7:30 AM","Thalipeeth + curd","1 + 100g","340","bf","+ Ensure","14g"),mk("mm","10:30 AM","Papaya + sabja","1 cup","75","mm"),mk("lu","1:00 PM","2 roti + Matar Paneer + kachumber + curd","Standard","560","lu","🥭 Mango 100g","22g"),mk("cd","3:00 PM","Jaljeera","1 glass","15","cd"),mk("ev","4:30 PM","Tea + peanuts + chana","1 cup + 30g","145","ev"),mk("dn","7:30 PM","Paneer Curry + 1 roti","80g + 1 roti","400","dn","","20g")]},
{day:"Sun",date:"5 Apr",tc:"~2,900",cheat:true,meals:[mk("pw","5:30 AM","Almonds + banana","5+banana","170","pw","Rest"),mk("bf","9:00 AM","Chole Bhature OR masala dosa","Full plate","450","bf","🎉 Treat!","16g"),mk("mm","11:00 AM","Mango milkshake + dry fruits","1 glass","170","mm"),mk("lu","1:00 PM","Palak Paneer Rice + raita + mango 150g","Full","650","lu","🎉 Rice!","20g"),mk("cd","3:00 PM","Thandai OR mango lassi","1 glass","120","cd"),mk("ev","5:00 PM","Tea + samosa (1 baked)","Treat","250","ev"),mk("dn","8:00 PM","Pav Bhaji OR Paneer Butter Masala + 2 roti","Full","550","sd","🎉 Cheat!","18g")]},
{day:"Mon",date:"6 Apr",tc:"~2,420",meals:[mk("pw","5:30 AM","Soaked almonds + walnut","5+1","80","pw"),mk("bf","7:30 AM","Upma + chutney + sprouts","1.5 katori","340","bf","+ Ensure","13g"),mk("mm","10:30 AM","Muskmelon + salt","1 cup","50","mm"),mk("lu","1:00 PM","2 roti + Paneer Do Pyaza + salad + curd","Standard","550","lu","🥭 Mango 100g","20g"),mk("cd","3:00 PM","Sattu sharbat","1 glass","120","cd","","7g"),mk("ev","4:30 PM","Tea + bhel puri","1 cup","140","ev"),mk("dn","7:30 PM","2 roti + Baingan Bharta","Standard","350","dn","","12g")]},
{day:"Tue",date:"7 Apr",tc:"~2,380",meals:[mk("pw","5:30 AM","Soaked almonds + walnut","5+1","80","pw"),mk("bf","7:30 AM","Besan chilla (2) + chutney + curd","2 + 100g","340","bf","+ Ensure","18g"),mk("mm","10:30 AM","Papaya","1 cup","65","mm"),mk("lu","1:00 PM","2 roti + Methi Matar Malai + curd","Standard","540","lu","🥭 Mango 100g","16g"),mk("cd","3:00 PM","Coconut water + sabja","250ml","50","cd"),mk("ev","4:30 PM","Tea + sing bhujia","1 cup + 25g","140","ev"),mk("dn","7:30 PM","Dal + lauki — no roti","1 katori each","280","dn","","15g")]},
{day:"Wed",date:"8 Apr",tc:"~2,400",meals:[mk("pw","5:30 AM","Soaked almonds + walnut","5+1","80","pw"),mk("bf","7:30 AM","Dosa (2) + sambar","2","360","bf","+ Ensure","13g"),mk("mm","10:30 AM","Watermelon","1.5 cups","75","mm"),mk("lu","1:00 PM","2 roti + Achari Paneer + salad + curd","Standard","560","lu","🥭 Mango 100g","22g"),mk("cd","3:00 PM","Aam panna","1 glass","60","cd"),mk("ev","4:30 PM","Tea + chana jor garam","1 cup + 30g","130","ev"),mk("dn","7:30 PM","Palak Paneer + 1 roti","80g + 1 roti","380","dn","","22g")]},
{day:"Thu",date:"9 Apr",tc:"~2,350",meals:[mk("pw","5:30 AM","Soaked almonds + walnut","5+1","80","pw"),mk("bf","7:30 AM","Lauki paratha + curd","1 + 100g","350","bf","+ Ensure","14g"),mk("mm","10:30 AM","Coconut water","250ml","45","mm"),mk("lu","1:00 PM","2 roti + Lauki Chana Dal + curd","Standard","500","lu","🥭 Mango 100g","17g"),mk("cd","3:00 PM","Chaas","1 glass","45","cd"),mk("ev","4:30 PM","Tea + makhana","1 cup + 25g","110","ev"),mk("dn","7:30 PM","Moong dal cheela (2)","2 cheela","300","dn","Protein + light","18g")]},
{day:"Fri",date:"10 Apr",tc:"~2,400",meals:[mk("pw","5:30 AM","Soaked almonds + walnut","5+1","80","pw"),mk("bf","7:30 AM","Dalia + curd","1.5 katori","330","bf","+ Ensure","13g"),mk("mm","10:30 AM","Papaya + turmeric","1 cup","65","mm"),mk("lu","1:00 PM","2 roti + Malai Kofta + curd","Standard","570","lu","🥭 Mango 100g","16g"),mk("cd","3:00 PM","Jaljeera","1 glass","15","cd"),mk("ev","4:30 PM","Tea + poha chivda","1 cup + 35g","155","ev"),mk("dn","7:30 PM","2 roti + Mix Veg (lauki-tori-tinda)","Standard","350","dn","","12g")]},
{day:"Sat",date:"11 Apr",tc:"~2,380",meals:[mk("pw","5:30 AM","Soaked almonds + walnut","5+1","80","pw"),mk("bf","7:30 AM","Ragi porridge + almonds","1.5 katori","340","bf","+ Ensure","12g"),mk("mm","10:30 AM","Watermelon + mint","1.5 cups","75","mm"),mk("lu","1:00 PM","2 roti + Veg Korma + curd","Standard","540","lu","🥭 Mango 100g","15g"),mk("cd","3:00 PM","Kokum sharbat","1 glass","40","cd"),mk("ev","4:30 PM","Tea + kurmura bhel","1 cup","130","ev"),mk("dn","7:30 PM","Soup + Paneer Bhurji","1 bowl + 60g","340","dn","","18g")]},
{day:"Sun",date:"12 Apr",tc:"~2,850",cheat:true,meals:[mk("pw","5:30 AM","Almonds + banana","5+banana","170","pw","Rest"),mk("bf","9:00 AM","Masala dosa OR puri bhaji","Full","450","bf","🎉 Brunch!","14g"),mk("mm","11:00 AM","Mango milkshake","1 glass","150","mm"),mk("lu","1:00 PM","Paneer Butter Masala + 2 roti + raita + mango","Full","650","lu","🎉","22g"),mk("cd","3:00 PM","Thandai","1 glass","120","cd"),mk("ev","5:00 PM","Tea + vada pav","Treat","280","ev"),mk("dn","8:00 PM","Dal Makhani + 2 roti + raita","Full","520","sd","🎉","18g")]},
];
const D3=D.slice(0,7).map((x,i)=>({...x,date:["13 Apr","14 Apr","15 Apr","16 Apr","17 Apr","18 Apr","19 Apr"][i]}));
const D4=D.slice(7,14).map((x,i)=>({...x,date:["20 Apr","21 Apr","22 Apr","23 Apr","24 Apr","25 Apr","26 Apr"][i]}));
const DAYS=[...D,...D3,...D4];

const FN={Mon:"Monday",Tue:"Tuesday",Wed:"Wednesday",Thu:"Thursday",Fri:"Friday",Sat:"Saturday",Sun:"Sunday"};
const DC=["#16a34a","#2563eb","#ca8a04","#ea580c","#dc2626","#9333ea","#737373"];
const DSC=[{id:"skin",icon:"✨",label:"Skin",cl:"#f59e0b"},{id:"fruits",icon:"🥭",label:"Fruits",cl:"#f59e0b"},{id:"vegs",icon:"🥬",label:"Vegs",cl:"#16a34a"},{id:"drinks",icon:"🧊",label:"Drinks",cl:"#0ea5e9"},{id:"super",icon:"⚡",label:"Super",cl:"#f59e0b"},{id:"rules",icon:"✅",label:"Rules",cl:"#16a34a"}];

function findToday(){const n=new Date(),mo=n.getMonth(),dt=n.getDate(),ms=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];for(let i=0;i<DAYS.length;i++){const[d,mn]=DAYS[i].date.split(" ");if(ms.indexOf(mn)===mo&&parseInt(d)===dt)return i}return 0}
function getNextMeal(meals){const n=new Date(),mins=n.getHours()*60+n.getMinutes();for(let i=0;i<meals.length;i++){const t=TM[meals[i].s];if(t&&mins<t)return i}return-1}
function fmtTime(slot){const t=TM[slot];if(!t)return"";const h=Math.floor(t/60),m=t%60;return`${h>12?h-12:h}:${m.toString().padStart(2,'0')} ${h>=12?'PM':'AM'}`}

// Build timeline with meds inserted at correct position
function buildTimeline(meals, meds) {
  const items = meals.map((ml, i) => ({ type: "meal", data: ml, idx: i }));
  // Insert D3 before breakfast (index 1 = bf)
  const d3Med = meds.find(m => m.position === "before_bf");
  if (d3Med) {
    const bfIdx = items.findIndex(it => it.data.s === "bf");
    if (bfIdx >= 0) items.splice(bfIdx, 0, { type: "med", data: d3Med });
  }
  // Insert B12 before dinner
  const b12Med = meds.find(m => m.position === "before_dn");
  if (b12Med) {
    const dnIdx = items.findIndex(it => it.data.s === "dn" || it.data.s === "sd");
    if (dnIdx >= 0) items.splice(dnIdx, 0, { type: "med", data: b12Med });
  }
  return items;
}

// Is medicine the "next" item based on time?
function isNextMed(med) {
  const n = new Date(), mins = n.getHours() * 60 + n.getMinutes();
  return mins < med.mins;
}

export default function App(){
  const ti=findToday();
  const[di,sD]=useState(ti);
  const[swp,sSW]=useState({});
  const[dr,sDr]=useState(null);
  const[keb,sK]=useState(false);
  const[gv,sGV]=useState(null);
  const[chk,sChk]=useState({});
  const[prof,sProf]=useState(null);
  const[pd,sPD]=useState({firstName:"",lastName:"",gender:"Male",weight:"",height:"",dob:"1983-05-17"});
  const sr=useRef(null);
  const[,sNow]=useState(0);
  useEffect(()=>{const iv=setInterval(()=>sNow(n=>n+1),60000);return()=>clearInterval(iv)},[]);
  useEffect(()=>{sSW({})},[di]);
  useEffect(()=>{if(sr.current?.children[di])sr.current.children[di].scrollIntoView({behavior:"smooth",inline:"center",block:"nearest"})},[di]);

  const d=DAYS[di],dow=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].indexOf(d.day),c=DC[dow];
  const isToday=di===ti,nextMeal=isToday?getNextMeal(d.meals):-1;
  const meds = getMedsForDay(d, di);
  const timeline = useMemo(() => buildTimeline(d.meals, meds), [di]);
  const cyc=useCallback((i,k)=>{sSW(p=>{const o=SW[k];if(!o)return p;return{...p,[i]:((p[i]??-1)+1)%o.length}})},[]);
  const dayG=useMemo(()=>extractGrocery(d.meals),[di]);
  const ws=Math.floor(di/7)*7;
  const weekG=useMemo(()=>{let a=[];for(let i=ws;i<Math.min(ws+7,DAYS.length);i++)a.push(...DAYS[i].meals);return extractGrocery(a)},[ws]);
  const tgChk=(k)=>sChk(p=>({...p,[k]:!p[k]}));
  const G=["linear-gradient(135deg,#f0fdf4,#dcfce7)","linear-gradient(135deg,#eff6ff,#dbeafe)","linear-gradient(135deg,#fefce8,#fef9c3)","linear-gradient(135deg,#fff7ed,#ffedd5)","linear-gradient(135deg,#fef2f2,#fee2e2)","linear-gradient(135deg,#faf5ff,#f3e8ff)","linear-gradient(135deg,#fafafa,#f5f5f5)"];
  const drI=DSC.find(x=>x.id===dr);

  const renderDr=(id)=>{
    const C=({children,k})=><div key={k} style={{background:"white",borderRadius:14,padding:"14px",marginBottom:8,boxShadow:"0 1px 3px rgba(0,0,0,.05)"}}>{children}</div>;
    if(id==="skin")return SKIN.map((s,i)=><C k={i}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}><span style={{fontSize:24}}>{s.e}</span><span style={{fontSize:15,fontWeight:700}}>{s.n}</span></div><div style={{fontSize:13,color:"#555",lineHeight:1.5}}>{s.b}</div><div style={{fontSize:12,color:"#b45309",marginTop:4,fontWeight:600}}>📌 {s.u}</div></C>);
    if(id==="fruits")return FRU.map((f,i)=><C k={i}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}><span style={{fontSize:24}}>{f.e}</span><div><div style={{fontSize:15,fontWeight:700}}>{f.n}</div><div style={{fontSize:11,color:"#888"}}>{f.s} · ~{f.c}kcal</div></div></div><div style={{fontSize:13,color:"#555"}}>{f.b}</div><div style={{fontSize:12,color:"#0369a1",marginTop:3}}>⏰ {f.t}</div></C>);
    if(id==="vegs")return VEG.map((v,i)=><C k={i}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}><span style={{fontSize:22}}>{v.e}</span><span style={{fontSize:15,fontWeight:700}}>{v.n}</span></div><div style={{fontSize:13,color:"#555"}}>{v.b}</div><div style={{fontSize:12,color:"#15803d",marginTop:3}}>🍳 {v.c}</div></C>);
    if(id==="drinks")return DRK.map((x,i)=><C k={i}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}><span style={{fontSize:24}}>{x.e}</span><div><div style={{fontSize:15,fontWeight:700}}>{x.n}</div><div style={{fontSize:11,color:"#0369a1"}}>~{x.c}kcal · P:{x.p}</div></div></div><div style={{fontSize:13,color:"#555"}}>{x.b}</div><div style={{fontSize:12,color:"#666",marginTop:4,background:"#f8fafc",borderRadius:8,padding:"6px 8px"}}>📝 {x.r}</div></C>);
    if(id==="super")return SUP.map((s,i)=><C k={i}><div style={{fontSize:15,fontWeight:700,marginBottom:3}}>{s.n}</div><div style={{fontSize:13,color:"#555"}}>{s.b}</div><div style={{fontSize:12,color:"#b45309",marginTop:3}}>🍽️ {s.u}</div></C>);
    if(id==="rules")return RUL.map((r,i)=><C k={i}><div style={{display:"flex",alignItems:"center",gap:12}}><span style={{fontSize:24}}>{r.i}</span><div><div style={{fontSize:14,fontWeight:700}}>{r.t}</div><div style={{fontSize:12,color:"#777",marginTop:1}}>{r.d}</div></div></div></C>);
    return null;
  };

  const IcoBtn=({children,onClick})=><button onClick={onClick} style={{width:36,height:36,borderRadius:10,border:"none",background:"rgba(255,255,255,.8)",cursor:"pointer",fontSize:16,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"inherit",boxShadow:"0 1px 3px rgba(0,0,0,.06)",WebkitTapHighlightColor:"transparent",flexShrink:0}}>{children}</button>;

  return(
    <div style={{minHeight:"100vh",background:G[dow],fontFamily:"'DM Sans',system-ui,sans-serif",color:"#1a1a1a",paddingBottom:80,transition:"background .4s"}}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet"/>

      {/* ═══ HEADER ═══ */}
      <div style={{position:"sticky",top:0,zIndex:50,background:"rgba(255,255,255,.72)",backdropFilter:"blur(24px)",WebkitBackdropFilter:"blur(24px)",borderBottom:"1px solid rgba(0,0,0,.06)"}}>
        <div style={{maxWidth:500,margin:"0 auto",padding:"12px 16px"}}>
          <div style={{display:"flex",alignItems:"center",height:40}}>
            <div style={{width:36,height:36,borderRadius:10,background:`linear-gradient(135deg,${c}30,${c}60)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0,boxShadow:`0 2px 8px ${c}20`}}>🍽️</div>
            <div style={{marginLeft:10,flex:1}}><div style={{fontSize:19,fontWeight:800,color:"#111",letterSpacing:-.3}}>NutriPlan</div></div>
            <div style={{display:"flex",gap:8,alignItems:"center"}}>
              <div style={{position:"relative"}}>
                <IcoBtn onClick={()=>sK(!keb)}>⋮</IcoBtn>
                {keb&&<div style={{position:"absolute",right:0,top:40,background:"white",borderRadius:14,boxShadow:"0 8px 30px rgba(0,0,0,.15)",border:"1px solid rgba(0,0,0,.06)",padding:4,zIndex:60,minWidth:175,animation:"rise .15s ease"}}>
                  {[{l:"📋 Today's grocery",fn:()=>{sGV({title:`${d.day} ${d.date}`,data:dayG});sK(false)}},{l:"📦 Week's grocery",fn:()=>{sGV({title:`Week ${Math.floor(di/7)+1}`,data:weekG});sK(false)}},{l:`🥬 Vegetables (${dayG.v.length})`,fn:()=>{sGV({title:`Vegs — ${d.date}`,data:{v:dayG.v,f:[],g:[]}});sK(false)}},{l:`🥭 Fruits (${dayG.f.length})`,fn:()=>{sGV({title:`Fruits — ${d.date}`,data:{v:[],f:dayG.f,g:[]}});sK(false)}}].map((b,i)=><button key={i} onClick={b.fn} style={{display:"block",width:"100%",padding:"10px 12px",borderRadius:10,border:"none",background:"transparent",textAlign:"left",fontSize:13,fontWeight:600,color:"#333",cursor:"pointer",fontFamily:"inherit"}}>{b.l}</button>)}
                </div>}
              </div>
              <IcoBtn onClick={()=>sProf(true)}>👤</IcoBtn>
            </div>
          </div>
          <div style={{display:"flex",alignItems:"center",marginTop:8,height:32}}>
            <div style={{flex:1,display:"flex",alignItems:"center",gap:6,minWidth:0}}>
              <span style={{fontSize:14,fontWeight:800,color:"#222"}}>{FN[d.day]}</span>
              {d.cheat&&<span style={{fontSize:8,fontWeight:800,color:"#fff",background:"#dc2626",padding:"2px 6px",borderRadius:5}}>CHEAT</span>}
              <span style={{fontSize:12,color:"#999"}}>·</span>
              <span style={{fontSize:12,color:"#888"}}>{d.date} 2026</span>
              <span style={{fontSize:12,color:"#999"}}>·</span>
              <span style={{fontSize:11,color:"#aaa"}}>Day {di+1}/28</span>
            </div>
            <div style={{display:"flex",alignItems:"center",gap:4,background:d.cheat?"#fef2f2":"rgba(0,0,0,.03)",padding:"4px 10px",borderRadius:8,flexShrink:0}}>
              <span style={{fontSize:11}}>🔥</span>
              <span style={{fontSize:14,fontWeight:800,color:d.cheat?"#dc2626":c}}>{d.tc}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ═══ DAY SCROLLER ═══ */}
      <div ref={sr} style={{maxWidth:520,margin:"0 auto",padding:"8px 16px",display:"flex",gap:6,overflowX:"auto",scrollbarWidth:"none"}}>
        {DAYS.map((x,i)=>{const dw=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].indexOf(x.day),it=i===ti,a=i===di,cl=DC[dw];return(
          <button key={i} onClick={()=>sD(i)} style={{flex:"0 0 auto",padding:"6px 10px",borderRadius:12,minWidth:46,textAlign:"center",background:a?"white":x.cheat?"#fef2f2":"rgba(255,255,255,.35)",border:a?`2px solid ${cl}`:it?`2px dashed ${cl}80`:"1.5px solid transparent",boxShadow:a?`0 3px 12px ${cl}20`:"none",cursor:"pointer",transition:"all .15s",fontFamily:"inherit",WebkitTapHighlightColor:"transparent",transform:a?"scale(1.05)":"scale(1)"}}>
            <div style={{fontSize:9,fontWeight:600,color:a?cl:"#aaa"}}>{x.date.split(" ")[0]}</div>
            <div style={{fontSize:13,fontWeight:a?800:600,color:a?cl:"#888"}}>{x.day}</div>
            {x.cheat&&<div style={{fontSize:7,fontWeight:800,color:"#ef4444"}}>CHEAT</div>}
            {it&&!a&&<div style={{width:5,height:5,borderRadius:3,background:cl,margin:"2px auto 0"}}/>}
          </button>
        )})}
      </div>

      {/* ═══ TIMELINE (meals + meds interleaved) ═══ */}
      <div style={{maxWidth:500,margin:"0 auto",padding:"2px 16px 0"}}>
        {timeline.map((item, ti2) => {

          // ─── MEDICINE CARD ───
          if (item.type === "med") {
            const med = item.data;
            const now2 = new Date(), mins = now2.getHours()*60+now2.getMinutes();
            const isNextItem = isToday && mins < med.mins && (ti2 === 0 || timeline.slice(0, ti2).every(prev => prev.type === "meal" ? mins >= TM[prev.data.s] : mins >= prev.data.mins));
            return (
              <div key={`med-${med.id}`} style={{
                display:"flex",alignItems:"center",gap:12,
                padding:"10px 14px",marginBottom:7,borderRadius:14,
                background:`linear-gradient(135deg, ${med.color}08, ${med.color}15)`,
                border: isNextItem ? `2px solid ${med.color}` : `1.5px solid ${med.color}25`,
                boxShadow: isNextItem ? `0 0 0 1px ${med.color}40, 0 4px 12px ${med.color}20` : `0 1px 4px ${med.color}10`,
                position:"relative",
                animation:`rise .35s ease ${ti2*.04}s both`,
              }}>
                {isNextItem && <div style={{position:"absolute",top:6,right:10,background:med.color,color:"white",fontSize:9,fontWeight:800,padding:"2px 8px",borderRadius:6,display:"flex",alignItems:"center",gap:3}}>⏰ NEXT · {med.time}</div>}
                <div style={{width:40,height:40,borderRadius:12,background:`${med.color}20`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0}}>{med.icon}</div>
                <div style={{flex:1}}>
                  <div style={{display:"flex",alignItems:"center",gap:6}}>
                    <span style={{fontSize:14,fontWeight:700,color:med.color}}>{med.name}</span>
                    <span style={{fontSize:10,color:"#999",background:"rgba(0,0,0,.04)",padding:"2px 6px",borderRadius:5}}>{med.time}</span>
                  </div>
                  <div style={{fontSize:12,color:"#888",marginTop:2}}>{med.note} · {med.detail}</div>
                </div>
              </div>
            );
          }

          // ─── MEAL CARD ───
          const ml = item.data, i = item.idx;
          const sk=ml.s,opts=SW[sk],si=swp[i],sh=si!==undefined&&si>=0;
          const ac=sk==="cd"?"#0284c7":sk==="dn"||sk==="sd"?"#a16207":c;
          const isN=i===nextMeal;
          return(
            <div key={`meal-${i}`} style={{background:sk==="cd"?"linear-gradient(135deg,#f0f9ff,#e0f2fe)":sk==="dn"||sk==="sd"?"linear-gradient(135deg,#fefce8,#fef3c7)":"white",borderRadius:16,marginBottom:7,overflow:"hidden",boxShadow:isN?`0 0 0 2px ${ac}, 0 4px 16px ${ac}25`:"0 1px 6px rgba(0,0,0,.04)",border:isN?"none":"1px solid rgba(0,0,0,.04)",animation:`rise .35s ease ${ti2*.04}s both`,position:"relative"}}>
              {isN&&<div style={{position:"absolute",top:8,right:10,background:`linear-gradient(135deg,${ac},${ac}cc)`,color:"white",fontSize:9,fontWeight:800,padding:"3px 8px",borderRadius:6,display:"flex",alignItems:"center",gap:3,zIndex:2}}>⏰ NEXT · {fmtTime(sk)}</div>}
              <div style={{padding:"10px 12px",display:"flex",gap:10}}>
                <div style={{width:36,height:36,borderRadius:10,background:`linear-gradient(135deg,${ac}12,${ac}25)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0}}>{MI[sk]}</div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:3,gap:4,flexWrap:"wrap"}}>
                    <span style={{fontSize:13,fontWeight:700,color:"#333"}}>{ML[sk]}</span>
                    <div style={{display:"flex",gap:4,flexWrap:"wrap"}}>
                      <span style={{fontSize:10,fontWeight:700,color:"white",background:`linear-gradient(135deg,${ac},${ac}cc)`,padding:"2px 7px",borderRadius:6}}>{ml.cal}</span>
                      {ml.p&&<span style={{fontSize:10,fontWeight:700,color:"#15803d",background:"#dcfce7",padding:"2px 7px",borderRadius:6}}>P:{ml.p}</span>}
                      <span style={{fontSize:10,fontWeight:600,color:"#999",background:"rgba(0,0,0,.03)",padding:"2px 7px",borderRadius:6}}>{ml.t}</span>
                    </div>
                  </div>
                  <div style={{fontSize:14,fontWeight:600,color:"#222",lineHeight:1.5}}>{ml.main}</div>
                  {ml.qty&&<div style={{fontSize:11,color:"#888",marginTop:2}}>📏 {ml.qty}</div>}
                  {ml.note&&<div style={{fontSize:11,color:"#999",marginTop:2}}>{ml.note}</div>}
                  {opts&&<button onClick={()=>cyc(i,sk)} style={{marginTop:5,fontSize:11,fontWeight:700,color:ac,background:`${ac}08`,border:`1px solid ${ac}20`,borderRadius:8,padding:"4px 10px",cursor:"pointer",fontFamily:"inherit",display:"inline-flex",alignItems:"center",gap:4,WebkitTapHighlightColor:"transparent"}}>🔄 {sh?`#${si+1}/${opts.length}`:`${opts.length} options`}</button>}
                </div>
              </div>
              {sh&&opts&&<div style={{background:`${ac}05`,borderTop:`1px solid ${ac}08`,padding:"8px 12px 8px 58px"}}><div style={{fontSize:13,fontWeight:600,color:"#444",lineHeight:1.4}}><span style={{color:ac,fontWeight:800}}>#{si+1} →</span> {opts[si]}</div></div>}
            </div>
          );
        })}

        {/* Summary */}
        <div style={{background:"white",borderRadius:14,padding:"12px",marginTop:4,boxShadow:"0 1px 4px rgba(0,0,0,.04)",display:"flex",justifyContent:"space-around"}}>
          {[{l:"🔥 Cal",v:d.tc,cl:d.cheat?"#dc2626":c},{l:"💪 Prot",v:d.cheat?"~90g":"~75g",cl:"#15803d"},{l:"💧 Water",v:"3.5L",cl:"#0284c7"},{l:"🍽️",v:"7 meals",cl:"#7c3aed"}].map((x,i)=><div key={i} style={{textAlign:"center"}}><div style={{fontSize:15,fontWeight:800,color:x.cl}}>{x.v}</div><div style={{fontSize:9,color:"#aaa",marginTop:1}}>{x.l}</div></div>)}
        </div>
        {d.cheat&&<div style={{background:"linear-gradient(135deg,#fef2f2,#fee2e2)",borderRadius:14,padding:"12px",marginTop:6,border:"1px solid #fecaca"}}><div style={{fontSize:14,fontWeight:800,color:"#dc2626"}}>🎉 Cheat Day</div><div style={{fontSize:12,color:"#666",marginTop:2}}>1 fried max · Extra walk · 4L water · Monday reset!</div></div>}
      </div>

      {/* ═══ BOTTOM BAR ═══ */}
      <div style={{position:"fixed",bottom:0,left:0,right:0,zIndex:100,padding:"0 16px 10px",background:"linear-gradient(to top,rgba(255,255,255,.95) 70%,transparent)"}}>
        <div style={{maxWidth:400,margin:"0 auto",display:"flex",justifyContent:"space-around",background:"white",borderRadius:20,padding:"6px",boxShadow:"0 -2px 16px rgba(0,0,0,.07)",border:"1px solid rgba(0,0,0,.05)"}}>
          {DSC.map(x=><button key={x.id} onClick={()=>sDr(dr===x.id?null:x.id)} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:1,background:dr===x.id?`${x.cl}12`:"transparent",border:dr===x.id?`1px solid ${x.cl}30`:"1px solid transparent",borderRadius:14,padding:"6px 8px",cursor:"pointer",fontFamily:"inherit",WebkitTapHighlightColor:"transparent",minWidth:44}}><span style={{fontSize:20}}>{x.icon}</span><span style={{fontSize:9,fontWeight:700,color:dr===x.id?x.cl:"#bbb"}}>{x.label}</span></button>)}
        </div>
      </div>

      {/* ═══ DRAWERS ═══ */}
      {dr&&<div style={{position:"fixed",inset:0,zIndex:200,display:"flex",flexDirection:"column"}}><div onClick={()=>sDr(null)} style={{flex:"0 0 auto",height:"6vh",background:"rgba(0,0,0,.3)",backdropFilter:"blur(8px)"}}/><div style={{flex:1,background:"#f8fafc",borderRadius:"24px 24px 0 0",display:"flex",flexDirection:"column",overflow:"hidden",animation:"su .3s ease"}}><div style={{padding:"12px 20px 8px",flexShrink:0}}><div style={{width:40,height:4,borderRadius:2,background:"#ddd",margin:"0 auto 10px"}}/><div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}><div style={{display:"flex",alignItems:"center",gap:8}}><span style={{fontSize:22}}>{drI?.icon}</span><span style={{fontSize:17,fontWeight:800}}>{dr==="skin"?"Skin Glow":dr==="fruits"?"Fruits":dr==="vegs"?"Vegetables":dr==="drinks"?"Drinks":dr==="super"?"Superfoods":"Rules"}</span></div><button onClick={()=>sDr(null)} style={{width:34,height:34,borderRadius:10,border:"none",background:"#f1f5f9",color:"#999",fontSize:16,cursor:"pointer",fontFamily:"inherit",display:"flex",alignItems:"center",justifyContent:"center"}}>✕</button></div></div><div style={{flex:1,overflow:"auto",padding:"6px 20px 100px",scrollbarWidth:"none"}}>{renderDr(dr)}</div></div></div>}

      {/* Grocery */}
      {gv&&<div style={{position:"fixed",inset:0,zIndex:300,display:"flex",flexDirection:"column"}}><div onClick={()=>sGV(null)} style={{flex:"0 0 auto",height:"6vh",background:"rgba(0,0,0,.3)",backdropFilter:"blur(8px)"}}/><div style={{flex:1,background:"#f8fafc",borderRadius:"24px 24px 0 0",display:"flex",flexDirection:"column",overflow:"hidden",animation:"su .3s ease"}}><div style={{padding:"12px 20px 8px",flexShrink:0}}><div style={{width:40,height:4,borderRadius:2,background:"#ddd",margin:"0 auto 10px"}}/><div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}><span style={{fontSize:17,fontWeight:800}}>🛒 {gv.title}</span><button onClick={()=>sGV(null)} style={{width:34,height:34,borderRadius:10,border:"none",background:"#f1f5f9",color:"#999",fontSize:16,cursor:"pointer",fontFamily:"inherit",display:"flex",alignItems:"center",justifyContent:"center"}}>✕</button></div></div><div style={{flex:1,overflow:"auto",padding:"6px 20px 100px",scrollbarWidth:"none"}}>{[{l:"🥬 Vegetables",items:gv.data.v,px:"v"},{l:"🥭 Fruits",items:gv.data.f,px:"f"},{l:"🛍️ Grocery",items:gv.data.g,px:"g"}].map(sec=>sec.items.length>0&&<div key={sec.px} style={{marginBottom:14}}><div style={{fontSize:14,fontWeight:700,color:"#555",marginBottom:6}}>{sec.l}</div>{sec.items.map((item,j)=>{const key=`${gv.title}-${sec.px}-${j}`;const done=chk[key];return(<button key={j} onClick={()=>tgChk(key)} style={{display:"flex",alignItems:"center",gap:10,width:"100%",padding:"10px 12px",borderRadius:10,marginBottom:4,background:done?"#f0fdf4":"white",border:done?"1px solid #bbf7d0":"1px solid #eee",cursor:"pointer",fontFamily:"inherit",textAlign:"left",WebkitTapHighlightColor:"transparent"}}><div style={{width:22,height:22,borderRadius:6,border:done?"2px solid #16a34a":"2px solid #ccc",background:done?"#16a34a":"white",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontSize:12,color:"white"}}>{done?"✓":""}</div><span style={{fontSize:14,color:done?"#999":"#333",textDecoration:done?"line-through":"none"}}>{item}</span></button>)})}</div>)}</div></div></div>}

      {/* Profile */}
      {prof&&<div style={{position:"fixed",inset:0,zIndex:300,display:"flex",flexDirection:"column"}}><div onClick={()=>sProf(null)} style={{flex:"0 0 auto",height:"6vh",background:"rgba(0,0,0,.3)",backdropFilter:"blur(8px)"}}/><div style={{flex:1,background:"#f8fafc",borderRadius:"24px 24px 0 0",display:"flex",flexDirection:"column",overflow:"hidden",animation:"su .3s ease"}}><div style={{padding:"12px 20px 8px",flexShrink:0}}><div style={{width:40,height:4,borderRadius:2,background:"#ddd",margin:"0 auto 10px"}}/><div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}><div style={{display:"flex",alignItems:"center",gap:8}}><span style={{fontSize:22}}>👤</span><span style={{fontSize:17,fontWeight:800}}>Profile</span></div><button onClick={()=>sProf(null)} style={{width:34,height:34,borderRadius:10,border:"none",background:"#f1f5f9",color:"#999",fontSize:16,cursor:"pointer",fontFamily:"inherit",display:"flex",alignItems:"center",justifyContent:"center"}}>✕</button></div></div><div style={{flex:1,overflow:"auto",padding:"6px 20px 100px",scrollbarWidth:"none"}}>{[{l:"First Name",k:"firstName",t:"text"},{l:"Last Name",k:"lastName",t:"text"},{l:"Gender",k:"gender",t:"select",opts:["Male","Female","Other"]},{l:"Weight (kg)",k:"weight",t:"number"},{l:"Height (cm)",k:"height",t:"number"},{l:"Date of Birth",k:"dob",t:"date"}].map(f=><div key={f.k} style={{marginBottom:12}}><div style={{fontSize:12,fontWeight:600,color:"#888",marginBottom:4}}>{f.l}</div>{f.t==="select"?<select value={pd[f.k]} onChange={e=>sPD(p=>({...p,[f.k]:e.target.value}))} style={{width:"100%",padding:"10px 12px",borderRadius:10,border:"1px solid #ddd",fontSize:15,fontFamily:"inherit",background:"white"}}>{f.opts.map(o=><option key={o}>{o}</option>)}</select>:<input type={f.t} value={pd[f.k]} onChange={e=>sPD(p=>({...p,[f.k]:e.target.value}))} style={{width:"100%",padding:"10px 12px",borderRadius:10,border:"1px solid #ddd",fontSize:15,fontFamily:"inherit",boxSizing:"border-box"}} placeholder={f.l}/>}</div>)}<div style={{marginTop:12,padding:"14px",background:"white",borderRadius:14,border:"1px solid #eee"}}><div style={{fontSize:14,fontWeight:700,marginBottom:8}}>🔔 Notifications</div><div style={{fontSize:13,color:"#666",lineHeight:1.6}}>💊 B12 — Daily 7 PM<br/>☀️ D3 — Sundays 7 AM<br/>🍽️ Meals — 30 min before</div></div></div></div></div>}

      {keb&&<div onClick={()=>sK(false)} style={{position:"fixed",inset:0,zIndex:40}}/>}

      <style>{`
        @keyframes rise{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
        @keyframes su{from{transform:translateY(100%)}to{transform:translateY(0)}}
        button{font-family:'DM Sans',system-ui,sans-serif}
        ::-webkit-scrollbar{display:none}
        *{-webkit-font-smoothing:antialiased}
        input,select{outline:none}
        input:focus,select:focus{border-color:#0284c7!important}
      `}</style>
    </div>
  );
}
