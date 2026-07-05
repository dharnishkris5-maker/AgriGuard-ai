import React, { useState } from 'react';
import {
  ShieldAlert,
  Search,
  CheckCircle,
  AlertCircle,
  ChevronDown,
  Info,
  Droplets,
  HelpCircle
} from 'lucide-react';
import fertilizersImage from '../assets/fertilizers_display.png';

interface DiseaseInfo {
  id: string;
  crop: string;
  category: 'grain' | 'vegetable' | 'spice' | 'cash';
  nameEn: string;
  nameTa: string;
  nameHi: string;
  pathogenEn: string;
  pathogenTa: string;
  pathogenHi: string;
  symptomsEn: string;
  symptomsTa: string;
  symptomsHi: string;
  treatmentEn: string;
  treatmentTa: string;
  treatmentHi: string;
  fertilizerEn: string;
  fertilizerTa: string;
  fertilizerHi: string;
  dosageEn: string;
  dosageTa: string;
  dosageHi: string;
  cropImage: string;
  fertilizerImage: string;
}

const DISEASES: DiseaseInfo[] = [
  {
    id: 'd-1',
    crop: 'Rice (Paddy)',
    category: 'grain',
    nameEn: 'Rice Blast',
    nameTa: 'நெல் குலை நோய் (Blast)',
    nameHi: 'धान का झुलसा रोग (Rice Blast)',
    pathogenEn: 'Magnaporthe oryzae (Fungus)',
    pathogenTa: 'மேக்னபோர்த் ஓரைசே (பூஞ்சை)',
    pathogenHi: 'मैग्नापोर्टे ओराइजे (कवक)',
    symptomsEn: 'Spindle-shaped spots on leaves with grey centers and brown borders. Can rot collars and nodes.',
    symptomsTa: 'இலைகளில் சாம்பல் நிற மையமும் பழுப்பு நிற எல்லையும் கொண்ட கதிர் வடிவ புள்ளிகள்.',
    symptomsHi: 'पत्तियों पर धूसर केंद्र और भूरे किनारों वाले धुरी के आकार के धब्बे।',
    treatmentEn: 'Spray Tricyclazole 75% WP.',
    treatmentTa: 'ட்ரைசைக்ளசோல் 75% WP தெளிக்கவும்.',
    treatmentHi: 'ट्राइसाइक्लाजोल 75% डब्ल्यूपी का छिड़काव करें।',
    fertilizerEn: 'Apply Silica-based fertilizer & avoid excess Urea.',
    fertilizerTa: 'சிலிக்கா சார்ந்த உரங்களைப் பயன்படுத்தவும், அதிகப்படியான யூரியாவைத் தவிர்க்கவும்.',
    fertilizerHi: 'सिलिका आधारित उर्वरक लगाएं और अतिरिक्त यूरिया से बचें।',
    dosageEn: '0.6 grams of Tricyclazole per 1 Liter of water. Dissolve 120 kg of Silica fertilizer per acre.',
    dosageTa: 'ஒரு லிட்டர் தண்ணீருக்கு 0.6 கிராம் ட்ரைசைக்ளசோல். ஏக்கருக்கு 120 கிலோ சிலிக்கா உரம்.',
    dosageHi: 'प्रति 1 लीटर पानी में 0.6 ग्राम ट्राइसाइक्लाजोल। प्रति एकड़ 120 किलोग्राम सिलिका उर्वरक।',
    cropImage: 'https://images.unsplash.com/photo-1536657464919-8925413f996e?auto=format&fit=crop&w=400&q=80',
    fertilizerImage: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?auto=format&fit=crop&w=150&q=80'
  },
  {
    id: 'd-2',
    crop: 'Tomatoes',
    category: 'vegetable',
    nameEn: 'Late Blight',
    nameTa: 'இலை கருகல் நோய் (Late Blight)',
    nameHi: 'पछेती झुलसा रोग (Late Blight)',
    pathogenEn: 'Phytophthora infestans (Oomycete)',
    pathogenTa: 'பைட்டோப்தோரா இன்ஃபெஸ்டன்ஸ் (நீர் பூஞ்சை)',
    pathogenHi: 'फाइटोफ्थोरा इन्फेस्टन्स',
    symptomsEn: 'Dark water-soaked lesions on leaves and stems, white fungal growth under humid conditions.',
    symptomsTa: 'இலைகள் மற்றும் தண்டுகளில் இருண்ட நீர் தோய்ந்த காயங்கள், ஈரப்பதமான சூழலில் வெண் பூஞ்சை வளரும்.',
    symptomsHi: 'पत्तियों और तनों पर काले पानी से लथपथ घाव, नम परिस्थितियों में सफेद फफूंद का विकास।',
    treatmentEn: 'Spray Metalaxyl 8% + Mancozeb 64% WP.',
    treatmentTa: 'மெட்டாலாக்சில் 8% + மேங்கோசெப் 64% WP தெளிக்கவும்.',
    treatmentHi: 'मेटालैक्सिल 8% + मैन्कोजेब 64% डब्ल्यूपी का छिड़काव करें।',
    fertilizerEn: 'Calcium Nitrate soil amendment.',
    fertilizerTa: 'கால்சியம் நைட்ரேட் மண் திருத்தம்.',
    fertilizerHi: 'कैल्शियम नाइट्रेट मृदा संशोधन।',
    dosageEn: '2.5 grams of Metalaxyl-Mancozeb mix per 1 Liter of water. Apply 1.5 grams Calcium Nitrate per square meter.',
    dosageTa: 'ஒரு லிட்டர் தண்ணீருக்கு 2.5 கிராம் மெட்டாலாக்சில்-மேங்கோசெப் கலவை. ஒரு சதுர மீட்டருக்கு 1.5 கிராம் கால்சியம் நைட்ரேட்.',
    dosageHi: 'प्रति 1 लीटर पानी में 2.5 ग्राम मेटालैक्सिल-मैन्कोजेब मिश्रण। प्रति वर्ग मीटर 1.5 ग्राम कैल्शियम नाइट्रेट लगाएं।',
    cropImage: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=400&q=80',
    fertilizerImage: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=150&q=80'
  },
  {
    id: 'd-3',
    crop: 'Cardamom',
    category: 'spice',
    nameEn: 'Capsule Rot (Azhukal)',
    nameTa: 'அழுகல் நோய் (Capsule Rot)',
    nameHi: 'कैप्सूल सड़न (अझुकल रोग)',
    pathogenEn: 'Phytophthora nicotianae (Fungus)',
    pathogenTa: 'பைட்டோப்தோரா நிகோடியானே (பூஞ்சை)',
    pathogenHi: 'फाइटोफ्थोरा निकोटियाने (कवक)',
    symptomsEn: 'Water-soaked lesions on capsules and leaves, leading to rotting and shedding of capsules.',
    symptomsTa: 'ஏலக்காய்கள் மற்றும் இலைகளில் அழுகல் மற்றும் உதிர்தலை ஏற்படுத்தும் நீர் தோய்ந்த புள்ளிகள்.',
    symptomsHi: 'कैप्सूल और पत्तियों पर पानी से लथपथ घाव, जिससे सड़न और गिरना शुरू हो जाता है।',
    treatmentEn: 'Apply freshly prepared Bordeaux Mixture (1%).',
    treatmentTa: 'புதிதாக தயாரிக்கப்பட்ட போர்டோ கலவை (1%) பயன்படுத்தவும்.',
    treatmentHi: 'ताजा तैयार बोर्डो मिश्रण (1%) लागू करें।',
    fertilizerEn: 'Neem Cake organic compost.',
    fertilizerTa: 'வேப்பம் புண்ணாக்கு கரிம உரம்.',
    fertilizerHi: 'नीम की खली जैविक खाद।',
    dosageEn: '10 grams Copper Sulfate + 10 grams Lime in 1 Liter of water (1% mix). Apply 250g Neem Cake per plant clump.',
    dosageTa: '1 லிட்டர் தண்ணீரில் 10 கிராம் தாமிர சல்பேட் + 10 கிராம் சுண்ணாம்பு (1% கலவை). ஒரு செடிக்கு 250 கிராம் வேப்பம் புண்ணாக்கு.',
    dosageHi: '1 लीटर पानी में 10 ग्राम कॉपर सल्फेट + 10 ग्राम चूना (1% मिश्रण)। प्रति पौधा 250 ग्राम नीम की खली डालें।',
    cropImage: 'https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&w=400&q=80',
    fertilizerImage: 'https://images.unsplash.com/photo-1595855759920-86582396756a?auto=format&fit=crop&w=150&q=80'
  },
  {
    id: 'd-4',
    crop: 'Groundnut (Peanut)',
    category: 'cash',
    nameEn: 'Tikka Leaf Spot',
    nameTa: 'திக்கா இலைப்புள்ளி நோய்',
    nameHi: 'टिक्का पत्ती धब्बा रोग',
    pathogenEn: 'Cercospora arachidicola (Fungus)',
    pathogenTa: 'செர்கோஸ்போரா அராச்சிடிகோலா (பூஞ்சை)',
    pathogenHi: 'सर्कोस्पोरा एराकिडिकोला (कवक)',
    symptomsEn: 'Circular dark brown spots on the upper leaf surface, causing premature leaf shedding.',
    symptomsTa: 'இலையின் மேல் பரப்பில் வட்டமான அடர் பழுப்பு நிற புள்ளிகள் தோன்றி இலைகள் முன்கூட்டியே உதிரும்.',
    symptomsHi: 'पत्ती की ऊपरी सतह पर गोलाकार गहरे भूरे रंग के धब्बे, जिससे पत्तियां समय से पहले गिर जाती हैं।',
    treatmentEn: 'Spray Carbendazim 50% WP.',
    treatmentTa: 'கார்பெண்டாசிம் 50% WP தெளிக்கவும்.',
    treatmentHi: 'कार्बेन्डाजिम 50% डब्ल्यूपी का छिड़काव करें।',
    fertilizerEn: 'Gypsum (Calcium Sulfate) soil supplement.',
    fertilizerTa: 'ஜிப்சம் (கால்சியம் சல்பேட்) மண் உரம்.',
    fertilizerHi: 'जिप्सम (कैल्शियम सल्फेट) मृदा पूरक।',
    dosageEn: '1.0 gram Carbendazim per 1 Liter of water. Top-dress 160 kg Gypsum per acre at pegging.',
    dosageTa: 'ஒரு லிட்டர் தண்ணீருக்கு 1.0 கிராம் கார்பெண்டாசிம். ஏக்கருக்கு 160 கிலோ ஜிப்சம் உரம் இடவும்.',
    dosageHi: 'प्रति 1 लीटर पानी में 1.0 gram कार्बेन्डाजिम। पेगिंग के समय प्रति एकड़ 160 किलोग्राम जिप्सम डालें।',
    cropImage: 'https://images.unsplash.com/photo-1568254183919-78a4f43a2877?auto=format&fit=crop&w=400&q=80',
    fertilizerImage: 'https://images.unsplash.com/photo-1628352081506-83c43123ed6d?auto=format&fit=crop&w=150&q=80'
  },
  {
    id: 'd-5',
    crop: 'Cotton',
    category: 'cash',
    nameEn: 'Bacterial Leaf Blight',
    nameTa: 'பாக்டீரியா இலை கருகல் நோய்',
    nameHi: 'जीवाणु पत्ती झुलसा (Blight)',
    pathogenEn: 'Xanthomonas citri pv. malvacearum',
    pathogenTa: 'சாந்தோமோனாஸ் சிட்ரி (பாக்டீரியா)',
    pathogenHi: 'जैंथोमोनास सिट्री जीवाणु',
    symptomsEn: 'Angular water-soaked spots on leaves that turn brown/black, black arm lesions on stems.',
    symptomsTa: 'இலைகளில் கோண வடிவிலான நீர் தோய்ந்த புள்ளிகள் பழுப்பு/கருப்பாக மாறும், தண்டுகளில் கருப்பு நிற வடுக்கள்.',
    symptomsHi: 'पत्तियों पर कोणीय पानी से लथपथ धब्बे जो भूरे/काले हो जाते हैं, तनों पर काले रंग के घाव।',
    treatmentEn: 'Spray Streptomycin Sulfate + Copper Oxychloride.',
    treatmentTa: 'ஸ்ட்ரெப்டோமைசின் சல்பேட் + காப்பர் ஆக்ஸிகுளோரைடு தெளிக்கவும்.',
    treatmentHi: 'स्ट्रेप्टोमाइसिन सल्फेट + कॉपर ऑक्सीक्लोराइड का छिड़काव करें।',
    fertilizerEn: 'Magnesium Sulfate micronutrient.',
    fertilizerTa: 'மெக்னீசியம் சல்பேட் நுண்ணூட்டச்சத்து.',
    fertilizerHi: 'मैग्नीशियम सल्फेट सूक्ष्म पोषक तत्व।',
    dosageEn: 'Mix 0.1g Streptomycin + 2.5g Copper Oxychloride per 1 Liter of water. Apply 20 kg Magnesium Sulfate per acre.',
    dosageTa: '1 லிட்டர் தண்ணீரில் 0.1 கிராம் ஸ்ட்ரெப்டோமைசின் + 2.5 கிராம் காப்பர் ஆக்ஸிகுளோரைடு. ஏக்கருக்கு 20 கிலோ மெக்னீசியம் சல்பேட்.',
    dosageHi: 'प्रति 1 लीटर पानी में 0.1 ग्राम स्ट्रेप्टोमाइसिन + 2.5 ग्राम कॉपर ऑक्सीक्लोराइड मिलाएं। प्रति एकड़ 20 किलो मैग्नीशियम सल्फेट लगाएं।',
    cropImage: 'https://images.unsplash.com/photo-1594489428504-5c0c480a15fd?auto=format&fit=crop&w=400&q=80',
    fertilizerImage: 'https://images.unsplash.com/photo-1605371924599-2d0365da1ae0?auto=format&fit=crop&w=150&q=80'
  },
  {
    id: 'd-6',
    crop: 'Sugarcane',
    category: 'cash',
    nameEn: 'Red Rot',
    nameTa: 'சிவப்பு அழுகல் நோய்',
    nameHi: 'लाल सड़न रोग (Red Rot)',
    pathogenEn: 'Colletotrichum falcatum (Fungus)',
    pathogenTa: 'கொலட்டோட்ரைகம் பால்கேட்டம் (பூஞ்சை)',
    pathogenHi: 'कोलेटोट्राइकम फाल्केटम (कवक)',
    symptomsEn: 'Reddening of internal pith tissue with white cross bands, leaves turn yellow and dry up.',
    symptomsTa: 'தண்டின் உட்பகுதி சிவப்பு நிறமாக மாறி வெண் கோடுகள் காணப்படும், இலைகள் மஞ்சள் நிறமாகி காயும்.',
    symptomsHi: 'सफेद क्रॉस बैंड के साथ आंतरिक मज्जा ऊतक का लाल होना, पत्तियां पीली होकर सूख जाती हैं।',
    treatmentEn: 'Soak seed sets in Carbendazim solution before sowing.',
    treatmentTa: 'விதைப்பதற்கு முன் கரும்பு துண்டுகளை கார்பெண்டாசிம் கரைசலில் நனைக்கவும்.',
    treatmentHi: 'बुवाई से पहले बीज के टुकड़ों को कार्बेन्डाजिम घोल में भिगोएँ।',
    fertilizerEn: 'Muriate of Potash (Potassium-rich).',
    fertilizerTa: 'மியூரியேட் ஆஃப் பொட்டாஷ் (பொட்டாசியம் உரம்).',
    fertilizerHi: 'म्यूरिएट ऑफ पोटाश (पोटेशियम युक्त)।',
    dosageEn: '0.5g Carbendazim per 1 Liter of water for 15-minute soaking. Apply 32 kg Muriate of Potash per acre.',
    dosageTa: '15 நிமிட ஊறவைக்க 1 லிட்டர் தண்ணீருக்கு 0.5 கிராம் கார்பெண்டாசிம். ஏக்கருக்கு 32 கிலோ மியூரியேட் ஆஃப் பொட்டாஷ்.',
    dosageHi: '15 मिनट भिगोने के लिए प्रति 1 लीटर पानी में 0.5 ग्राम कार्बेन्डाजिम। प्रति एकड़ 32 किलोग्राम म्यूरिएट ऑफ पोटाश लगाएं।',
    cropImage: 'https://images.unsplash.com/photo-1593113630400-ea4288922497?auto=format&fit=crop&w=400&q=80',
    fertilizerImage: 'https://images.unsplash.com/photo-1589156280159-27698a70f29e?auto=format&fit=crop&w=150&q=80'
  },
  {
    id: 'd-7',
    crop: 'Potatoes',
    category: 'vegetable',
    nameEn: 'Common Scab',
    nameTa: 'உருளைக்கிழங்கு சொறி நோய் (Scab)',
    nameHi: 'आलू का आम खुरंड रोग (Scab)',
    pathogenEn: 'Streptomyces scabies (Actinomycete)',
    pathogenTa: 'ஸ்ட்ரெப்டோமைசஸ் ஸ்கேபிஸ்',
    pathogenHi: 'स्ट्रैप्टोमाइसेस स्केबीज',
    symptomsEn: 'Cork-like raised lesions on the potato tuber surface, rendering tubers unmarketable.',
    symptomsTa: 'உருளைக்கிழங்கின் மேற்பரப்பில் தக்கை போன்ற சொறி வடுக்கள் ஏற்பட்டு விற்பனைத் தன்மையை பாதிக்கும்.',
    symptomsHi: 'आलू कंद की सतह पर काग की तरह उभरे हुए घाव, जिससे कंद बेचने योग्य नहीं रह जाते।',
    treatmentEn: 'Apply elemental sulfur to lower soil pH below 5.2.',
    treatmentTa: 'மண்ணின் pH ஐ 5.2 க்குக் கீழே குறைக்க கந்தகத்தைப் பயன்படுத்தவும்.',
    treatmentHi: 'मिट्टी के पीएच को 5.2 से नीचे करने के लिए मौलिक सल्फर लगाएं।',
    fertilizerEn: 'Ammonium Sulfate acidifying fertilizer.',
    fertilizerTa: 'அம்மோனியம் சல்பேட் அமிலமாக்கும் உரம்.',
    fertilizerHi: 'अमोनियम सल्फेट अम्लीय उर्वरक।',
    dosageEn: 'Broadcast 250 kg Elemental Sulfur per hectare in alkaline soils. Apply 80 kg Ammonium Sulfate per acre.',
    dosageTa: 'ஏக்கருக்கு 100 கிலோ கந்தகத்தூள் இடவும். ஏக்கருக்கு 80 கிலோ அம்மோனியம் சல்பேட் இடவும்.',
    dosageHi: 'क्षारीय मिट्टी में प्रति हेक्टेयर 250 किलोग्राम मौलिक सल्फर बिखेरें। प्रति एकड़ 80 किलोग्राम अमोनियम सल्फेट लगाएं।',
    cropImage: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=400&q=80',
    fertilizerImage: 'https://images.unsplash.com/photo-1550782674-fa597ecc1bc8?auto=format&fit=crop&w=150&q=80'
  },
  {
    id: 'd-8',
    crop: 'Maize (Corn)',
    category: 'grain',
    nameEn: 'Southern Leaf Blight',
    nameTa: 'தெற்கு இலை கருகல் நோய்',
    nameHi: 'दक्खनी पत्ती झुलसा रोग',
    pathogenEn: 'Bipolaris maydis (Fungus)',
    pathogenTa: 'பைபோலாரிஸ் மேடிஸ் (பூஞ்சை)',
    pathogenHi: 'बायपोलरिन मेडिस (कवक)',
    symptomsEn: 'Small, oval lesions on leaves that elongate into rectangular brown spots with green margins.',
    symptomsTa: 'இலைகளில் சிறிய, நீள்வட்ட புள்ளிகள் தோன்றி பழுப்பு நிற செவ்வக வடிவமாக மாறும்.',
    symptomsHi: 'पत्तियों पर छोटे, अंडाकार घाव जो हरे किनारों वाले आयताकार भूरे धब्बों में बदल जाते हैं।',
    treatmentEn: 'Spray Propiconazole 25% EC.',
    treatmentTa: 'புரோபிகோனசோல் 25% EC தெளிக்கவும்.',
    treatmentHi: 'प्रोपीकोनाज़ोल 25% ईसी का छिड़काव करें।',
    fertilizerEn: 'Urea (Nitrogen side-dressing).',
    fertilizerTa: 'யூரியா (நைட்ரஜன் உரம்).',
    fertilizerHi: 'यूरिया (नाइट्रोजन साइड-ड्रेसिंग)।',
    dosageEn: '1.0 ml of Propiconazole per 1 Liter of water. Apply 45 kg of Urea per acre when stalks reach knee-high.',
    dosageTa: 'ஒரு லிட்டர் தண்ணீருக்கு 1.0 மிலி புரோபிகோனசோல். ஏக்கருக்கு 45 கிலோ யூரியா உரம் இடவும்.',
    dosageHi: 'प्रति 1 लीटर पानी में 1.0 मिली प्रोपीकोनाज़ोल। घुटने तक फसल आने पर प्रति एकड़ 45 किलोग्राम यूरिया लगाएं।',
    cropImage: 'https://images.unsplash.com/photo-1551754655-cd27e38d20f6?auto=format&fit=crop&w=400&q=80',
    fertilizerImage: 'https://images.unsplash.com/photo-1532187863486-abf9d39d66e8?auto=format&fit=crop&w=150&q=80'
  }
];

