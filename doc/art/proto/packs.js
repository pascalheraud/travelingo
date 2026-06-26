// ══════════════════════════════════════════════════════════════════════
// PACKS DE LANGUE — Travelingo
// Structure : 1 pack = 1 langue cible × N langues sources
// Chaque phrase : target (invariant) + tr[langSource] = {source, phonetic, grammar, complements}
// Audio : généré en ticks (prototype) → remplacer par MP3 en production
// ══════════════════════════════════════════════════════════════════════

export const PACKS = {

  // ══════════════════════════════════════════════
  // PACK ANGLAIS
  // ══════════════════════════════════════════════
  en: {
    id: "L01_EN", targetLang: "en", targetFlag: "🇬🇧",
    lesson: {
      id: "l01", emoji: "💬",
      titles: { fr:"Politesse & bases", en:"Politeness & basics", es:"Cortesía & básicos", de:"Höflichkeit & Grundlagen", it:"Cortesia & basi", ro:"Politețe & baze" },
      subs:   { fr:"Salutations, merci…", en:"Greetings, thank you…", es:"Saludos, gracias…", de:"Begrüßung, Danke…", it:"Saluti, grazie…", ro:"Salutări, mulțumesc…" },
    },
    phrases: [
      { id:"p001", target:"Hello", freqs:[520,440], tr:{
        fr:{ source:"Bonjour",          phonetic:"hé-lo",          grammar:"Le mot le plus universel de l'anglais. Utilisable à toute heure, formel ou informel.", complements:["Informel : « Hi! »","Très informel : « Hey! »","Au téléphone : « Hello? »"] },
        es:{ source:"Hola",             phonetic:"jé-lou",         grammar:"La palabra más universal del inglés. Se puede usar a cualquier hora.", complements:["Informal: « Hi! »","Muy informal: « Hey! »"] },
        de:{ source:"Hallo",            phonetic:"hé-lo",          grammar:"Das universellste englische Wort. Jederzeit und überall verwendbar.", complements:["Informell: « Hi! »","Sehr informell: « Hey! »"] },
        it:{ source:"Ciao",             phonetic:"hé-lo",          grammar:"La parola più universale dell'inglese. Si usa a qualsiasi ora.", complements:["Informale: « Hi! »","Molto informale: « Hey! »"] },
        ro:{ source:"Bună",             phonetic:"hé-lo",          grammar:"Cel mai universal cuvânt englezesc. Se poate folosi oricând.", complements:["Informal: « Hi! »","Foarte informal: « Hey! »"] },
      }},
      { id:"p002", target:"Thank you very much", freqs:[440,520,480,440], tr:{
        fr:{ source:"Merci beaucoup",   phonetic:"than-kyou vé-ri meutch", grammar:"Expression complète et chaleureuse. « Thank » vient du vieux nordique « þakkа ».", complements:["Court : « Thanks! »","Très formel : « I'm most grateful »","Informel : « Cheers! » (UK)"] },
        es:{ source:"Muchas gracias",   phonetic:"zank-iu véri mach",      grammar:"Expresión completa y cálida. « Thank » viene del nórdico antiguo.", complements:["Corto: « Thanks! »","Informal: « Cheers! » (UK)"] },
        de:{ source:"Vielen Dank",      phonetic:"sänk-ju ve-ri mötsch",   grammar:"Vollständiger und herzlicher Ausdruck. « Thank » kommt vom altnordischen « þakka ».", complements:["Kurz: « Thanks! »","Informell: « Cheers! » (UK)"] },
        it:{ source:"Grazie mille",     phonetic:"thèn-kiu vè-ri màtch",   grammar:"Espressione completa e calorosa. « Thank » viene dal norreno antico.", complements:["Breve: « Thanks! »","Informale: « Cheers! » (UK)"] },
        ro:{ source:"Mulțumesc mult",   phonetic:"thènk-iu vèri maci",     grammar:"Expresie completă și caldă. « Thank » vine din norreza veche.", complements:["Scurt: « Thanks! »","Informal: « Cheers! » (UK)"] },
      }},
      { id:"p003", target:"Please", freqs:[480,400], tr:{
        fr:{ source:"S'il vous plaît",  phonetic:"pliz",           grammar:"Mot magique en anglais. Toujours placer en fin de phrase pour la politesse.", complements:["Début : « Please help me »","Fin : « A coffee, please »","En demande : « Could you…, please? »"] },
        es:{ source:"Por favor",        phonetic:"pliis",          grammar:"Palabra mágica en inglés. Siempre al final de la frase para más educación.", complements:["Al final: « A coffee, please »","Al inicio: « Please help me »"] },
        de:{ source:"Bitte",            phonetic:"pliis",          grammar:"Zauberwort auf Englisch. Immer am Ende des Satzes für mehr Höflichkeit.", complements:["Am Ende: « A coffee, please »","Am Anfang: « Please help me »"] },
        it:{ source:"Per favore",       phonetic:"pliis",          grammar:"Parola magica in inglese. Sempre alla fine della frase per gentilezza.", complements:["Alla fine: « A coffee, please »","All'inizio: « Please help me »"] },
        ro:{ source:"Vă rog",           phonetic:"pliiz",          grammar:"Cuvânt magic în engleză. Se pune la sfârșitul propoziției pentru politețe.", complements:["La final: « A coffee, please »","La început: « Please help me »"] },
      }},
      { id:"p004", target:"Excuse me", freqs:[400,480,440], tr:{
        fr:{ source:"Excusez-moi",      phonetic:"ex-kyouz mi",    grammar:"Sert à interpeller quelqu'un ou à passer. Différent de « Sorry » (excuse/regret).", complements:["Pour passer : « Excuse me » + passage","Pour attirer l'attention : « Excuse me, sir? »","Pour s'excuser sincèrement : « I'm sorry »"] },
        es:{ source:"Perdone",          phonetic:"ex-kiuz mi",     grammar:"Se usa para llamar la atención o para pasar. Diferente de « Sorry » (disculpa/arrepentimiento).", complements:["Para pasar: « Excuse me » + paso","Para disculparse: « I'm sorry »"] },
        de:{ source:"Entschuldigung",   phonetic:"ex-kjus mi",     grammar:"Dient zum Anreden oder Durchkommen. Anders als « Sorry » (Entschuldigung/Bedauern).", complements:["Um durchzukommen: « Excuse me »","Für echte Entschuldigungen: « I'm sorry »"] },
        it:{ source:"Scusi",            phonetic:"ex-kiuz mi",     grammar:"Per chiamare l'attenzione o passare. Diverso da « Sorry » (scusa/dispiacere).", complements:["Per passare: « Excuse me »","Per scusarsi: « I'm sorry »"] },
        ro:{ source:"Scuzați-mă",       phonetic:"ex-kiuz mi",     grammar:"Pentru a atrage atenția sau a trece. Diferit de « Sorry » (scuză/regret).", complements:["Pentru a trece: « Excuse me »","Pentru scuze sincere: « I'm sorry »"] },
      }},
      { id:"p005", target:"I don't understand", freqs:[360,420,480], tr:{
        fr:{ source:"Je ne comprends pas", phonetic:"aï dont eun-der-stand", grammar:"Phrase essentielle en voyage. « Understand » vient du vieil anglais « understandan ».", complements:["Variante : « I'm sorry, I don't understand »","Demander : « Could you speak more slowly? »","Écrire : « Could you write that down? »"] },
        es:{ source:"No entiendo",      phonetic:"ai dont ander-stend",     grammar:"Frase esencial de viaje. « Understand » viene del inglés antiguo.", complements:["Variante: « I'm sorry, I don't understand »","Pedir: « Could you speak more slowly? »"] },
        de:{ source:"Ich verstehe nicht", phonetic:"ai dont anda-ständ",   grammar:"Wesentlicher Reisesatz. « Understand » kommt vom altenglischen « understandan ».", complements:["Variante: « I'm sorry, I don't understand »","Bitten: « Could you speak more slowly? »"] },
        it:{ source:"Non capisco",      phonetic:"ai dont anda-stènd",      grammar:"Frase essenziale in viaggio. « Understand » viene dall'antico inglese.", complements:["Variante: « I'm sorry, I don't understand »","Chiedere: « Could you speak more slowly? »"] },
        ro:{ source:"Nu înțeleg",       phonetic:"ai dont ander-stend",     grammar:"Frază esențială în călătorie. « Understand » vine din engleza veche.", complements:["Variantă: « I'm sorry, I don't understand »","Cerere: « Could you speak more slowly? »"] },
      }},
      { id:"p006", target:"Goodbye", freqs:[500,460], tr:{
        fr:{ source:"Au revoir",        phonetic:"goud-baï",       grammar:"Contraction historique de « God be with you ». Formule de départ universelle.", complements:["Court : « Bye! »","À bientôt : « See you later! »","Très formel : « Farewell »","Au Royaume-Uni : « Cheerio! »"] },
        es:{ source:"Adiós",            phonetic:"gud-bai",        grammar:"Contracción histórica de « God be with you ». Fórmula de despedida universal.", complements:["Corto: « Bye! »","Hasta luego: « See you later! »"] },
        de:{ source:"Auf Wiedersehen",  phonetic:"gut-bai",        grammar:"Historische Kontraktion von « God be with you ». Universelle Abschiedsformel.", complements:["Kurz: « Bye! »","Bis später: « See you later! »"] },
        it:{ source:"Arrivederci",      phonetic:"gud-bài",        grammar:"Contrazione storica di « God be with you ». Formula di congedo universale.", complements:["Breve: « Bye! »","A dopo: « See you later! »"] },
        ro:{ source:"La revedere",      phonetic:"gud-bai",        grammar:"Contracție istorică din « God be with you ». Formula de rămas-bun universală.", complements:["Scurt: « Bye! »","Ne vedem: « See you later! »"] },
      }},
      { id:"p007", target:"Good evening", freqs:[460,500,440], tr:{
        fr:{ source:"Bonsoir",          phonetic:"goud i-ve-ning", grammar:"Salutation utilisée à partir de 17h-18h. « Evening » vient du vieil anglais « æfen ».", complements:["Matin : « Good morning »","Après-midi : « Good afternoon »","Nuit : « Good night »"] },
        es:{ source:"Buenas tardes/noches", phonetic:"gud iv-ning", grammar:"Saludo a partir de las 17-18h. « Evening » viene del inglés antiguo « æfen ».", complements:["Mañana: « Good morning »","Tarde: « Good afternoon »","Noche: « Good night »"] },
        de:{ source:"Guten Abend",      phonetic:"gut i-we-ning",  grammar:"Gruß ab 17-18 Uhr. « Evening » kommt vom altenglischen « æfen ».", complements:["Morgen: « Good morning »","Nachmittag: « Good afternoon »","Nacht: « Good night »"] },
        it:{ source:"Buonasera",        phonetic:"gud ì-ve-ning",  grammar:"Saluto dalle 17-18. « Evening » viene dall'antico inglese « æfen ».", complements:["Mattina: « Good morning »","Pomeriggio: « Good afternoon »","Notte: « Good night »"] },
        ro:{ source:"Bună seara",       phonetic:"gud i-ve-ning",  grammar:"Salut folosit după ora 17-18. « Evening » vine din engleza veche « æfen ».", complements:["Dimineața: « Good morning »","Dupăamiaza: « Good afternoon »","Noaptea: « Good night »"] },
      }},
      { id:"p008", target:"Where is the toilet?", freqs:[380,420,460], tr:{
        fr:{ source:"Où sont les toilettes ?", phonetic:"ouère iz deu toï-lette", grammar:"Question pratique universelle. « Toilet » en UK ; « Restroom/Bathroom » aux USA.", complements:["USA : « Where is the restroom? »","Pub UK : « Where is the loo? »","Formel : « May I use the facilities? »"] },
        es:{ source:"¿Dónde está el baño?", phonetic:"wuér is de toi-let",      grammar:"Pregunta práctica universal. En UK se dice « toilet », en USA « restroom ».", complements:["USA: « Where is the restroom? »","UK informal: « Where is the loo? »"] },
        de:{ source:"Wo ist die Toilette?", phonetic:"wier is de toi-let",      grammar:"Universell praktische Frage. In UK « toilet », in USA « restroom ».", complements:["USA: « Where is the restroom? »","UK informell: « Where is the loo? »"] },
        it:{ source:"Dov'è il bagno?",  phonetic:"wuèr is dhə tòi-lèt",        grammar:"Domanda pratica universale. Nel Regno Unito « toilet », negli USA « restroom ».", complements:["USA: « Where is the restroom? »","UK informale: « Where is the loo? »"] },
        ro:{ source:"Unde este toaleta?", phonetic:"wuèr iz dhe toi-let",       grammar:"Întrebare practică universală. În UK « toilet », în SUA « restroom ».", complements:["SUA: « Where is the restroom? »","UK informal: « Where is the loo? »"] },
      }},
      { id:"p009", target:"How much does it cost?", freqs:[420,460,400], tr:{
        fr:{ source:"Combien ça coûte ?", phonetic:"hau meutch deuz it coste", grammar:"Question fondamentale du voyageur. « How much » pour les indénombrables, « How many » pour les comptables.", complements:["Court : « How much? »","Prix affiché : « Is this the final price? »","Réduction : « Can you give me a discount? »"] },
        es:{ source:"¿Cuánto cuesta?", phonetic:"jau mach daz it cost",         grammar:"Pregunta fundamental del viajero. « How much » para incontables, « How many » para contables.", complements:["Corto: « How much? »","Descuento: « Can you give me a discount? »"] },
        de:{ source:"Wie viel kostet es?", phonetic:"hau mötsch das it kost",   grammar:"Grundfrage des Reisenden. « How much » für Unzählbares, « How many » für Zählbares.", complements:["Kurz: « How much? »","Rabatt: « Can you give me a discount? »"] },
        it:{ source:"Quanto costa?",    phonetic:"hàu màtch daz it cost",       grammar:"Domanda fondamentale del viaggiatore. « How much » per gli incontabili.", complements:["Breve: « How much? »","Sconto: « Can you give me a discount? »"] },
        ro:{ source:"Cât costă?",       phonetic:"hau maci daz it cost",        grammar:"Întrebare fundamentală a călătorului. « How much » pentru necuantificabile.", complements:["Scurt: « How much? »","Reducere: « Can you give me a discount? »"] },
      }},
      { id:"p010", target:"Do you speak French?", freqs:[500,440,480], tr:{
        fr:{ source:"Parlez-vous français ?", phonetic:"dou you spik frèntch", grammar:"Question clé pour trouver un interlocuteur francophone. « Do you speak… » est la structure standard.", complements:["Avec une autre langue : « Do you speak Spanish? »","Variante : « Is there anyone here who speaks French? »","Réponse : « A little / Not very well »"] },
        es:{ source:"¿Habla francés?",  phonetic:"du yu spik frentch",          grammar:"Pregunta clave para encontrar un hablante de francés. Estructura: « Do you speak… »", complements:["Otra lengua: « Do you speak Spanish? »","Variante: « A little / Not very well »"] },
        de:{ source:"Sprechen Sie Französisch?", phonetic:"du ju spiik frentsch", grammar:"Schlüsselfrage, um einen Französischsprecher zu finden.", complements:["Andere Sprache: « Do you speak German? »","Antwort: « A little / Not very well »"] },
        it:{ source:"Parla francese?",  phonetic:"du iu spiik frèntch",          grammar:"Domanda chiave per trovare un parlante francese.", complements:["Altra lingua: « Do you speak Italian? »","Risposta: « A little / Not very well »"] },
        ro:{ source:"Vorbiți franceză?", phonetic:"du iu spiik frèntch",         grammar:"Întrebare cheie pentru a găsi un vorbitor de franceză.", complements:["Altă limbă: « Do you speak Romanian? »","Răspuns: « A little / Not very well »"] },
      }},
    ],
  },

  // ══════════════════════════════════════════════
  // PACK ESPAGNOL
  // ══════════════════════════════════════════════
  es: {
    id: "L01_ES", targetLang: "es", targetFlag: "🇪🇸",
    lesson: {
      id: "l01", emoji: "💬",
      titles: { fr:"Politesse & bases", en:"Politeness & basics", es:"Cortesía & básicos", de:"Höflichkeit & Grundlagen", it:"Cortesia & basi", ro:"Politețe & baze" },
      subs:   { fr:"Salutations, merci…", en:"Greetings, thank you…", es:"Saludos, gracias…", de:"Begrüßung, Danke…", it:"Saluti, grazie…", ro:"Salutări, mulțumesc…" },
    },
    phrases: [
      { id:"p001", target:"Hola", freqs:[520,440], tr:{
        fr:{ source:"Bonjour",          phonetic:"o-la",           grammar:"Salutation universelle espagnole, toute heure et tout contexte. Vient du latin « salve ».", complements:["Très informel : « ¡Ey! »","Matin formel : « Buenos días »","Soir : « Buenas tardes / noches »"] },
        en:{ source:"Hello",            phonetic:"oh-la",          grammar:"Universal Spanish greeting, any time and context.", complements:["Very informal: « ¡Ey! »","Formal morning: « Buenos días »"] },
        de:{ source:"Hallo",            phonetic:"o-la",           grammar:"Universeller spanischer Gruß, jederzeit und in jedem Kontext.", complements:["Sehr informell: « ¡Ey! »","Formeller Morgengruß: « Buenos días »"] },
        it:{ source:"Ciao",             phonetic:"o-la",           grammar:"Saluto spagnolo universale, a qualsiasi ora e contesto.", complements:["Molto informale: « ¡Ey! »","Mattina formale: « Buenos días »"] },
        ro:{ source:"Bună",             phonetic:"o-la",           grammar:"Salut universal spaniol, oricând și în orice context.", complements:["Foarte informal: « ¡Ey! »","Dimineața formal: « Buenos días »"] },
      }},
      { id:"p002", target:"Muchas gracias", freqs:[440,520,480,440], tr:{
        fr:{ source:"Merci beaucoup",   phonetic:"mou-tchas gra-ci-as", grammar:"« Muchas » = beaucoup (féminin pluriel). « Gracias » vient du latin « gratia » (grâce, faveur).", complements:["Simple : « Gracias »","Très formel : « Se lo agradezco mucho »","Réponse : « De nada »"] },
        en:{ source:"Thank you very much", phonetic:"moo-chas gra-thias", grammar:"« Muchas » = many/much (feminine plural). « Gracias » from Latin « gratia ».", complements:["Simple: « Gracias »","Reply: « De nada »"] },
        de:{ source:"Vielen Dank",      phonetic:"mu-tschas gra-thias", grammar:"« Muchas » = sehr viele (femininer Plural). « Gracias » vom Lateinischen « gratia ».", complements:["Einfach: « Gracias »","Antwort: « De nada »"] },
        it:{ source:"Grazie mille",     phonetic:"mu-chas gra-thias",   grammar:"« Muchas » = molte (femminile plurale). « Gracias » dal latino « gratia ».", complements:["Semplice: « Gracias »","Risposta: « De nada »"] },
        ro:{ source:"Mulțumesc mult",   phonetic:"mu-chas gra-thias",   grammar:"« Muchas » = multe (feminin plural). « Gracias » din latinescul « gratia ».", complements:["Simplu: « Gracias »","Răspuns: « De nada »"] },
      }},
      { id:"p003", target:"Por favor", freqs:[480,400], tr:{
        fr:{ source:"S'il vous plaît",  phonetic:"por fa-vor",     grammar:"Littéralement « pour la faveur ». Essentiel en espagnol, toujours en fin de demande.", complements:["En début : « Por favor, ¿me puede ayudar? »","Insistance : « Se lo pido por favor »"] },
        en:{ source:"Please",           phonetic:"por fa-vor",     grammar:"Literally 'for the favor'. Essential in Spanish, always at the end of a request.", complements:["At the start: « Por favor, ¿puede ayudarme? »"] },
        de:{ source:"Bitte",            phonetic:"por fa-wor",     grammar:"Wörtlich « für die Gunst ». Im Spanischen unverzichtbar, immer am Ende einer Bitte.", complements:["Am Anfang: « Por favor, ¿puede ayudarme? »"] },
        it:{ source:"Per favore",       phonetic:"por fa-vor",     grammar:"Letteralmente 'per il favore'. Essenziale in spagnolo, sempre alla fine di una richiesta.", complements:["All'inizio: « Por favor, ¿puede ayudarme? »"] },
        ro:{ source:"Vă rog",           phonetic:"por fa-vor",     grammar:"Literal 'pentru favoare'. Esențial în spaniolă, întotdeauna la sfârșitul unei cereri.", complements:["La început: « Por favor, ¿puede ayudarme? »"] },
      }},
      { id:"p004", target:"Perdone", freqs:[400,480,440], tr:{
        fr:{ source:"Excusez-moi",      phonetic:"per-do-né",      grammar:"Forme formelle de « perdonar » (pardonner). Pour attirer l'attention ou s'excuser légèrement.", complements:["Informel : « Perdona »","Forte excuse : « Lo siento mucho »","Pour passer : « Con permiso »"] },
        en:{ source:"Excuse me",        phonetic:"per-do-neh",     grammar:"Formal form of « perdonar » (to forgive). To get attention or apologize lightly.", complements:["Informal: « Perdona »","Strong apology: « Lo siento mucho »","To pass: « Con permiso »"] },
        de:{ source:"Entschuldigung",   phonetic:"per-do-ne",      grammar:"Formelle Form von « perdonar » (verzeihen). Um Aufmerksamkeit zu erregen.", complements:["Informell: « Perdona »","Starke Entschuldigung: « Lo siento mucho »"] },
        it:{ source:"Mi scusi",         phonetic:"per-do-ne",      grammar:"Forma formale di « perdonar » (perdonare). Per attirare l'attenzione.", complements:["Informale: « Perdona »","Scusa forte: « Lo siento mucho »"] },
        ro:{ source:"Scuzați-mă",       phonetic:"per-do-ne",      grammar:"Forma formală a lui « perdonar » (a ierta). Pentru a atrage atenția.", complements:["Informal: « Perdona »","Scuză puternică: « Lo siento mucho »"] },
      }},
      { id:"p005", target:"No entiendo", freqs:[360,420,480], tr:{
        fr:{ source:"Je ne comprends pas", phonetic:"no én-tièn-do", grammar:"« Entender » vient du latin « intendere ». Négation simple avec « no » devant le verbe.", complements:["Variante : « No comprendo »","Demander : « ¿Puede hablar más despacio? »","Écrire : « ¿Puede escribirlo? »"] },
        en:{ source:"I don't understand", phonetic:"no en-tyen-do", grammar:"« Entender » from Latin « intendere ». Simple negation with « no » before the verb.", complements:["Variant: « No comprendo »","Ask: « ¿Puede hablar más despacio? »"] },
        de:{ source:"Ich verstehe nicht", phonetic:"no en-tjen-do", grammar:"« Entender » vom Lateinischen « intendere ». Einfache Verneinung mit « no ».", complements:["Variante: « No comprendo »","Bitten: « ¿Puede hablar más despacio? »"] },
        it:{ source:"Non capisco",      phonetic:"no en-tièn-do",   grammar:"« Entender » dal latino « intendere ». Negazione semplice con « no ».", complements:["Variante: « No comprendo »","Chiedere: « ¿Puede hablar más despacio? »"] },
        ro:{ source:"Nu înțeleg",       phonetic:"no en-tièn-do",   grammar:"« Entender » din latinescul « intendere ». Negație simplă cu « no ».", complements:["Variantă: « No comprendo »","Cerere: « ¿Puede hablar más despacio? »"] },
      }},
      { id:"p006", target:"Adiós", freqs:[500,460], tr:{
        fr:{ source:"Au revoir",        phonetic:"a-di-os",        grammar:"Littéralement « à Dieu ». Même étymologie que le français « adieu ». Formule de départ.", complements:["Informel : « ¡Hasta luego! »","À bientôt : « ¡Hasta pronto! »","À demain : « ¡Hasta mañana! »"] },
        en:{ source:"Goodbye",          phonetic:"a-dyos",         grammar:"Literally 'to God'. Same etymology as French 'adieu'. Farewell formula.", complements:["Informal: « ¡Hasta luego! »","See you soon: « ¡Hasta pronto! »"] },
        de:{ source:"Auf Wiedersehen",  phonetic:"a-djos",         grammar:"Wörtlich « zu Gott ». Gleiche Etymologie wie französisch « adieu ».", complements:["Informell: « ¡Hasta luego! »","Bis bald: « ¡Hasta pronto! »"] },
        it:{ source:"Arrivederci",      phonetic:"a-diòs",         grammar:"Letteralmente 'a Dio'. Stessa etimologia del francese « adieu ».", complements:["Informale: « ¡Hasta luego! »","A presto: « ¡Hasta pronto! »"] },
        ro:{ source:"La revedere",      phonetic:"a-dios",         grammar:"Literal 'la Dumnezeu'. Aceeași etimologie ca și francezul « adieu ».", complements:["Informal: « ¡Hasta luego! »","Pe curând: « ¡Hasta pronto! »"] },
      }},
      { id:"p007", target:"Buenas noches", freqs:[460,500,440], tr:{
        fr:{ source:"Bonsoir / Bonne nuit", phonetic:"bouènas no-tché-s", grammar:"En espagnol, « buenas noches » sert à la fois de salutation du soir ET de formule de bonne nuit.", complements:["Matin : « Buenos días »","Après-midi : « Buenas tardes »","« Buenas » seul = salutation rapide informelle"] },
        en:{ source:"Good evening / Good night", phonetic:"bwenas no-ches", grammar:"In Spanish, « buenas noches » is used both as an evening greeting AND a goodnight farewell.", complements:["Morning: « Buenos días »","Afternoon: « Buenas tardes »","Short: « Buenas »"] },
        de:{ source:"Guten Abend / Gute Nacht", phonetic:"bwenas no-tsches", grammar:"Auf Spanisch dient « buenas noches » sowohl als Abendgruß ALS AUCH als Gutenacht-Formel.", complements:["Morgen: « Buenos días »","Nachmittag: « Buenas tardes »"] },
        it:{ source:"Buonasera / Buonanotte", phonetic:"bwènas no-tches",    grammar:"In spagnolo, « buenas noches » è sia un saluto serale CHE una formula di buonanotte.", complements:["Mattina: « Buenos días »","Pomeriggio: « Buenas tardes »"] },
        ro:{ source:"Bună seara / Noapte bună", phonetic:"buenas no-ches",   grammar:"În spaniolă, « buenas noches » servește atât ca salut de seară CÂT ȘI ca formulă de noapte bună.", complements:["Dimineața: « Buenos días »","Dupăamiaza: « Buenas tardes »"] },
      }},
      { id:"p008", target:"¿Dónde está el baño?", freqs:[380,420,460], tr:{
        fr:{ source:"Où sont les toilettes ?", phonetic:"dondé es-ta él ba-gnio", grammar:"« Baño » = salle de bain en espagnol. « ¿Dónde está? » = où est (singulier).", complements:["Formal : « ¿Dónde están los servicios? »","Au restaurant : « ¿Los aseos, por favor? »","WC = « los lavabos »"] },
        en:{ source:"Where is the bathroom?", phonetic:"don-de es-ta el ban-yo",  grammar:"« Baño » = bathroom in Spanish. « ¿Dónde está? » = where is (singular).", complements:["Formal: « ¿Dónde están los servicios? »","Restaurant: « ¿Los aseos, por favor? »"] },
        de:{ source:"Wo ist das Badezimmer?", phonetic:"dón-de es-ta el ban-jo",  grammar:"« Baño » = Badezimmer auf Spanisch. « ¿Dónde está? » = wo ist (Singular).", complements:["Formell: « ¿Dónde están los servicios? »"] },
        it:{ source:"Dov'è il bagno?",  phonetic:"dón-de es-ta el ban-yo",        grammar:"« Baño » = bagno in spagnolo. « ¿Dónde está? » = dove è (singolare).", complements:["Formale: « ¿Dónde están los servicios? »"] },
        ro:{ source:"Unde este toaleta?", phonetic:"don-de es-ta el ban-yo",       grammar:"« Baño » = baie în spaniolă. « ¿Dónde está? » = unde este (singular).", complements:["Formal: « ¿Dónde están los servicios? »"] },
      }},
      { id:"p009", target:"¿Cuánto cuesta?", freqs:[420,460,400], tr:{
        fr:{ source:"Combien ça coûte ?", phonetic:"couanto couèsta", grammar:"« Cuánto » = combien. « Costar » = coûter. Verbe irrégulier : cuesto, cuesta, costamos…", complements:["Pluriel : « ¿Cuánto cuestan? »","Négocier : « ¿Me puede hacer un descuento? »","Cher : « Es muy caro »","Pas cher : « Es muy barato »"] },
        en:{ source:"How much does it cost?", phonetic:"kwanto kwesta",  grammar:"« Cuánto » = how much. « Costar » = to cost. Irregular verb: cuesto, cuesta…", complements:["Plural: « ¿Cuánto cuestan? »","Negotiate: « ¿Me puede hacer un descuento? »"] },
        de:{ source:"Wie viel kostet es?", phonetic:"kuanto kuesta",     grammar:"« Cuánto » = wie viel. « Costar » = kosten. Unregelmäßiges Verb.", complements:["Plural: « ¿Cuánto cuestan? »","Rabatt: « ¿Me puede hacer un descuento? »"] },
        it:{ source:"Quanto costa?",    phonetic:"kuanto kuèsta",         grammar:"« Cuánto » = quanto. « Costar » = costare. Verbo irregolare.", complements:["Plurale: « ¿Cuánto cuestan? »","Sconto: « ¿Me puede hacer un descuento? »"] },
        ro:{ source:"Cât costă?",       phonetic:"kuanto kuèsta",         grammar:"« Cuánto » = cât. « Costar » = a costa. Verb neregulat.", complements:["Plural: « ¿Cuánto cuestan? »","Reducere: « ¿Me puede hacer un descuento? »"] },
      }},
      { id:"p010", target:"¿Habla francés?", freqs:[500,440,480], tr:{
        fr:{ source:"Parlez-vous français ?", phonetic:"a-bla fran-cès", grammar:"« Hablar » = parler. Forme formelle (usted). Informel : « ¿Hablas francés? ».", complements:["Informel : « ¿Hablas francés? »","Autre langue : « ¿Habla inglés? »","Réponse : « Un poco / No muy bien »"] },
        en:{ source:"Do you speak French?", phonetic:"ab-la fran-thes",   grammar:"« Hablar » = to speak. Formal form (usted). Informal: « ¿Hablas francés? ».", complements:["Informal: « ¿Hablas francés? »","Another language: « ¿Habla inglés? »"] },
        de:{ source:"Sprechen Sie Französisch?", phonetic:"ab-la fran-thes", grammar:"« Hablar » = sprechen. Formelle Form (usted). Informell: « ¿Hablas francés? ».", complements:["Informell: « ¿Hablas francés? »","Andere Sprache: « ¿Habla inglés? »"] },
        it:{ source:"Parla francese?",  phonetic:"ab-la fran-thes",        grammar:"« Hablar » = parlare. Forma formale (usted). Informale: « ¿Hablas francés? ».", complements:["Informale: « ¿Hablas francés? »","Altra lingua: « ¿Habla inglés? »"] },
        ro:{ source:"Vorbiți franceză?", phonetic:"ab-la fran-thes",       grammar:"« Hablar » = a vorbi. Forma formală (usted). Informal: « ¿Hablas francés? ».", complements:["Informal: « ¿Hablas francés? »","Altă limbă: « ¿Habla inglés? »"] },
      }},
    ],
  },

  // ══════════════════════════════════════════════
  // PACK ITALIEN
  // ══════════════════════════════════════════════
  it: {
    id: "L01_IT", targetLang: "it", targetFlag: "🇮🇹",
    lesson: {
      id: "l01", emoji: "💬",
      titles: { fr:"Politesse & bases", en:"Politeness & basics", es:"Cortesía & básicos", de:"Höflichkeit & Grundlagen", it:"Cortesia & basi", ro:"Politețe & baze" },
      subs:   { fr:"Salutations, merci…", en:"Greetings, thank you…", es:"Saludos, gracias…", de:"Begrüßung, Danke…", it:"Saluti, grazie…", ro:"Salutări, mulțumesc…" },
    },
    phrases: [
      { id:"p001", target:"Ciao", freqs:[520,440], tr:{
        fr:{ source:"Bonjour / Salut",  phonetic:"tcha-o",         grammar:"Vient du vénitien « s'ciào vostro » (je suis votre esclave). Utilisé en salutation ET en au revoir.", complements:["Formel : « Buongiorno » (matin) / « Buonasera » (soir)","Uniquement entre proches","Au revoir informel aussi : « Ciao! »"] },
        en:{ source:"Hi / Hello",       phonetic:"chow",           grammar:"From Venetian « s'ciào vostro » (I am your slave). Used both as hello AND goodbye.", complements:["Formal: « Buongiorno » / « Buonasera »","Only between close people","Also goodbye: « Ciao! »"] },
        de:{ source:"Hallo / Tschüss",  phonetic:"tscha-o",        grammar:"Vom venezianischen « s'ciào vostro ». Wird sowohl als Hallo ALS AUCH als Tschüss verwendet.", complements:["Formell: « Buongiorno » / « Buonasera »","Nur unter Vertrauten"] },
        es:{ source:"Hola / Adiós",     phonetic:"cha-o",          grammar:"Del veneciano « s'ciào vostro ». Se usa tanto como hola COMO adiós.", complements:["Formal: « Buongiorno » / « Buonasera »","Solo entre conocidos"] },
        ro:{ source:"Bună / Pa",        phonetic:"cia-o",          grammar:"Din venețianul « s'ciào vostro ». Folosit atât ca salut CÂT ȘI ca la revedere.", complements:["Formal: « Buongiorno » / « Buonasera »","Doar între apropiați"] },
      }},
      { id:"p002", target:"Grazie mille", freqs:[440,520,480,440], tr:{
        fr:{ source:"Merci beaucoup",   phonetic:"gra-tsié mi-llé", grammar:"« Grazie » du latin « gratia ». « Mille » = mille, utilisé comme intensificateur (mille fois merci).", complements:["Simple : « Grazie »","Très formel : « La ringrazio moltissimo »","Réponse : « Prego »"] },
        en:{ source:"Thank you very much", phonetic:"grat-syeh meel-leh", grammar:"« Grazie » from Latin « gratia ». « Mille » = thousand, used as intensifier.", complements:["Simple: « Grazie »","Very formal: « La ringrazio moltissimo »","Reply: « Prego »"] },
        de:{ source:"Vielen Dank",      phonetic:"grat-sje mil-le", grammar:"« Grazie » vom Lateinischen « gratia ». « Mille » = tausend, als Verstärker.", complements:["Einfach: « Grazie »","Antwort: « Prego »"] },
        es:{ source:"Muchas gracias",   phonetic:"gra-tsie mi-lle", grammar:"« Grazie » del latín « gratia ». « Mille » = mil, usado como intensificador.", complements:["Simple: « Grazie »","Respuesta: « Prego »"] },
        ro:{ source:"Mulțumesc mult",   phonetic:"gra-tsie mi-lle", grammar:"« Grazie » din latinescul « gratia ». « Mille » = o mie, folosit ca intensificator.", complements:["Simplu: « Grazie »","Răspuns: « Prego »"] },
      }},
      { id:"p003", target:"Per favore", freqs:[480,400], tr:{
        fr:{ source:"S'il vous plaît",  phonetic:"pèr fa-vo-ré",   grammar:"Littéralement « pour la faveur ». En italien, souvent remplacé par « per piacere » dans le centre et le nord.", complements:["Variante : « Per piacere »","Au sud : « Per cortesia »","Toujours en fin de phrase"] },
        en:{ source:"Please",           phonetic:"per fa-vo-reh",  grammar:"Literally 'for the favor'. In Italian, often replaced by « per piacere » in central/northern Italy.", complements:["Variant: « Per piacere »","South Italy: « Per cortesia »"] },
        de:{ source:"Bitte",            phonetic:"per fa-wo-re",   grammar:"Wörtlich « für die Gunst ». In Mittel- und Norditalien oft « per piacere ».", complements:["Variante: « Per piacere »","Süditalien: « Per cortesia »"] },
        es:{ source:"Por favor",        phonetic:"per fa-vo-re",   grammar:"Literalmente 'por el favor'. En el centro y norte a menudo « per piacere ».", complements:["Variante: « Per piacere »","Sur: « Per cortesia »"] },
        ro:{ source:"Vă rog",           phonetic:"per fa-vo-re",   grammar:"Literal 'pentru favoare'. În centrul și nordul Italiei adesea « per piacere ».", complements:["Variantă: « Per piacere »","Sud: « Per cortesia »"] },
      }},
      { id:"p004", target:"Mi scusi", freqs:[400,480,440], tr:{
        fr:{ source:"Excusez-moi",      phonetic:"mi skou-zi",     grammar:"Forme formelle avec « mi » (me) + « scusi » (subjonctif formel de « scusare »).", complements:["Informel : « Scusa »","Pour passer : « Permesso »","Grosse excuse : « Mi dispiace tanto »"] },
        en:{ source:"Excuse me",        phonetic:"mee skoo-zee",   grammar:"Formal form: « mi » (me) + « scusi » (formal subjunctive of « scusare »).", complements:["Informal: « Scusa »","To pass: « Permesso »","Big apology: « Mi dispiace tanto »"] },
        de:{ source:"Entschuldigen Sie", phonetic:"mi sku-si",     grammar:"Formelle Form: « mi » (mich) + « scusi » (formeller Konjunktiv von « scusare »).", complements:["Informell: « Scusa »","Zum Durchkommen: « Permesso »"] },
        es:{ source:"Perdone",          phonetic:"mi sku-si",      grammar:"Forma formal: « mi » (me) + « scusi » (subjuntivo formal de « scusare »).", complements:["Informal: « Scusa »","Para pasar: « Permesso »"] },
        ro:{ source:"Scuzați-mă",       phonetic:"mi sku-si",      grammar:"Forma formală: « mi » (mă) + « scusi » (conjunctiv formal al lui « scusare »).", complements:["Informal: « Scusa »","Pentru a trece: « Permesso »"] },
      }},
      { id:"p005", target:"Non capisco", freqs:[360,420,480], tr:{
        fr:{ source:"Je ne comprends pas", phonetic:"nonne ka-pis-ko", grammar:"« Capire » vient du latin « capere » (prendre, saisir). Présent : capisco, capisci, capisce…", complements:["Variante : « Non ho capito »","Demander : « Può ripetere più lentamente? »","Écrire : « Può scriverlo? »"] },
        en:{ source:"I don't understand", phonetic:"non ka-pees-ko", grammar:"« Capire » from Latin « capere » (to take, grasp). Present: capisco, capisci…", complements:["Variant: « Non ho capito »","Ask: « Può ripetere più lentamente? »"] },
        de:{ source:"Ich verstehe nicht", phonetic:"non ka-pis-ko", grammar:"« Capire » vom Lateinischen « capere » (nehmen, begreifen).", complements:["Variante: « Non ho capito »","Bitten: « Può ripetere più lentamente? »"] },
        es:{ source:"No entiendo",      phonetic:"non ka-pis-ko",   grammar:"« Capire » del latín « capere » (tomar, comprender).", complements:["Variante: « Non ho capito »","Pedir: « Può ripetere più lentamente? »"] },
        ro:{ source:"Nu înțeleg",       phonetic:"non ca-pis-co",   grammar:"« Capire » din latinescul « capere » (a lua, a înțelege).", complements:["Variantă: « Non ho capito »","Cerere: « Può ripetere più lentamente? »"] },
      }},
      { id:"p006", target:"Arrivederci", freqs:[500,460], tr:{
        fr:{ source:"Au revoir",        phonetic:"a-ri-vé-dèr-tchi", grammar:"Littéralement « jusqu'à ce que nous nous revoyions ». Forme réfléchie de « rivedere » (revoir).", complements:["Informel : « Ciao! »","Très formel : « ArrivederLa »","À bientôt : « A presto »"] },
        en:{ source:"Goodbye",          phonetic:"a-ree-veh-DER-chee", grammar:"Literally 'until we see each other again'. Reflexive form of « rivedere ».", complements:["Informal: « Ciao! »","Very formal: « ArrivederLa »","See you soon: « A presto »"] },
        de:{ source:"Auf Wiedersehen",  phonetic:"a-ri-we-dèr-tschi", grammar:"Wörtlich « bis wir uns wiedersehen ». Reflexivform von « rivedere ».", complements:["Informell: « Ciao! »","Sehr formell: « ArrivederLa »"] },
        es:{ source:"Hasta luego",      phonetic:"a-ri-ve-dèr-chi",   grammar:"Literalmente 'hasta que nos volvamos a ver'. Forma reflexiva de « rivedere ».", complements:["Informal: « Ciao! »","Muy formal: « ArrivederLa »"] },
        ro:{ source:"La revedere",      phonetic:"a-ri-ve-dèr-ci",    grammar:"Literal 'până ne revedem'. Forma reflexivă a lui « rivedere ».", complements:["Informal: « Ciao! »","Foarte formal: « ArrivederLa »"] },
      }},
      { id:"p007", target:"Buonasera", freqs:[460,500,440], tr:{
        fr:{ source:"Bonsoir",          phonetic:"bouona-sé-ra",   grammar:"« Buona » = bonne + « sera » du latin « sero » (tard). S'utilise à partir de 17h environ.", complements:["Matin : « Buongiorno »","Nuit : « Buonanotte »","Informel soir : « Buonasera! »"] },
        en:{ source:"Good evening",     phonetic:"bwoh-na-SEH-ra", grammar:"« Buona » = good + « sera » from Latin « sero » (late). Used from around 5 PM.", complements:["Morning: « Buongiorno »","Night: « Buonanotte »"] },
        de:{ source:"Guten Abend",      phonetic:"buo-na-se-ra",   grammar:"« Buona » = gut + « sera » vom Lateinischen « sero » (spät). Ab ca. 17 Uhr.", complements:["Morgen: « Buongiorno »","Nacht: « Buonanotte »"] },
        es:{ source:"Buenas tardes",    phonetic:"buo-na-se-ra",   grammar:"« Buona » = buena + « sera » del latín « sero » (tarde). Se usa desde las 17h.", complements:["Mañana: « Buongiorno »","Noche: « Buonanotte »"] },
        ro:{ source:"Bună seara",       phonetic:"buo-na-se-ra",   grammar:"« Buona » = bună + « sera » din latinescul « sero » (târziu). De la ora 17.", complements:["Dimineața: « Buongiorno »","Noaptea: « Buonanotte »"] },
      }},
      { id:"p008", target:"Dov'è il bagno?", freqs:[380,420,460], tr:{
        fr:{ source:"Où sont les toilettes ?", phonetic:"do-vè il ban-gnio", grammar:"« Dov'è » = contraction de « dove è » (où est). « Bagno » = bain/salle de bain.", complements:["Formel : « Dove si trovano i servizi? »","Au restaurant : « I bagni, per favore? »","WC : « Il gabinetto »"] },
        en:{ source:"Where is the bathroom?", phonetic:"doh-VEH eel BAN-yoh", grammar:"« Dov'è » = contraction of « dove è » (where is). « Bagno » = bath/bathroom.", complements:["Formal: « Dove si trovano i servizi? »","Restaurant: « I bagni, per favore? »"] },
        de:{ source:"Wo ist das Badezimmer?", phonetic:"do-vè il ban-yo",     grammar:"« Dov'è » = Kontraktion von « dove è » (wo ist). « Bagno » = Bad/Badezimmer.", complements:["Formell: « Dove si trovano i servizi? »"] },
        es:{ source:"¿Dónde está el baño?", phonetic:"do-vé il ban-yo",       grammar:"« Dov'è » = contracción de « dove è » (dónde está). « Bagno » = baño.", complements:["Formal: « Dove si trovano i servizi? »"] },
        ro:{ source:"Unde este toaleta?", phonetic:"do-ve il ban-yo",          grammar:"« Dov'è » = contracție a lui « dove è » (unde este). « Bagno » = baie.", complements:["Formal: « Dove si trovano i servizi? »"] },
      }},
      { id:"p009", target:"Quanto costa?", freqs:[420,460,400], tr:{
        fr:{ source:"Combien ça coûte ?", phonetic:"couanto kosta", grammar:"« Quanto » = combien (masculin singulier). « Costare » = coûter. Verbe régulier du 1er groupe.", complements:["Pluriel : « Quanto costano? »","Négocier : « Può farmi uno sconto? »","Cher : « È troppo caro »","Pas cher : « È economico »"] },
        en:{ source:"How much does it cost?", phonetic:"kwanto kosta",  grammar:"« Quanto » = how much (masculine singular). « Costare » = to cost. Regular verb.", complements:["Plural: « Quanto costano? »","Discount: « Può farmi uno sconto? »"] },
        de:{ source:"Wie viel kostet es?", phonetic:"kuanto kosta",     grammar:"« Quanto » = wie viel (maskuliner Singular). « Costare » = kosten. Regelmäßiges Verb.", complements:["Plural: « Quanto costano? »","Rabatt: « Può farmi uno sconto? »"] },
        es:{ source:"¿Cuánto cuesta?",  phonetic:"kuanto kosta",         grammar:"« Quanto » = cuánto (masculino singular). « Costare » = costar. Verbo regular.", complements:["Plural: « Quanto costano? »","Descuento: « Può farmi uno sconto? »"] },
        ro:{ source:"Cât costă?",       phonetic:"kuanto kosta",          grammar:"« Quanto » = cât (masculin singular). « Costare » = a costa. Verb regulat.", complements:["Plural: « Quanto costano? »","Reducere: « Può farmi uno sconto? »"] },
      }},
      { id:"p010", target:"Parla francese?", freqs:[500,440,480], tr:{
        fr:{ source:"Parlez-vous français ?", phonetic:"parla fran-tchèzé", grammar:"« Parlare » = parler. Forme formelle (Lei). Informel : « Parli francese? »", complements:["Informel : « Parli francese? »","Autre langue : « Parla inglese? »","Réponse : « Un po' / Non molto bene »"] },
        en:{ source:"Do you speak French?", phonetic:"par-la fran-cheh-zeh", grammar:"« Parlare » = to speak. Formal form (Lei). Informal: « Parli francese? »", complements:["Informal: « Parli francese? »","Another language: « Parla inglese? »"] },
        de:{ source:"Sprechen Sie Französisch?", phonetic:"parla fran-tsche-se", grammar:"« Parlare » = sprechen. Formelle Form (Lei). Informell: « Parli francese? »", complements:["Informell: « Parli francese? »","Andere Sprache: « Parla tedesco? »"] },
        es:{ source:"¿Habla francés?",  phonetic:"par-la fran-che-se",           grammar:"« Parlare » = hablar. Forma formal (Lei). Informal: « Parli francese? »", complements:["Informal: « Parli francese? »","Otra lengua: « Parla spagnolo? »"] },
        ro:{ source:"Vorbiți franceză?", phonetic:"par-la fran-ce-ze",            grammar:"« Parlare » = a vorbi. Forma formală (Lei). Informal: « Parli francese? »", complements:["Informal: « Parli francese? »","Altă limbă: « Parla rumeno? »"] },
      }},
    ],
  },

  // ══════════════════════════════════════════════
  // PACK ALLEMAND
  // ══════════════════════════════════════════════
  de: {
    id: "L01_DE", targetLang: "de", targetFlag: "🇩🇪",
    lesson: {
      id: "l01", emoji: "💬",
      titles: { fr:"Politesse & bases", en:"Politeness & basics", es:"Cortesía & básicos", de:"Höflichkeit & Grundlagen", it:"Cortesia & basi", ro:"Politețe & baze" },
      subs:   { fr:"Salutations, merci…", en:"Greetings, thank you…", es:"Saludos, gracias…", de:"Begrüßung, Danke…", it:"Saluti, grazie…", ro:"Salutări, mulțumesc…" },
    },
    phrases: [
      { id:"p001", target:"Hallo", freqs:[520,440], tr:{
        fr:{ source:"Bonjour",          phonetic:"ha-lo",          grammar:"Salutation standard et neutre en allemand. Vient du vieux haut-allemand « hala, hola ».", complements:["Formel : « Guten Tag »","Matin : « Guten Morgen »","Soir : « Guten Abend »","Informel : « Hi »"] },
        en:{ source:"Hello",            phonetic:"ha-lo",          grammar:"Standard and neutral German greeting. From Old High German « hala, hola ».", complements:["Formal: « Guten Tag »","Morning: « Guten Morgen »","Evening: « Guten Abend »"] },
        es:{ source:"Hola",             phonetic:"ja-lo",          grammar:"Saludo estándar y neutro en alemán. Del alto alemán antiguo « hala, hola ».", complements:["Formal: « Guten Tag »","Mañana: « Guten Morgen »"] },
        it:{ source:"Ciao",             phonetic:"ha-lo",          grammar:"Saluto standard e neutro in tedesco. Dal tedesco antico « hala, hola ».", complements:["Formale: « Guten Tag »","Mattina: « Guten Morgen »"] },
        ro:{ source:"Bună ziua",        phonetic:"ha-lo",          grammar:"Salut standard și neutru în germană. Din germana veche « hala, hola ».", complements:["Formal: « Guten Tag »","Dimineața: « Guten Morgen »"] },
      }},
      { id:"p002", target:"Vielen Dank", freqs:[440,520,480,440], tr:{
        fr:{ source:"Merci beaucoup",   phonetic:"fi-lène dank",   grammar:"« Vielen » = beaucoup (accusatif pluriel). « Dank » = gratitude. Du vieux haut-allemand « danc ».", complements:["Simple : « Danke »","Très formel : « Herzlichen Dank »","Informel : « Danke schön »","Réponse : « Bitte »"] },
        en:{ source:"Thank you very much", phonetic:"fee-len dank", grammar:"« Vielen » = many (accusative plural). « Dank » = gratitude. From Old High German « danc ».", complements:["Simple: « Danke »","Very formal: « Herzlichen Dank »","Reply: « Bitte »"] },
        es:{ source:"Muchas gracias",   phonetic:"fi-len dank",    grammar:"« Vielen » = muchos (acusativo plural). « Dank » = gratitud. Del antiguo alto alemán.", complements:["Simple: « Danke »","Respuesta: « Bitte »"] },
        it:{ source:"Grazie mille",     phonetic:"fi-len dank",    grammar:"« Vielen » = molti (accusativo plurale). « Dank » = gratitudine. Dal tedesco antico.", complements:["Semplice: « Danke »","Risposta: « Bitte »"] },
        ro:{ source:"Mulțumesc mult",   phonetic:"fi-len dank",    grammar:"« Vielen » = mulți (acuzativ plural). « Dank » = recunoștință. Din germana veche.", complements:["Simplu: « Danke »","Răspuns: « Bitte »"] },
      }},
      { id:"p003", target:"Bitte", freqs:[480,400], tr:{
        fr:{ source:"S'il vous plaît",  phonetic:"bi-té",          grammar:"Mot polyvalent : s'il vous plaît, voilà, de rien. Du vieux haut-allemand « bitten » (prier).", complements:["De rien : « Bitte » (en réponse à Danke)","Voilà : « Bitte » (en tendant quelque chose)","Pardon ? : « Bitte? »"] },
        en:{ source:"Please",           phonetic:"bit-teh",        grammar:"Multi-purpose word: please, here you go, you're welcome. From Old High German « bitten ».", complements:["You're welcome: « Bitte »","Here you go: « Bitte »","Pardon?: « Bitte? »"] },
        es:{ source:"Por favor",        phonetic:"bi-te",          grammar:"Palabra polivalente: por favor, aquí tiene, de nada. Del antiguo alto alemán « bitten ».", complements:["De nada: « Bitte »","Aquí tiene: « Bitte »","¿Cómo?: « Bitte? »"] },
        it:{ source:"Per favore",       phonetic:"bi-te",          grammar:"Parola polivalente: per favore, prego, di niente. Dal tedesco antico « bitten ».", complements:["Prego: « Bitte »","Ecco: « Bitte »","Come?: « Bitte? »"] },
        ro:{ source:"Vă rog",           phonetic:"bi-te",          grammar:"Cuvânt polivalent: vă rog, poftim, cu plăcere. Din germana veche « bitten ».", complements:["Cu plăcere: « Bitte »","Poftim: « Bitte »","Poftim?: « Bitte? »"] },
      }},
      { id:"p004", target:"Entschuldigung", freqs:[400,480,440], tr:{
        fr:{ source:"Excusez-moi",      phonetic:"ent-choul-di-goung", grammar:"Substantif signifiant « excuse ». Vient de « entschuldigen » (excuser). Peut s'utiliser seul.", complements:["Verbe : « Entschuldigen Sie »","Informel : « Tschuldigung »","Grosse excuse : « Es tut mir sehr leid »","Pour passer : « Entschuldigung, darf ich vorbei? »"] },
        en:{ source:"Excuse me",        phonetic:"ent-shool-dee-goong", grammar:"Noun meaning 'excuse'. From « entschuldigen » (to excuse). Can be used alone.", complements:["Verb form: « Entschuldigen Sie »","Informal: « Tschuldigung »","Big apology: « Es tut mir sehr leid »"] },
        es:{ source:"Perdone",          phonetic:"ent-chul-di-gung",   grammar:"Sustantivo que significa 'disculpa'. De « entschuldigen » (disculpar).", complements:["Verbo: « Entschuldigen Sie »","Informal: « Tschuldigung »","Disculpa grande: « Es tut mir sehr leid »"] },
        it:{ source:"Mi scusi",         phonetic:"ent-schul-di-gung",  grammar:"Sostantivo che significa 'scusa'. Da « entschuldigen » (scusare).", complements:["Verbo: « Entschuldigen Sie »","Informale: « Tschuldigung »","Scusa grande: « Es tut mir sehr leid »"] },
        ro:{ source:"Scuzați-mă",       phonetic:"ent-șul-di-gung",    grammar:"Substantiv care înseamnă 'scuză'. Din « entschuldigen » (a scuza).", complements:["Verb: « Entschuldigen Sie »","Informal: « Tschuldigung »","Scuză mare: « Es tut mir sehr leid »"] },
      }},
      { id:"p005", target:"Ich verstehe nicht", freqs:[360,420,480], tr:{
        fr:{ source:"Je ne comprends pas", phonetic:"ich fer-ché-é nicht", grammar:"« Verstehen » = comprendre. Verbe séparable au passé : « Ich habe nicht verstanden ».", complements:["Variante : « Ich habe nicht verstanden »","Demander : « Könnten Sie langsamer sprechen? »","Écrire : « Könnten Sie das aufschreiben? »"] },
        en:{ source:"I don't understand", phonetic:"ikh fer-SHTEH-uh nikht", grammar:"« Verstehen » = to understand. Separable verb in past: « Ich habe nicht verstanden ».", complements:["Variant: « Ich habe nicht verstanden »","Ask: « Könnten Sie langsamer sprechen? »"] },
        es:{ source:"No entiendo",      phonetic:"ich fer-ste-he nicht",  grammar:"« Verstehen » = entender. Verbo separable en pasado: « Ich habe nicht verstanden ».", complements:["Variante: « Ich habe nicht verstanden »","Pedir: « Könnten Sie langsamer sprechen? »"] },
        it:{ source:"Non capisco",      phonetic:"ich fer-ste-e nicht",   grammar:"« Verstehen » = capire. Verbo separabile al passato: « Ich habe nicht verstanden ».", complements:["Variante: « Ich habe nicht verstanden »","Chiedere: « Könnten Sie langsamer sprechen? »"] },
        ro:{ source:"Nu înțeleg",       phonetic:"ich fer-ste-e nicht",   grammar:"« Verstehen » = a înțelege. Verb separabil la trecut: « Ich habe nicht verstanden ».", complements:["Variantă: « Ich habe nicht verstanden »","Cerere: « Könnten Sie langsamer sprechen? »"] },
      }},
      { id:"p006", target:"Auf Wiedersehen", freqs:[500,460], tr:{
        fr:{ source:"Au revoir",        phonetic:"aouf vi-der-zé-ène", grammar:"Littéralement « jusqu'à ce qu'on se revoie ». « Wieder » = encore + « sehen » = voir.", complements:["Informel : « Tschüss »","Au téléphone : « Auf Wiederhören »","À bientôt : « Bis bald »","Au sud : « Servus »"] },
        en:{ source:"Goodbye",          phonetic:"owf VEE-der-zay-en", grammar:"Literally 'until we see each other again'. « Wieder » = again + « sehen » = to see.", complements:["Informal: « Tschüss »","On phone: « Auf Wiederhören »","See you soon: « Bis bald »"] },
        es:{ source:"Adiós",            phonetic:"auf wi-der-se-en",   grammar:"Literalmente 'hasta que nos volvamos a ver'. « Wieder » = de nuevo + « sehen » = ver.", complements:["Informal: « Tschüss »","Por teléfono: « Auf Wiederhören »","Hasta pronto: « Bis bald »"] },
        it:{ source:"Arrivederci",      phonetic:"auf wi-der-se-en",   grammar:"Letteralmente 'fino a rivederci'. « Wieder » = di nuovo + « sehen » = vedere.", complements:["Informale: « Tschüss »","Al telefono: « Auf Wiederhören »","A presto: « Bis bald »"] },
        ro:{ source:"La revedere",      phonetic:"auf wi-der-ze-en",   grammar:"Literal 'până ne revedem'. « Wieder » = din nou + « sehen » = a vedea.", complements:["Informal: « Tschüss »","La telefon: « Auf Wiederhören »","Pe curând: « Bis bald »"] },
      }},
      { id:"p007", target:"Guten Abend", freqs:[460,500,440], tr:{
        fr:{ source:"Bonsoir",          phonetic:"gou-tène a-bènte", grammar:"« Gut » = bon + « Abend » = soirée. Utilisé dès 17-18h. Formule complète et formelle.", complements:["Matin : « Guten Morgen »","Journée : « Guten Tag »","Nuit : « Gute Nacht »","Informel soir : « Na, wie geht's? »"] },
        en:{ source:"Good evening",     phonetic:"goo-ten AH-bent",  grammar:"« Gut » = good + « Abend » = evening. Used from 5-6 PM. Complete and formal.", complements:["Morning: « Guten Morgen »","Day: « Guten Tag »","Night: « Gute Nacht »"] },
        es:{ source:"Buenas tardes",    phonetic:"gu-ten a-bent",    grammar:"« Gut » = bueno + « Abend » = tarde/noche. Se usa desde las 17-18h.", complements:["Mañana: « Guten Morgen »","Día: « Guten Tag »","Noche: « Gute Nacht »"] },
        it:{ source:"Buonasera",        phonetic:"gu-ten a-bent",    grammar:"« Gut » = buono + « Abend » = sera. Si usa dalle 17-18. Formale e completo.", complements:["Mattina: « Guten Morgen »","Giorno: « Guten Tag »","Notte: « Gute Nacht »"] },
        ro:{ source:"Bună seara",       phonetic:"gu-ten a-bent",    grammar:"« Gut » = bun + « Abend » = seară. Folosit de la ora 17-18. Formal și complet.", complements:["Dimineața: « Guten Morgen »","Ziua: « Guten Tag »","Noaptea: « Gute Nacht »"] },
      }},
      { id:"p008", target:"Wo ist die Toilette?", freqs:[380,420,460], tr:{
        fr:{ source:"Où sont les toilettes ?", phonetic:"vo ist di toa-lèt-té", grammar:"« Wo » = où. « Die Toilette » = féminin. En Allemagne, souvent appelé « WC » ou « das Klo » (informel).", complements:["Formel : « Wo sind die Toiletten? »","Informel : « Wo ist das Klo? »","WC : « das stille Örtchen »"] },
        en:{ source:"Where is the bathroom?", phonetic:"voh ist dee toh-LET-teh", grammar:"« Wo » = where. « Die Toilette » = feminine. In Germany often called « WC » or « das Klo ».", complements:["Formal: « Wo sind die Toiletten? »","Informal: « Wo ist das Klo? »"] },
        es:{ source:"¿Dónde está el baño?", phonetic:"wo ist di toa-le-te",      grammar:"« Wo » = dónde. « Die Toilette » = femenino. En Alemania a menudo « WC » o « das Klo ».", complements:["Formal: « Wo sind die Toiletten? »","Informal: « Wo ist das Klo? »"] },
        it:{ source:"Dov'è il bagno?",  phonetic:"wo ist di toa-le-te",           grammar:"« Wo » = dove. « Die Toilette » = femminile. In Germania spesso « WC » o « das Klo ».", complements:["Formale: « Wo sind die Toiletten? »","Informale: « Wo ist das Klo? »"] },
        ro:{ source:"Unde este toaleta?", phonetic:"wo ist di to-a-le-te",         grammar:"« Wo » = unde. « Die Toilette » = feminin. În Germania adesea « WC » sau « das Klo ».", complements:["Formal: « Wo sind die Toiletten? »","Informal: « Wo ist das Klo? »"] },
      }},
      { id:"p009", target:"Was kostet das?", freqs:[420,460,400], tr:{
        fr:{ source:"Combien ça coûte ?", phonetic:"vasse kos-tète dass", grammar:"« Was » = quoi/combien. « Kosten » = coûter. « Das » = cela. Structure très directe et naturelle.", complements:["Variante : « Wie viel kostet das? »","Cher : « Das ist zu teuer »","Réduction : « Können Sie den Preis reduzieren? »"] },
        en:{ source:"How much does it cost?", phonetic:"vas kos-tet das",  grammar:"« Was » = what/how much. « Kosten » = to cost. « Das » = that. Very direct and natural.", complements:["Variant: « Wie viel kostet das? »","Too expensive: « Das ist zu teuer »"] },
        es:{ source:"¿Cuánto cuesta?",  phonetic:"was kos-tet das",         grammar:"« Was » = qué/cuánto. « Kosten » = costar. « Das » = eso. Muy directo y natural.", complements:["Variante: « Wie viel kostet das? »","Muy caro: « Das ist zu teuer »"] },
        it:{ source:"Quanto costa?",    phonetic:"was kos-tet das",          grammar:"« Was » = cosa/quanto. « Kosten » = costare. « Das » = quello. Molto diretto.", complements:["Variante: « Wie viel kostet das? »","Troppo caro: « Das ist zu teuer »"] },
        ro:{ source:"Cât costă?",       phonetic:"was kos-tet das",          grammar:"« Was » = ce/cât. « Kosten » = a costa. « Das » = aceasta. Foarte direct.", complements:["Variantă: « Wie viel kostet das? »","Prea scump: « Das ist zu teuer »"] },
      }},
      { id:"p010", target:"Sprechen Sie Französisch?", freqs:[500,440,480], tr:{
        fr:{ source:"Parlez-vous français ?", phonetic:"chprè-kène zi fran-zeu-zich", grammar:"« Sprechen » = parler. « Sie » = vous (formel). Structure V2 : verbe en 2ème position.", complements:["Informel : « Sprichst du Französisch? »","Autre langue : « Sprechen Sie Englisch? »","Réponse : « Ein bisschen / Nicht so gut »"] },
        en:{ source:"Do you speak French?", phonetic:"shpreh-khen zee fran-tsoe-zish", grammar:"« Sprechen » = to speak. « Sie » = you (formal). V2 structure: verb in 2nd position.", complements:["Informal: « Sprichst du Französisch? »","Another language: « Sprechen Sie Englisch? »"] },
        es:{ source:"¿Habla francés?",  phonetic:"chpre-jen si fran-tsœ-sich",         grammar:"« Sprechen » = hablar. « Sie » = usted (formal). Estructura V2.", complements:["Informal: « Sprichst du Französisch? »","Otra lengua: « Sprechen Sie Englisch? »"] },
        it:{ source:"Parla francese?",  phonetic:"shpre-chen si fran-tseu-zish",        grammar:"« Sprechen » = parlare. « Sie » = Lei (formale). Struttura V2.", complements:["Informale: « Sprichst du Französisch? »","Altra lingua: « Sprechen Sie Englisch? »"] },
        ro:{ source:"Vorbiți franceză?", phonetic:"șpre-chen zi fran-tseu-ziș",         grammar:"« Sprechen » = a vorbi. « Sie » = dumneavoastră (formal). Structura V2.", complements:["Informal: « Sprichst du Französisch? »","Altă limbă: « Sprechen Sie Englisch? »"] },
      }},
    ],
  },

};
