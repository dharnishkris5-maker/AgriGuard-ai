import React, { useState, useEffect } from 'react';
import {
  MessageSquare,
  Send,
  User,
  Sprout,
  HelpCircle,
  Sparkles,
  Mic,
  MicOff,
  Volume2
} from 'lucide-react';
import { PredictionHistory } from '../types/index.js';

interface AIChatAssistantProps {
  theme: 'light' | 'dark';
  predictions: PredictionHistory[];
  language: 'en' | 'ta' | 'hi';
}

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: Date;
}

const t = {
  en: {
    title: 'Agronomy AI Chat Assistant',
    subtitle: 'Consult our expert crop-protection intelligence assistant for rapid troubleshooting, organic tips, and farming guidelines.',
    placeholder: 'Ask our virtual agronomist anything...',
    suggestTitle: 'Suggested Inquiries',
    suggestDesc: 'Select an essential soil-chemistry topic to retrieve immediate algorithmic recommendations.',
    welcomeMsg: 'Greetings from AgriGuard AI! I am your virtual agronomist. Ask me any technical questions about soil macronutrients, crop irrigation schedules, disease controls, or fertilization ratios.',
    typing: 'Agent typing',
    quickQuestions: [
      'What was my latest recommended crop and its explanation?',
      'What fertilizers are recommended for my predicted crop?',
      'What is the irrigation/watering strategy for my field?',
      'What disease prevention steps should I take for my crop?'
    ]
  },
  ta: {
    title: 'AI வேளாண் அரட்டை உதவியாளர்',
    subtitle: 'பூச்சி மேலாண்மை, இயற்கை குறிப்புகள் மற்றும் விவசாய வழிகாட்டுதல்களுக்கு எங்கள் வேளாண் நிபுணரை அணுகவும்.',
    placeholder: 'எங்கள் வேளாண் நிபுணரிடம் ஏதேனும் கேளுங்கள்...',
    suggestTitle: 'பரிந்துரைக்கப்பட்ட கேள்விகள்',
    suggestDesc: 'உடனடி வேளாண் ஆலோசனைகளைப் பெற கீழே உள்ள ஏதேனும் ஒரு தலைப்பைத் தேர்ந்தெடுக்கவும்.',
    welcomeMsg: 'அக்ரிகார்டு AI அரட்டைக்கு உங்களை வரவேற்கிறோம்! நான் உங்கள் மெய்நிகர் வேளாண் நிபுணர். மண் சத்துக்கள், பாசன அட்டவணைகள் மற்றும் உர விகிதங்கள் பற்றி என்னிடம் கேளுங்கள்.',
    typing: 'ஏஜென்ட் தட்டச்சு செய்கிறார்',
    quickQuestions: [
      'எனது சமீபத்திய பரிந்துரைக்கப்பட்ட பயிர் மற்றும் அதன் விளக்கம் என்ன?',
      'எனது பயிருக்கு என்ன உரங்கள் பரிந்துரைக்கப்படுகின்றன?',
      'எனது நிலத்திற்கான நீர் பாசன உத்தி என்ன?',
      'எனது பயிருக்கு என்ன நோய் தடுப்பு நடவடிக்கைகள் எடுக்க வேண்டும்?'
    ]
  },
  hi: {
    title: 'एआई कृषि चैट सहायक',
    subtitle: 'त्वरित समस्या निवारण, जैविक सुझावों और खेती के दिशा-निर्देशों के लिए हमारे विशेषज्ञ कृषि सहायक से परामर्श लें।',
    placeholder: 'हमारे कृषि विशेषज्ञ से कुछ भी पूछें...',
    suggestTitle: 'सुझाए गए प्रश्न',
    suggestDesc: 'तत्काल अनुशंसाएँ प्राप्त करने के लिए मिट्टी-रसायन विज्ञान विषय का चयन करें।',
    welcomeMsg: 'एग्रीगार्ड एआई में आपका स्वागत है! मैं आपका वर्चुअल कृषि विज्ञानी हूं। मिट्टी के मैक्रोन्यूट्रिएंट्स, सिंचाई कार्यक्रम या रोग नियंत्रण के बारे में मुझसे पूछें।',
    typing: 'एजेंट लिख रहा है',
    quickQuestions: [
      'मेरी नवीनतम अनुशंसित फसल और उसका विवरण क्या था?',
      'मेरी अनुमानित फसल के लिए कौन से उर्वरक अनुशंसित हैं?',
      'मेरे खेत के लिए सिंचाई/पानी देने की रणनीति क्या है?',
      'मुझे अपनी फसल के लिए क्या रोग रोकथाम कदम उठाने चाहिए?'
    ]
  }
};