const UI_TEXT = {
  en: {
    title: 'Fertilizer & Plant Disease Guide',
    subtitle: 'Search diagnostic profiles for common pathogens, precise treatment formulas, and fertilizer dosage instructions.',
    searchPlaceholder: 'Search by crop, disease, or treatment...',
    filterAll: 'All Categories',
    filterGrain: 'Staple Grains',
    filterVeg: 'Vegetables',
    filterSpice: 'Spices',
    filterCash: 'Cash Crops',
    pathogen: 'Pathogen',
    symptoms: 'Symptoms & Indicators',
    treatment: 'Fungicide / Insecticide Treatment',
    fertilizer: 'Target Fertilizer / Soil Amendment',
    dosage: 'Precise Dosage / Measurement',
    notFound: 'No diagnostic logs matching your query were found.'
  },
  ta: {
    title: 'உரங்கள் மற்றும் தாவர நோய் வழிகாட்டி',
    subtitle: 'பொதுவான நோய்க்கிருமிகள், துல்லியமான சிகிச்சை சூத்திரங்கள் மற்றும் உர அளவீட்டு வழிமுறைகளைத் தேடுங்கள்.',
    searchPlaceholder: 'பயிர், நோய் அல்லது சிகிச்சை மூலம் தேடுங்கள்...',
    filterAll: 'அனைத்து பிரிவுகள்',
    filterGrain: 'தானிய பயிர்கள்',
    filterVeg: 'காய்கறி வகைகள்',
    filterSpice: 'நறுமணப் பயிர்கள்',
    filterCash: 'வணிகப் பயிர்கள்',
    pathogen: 'நோய்க்கிருமி',
    symptoms: 'அறிகுறிகள்',
    treatment: 'பூஞ்சைக்கொல்லி / பூச்சிக்கொல்லி சிகிச்சை',
    fertilizer: 'பரிந்துரைக்கப்படும் உரம் / மண் திருத்தம்',
    dosage: 'துல்லியமான அளவு / அளவீடு',
    notFound: 'உங்கள் தேடலுக்குப் பொருத்தமான நோய் பதிவுகள் எதுவும் இல்லை.'
  },
  hi: {
    title: 'उर्वरक एवं पौधा रोग गाइड',
    subtitle: 'सामान्य रोगजनकों, सटीक उपचार सूत्रों और उर्वरक खुराक निर्देशों के लिए नैदानिक प्रोफाइल खोजें।',
    searchPlaceholder: 'फसल, बीमारी या उपचार द्वारा खोजें...',
    filterAll: 'सभी श्रेणियां',
    filterGrain: 'मुख्य खाद्यान्न',
    filterVeg: 'सब्जियां',
    filterSpice: 'मसाले',
    filterCash: 'नकदी फसलें',
    pathogen: 'रोगजनक',
    symptoms: 'लक्षण और संकेतक',
    treatment: 'कवकनाशी / कीटनाशक उपचार',
    fertilizer: 'लक्षित उर्वरक / मृदा संशोधन',
    dosage: 'सटीक खुराक / माप',
    notFound: 'आपकी खोज से मेल खाने वाला कोई नैदानिक डेटा नहीं मिला।'
  }
};