export function AIChatAssistant({ theme, predictions, language }: AIChatAssistantProps) {
  const labels = t[language] || t.en;
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);

  // Initialize welcome message when language changes
  useEffect(() => {
    setMessages([
      {
        id: 'm-1',
        sender: 'assistant',
        text: labels.welcomeMsg,
        timestamp: new Date()
      }
    ]);
  }, [language]);

  const getSmartResponse = (query: string): string => {
    const q = query.toLowerCase();
    const latest = predictions && predictions.length > 0 ? predictions[0] : null;

    // Check for weather search locations in India
    if (q.includes('weather') || q.includes('location') || q.includes('india') || q.includes('place') || q.includes('வானிலை') || q.includes('मौसम') || q.includes('जगह')) {
      if (language === 'ta') {
        return `நீங்கள் இந்தியாவின் எந்தவொரு பகுதியின் அல்லது கிராமத்தின் விவசாய வானிலை விபரங்களை அறிய, இடதுபுற மெனுவில் உள்ள **'Weather Hub' (வானிலை மையம்)** பகுதிக்குச் செல்லவும். அங்குள்ள தேடல் பட்டியில் நீங்கள் விரும்பும் இடத்தை (எ.கா., 'Kashmir, India', 'Punjab', 'Kerala', 'Chennai') தட்டச்சு செய்து 'Fetch' என்பதை அழுத்தினால், தற்போதைய வெப்பநிலை, காற்று ஈரப்பதம், மழைப்பொழிவு மற்றும் விவசாய ஆலோசனைகள் உடனடியாகத் தோன்றும்.`;
      } else if (language === 'hi') {
        return `आप भारत के हर स्थान या गाँव का कृषि मौसम देखने के लिए साइडबार में स्थित **'Weather Hub' (मौसम केंद्र)** टैब पर जा सकते हैं। वहाँ सर्च बॉक्स में उस स्थान का नाम (जैसे: 'Kerala, India', 'Punjab', 'Kashmir', 'Mumbai') दर्ज करें और 'Fetch' बटन दबाएं। यह तुरंत उपग्रह संकेतकों के आधार पर तापमान, आर्द्रता, वर्षा और किसानों के लिए सलाह प्रदान करेगा।`;
      }
      return `To check the real-time weather and meteorological conditions for any place or village in India, go to the **Weather Hub** tab in the sidebar menu. In the search box, simply enter the location name (for example, 'Kashmir, India', 'Assam', 'Punjab', 'Kerala', or 'Chennai') and click 'Fetch'. The application will immediately query satellite telemetry and render current temperature, humidity levels, seasonal rainfall, and display tailored Farmers Meteorological Advisories.`;
    }

    // Check for unique crops and their usage
    if (q.includes('crop') || q.includes('unique') || q.includes('usage') || q.includes('different') || q.includes('பயிர்') || q.includes('பயன்பாடு') || q.includes('फसल') || q.includes('उपयोग')) {
      if (language === 'ta') {
        return `அக்ரிகார்டு AI இன் கீழ் பரிந்துரைக்கப்படும் சில தனித்துவமான பயிர்கள் மற்றும் அவற்றின் பயன்பாடுகள் இதோ:
1. **குங்குமப்பூ (Saffron - Crocus sativus)**: காஷ்மீர் போன்ற குளிர்ந்த மலைப்பகுதிகளில் வளரும் அதிக மதிப்புடைய பயிர். உணவு வாசனைப்பொருளாகவும், மருத்துவ மற்றும் அழகு சாதன தயாரிப்புகளிலும் பயன்படுகிறது.
2. **மூங்கில் (Bamboo - Bambusoideae)**: அசாம் போன்ற அதிக மழை பெய்யும் பகுதிகளில் வளரும். சுற்றுசூழல் கட்டுமானங்கள், மரச்சாமான்கள், காகித கூழ் தயாரிப்பு மற்றும் இளம் மூங்கில் குருத்துகள் உணவாகப் பயன்படுகிறது.
3. **டிராகன் பழம் (Dragon Fruit - Pitaya)**: ராஜஸ்தான் போன்ற வறண்ட மணல் பகுதிகளில் குறைந்த நீரில் வளரும் கள்ளிவகை பயிர். ஆன்டி-ஆக்ஸிடன்ட்கள் நிறைந்த பழங்களை வழங்குகிறது.
4. **ஏலக்காய் (Cardamom - Elettaria cardamomum)**: கேரளா மலைகளில் நிழல் மற்றும் ஈரப்பதத்தில் வளரும் வாசனைப் பயிர். தேநீர், வாசனை எண்ணெய்கள் மற்றும் இனிப்பு வகைகளில் பயன்படுகிறது.`;
      } else if (language === 'hi') {
        return `एग्रीगार्ड एआई कई अनूठी फसलों और उनके उपयोगों की सिफारिश करता है:
1. **केसर (Saffron - Crocus sativus)**: कश्मीर जैसे ठंडे पर्वतीय क्षेत्रों में उगने वाली अत्यंत मूल्यवान फसल। इसका उपयोग पाक मसालों, हर्बल दवाओं और सौंदर्य प्रसाधनों में होता है।
2. **बांस (Bamboo - Bambusoideae)**: असम जैसे भारी वर्षा वाले क्षेत्रों में उगता है। इसका उपयोग पर्यावरण-अनुकूल निर्माण, कागज लुगदी, फर्नीचर और खाद्य बांस के अंकुरों के लिए किया जाता है।
3. **ड्रैगन फ्रूट (Dragon Fruit - Pitaya)**: कम पानी और अधिक गर्मी (जैसे राजस्थान) में उगने वाली कैक्टस फसल। यह फाइबर और विटामिन सी से भरपूर फल प्रदान करता है।
4. **इलायची (Cardamom - Elettaria cardamomum)**: केरल की ठंडी, नम पहाड़ियों में उगने वाली सुगंधित फसल। इसका उपयोग चाय, मीठे व्यंजनों और आवश्यक तेलों के लिए किया जाता है।`;
      }
      return `Here is an explanation of unique agricultural crop matches supported by AgriGuard AI and their specific usages:
1. **Saffron (Crocus sativus)**: Requires alpine soils and cool temperatures (e.g., Kashmir). It is highly valued as a luxury culinary spice, natural dye, and active compound in pharmaceutical and traditional medicine.
2. **Bamboo (Bambusoideae)**: Thrives in high-rainfall clayey soils (e.g., Assam). Utilized for sustainable eco-friendly construction scaffolding, furniture, organic paper pulp, and the young shoots are consumed as food.
3. **Dragon Fruit (Pitaya)**: A highly drought-resilient cactus crop that excels in hot, sandy terrains (e.g., Rajasthan). Harvested for antioxidant-rich fruits high in vitamin C and dietary fibers.
4. **Cardamom (Queen of Spices)**: Shade-loving plant requiring rich organic mountain soils and constant humidity (e.g., Kerala). The seed pods are cured for culinary flavoring, herbal teas, and essential oils.`;
    }

    // Check for vegetable crop varieties
    if (q.includes('veg') || q.includes('tomato') || q.includes('carrot') || q.includes('onion') || q.includes('garlic') || q.includes('spinach') || q.includes('brinjal') || q.includes('chili') || q.includes('okra') || q.includes('காய்கறி') || q.includes('தக்காளி') || q.includes('வெங்காயம்') || q.includes('கீரை') || q.includes('मिर्च') || q.includes('टमाटर') || q.includes('प्याज') || q.includes('सब्जी')) {
      if (language === 'ta') {
        return `அக்ரிகார்டு AI தற்போது பல்வேறு காய்கறி பயிர்களுக்கான துல்லியமான வேளாண் ஆலோசனைகளை வழங்குகிறது:
1. **தக்காளி மற்றும் கேரட் (Tomatoes & Carrots)**: ஊட்டியைப் போன்ற குளிர்ந்த மலைப்பாங்கான லோமி (Loamy) மண்ணில் நன்றாக வளரும். தக்காளிக்கு சீரான நீர் பாசனமும், கேரட்டுக்கு தளர்வான மணலும் தேவை.
2. **வெங்காயம் மற்றும் பூண்டு (Onions & Garlic)**: நாசிக் போன்ற மிதமான உலர்ந்த மணல் கலந்த லோமி மண்ணில் வளரும். மண்ணின் வடிகால் வசதி சிறப்பாக இருக்க வேண்டும்.
3. **கீரை மற்றும் கத்தரிக்காய் (Spinach & Brinjal)**: கங்கை சமவெளி போன்ற நைட்ரஜன் நிறைந்த வண்டல் மண்ணில் தழைத்து வளரும்.
4. **பச்சை மிளகாய் மற்றும் வெண்டைக்காய் (Green Chilies & Okra)**: குண்டூர் போன்ற வறண்ட, வெப்பமான கருப்பு பருத்தி மண்ணில் அதிக மகசூல் தரும்.`;
      } else if (language === 'hi') {
        return `एग्रीगार्ड एआई विभिन्न सब्जी फसलों और उनके प्रबंधन के लिए उन्नत सुझाव प्रदान करता है:
1. **टमाटर और गाजर (Tomatoes & Carrots)**: ऊटी जैसे ठंडे पहाड़ी क्षेत्रों और दोमट मिट्टी के अनुकूल। टमाटर को लगातार पानी और गाजर को भुरभुरी मिट्टी की आवश्यकता होती है।
2. **प्याज और लहसुन (Onions & Garlic)**: नासिक जैसी रेतीली दोमट मिट्टी और शुष्क मौसम के लिए आदर्श। बल्ब सड़ांध को रोकने के लिए जल निकासी आवश्यक है।
3. **पालक और बैंगन (Spinach & Brinjal)**: गंगा के मैदानी इलाकों की नाइट्रोजन युक्त जलोढ़ मिट्टी में उत्कृष्ट विकास।
4. **हरी मिर्च और भिंडी (Green Chilies & Okra)**: गुंटूर की काली कपास मिट्टी और गर्म जलवायु में प्रचुर मात्रा में फल देने वाली फसलें।`;
      }
      return `AgriGuard AI now supports tailored advice for diverse vegetable crop pairings and varieties:
1. **Tomatoes & Carrots (Cool Climate Mix)**: Best grown in organic loamy soils (like Ooty). Tomatoes require constant moisture to avoid blossom end rot, while Carrots need deep, stone-free loose beds.
2. **Onions & Garlic (Allium Bulbs)**: Ideal for sandy-loam soils and dry summer warmth (like Nasik). Bulb curing requires stopping watering 2 weeks prior to harvest.
3. **Spinach & Brinjal (Leafy & Fruit Veggies)**: Thrives in high-nitrogen alluvial clayey-loams (like Varanasi). Spinach requires frequent watering, while Brinjal benefits from stalk-staking.
4. **Green Chilies & Okra (Warm Season Capsicums)**: Excels in potassium-rich warm drylands (like Guntur). Hot weather boosts capsaicin levels in chilies and daily picking of okra keeps pods tender.`;
    }

    // Check for disease and fertilizer guide queries
    if (q.includes('disease') || q.includes('prevent') || q.includes('treatment') || q.includes('dose') || q.includes('dosage') || q.includes('measurement') || q.includes('fungicide') || q.includes('pest') || q.includes('blast') || q.includes('blight') || q.includes('rot') || q.includes('scab') || q.includes('உரம்') || q.includes('நோய்') || q.includes('மருந்து') || q.includes('சிகிச்சை') || q.includes('உற்பத்தி') || q.includes('उर्वरक') || q.includes('बीमारी') || q.includes('इलाज') || q.includes('मात्रा')) {
      if (language === 'ta') {
        return `தாவர நோய்கள் மற்றும் உரங்களின் துல்லியமான அளவுகளை நீங்கள் **உரங்கள் & நோய்கள் (Fertilizers & Diseases)** பக்கத்தில் கண்டறியலாம். சில முக்கிய நோய்களின் அளவீடுகள் இதோ:
1. **நெல் குலை நோய் (Rice Blast)**: 1 லிட்டர் தண்ணீருக்கு **0.6 கிராம் ட்ரைசைக்ளசோல் 75% WP** கலந்து தெளிக்கவும். ஏக்கருக்கு 120 கிலோ சிலிக்கா உரம் இடவும்.
2. **தக்காளி இலை கருகல் நோய் (Late Blight)**: 1 லிட்டர் தண்ணீருக்கு **2.5 கிராம் மெட்டாலாக்சில் 8% + மேங்கோசெப் 64% WP** கலந்து தெளிக்கவும்.
3. **ஏலக்காய் அழுகல் நோய் (Capsule Rot)**: 1 லிட்டர் தண்ணீருக்கு **10 கிராம் தாமிர சல்பேட் + 10 கிராம் சுண்ணாம்பு** சேர்த்து தயாரித்த 1% போர்டோ கலவை தெளிக்கவும். ஒரு செடிக்கு 250 கிராம் வேப்பம் புண்ணாக்கு இடவும்.
4. **நிலக்கடலை திக்கா நோய் (Tikka Leaf Spot)**: 1 லிட்டர் தண்ணீருக்கு **1.0 கிராம் கார்பெண்டாசிம் 50% WP** தெளிக்கவும். பூ பூக்கும் பருவத்தில் ஏக்கருக்கு 160 கிலோ ஜிப்சம் இடவும்.`;
      } else if (language === 'hi') {
        return `आप **उर्वरक और रोग (Fertilizers & Diseases)** टैब में जाकर विस्तृत रोगों और उनके उपचार की सटीक मात्रा देख सकते हैं। कुछ मुख्य रोग उपचार:
1. **धान का झुलसा रोग (Rice Blast)**: प्रति 1 लीटर पानी में **0.6 ग्राम ट्राइसाइक्लाजोल 75% WP** घोलें। प्रति एकड़ 120 किलोग्राम सिलिका उर्वरक डालें।
2. **टमाटर झुलसा रोग (Late Blight)**: प्रति 1 लीटर पानी में **2.5 ग्राम मेटालैक्सिल 8% + मैन्कोजेब 64% WP** का छिड़काव करें।
3. **इलायची सड़न (Capsule Rot)**: प्रति 1 लीटर पानी में **10 ग्राम कॉपर सल्फेट + 10 ग्राम चूना** मिलाकर 1% बोर्डो मिश्रण बनाएं। प्रति पौधा 250 ग्राम नीम की खली डालें।
4. **मूंगफली टिक्का रोग (Tikka Leaf Spot)**: प्रति 1 लीटर पानी में **1.0 ग्राम कार्बेन्डाजिम 50% WP** का छिड़काव करें। पेगिंग पर प्रति एकड़ 160 किलोग्राम जिप्सम डालें।`;
      }
      return `For a full breakdown of plant diseases and precise chemical treatments, please visit the **Fertilizers & Diseases** tab in the sidebar. Here are some key dosages:
1. **Rice Blast (Magnaporthe)**: Spray **0.6 grams of Tricyclazole 75% WP per 1 Liter of water**. Combine with 120 kg/acre of Silica fertilizer.
2. **Tomato Late Blight**: Spray **2.5 grams of Metalaxyl 8% + Mancozeb 64% WP per 1 Liter of water**.
3. **Cardamom Capsule Rot**: Spray **1% Bordeaux Mixture (10g Copper Sulfate + 10g Quicklime per 1 Liter of water)** and apply 250g Neem Cake per clump.
4. **Groundnut Tikka Leaf Spot**: Spray **1.0 gram of Carbendazim 50% WP per 1 Liter of water** and apply 160 kg Gypsum per acre.
5. **Cotton Bacterial Blight**: Mix **0.1g Streptomycin + 2.5g Copper Oxychloride per 1 Liter of water**; apply 20 kg Magnesium Sulfate per acre.`;
    }

    // Check query for prediction-specific information first
    if (latest) {
      const crop = latest.result.bestCrop;
      if (q.includes('result') || q.includes('latest') || q.includes('பரிந்துரை') || q.includes('பயிர்') || q.includes('फसल')) {
        if (language === 'ta') {
          return `உங்கள் சமீபத்திய கணிப்பின் அடிப்படையில், உங்கள் நிலத்திற்கான பரிந்துரைக்கப்பட்ட பயிர் **${crop}** ஆகும் (நம்பிக்கை அளவு: ${latest.result.confidence.toFixed(1)}%). எங்கள் வேளாண் பகுப்பாய்வு விளக்கம்: "${latest.result.explanation}"`;
        } else if (language === 'hi') {
          return `आपके नवीनतम पूर्वानुमान के आधार पर, आपके खेत के लिए अनुशंसित फसल **${crop}** है (सटीकता: ${latest.result.confidence.toFixed(1)}%)। कृषि विश्लेषण व्याख्या: "${latest.result.explanation}"`;
        }
        return `Based on your latest prediction, the recommended crop for your field in ${latest.input.location} is **${crop}** (with a confidence of ${latest.result.confidence.toFixed(1)}%). The agronomist analysis explains: "${latest.result.explanation}"`;
      }
      if (q.includes('fertilizer') || q.includes('nutrient') || q.includes('npk') || q.includes('soil additive') || q.includes('உரம்') || q.includes('उर्वरक')) {
        if (language === 'ta') {
          return `உங்களது பரிந்துரைக்கப்பட்ட பயிரான **${crop}** க்கு ஏற்ற உகந்த மண் ஊட்டச்சத்துக்கள் மற்றும் உரங்கள்: ${latest.result.suitableFertilizers.join(', ')}.`;
        } else if (language === 'hi') {
          return `आपकी अनुशंसित फसल **${crop}** के लिए इष्टतम मिट्टी पोषण योजक और उर्वरक हैं: ${latest.result.suitableFertilizers.join(', ')}.`;
        }
        return `For your recommended crop **${crop}**, the optimal soil nutrition additives and fertilizers are: ${latest.result.suitableFertilizers.join(', ')}.`;
      }
      if (q.includes('irrigation') || q.includes('water') || q.includes('moisture') || q.includes('watering') || q.includes('நீர்') || q.includes('பாசனம்') || q.includes('पानी') || q.includes('सिंचाई')) {
        if (language === 'ta') {
          return `உங்கள் **${crop}** பயிரின் நீர் பாசன உத்தி: "${latest.result.irrigationRecommendation}"`;
        } else if (language === 'hi') {
          return `आपकी **${crop}** फसल के लिए सिंचाई रणनीति है: "${latest.result.irrigationRecommendation}"`;
        }
        return `For your **${crop}** crop, the irrigation strategy is: "${latest.result.irrigationRecommendation}"`;
      }
      if (q.includes('disease') || q.includes('prevent') || q.includes('pest') || q.includes('protect') || q.includes('blight') || q.includes('pathogen') || q.includes('நோய்') || q.includes('பூச்சி') || q.includes('रोग')) {
        if (language === 'ta') {
          return `உங்கள் **${crop}** பயிரை நோய்க்கிருமிகள் மற்றும் பூச்சிகளிடமிருந்து பாதுகாக்க, இந்த நடைமுறைகளைப் பின்பற்றவும்: ${latest.result.diseasePrevention.map((d, i) => `\n${i+1}. ${d}`).join('')}`;
        } else if (language === 'hi') {
          return `अपनी **${crop}** फसल को रोगजनकों और कीटों से बचाने के लिए, इन प्रथाओं का पालन करें: ${latest.result.diseasePrevention.map((d, i) => `\n${i+1}. ${d}`).join('')}`;
        }
        return `To protect your **${crop}** crop from pathogens and pests, follow these practices: ${latest.result.diseasePrevention.map((d, i) => `\n${i+1}. ${d}`).join('')}`;
      }
      if (q.includes('tips') || q.includes('practice') || q.includes('yield') || q.includes('agronomic') || q.includes('வழிமுறை') || q.includes('सुझाव')) {
        if (language === 'ta') {
          return `**${crop}** இன் மகசூலை அதிகரிக்க, இந்த மேம்பட்ட வேளாண் நடைமுறைகளைப் பின்பற்றவும்: ${latest.result.farmingTips.map((t, i) => `\n${i+1}. ${t}`).join('')}`;
        } else if (language === 'hi') {
          return `**${crop}** की उपज बढ़ाने के लिए, इन उन्नत कृषि प्रथाओं का पालन करें: ${latest.result.farmingTips.map((t, i) => `\n${i+1}. ${t}`).join('')}`;
        }
        return `To maximize yield for **${crop}**, follow these advanced agronomic practices: ${latest.result.farmingTips.map((t, i) => `\n${i+1}. ${t}`).join('')}`;
      }
    } else {
      if (q.includes('result') || q.includes('latest') || q.includes('fertilizer') || q.includes('irrigation') || q.includes('disease') || q.includes('பயிர்') || q.includes('உரம்') || q.includes('फसल')) {
        if (language === 'ta') {
          return "உங்கள் முன்கணிப்பு அறிக்கைகள் எதுவும் இதுவரை கணக்கிடப்படவில்லை! தயவுசெய்து 'AI பயிர் பரிந்துரை' பகுதிக்குச் சென்று, மண்ணின் தரவை உள்ளிட்டு பரிந்துரையைப் பெறுங்கள்.";
        } else if (language === 'hi') {
          return "मुझे आपकी हिस्ट्री में कोई फसल रिपोर्ट नहीं मिली! कृपया 'एआई फसल सिफारिश' टैब पर जाएं, मिट्टी के आंकड़े दर्ज करें और रिपोर्ट उत्पन्न करें ताकि मैं सलाह दे सकूं।";
        }
        return "I notice you don't have any crop prediction reports computed yet in your history! Please go to the 'AI Crop Recommendation' tab, input your soil telemetry, and generate a report so I can analyze it and give you personalized advice.";
      }
    }

    // Generic fallbacks (English, Tamil, Hindi)
    if (q.includes('nitrogen') || q.includes('நைட்ரஜன்') || q.includes('नाइट्रोजन')) {
      if (language === 'ta') {
        return 'மணல் பாங்கான அல்லது வண்டல் மண்ணில் இயற்கையாக நைட்ரஜன் (N) அளவை அதிகரிக்க, சோயாபீன்ஸ், தீவனப்புல் போன்ற பருப்பு வகை தாவரங்களை பயிரிடுங்கள். மேலும் தொழுஉரம் இடுவதன் மூலம் வேர்களுக்கு தகுந்த நைட்ரஜன் சத்து மெதுவாகக் கிடைக்கும்.';
      } else if (language === 'hi') {
        return 'बलुई या दोमट मिट्टी में नाइट्रोजन (N) का स्तर स्वाभाविक रूप से बढ़ाने के लिए, दलहनी फसलों (जैसे सोयाबीन या तिपतिया घास) की बुवाई करें। इसके अतिरिक्त जैविक खाद का उपयोग नाइट्रोजन को धीरे-धीरे मुक्त करता है।';
      }
      return 'To naturally elevate Nitrogen (N) levels in sandy or loamy soils, implement cover-cropping with nitrogen-fixing leguminous plants (such as Soybeans, Clover, or Alfalfa). Additionally, applying composted organic manure or alfalfa meal releases nitrogen slowly, optimizing crop roots without triggering burn risks.';
    }
    if (q.includes('ph') || q.includes('acid') || q.includes('potato') || q.includes('உருளைக்கிழங்கு') || q.includes('आलू')) {
      if (language === 'ta') {
        return 'உருளைக்கிழங்கு போன்ற வேர் காய்கறிகள் சற்று அமிலத்தன்மை கொண்ட மண்ணில் (pH 5.0 முதல் 6.0) நன்றாக வளரும். மண்ணின் pH 5.0 க்கும் குறைவாக இருந்தால், விவசாய சுண்ணாம்பு சேர்த்து pH ஐ அதிகரிக்கலாம்; 6.5 க்கு மேல் இருந்தால் கந்தகம் சேர்க்கவும்.';
      } else if (language === 'hi') {
        return 'आलू जैसी जड़ वाली फसलें थोड़ी अम्लीय मिट्टी (pH 5.0 से 6.0) में पर्नपती हैं। यदि मिट्टी का पीएच 5.0 से नीचे चला जाता है, तो पीएच बढ़ाने के लिए कृषि चूना मिलाएं; यदि यह 6.5 से ऊपर है, तो सल्फर मिलाएं।';
      }
      return 'Most root vegetables like Potatoes thrive in slightly acidic soils (pH 5.0 to 6.0). Acidic beds prevent the development of common scab pathogens. If your soil pH falls below 5.0, add agricultural limestone (calcium carbonate) to gently raise pH; if it is above 6.5, incorporate elemental sulfur or peat moss to lower it.';
    }
    if (q.includes('blight') || q.includes('disease') || q.includes('corn') || q.includes('சோளம்') || q.includes('मक्का')) {
      if (language === 'ta') {
        return 'இலை கருகல் நோய் அதிக ஈரப்பதத்தால் ஏற்படும் பூஞ்சை தொற்றாகும். இதற்கு பயிர் சுழற்சி முறை பின்பற்றுவது, செடிகளுக்கு இடையே போதிய காற்றோட்டம் தருவது மற்றும் ஆரம்ப கட்டத்தில் செப்பு பூஞ்சைக்கொல்லிகளைப் பயன்படுத்துவது நல்லது.';
      } else if (language === 'hi') {
        return 'पत्ती झुलसा रोग (blight) कवक संक्रमण है जो उच्च आर्द्रता के कारण होता है। इससे बचाव के लिए फसल चक्र अपनाएं, पौधों के बीच हवा का प्रवाह बढ़ाएं और प्रारंभिक अवस्था में तांबा-आधारित कवकनाशी का छिड़काव करें।';
      }
      return 'Leaf blights are fungal infections heavily catalyzed by high ambient humidity. Defense actions include: 1. Ensure crop rotation with non-host species for at least 2 seasons. 2. Adopt mechanical weed management to maximize wind ventilation between plants. 3. Apply copper-based organic fungicides during early vegetative cycles.';
    }

    if (language === 'ta') {
      return `உங்கள் கேள்வி: "${query}". பயிர் மேம்பாட்டிற்கு, மண்ணின் ஈரப்பதத்தை 35-45% வரம்பிற்குள் பராமரிக்கவும், சமச்சீரான NPK உரங்களைப் பயன்படுத்தவும், வானிலை விபரங்களை 'Weather Hub' இல் சரிபார்க்கவும் பரிந்துரைக்கிறோம்.`;
    } else if (language === 'hi') {
      return `आपका प्रश्न: "${query}". कृषि उत्पादकता बढ़ाने के लिए, हम मिट्टी की नमी को 35-45% के बीच रखने, संतुलित एनपीके (NPK) उर्वरकों का उपयोग करने और 'Weather Hub' में मौसम की जांच करने की सलाह देते हैं।`;
    }
    return `Regarding your inquiry: "${query}". To optimize crop yields, AgriGuard AI recommends checking the 'Weather Hub' tab for your region, maintaining proper soil moisture (35-45%), and matching crop species based on N-P-K telemetry values.`;
  };

  const handleSend = (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMsg: Message = {
      id: `m-user-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setLoading(true);

    setTimeout(() => {
      const replyText = getSmartResponse(textToSend);
      const assistantMsg: Message = {
        id: `m-asst-${Date.now()}`,
        sender: 'assistant',
        text: replyText,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, assistantMsg]);
      setLoading(false);
    }, 1200);
  };

  // Speech Recognition (Speech-to-Text)
  const toggleListening = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in this browser. Please use Google Chrome.");
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = language === 'ta' ? 'ta-IN' : 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onerror = (e: any) => {
      console.error(e);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInputText(prev => prev ? prev + ' ' + transcript : transcript);
    };

    recognition.start();
  };

  // Speech Synthesis (Text-to-Speech)
  const speakText = (text: string) => {
    if (!window.speechSynthesis) {
      alert("Speech synthesis is not supported in this browser.");
      return;
    }
    window.speechSynthesis.cancel();
    const cleanText = text.replace(/\*\*/g, ''); // Remove Markdown bold
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = language === 'ta' ? 'ta-IN' : 'en-US';
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="space-y-6">
      
      {/* HEADER */}
      <div>
        <h1 className="text-xl font-extrabold tracking-tight text-slate-800 dark:text-slate-100 flex items-center gap-2.5">
          <Sparkles className="w-5.5 h-5.5 text-emerald-500 animate-pulse" />
          {labels.title}
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          {labels.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* CHAT DISPLAY INTERFACE */}
        <div className={`lg:col-span-8 rounded-2xl border ${theme === 'dark' ? 'bg-slate-900/30 border-slate-800/80' : 'bg-white border-slate-200 shadow-sm'} flex flex-col h-[500px]`}>
          
          {/* Messages scroll box */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {messages.map(msg => {
              const isAsst = msg.sender === 'assistant';
              return (
                <div key={msg.id} className={`flex gap-3 max-w-[85%] ${isAsst ? 'mr-auto' : 'ml-auto flex-row-reverse'}`}>
                  <div className={`w-8 h-8 rounded-xl shrink-0 flex items-center justify-center border text-xs font-bold ${
                    isAsst 
                      ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' 
                      : 'bg-slate-100 border-slate-200 dark:bg-slate-800 dark:border-slate-700 text-slate-600 dark:text-slate-200'
                  }`}>
                    {isAsst ? <Sprout className="w-4 h-4 text-emerald-500" /> : <User className="w-4 h-4" />}
                  </div>

                  <div className="space-y-1">
                    <div className={`p-3 rounded-2xl text-xs leading-relaxed relative ${
                      isAsst 
                        ? 'bg-slate-100/60 border border-slate-200/40 dark:bg-slate-800/20 dark:border-slate-800/60 text-slate-700 dark:text-slate-200' 
                        : 'bg-emerald-500 text-slate-950 font-medium'
                    }`}>
                      <p>{msg.text}</p>
                      <span className={`text-[8px] font-mono block text-right mt-1.5 ${isAsst ? 'text-slate-400' : 'text-slate-900/60'}`}>
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    {/* Speak Button for Assistant Message */}
                    {isAsst && (
                      <button
                        onClick={() => speakText(msg.text)}
                        title="Speak Message"
                        className="text-[10px] text-emerald-500 hover:text-emerald-400 font-bold flex items-center gap-1 mt-1 ml-1 cursor-pointer bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full border border-slate-200 dark:border-slate-700"
                      >
                        <Volume2 className="w-3 h-3" /> Listen
                      </button>
                    )}
                  </div>
                </div>
              );
            })}

            {loading && (
              <div className="flex gap-3 max-w-[85%] mr-auto">
                <div className="w-8 h-8 rounded-xl shrink-0 flex items-center justify-center bg-emerald-500/10 border border-emerald-500/20 text-emerald-500">
                  <Sprout className="w-4 h-4 animate-spin" />
                </div>
                <div className="p-3 rounded-2xl bg-slate-100/40 dark:bg-slate-800/10 border border-slate-200/30 dark:border-slate-800/40 text-xs text-slate-400 font-mono flex items-center gap-1">
                  {labels.typing}<span className="animate-pulse">...</span>
                </div>
              </div>
            )}
          </div>

          {/* Chat entry box */}
          <form
            onSubmit={e => {
              e.preventDefault();
              handleSend(inputText);
            }}
            className="p-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/30 flex gap-2"
          >
            {/* Voice Input Trigger */}
            <button
              type="button"
              onClick={toggleListening}
              className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                isListening 
                  ? 'bg-red-500 text-white border-red-600 animate-pulse' 
                  : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:border-slate-700 text-slate-500 dark:text-slate-300'
              }`}
              title="Voice Input"
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>

            <input
              id="assistant-text-entry"
              type="text"
              placeholder={labels.placeholder}
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              className="flex-1 px-3 py-2 rounded-xl border text-xs focus:ring-1 focus:ring-emerald-500 dark:bg-slate-800 dark:border-slate-700 outline-none"
              required
            />
            <button
              id="assistant-send-btn"
              type="submit"
              className="p-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-xl transition-all cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* QUICK QUESTION PRESETS CARD */}
        <div className={`lg:col-span-4 p-5 rounded-2xl border ${theme === 'dark' ? 'bg-slate-900/30 border-slate-800/80' : 'bg-white border-slate-200 shadow-sm'} space-y-4`}>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <HelpCircle className="w-4.5 h-4.5 text-emerald-500" /> {labels.suggestTitle}
          </h3>
          <p className="text-[10px] text-slate-500 leading-normal">
            {labels.suggestDesc}
          </p>

          <div className="space-y-2">
            {labels.quickQuestions.map((q, idx) => (
              <button
                key={idx}
                id={`quick-query-${idx}`}
                onClick={() => handleSend(q)}
                className="w-full text-left p-3 rounded-xl border text-xs text-slate-600 dark:text-slate-300 border-slate-100 dark:border-slate-800/80 hover:border-emerald-500/20 hover:bg-emerald-500/5 transition-all cursor-pointer block"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