interface FertilizersPageProps {
  theme: 'light' | 'dark';
  language: 'en' | 'ta' | 'hi';
}

export function FertilizersPage({ theme, language }: FertilizersPageProps) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<'all' | 'grain' | 'vegetable' | 'spice' | 'cash'>('all');
  const labels = UI_TEXT[language] || UI_TEXT.en;

  const filtered = DISEASES.filter(d => {
    const matchesCategory = category === 'all' || d.category === category;
    
    const query = search.toLowerCase();
    const matchesSearch = 
      d.crop.toLowerCase().includes(query) ||
      d.nameEn.toLowerCase().includes(query) ||
      d.nameTa.toLowerCase().includes(query) ||
      d.nameHi.toLowerCase().includes(query) ||
      d.treatmentEn.toLowerCase().includes(query) ||
      d.treatmentTa.toLowerCase().includes(query) ||
      d.treatmentHi.toLowerCase().includes(query);

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-8 animate-fade-in">
      {/* HEADER & CONTROLS */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div className="space-y-1">
          <h1 className="text-xl font-extrabold tracking-tight text-slate-800 dark:text-slate-100 flex items-center gap-2.5">
            <ShieldAlert className="w-5.5 h-5.5 text-emerald-500" />
            {labels.title}
          </h1>
          <p className="text-xs text-slate-500 leading-relaxed max-w-2xl font-light">
            {labels.subtitle}
          </p>
        </div>

        {/* SEARCH AND CATEGORY FILTER */}
        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
          <div className="relative flex-1 sm:w-64">
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder={labels.searchPlaceholder}
              className="w-full pl-9 pr-3 py-1.5 rounded-xl border text-xs font-medium focus:ring-1 focus:ring-emerald-500 dark:bg-slate-800 dark:border-slate-700 outline-none text-slate-700 dark:text-slate-200"
            />
            <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-400" />
          </div>

          <div className="flex gap-1 bg-slate-100 dark:bg-slate-800/80 p-0.5 rounded-xl border dark:border-slate-700/50">
            {(['all', 'grain', 'vegetable', 'spice', 'cash'] as const).map(cat => {
              const isActive = category === cat;
              let name = labels.filterAll;
              if (cat === 'grain') name = labels.filterGrain;
              if (cat === 'vegetable') name = labels.filterVeg;
              if (cat === 'spice') name = labels.filterSpice;
              if (cat === 'cash') name = labels.filterCash;

              return (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-3 py-1 text-[10px] font-bold rounded-lg transition-all cursor-pointer ${
                    isActive
                      ? 'bg-slate-900 text-slate-100 dark:bg-emerald-500 dark:text-slate-950 shadow-sm'
                      : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
                  }`}
                >
                  {name}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Fertilizers Banner Section */}
      <div className={`p-6 rounded-3xl border ${theme === 'dark' ? 'bg-slate-900/40 border-slate-800/80' : 'bg-white border-slate-200 shadow-sm'} grid grid-cols-1 lg:grid-cols-12 gap-6 items-center overflow-hidden relative`}>
        <div className="lg:col-span-8 space-y-3">
          <span className="text-[9px] font-mono tracking-widest text-emerald-500 uppercase font-extrabold">AgriGuard NPK Guide</span>
          <h2 className="text-xl font-black text-slate-800 dark:text-slate-100">Optimal Fertilizer & Pathology Registry</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-light">
            Proper fertilization dosage is crucial to maximize harvest quality and build crop immunity against fungal and bacterial vectors. Follow precise water dilution ratios to avoid soil toxicity.
          </p>
        </div>
        <div className="lg:col-span-4 flex justify-center">
          <img 
            src={fertilizersImage} 
            alt="Fertilizers Guide Banner" 
            className="w-full max-w-[200px] h-auto object-contain rounded-2xl border dark:border-slate-800 shadow-lg shadow-emerald-500/5 hover:scale-105 transition-transform" 
          />
        </div>
      </div>

      {/* DISEASES DATABASE CARDS */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center space-y-2 border dark:border-slate-800 rounded-3xl bg-slate-500/5">
          <HelpCircle className="w-8 h-8 text-slate-400 dark:text-slate-600" />
          <p className="text-xs text-slate-500 font-mono">{labels.notFound}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((disease, index) => {
            // Pick strings based on active language
            const dName = language === 'ta' ? disease.nameTa : language === 'hi' ? disease.nameHi : disease.nameEn;
            const dPathogen = language === 'ta' ? disease.pathogenTa : language === 'hi' ? disease.pathogenHi : disease.pathogenEn;
            const dSymptoms = language === 'ta' ? disease.symptomsTa : language === 'hi' ? disease.symptomsHi : disease.symptomsEn;
            const dTreatment = language === 'ta' ? disease.treatmentTa : language === 'hi' ? disease.treatmentHi : disease.treatmentEn;
            const dFertilizer = language === 'ta' ? disease.fertilizerTa : language === 'hi' ? disease.fertilizerHi : disease.fertilizerEn;
            const dDosage = language === 'ta' ? disease.dosageTa : language === 'hi' ? disease.dosageHi : disease.dosageEn;

            return (
              <div
                key={disease.id}
                className={`p-6 rounded-2xl border ${
                  theme === 'dark' ? 'bg-slate-900/30 border-slate-800/80 hover:bg-slate-900/45' : 'bg-white border-slate-200 shadow-sm hover:shadow-md'
                } transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg hover:shadow-emerald-500/5 hover:border-emerald-500/30 animate-fade-in-up space-y-5 flex flex-col justify-between`}
                style={{ animationDelay: `${index * 60}ms`, opacity: 0, animationFillMode: 'forwards' }}
              >
                {/* Crop & Disease Title Header */}
                <div className="flex justify-between items-start border-b dark:border-slate-800 pb-3 gap-3">
                  <div className="flex items-center gap-3">
                    <img 
                      src={disease.cropImage} 
                      alt={disease.crop} 
                      className="w-12 h-12 rounded-xl object-cover border border-slate-200 dark:border-slate-800 shrink-0" 
                    />
                    <div>
                      <span className="text-[9px] font-mono tracking-widest text-emerald-500 uppercase font-extrabold">
                        {disease.crop}
                      </span>
                      <h3 className="text-base font-black text-slate-800 dark:text-slate-100 mt-0.5">
                        {dName}
                      </h3>
                    </div>
                  </div>
                  <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-rose-500/10 border border-rose-500/20 text-rose-500 font-mono uppercase shrink-0">
                    {dPathogen}
                  </span>
                </div>

                {/* Symptoms and indicators */}
                <div className="space-y-1">
                  <span className="text-[9px] font-extrabold uppercase tracking-widest text-slate-400">
                    {labels.symptoms}
                  </span>
                  <p className="text-xs text-slate-600 dark:text-slate-300 font-light leading-relaxed">
                    {dSymptoms}
                  </p>
                </div>

                {/* Treatment / Fertilizer Actions Card */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-100/50 dark:bg-slate-800/20 p-4 rounded-xl border dark:border-slate-800/40 text-xs font-semibold">
                  <div className="space-y-1">
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                      <AlertCircle className="w-3.5 h-3.5 text-rose-500" /> {labels.treatment}
                    </span>
                    <p className="text-slate-700 dark:text-slate-200 leading-normal font-medium">{dTreatment}</p>
                  </div>

                  <div className="space-y-1 flex items-start gap-3">
                    <div className="space-y-1 flex-1">
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                        <Droplets className="w-3.5 h-3.5 text-blue-500" /> {labels.fertilizer}
                      </span>
                      <p className="text-slate-700 dark:text-slate-200 leading-normal font-medium">{dFertilizer}</p>
                    </div>
                    <img 
                      src={disease.fertilizerImage} 
                      alt="Fertilizer visual" 
                      className="w-10 h-10 rounded-lg object-cover border border-slate-200 dark:border-slate-800 shrink-0" 
                    />
                  </div>
                </div>

                {/* Exact Measurement dosage instruction */}
                <div className="pt-2 flex gap-3.5 items-start">
                  <div className="p-2 bg-emerald-500/10 rounded-xl text-emerald-500 border border-emerald-500/20 shrink-0">
                    <CheckCircle className="w-4 h-4" />
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-[9px] font-extrabold uppercase tracking-widest text-emerald-500 dark:text-emerald-400">
                      {labels.dosage}
                    </span>
                    <p className="text-xs text-slate-700 dark:text-slate-200 leading-normal font-mono font-bold">
                      {dDosage}
                    </p>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
