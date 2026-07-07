import { useState, useEffect, useRef } from "react";

// ══════════════════════════════════════════════════════
// I18N UI — textes de l'interface uniquement
// ══════════════════════════════════════════════════════
const UI = {
  fr:{ home:"← Accueil", appSub:"Apprenez les langues pour voyager", myLangs:"Mes langues", addLang:"Ajouter une langue", addLangBtn:"+ Choisir une nouvelle langue", chooseLang:"Choisissez une langue", back:"← Retour", allLessons:"Toutes les leçons", resume:"▶️ Reprendre la leçon", start:"▶️ Commencer la leçon 1", restart:"↺ Recommencer depuis le début", savedAt:"Progression sauvegardée", quit:"✕ Quitter", validate:"Valider", next:"Continuer →", bravo:"✅ Bravo !", wrongAnswer:"❌ La bonne réponse était :", learnMore:"📖 Pour en savoir plus", report:"⚑ Signaler une erreur", grammar:"📘 Grammaire & étymologie", explanation:"Explication", toRemember:"💡 À retenir", close:"Fermer", reportOn:"Sur quelle phrase ?", reportType:"Type d'erreur", reportPhonetic:"🔤 Phonétique", reportAudio:"🔊 Audio", reportSpelling:"✏️ Orthographe", reportTranslation:"🔄 Traduction", reportPlaceholder:"Précisez votre suggestion…", reportSend:"Envoyer", reportThanks:"Merci !", reportSent:"Votre suggestion a bien été envoyée.", cancel:"Annuler", myLang:"🌐 Ma langue", myLangSub:"Choisissez votre langue maternelle", doneLessons:"Leçon maîtrisée !", doneDesc:"Vous avez validé toutes les phrases avec 3 bonnes réponses chacune.", backHome:"← Retour à l'accueil", confirmTitle:"Recommencer depuis le début ?", confirmDesc:"Toute votre progression sera effacée. Cette action est irréversible.", confirmOk:"Recommencer", inProgress:"En cours", howToSay:"Comment dit-on en", lessons:"leçons", phrases:"phrases", mastered:"maîtrisées", review:"🔁 Réviser", reviewTitle:"Mode révision", reviewDesc:"Toutes les phrases maîtrisées en mode aléatoire" },
  en:{ home:"← Home", appSub:"Learn languages for travel", myLangs:"My languages", addLang:"Add a language", addLangBtn:"+ Choose a new language", chooseLang:"Choose a language", back:"← Back", allLessons:"All lessons", resume:"▶️ Resume lesson", start:"▶️ Start lesson 1", restart:"↺ Start over", savedAt:"Progress saved", quit:"✕ Quit", validate:"Check", next:"Continue →", bravo:"✅ Correct!", wrongAnswer:"❌ The correct answer was:", learnMore:"📖 Learn more", report:"⚑ Report an error", grammar:"📘 Grammar & etymology", explanation:"Explanation", toRemember:"💡 Key points", close:"Close", reportOn:"Which phrase?", reportType:"Error type", reportPhonetic:"🔤 Phonetics", reportAudio:"🔊 Audio", reportSpelling:"✏️ Spelling", reportTranslation:"🔄 Translation", reportPlaceholder:"Add details (optional)…", reportSend:"Send", reportThanks:"Thank you!", reportSent:"Your suggestion has been sent.", cancel:"Cancel", myLang:"🌐 My language", myLangSub:"Choose your native language", doneLessons:"Lesson mastered!", doneDesc:"You validated all phrases with 3 correct answers each.", backHome:"← Back to home", confirmTitle:"Start over?", confirmDesc:"All your progress will be erased. This cannot be undone.", confirmOk:"Start over", inProgress:"In progress", howToSay:"How do you say in", lessons:"lessons", phrases:"phrases", mastered:"mastered", review:"🔁 Review", reviewTitle:"Review mode", reviewDesc:"All mastered phrases in random order" },
  es:{ home:"← Inicio", appSub:"Aprende idiomas para viajar", myLangs:"Mis idiomas", addLang:"Añadir un idioma", addLangBtn:"+ Elegir un nuevo idioma", chooseLang:"Elige un idioma", back:"← Volver", allLessons:"Todas las lecciones", resume:"▶️ Continuar lección", start:"▶️ Empezar lección 1", restart:"↺ Empezar de nuevo", savedAt:"Progreso guardado", quit:"✕ Salir", validate:"Comprobar", next:"Continuar →", bravo:"✅ ¡Correcto!", wrongAnswer:"❌ La respuesta correcta era:", learnMore:"📖 Saber más", report:"⚑ Reportar error", grammar:"📘 Gramática & etimología", explanation:"Explicación", toRemember:"💡 A recordar", close:"Cerrar", reportOn:"¿En qué frase?", reportType:"Tipo de error", reportPhonetic:"🔤 Fonética", reportAudio:"🔊 Audio", reportSpelling:"✏️ Ortografía", reportTranslation:"🔄 Traducción", reportPlaceholder:"Añade detalles (opcional)…", reportSend:"Enviar", reportThanks:"¡Gracias!", reportSent:"Tu sugerencia ha sido enviada.", cancel:"Cancelar", myLang:"🌐 Mi idioma", myLangSub:"Elige tu idioma nativo", doneLessons:"¡Lección superada!", doneDesc:"Has validado todas las frases con 3 respuestas correctas.", backHome:"← Volver al inicio", confirmTitle:"¿Empezar de nuevo?", confirmDesc:"Todo tu progreso será borrado. Esta acción es irreversible.", confirmOk:"Empezar de nuevo", inProgress:"En curso", howToSay:"¿Cómo se dice en", lessons:"lecciones", phrases:"frases", mastered:"dominadas", review:"🔁 Repasar", reviewTitle:"Modo repaso", reviewDesc:"Todas las frases dominadas en orden aleatorio" },
  de:{ home:"← Startseite", appSub:"Lerne Sprachen fürs Reisen", myLangs:"Meine Sprachen", addLang:"Sprache hinzufügen", addLangBtn:"+ Neue Sprache wählen", chooseLang:"Sprache wählen", back:"← Zurück", allLessons:"Alle Lektionen", resume:"▶️ Lektion fortsetzen", start:"▶️ Lektion 1 starten", restart:"↺ Von vorne beginnen", savedAt:"Fortschritt gespeichert", quit:"✕ Beenden", validate:"Prüfen", next:"Weiter →", bravo:"✅ Richtig!", wrongAnswer:"❌ Die richtige Antwort war:", learnMore:"📖 Mehr erfahren", report:"⚑ Fehler melden", grammar:"📘 Grammatik & Etymologie", explanation:"Erklärung", toRemember:"💡 Merke dir", close:"Schließen", reportOn:"Welcher Satz?", reportType:"Fehlertyp", reportPhonetic:"🔤 Aussprache", reportAudio:"🔊 Audio", reportSpelling:"✏️ Rechtschreibung", reportTranslation:"🔄 Übersetzung", reportPlaceholder:"Details hinzufügen (optional)…", reportSend:"Senden", reportThanks:"Danke!", reportSent:"Dein Vorschlag wurde gesendet.", cancel:"Abbrechen", myLang:"🌐 Meine Sprache", myLangSub:"Wähle deine Muttersprache", doneLessons:"Lektion gemeistert!", doneDesc:"Du hast alle Sätze mit je 3 richtigen Antworten gelernt.", backHome:"← Zurück zur Startseite", confirmTitle:"Von vorne beginnen?", confirmDesc:"Dein gesamter Fortschritt wird gelöscht. Dies kann nicht rückgängig gemacht werden.", confirmOk:"Von vorne", inProgress:"Läuft", howToSay:"Wie sagt man auf", lessons:"Lektionen", phrases:"Sätze", mastered:"gemeistert", review:"🔁 Wiederholen", reviewTitle:"Wiederholungsmodus", reviewDesc:"Alle gemeisterten Sätze in zufälliger Reihenfolge" },
  it:{ home:"← Home", appSub:"Impara le lingue per viaggiare", myLangs:"Le mie lingue", addLang:"Aggiungere una lingua", addLangBtn:"+ Scegli una nuova lingua", chooseLang:"Scegli una lingua", back:"← Indietro", allLessons:"Tutte le lezioni", resume:"▶️ Riprendi la lezione", start:"▶️ Inizia lezione 1", restart:"↺ Ricominciare", savedAt:"Progresso salvato", quit:"✕ Esci", validate:"Controlla", next:"Continua →", bravo:"✅ Corretto!", wrongAnswer:"❌ La risposta corretta era:", learnMore:"📖 Per saperne di più", report:"⚑ Segnala errore", grammar:"📘 Grammatica & etimologia", explanation:"Spiegazione", toRemember:"💡 Da ricordare", close:"Chiudi", reportOn:"Su quale frase?", reportType:"Tipo di errore", reportPhonetic:"🔤 Fonetica", reportAudio:"🔊 Audio", reportSpelling:"✏️ Ortografia", reportTranslation:"🔄 Traduzione", reportPlaceholder:"Aggiungi dettagli (opzionale)…", reportSend:"Invia", reportThanks:"Grazie!", reportSent:"Il tuo suggerimento è stato inviato.", cancel:"Annulla", myLang:"🌐 La mia lingua", myLangSub:"Scegli la tua lingua madre", doneLessons:"Lezione superata!", doneDesc:"Hai validato tutte le frasi con 3 risposte corrette ciascuna.", backHome:"← Torna alla home", confirmTitle:"Ricominciare da capo?", confirmDesc:"Tutti i progressi verranno cancellati. Questa azione è irreversibile.", confirmOk:"Ricomincia", inProgress:"In corso", howToSay:"Come si dice in", lessons:"lezioni", phrases:"frasi", mastered:"padroneggiati", review:"🔁 Ripassare", reviewTitle:"Modalità ripasso", reviewDesc:"Tutte le frasi padroneggiati in ordine casuale" },
  ro:{ home:"← Acasă", appSub:"Învață limbi străine pentru călătorii", myLangs:"Limbile mele", addLang:"Adaugă o limbă", addLangBtn:"+ Alege o limbă nouă", chooseLang:"Alege o limbă", back:"← Înapoi", allLessons:"Toate lecțiile", resume:"▶️ Continuă lecția", start:"▶️ Începe lecția 1", restart:"↺ Începe de la capăt", savedAt:"Progres salvat", quit:"✕ Ieși", validate:"Verifică", next:"Continuă →", bravo:"✅ Corect!", wrongAnswer:"❌ Răspunsul corect era:", learnMore:"📖 Află mai multe", report:"⚑ Raportează eroare", grammar:"📘 Gramatică & etimologie", explanation:"Explicație", toRemember:"💡 De reținut", close:"Închide", reportOn:"La ce frază?", reportType:"Tip de eroare", reportPhonetic:"🔤 Fonetică", reportAudio:"🔊 Audio", reportSpelling:"✏️ Ortografie", reportTranslation:"🔄 Traducere", reportPlaceholder:"Adaugă detalii (opțional)…", reportSend:"Trimite", reportThanks:"Mulțumesc!", reportSent:"Sugestia ta a fost trimisă.", cancel:"Anulează", myLang:"🌐 Limba mea", myLangSub:"Alege limba ta maternă", doneLessons:"Lecție finalizată!", doneDesc:"Ai validat toate frazele cu câte 3 răspunsuri corecte.", backHome:"← Înapoi acasă", confirmTitle:"Începe de la capăt?", confirmDesc:"Tot progresul tău va fi șters. Această acțiune este ireversibilă.", confirmOk:"Reîncepe", inProgress:"În curs", howToSay:"Cum se spune în", lessons:"lecții", phrases:"fraze", mastered:"stăpânite", review:"🔁 Recapitulare", reviewTitle:"Mod recapitulare", reviewDesc:"Toate frazele stăpânite în ordine aleatorie" },
};

// ══════════════════════════════════════════════════════
// LANGUES UTILISATEUR
// ══════════════════════════════════════════════════════
const USER_LANGS = [
  { code:"fr", flag:"🇫🇷", names:{ fr:"Français",  en:"French",   es:"Francés",   de:"Französisch", it:"Francese",  ro:"Franceză"  } },
  { code:"en", flag:"🇬🇧", names:{ fr:"Anglais",   en:"English",  es:"Inglés",    de:"Englisch",    it:"Inglese",   ro:"Engleză"   } },
  { code:"es", flag:"🇪🇸", names:{ fr:"Espagnol",  en:"Spanish",  es:"Español",   de:"Spanisch",    it:"Spagnolo",  ro:"Spaniolă"  } },
  { code:"de", flag:"🇩🇪", names:{ fr:"Allemand",  en:"German",   es:"Alemán",    de:"Deutsch",     it:"Tedesco",   ro:"Germană"   } },
  { code:"it", flag:"🇮🇹", names:{ fr:"Italien",   en:"Italian",  es:"Italiano",  de:"Italienisch", it:"Italiano",  ro:"Italiană"  } },
  { code:"ro", flag:"🇷🇴", names:{ fr:"Roumain",   en:"Romanian", es:"Rumano",    de:"Rumänisch",   it:"Rumeno",    ro:"Română"    } },
];

// ══════════════════════════════════════════════════════
// LANGUES CIBLES (pays visités)
// ══════════════════════════════════════════════════════
const LANGUAGES = [
  { code:"ro", flag:"🇷🇴", available:true,  names:{ fr:"Roumain",  en:"Romanian", es:"Rumano",   de:"Rumänisch",   it:"Rumeno",   ro:"Română"   } },
  { code:"en", flag:"🇬🇧", available:true,  names:{ fr:"Anglais",  en:"English",  es:"Inglés",   de:"Englisch",    it:"Inglese",  ro:"Engleză"  } },
  { code:"es", flag:"🇪🇸", available:true,  names:{ fr:"Espagnol", en:"Spanish",  es:"Español",  de:"Spanisch",    it:"Spagnolo", ro:"Spaniolă" } },
  { code:"it", flag:"🇮🇹", available:true,  names:{ fr:"Italien",  en:"Italian",  es:"Italiano", de:"Italienisch", it:"Italiano", ro:"Italiană" } },
  { code:"de", flag:"🇩🇪", available:true,  names:{ fr:"Allemand", en:"German",   es:"Alemán",   de:"Deutsch",     it:"Tedesco",  ro:"Germană"  } },
];

function langName(lang, userLang) { return lang.names[userLang] || lang.names.fr; }

// ══════════════════════════════════════════════════════════════════════
// PACKS DE LANGUE — Travelingo
// Structure : 1 pack = 1 langue cible × N langues sources
// Chaque phrase : target (invariant) + tr[langSource] = {source, phonetic, grammar, complements}
// Audio : généré en ticks (prototype) → remplacer par MP3 en production
// ══════════════════════════════════════════════════════════════════════

const PACKS = {
  ro: {
    id: "L01_RO", targetLang: "ro", targetFlag: "🇷🇴",
    lesson: {
      id: "l01", emoji: "💬",
      titles: { fr:"Politesse & bases", en:"Politeness & basics", es:"Cortesía & básicos", de:"Höflichkeit & Grundlagen", it:"Cortesia & basi", ro:"Politețe & baze" },
      subs:   { fr:"Salutations, merci…", en:"Greetings, thank you…", es:"Saludos, gracias…", de:"Begrüßung, Danke…", it:"Saluti, grazie…", ro:"Salutări, mulțumesc…" },
    },
    lessons: [
      { id:"l01", emoji:"💬", available:true,  titles:{ fr:"Politesse & bases",    en:"Politeness & basics",    es:"Cortesía & básicos",    de:"Höflichkeit & Grundlagen", it:"Cortesia & basi",       ro:"Politețe & baze"      }, subs:{ fr:"Salutations, merci…",    en:"Greetings, thank you…",  es:"Saludos, gracias…",     de:"Begrüßung, Danke…",        it:"Saluti, grazie…",       ro:"Salutări, mulțumesc…"  } },
      { id:"l02", emoji:"✈️", available:false, titles:{ fr:"Aéroport & vols",      en:"Airport & flights",      es:"Aeropuerto & vuelos",   de:"Flughafen & Flüge",        it:"Aeroporto & voli",      ro:"Aeroport & zboruri"   }, subs:{ fr:"Enregistrement…",       en:"Check-in, boarding…",    es:"Facturación…",          de:"Einchecken…",              it:"Check-in…",             ro:"Înregistrare…"         } },
      { id:"l03", emoji:"🛂", available:false, titles:{ fr:"Douane & immigration", en:"Customs & immigration",  es:"Aduana & inmigración",  de:"Zoll & Einwanderung",      it:"Dogana & immigrazione", ro:"Vamă & imigrație"     }, subs:{ fr:"Passeport…",            en:"Passport, declaration…", es:"Pasaporte…",            de:"Reisepass…",               it:"Passaporto…",           ro:"Pașaport…"             } },
      { id:"l04", emoji:"🏨", available:false, titles:{ fr:"Hôtel & logement",     en:"Hotel & accommodation",  es:"Hotel & alojamiento",   de:"Hotel & Unterkunft",       it:"Hotel & alloggio",      ro:"Hotel & cazare"       }, subs:{ fr:"Check-in, chambre…",    en:"Check-in, room…",        es:"Recepción, habitación…",de:"Einchecken, Zimmer…",      it:"Check-in, camera…",    ro:"Check-in, cameră…"     } },
      { id:"l05", emoji:"🚕", available:false, titles:{ fr:"Transport",             en:"Transport",              es:"Transporte",             de:"Verkehrsmittel",           it:"Trasporti",             ro:"Transport"            }, subs:{ fr:"Taxi, métro, bus…",     en:"Taxi, metro, bus…",      es:"Taxi, metro…",          de:"Taxi, U-Bahn, Bus…",       it:"Taxi, metro…",          ro:"Taxi, metrou…"         } },
      { id:"l06", emoji:"🍽️", available:false, titles:{ fr:"Restaurant & café",    en:"Restaurant & café",      es:"Restaurante & café",    de:"Restaurant & Café",        it:"Ristorante & caffè",    ro:"Restaurant & cafea"   }, subs:{ fr:"Commander, additions…", en:"Ordering, bill…",        es:"Pedir, cuenta…",        de:"Bestellen, Rechnung…",     it:"Ordinare, conto…",      ro:"Comandă, notă…"        } },
      { id:"l07", emoji:"🗺️", available:false, titles:{ fr:"Se repérer",           en:"Getting around",         es:"Orientarse",             de:"Orientierung",             it:"Orientarsi",            ro:"Orientare"            }, subs:{ fr:"Directions, lieux…",    en:"Directions, places…",    es:"Direcciones, lugares…", de:"Richtungen, Orte…",        it:"Direzioni, luoghi…",    ro:"Direcții, locuri…"     } },
      { id:"l08", emoji:"🛒", available:false, titles:{ fr:"Shopping",             en:"Shopping",               es:"Compras",                de:"Einkaufen",                it:"Shopping",              ro:"Cumpărături"          }, subs:{ fr:"Prix, tailles…",        en:"Prices, sizes…",         es:"Precios, tallas…",      de:"Preise, Größen…",          it:"Prezzi, taglie…",       ro:"Prețuri, mărimi…"      } },
      { id:"l09", emoji:"🏥", available:false, titles:{ fr:"Santé & urgences",     en:"Health & emergencies",   es:"Salud & emergencias",   de:"Gesundheit & Notfälle",    it:"Salute & emergenze",    ro:"Sănătate & urgențe"   }, subs:{ fr:"Médecin, pharmacie…",   en:"Doctor, pharmacy…",      es:"Médico, farmacia…",     de:"Arzt, Apotheke…",          it:"Medico, farmacia…",     ro:"Medic, farmacie…"      } },
      { id:"l10", emoji:"🤝", available:false, titles:{ fr:"Contact social",       en:"Social contact",         es:"Contacto social",        de:"Sozialer Kontakt",         it:"Contatto sociale",      ro:"Contact social"       }, subs:{ fr:"Conversation…",         en:"Conversation…",          es:"Conversación…",         de:"Gespräche…",               it:"Conversazione…",        ro:"Conversație…"          } },
    ],
    phrases: [
      { id:"p001", target:"Bună ziua",         freqs:[520,440], tr:{
        fr:{ source:"Bonjour",             phonetic:"bou-neu zi-oua",           grammar:"« Bună » = bonne, « ziua » = la journée. Le roumain est la seule langue latine d'Europe de l'Est.", complements:["Informel : « Bună! »","Matin : « Bună dimineața »"] },
        en:{ source:"Hello",               phonetic:"boo-nuh zee-wah",          grammar:"« Bună » means good, « ziua » means the day. Romanian is the only Latin language of Eastern Europe.", complements:["Informal: « Bună! »","Morning: « Bună dimineața »"] },
        es:{ source:"Hola",                phonetic:"bu-nə zi-ua",              grammar:"« Bună » = buena, « ziua » = el día. El rumano es la única lengua latina de Europa del Este.", complements:["Informal: « Bună! »"] },
        de:{ source:"Guten Tag",           phonetic:"Bu-nə Zi-ua",             grammar:"« Bună » = gut, « ziua » = der Tag. Rumänisch ist die einzige lateinische Sprache Osteuropas.", complements:["Informell: « Bună! »"] },
        it:{ source:"Buongiorno",          phonetic:"bu-nə zi-ua",              grammar:"« Bună » = buona, « ziua » = la giornata. Il rumeno è l'unica lingua latina dell'Europa orientale.", complements:["Informale: « Bună! »"] } } },
      { id:"p002", target:"Mulțumesc mult",    freqs:[440,520,480], tr:{
        fr:{ source:"Merci beaucoup",      phonetic:"moul-tsu-mesk moult",      grammar:"« Mulțumesc » vient du slavon. « Mult » = beaucoup.", complements:["Simple : « Mulțumesc »","Le ț se prononce « ts »."] },
        en:{ source:"Thank you very much", phonetic:"mool-tsoo-mesk moolt",     grammar:"« Mulțumesc » comes from Slavonic. « Mult » = much.", complements:["Simple: « Mulțumesc »","ț is pronounced 'ts'."] },
        es:{ source:"Muchas gracias",      phonetic:"mul-tsu-mesk mult",        grammar:"« Mulțumesc » viene del eslavo. « Mult » = mucho.", complements:["Simple: « Mulțumesc »"] },
        de:{ source:"Vielen Dank",         phonetic:"Mul-tsu-mesk mult",        grammar:"« Mulțumesc » kommt aus dem Slawischen. « Mult » = viel.", complements:["Einfach: « Mulțumesc »"] },
        it:{ source:"Grazie mille",        phonetic:"mul-tsu-mesk mult",        grammar:"« Mulțumesc » viene dallo slavo. « Mult » = molto.", complements:["Semplice: « Mulțumesc »"] } } },
      { id:"p003", target:"Vă rog",            freqs:[480,400], tr:{
        fr:{ source:"S'il vous plaît",     phonetic:"veu rog",                  grammar:"« Vă » = vous (poli). « Rog » du latin « rogare ».", complements:["Informel : « Te rog »"] },
        en:{ source:"Please",              phonetic:"vuh rog",                  grammar:"« Vă » = you (formal). « Rog » from Latin « rogare ».", complements:["Informal: « Te rog »"] },
        es:{ source:"Por favor",           phonetic:"və rog",                   grammar:"« Vă » = usted (formal). « Rog » del latín « rogare ».", complements:["Informal: « Te rog »"] },
        de:{ source:"Bitte",               phonetic:"Wə rog",                   grammar:"« Vă » = Sie (formell). « Rog » vom Lateinischen « rogare ».", complements:["Informell: « Te rog »"] },
        it:{ source:"Per favore",          phonetic:"və rog",                   grammar:"« Vă » = Lei (formale). « Rog » dal latino « rogare ».", complements:["Informale: « Te rog »"] } } },
      { id:"p004", target:"Scuzați-mă",        freqs:[400,480,440], tr:{
        fr:{ source:"Excusez-moi",         phonetic:"skou-za-tsi-meu",          grammar:"« Scuzați » = impératif formel. « -mă » = pronom réfléchi.", complements:["Informel : « Scuză-mă »"] },
        en:{ source:"Excuse me",           phonetic:"skoo-ZAH-tsee muh",        grammar:"« Scuzați » is the formal imperative. « -mă » = me.", complements:["Informal: « Scuză-mă »"] },
        es:{ source:"Perdóneme",           phonetic:"sku-za-tsi-mə",            grammar:"« Scuzați » es el imperativo formal. « -mă » = me.", complements:["Informal: « Scuză-mă »"] },
        de:{ source:"Entschuldigen Sie",   phonetic:"Sku-za-tsi-mə",            grammar:"« Scuzați » ist der formelle Imperativ. « -mă » = mich.", complements:["Informell: « Scuză-mă »"] },
        it:{ source:"Mi scusi",            phonetic:"sku-za-tsi-mə",            grammar:"« Scuzați » è l'imperativo formale. « -mă » = mi.", complements:["Informale: « Scuză-mă »"] } } },
      { id:"p005", target:"Nu înțeleg",        freqs:[360,420,480], tr:{
        fr:{ source:"Je ne comprends pas", phonetic:"nou eun-tse-leg",          grammar:"« Nu » = négation. « Înțeleg » du latin « intellegere ».", complements:["« Puteți repeta? » = Pouvez-vous répéter?"] },
        en:{ source:"I don't understand",  phonetic:"noo uhn-TSEH-leg",         grammar:"« Nu » = negation. « Înțeleg » from Latin « intellegere ».", complements:["« Puteți repeta? » = Can you repeat?"] },
        es:{ source:"No entiendo",         phonetic:"nu în-tse-leg",            grammar:"« Nu » = negación. « Înțeleg » del latín « intellegere ».", complements:["« Puteți repeta? » = ¿Puede repetir?"] },
        de:{ source:"Ich verstehe nicht",  phonetic:"Nu În-tse-leg",            grammar:"« Nu » = Verneinung. « Înțeleg » vom Lateinischen « intellegere ».", complements:["« Puteți repeta? » = Können Sie wiederholen?"] },
        it:{ source:"Non capisco",         phonetic:"nu în-tse-leg",            grammar:"« Nu » = negazione. « Înțeleg » dal latino « intellegere ».", complements:["« Puteți repeta? » = Può ripetere?"] } } },
      { id:"p006", target:"La revedere",       freqs:[500,460], tr:{
        fr:{ source:"Au revoir",           phonetic:"la ré-vé-dé-ré",           grammar:"Littéralement « à la revoir » — très proche du français !", complements:["Informel : « Pa! »","« Pe curând » = À bientôt."] },
        en:{ source:"Goodbye",             phonetic:"la reh-veh-DEH-reh",       grammar:"Literally 'until we see each other again'. Very close to French!", complements:["Informal: « Pa! »","« Pe curând » = See you soon."] },
        es:{ source:"Adiós",               phonetic:"la re-ve-de-re",           grammar:"Literalmente 'hasta volver a vernos'. ¡Muy cercano al francés!", complements:["Informal: « Pa! »"] },
        de:{ source:"Auf Wiedersehen",     phonetic:"la re-ve-de-re",           grammar:"Wörtlich 'bis zum Wiedersehen'. Sehr ähnlich dem Französischen!", complements:["Informell: « Pa! »"] },
        it:{ source:"Arrivederci",         phonetic:"la re-ve-de-re",           grammar:"Letteralmente 'fino a rivederci'. Molto simile al francese!", complements:["Informale: « Pa! »"] } } },
      { id:"p007", target:"Bună seara",        freqs:[460,500,440], tr:{
        fr:{ source:"Bonsoir",             phonetic:"bou-neu séa-ra",           grammar:"« Seara » = le soir. « Bună » s'accorde au féminin.", complements:["« Noapte bună » = Bonne nuit."] },
        en:{ source:"Good evening",        phonetic:"BOO-nuh SYAH-rah",         grammar:"« Seara » = the evening. « Bună » agrees in feminine gender.", complements:["« Noapte bună » = Good night."] },
        es:{ source:"Buenas noches",       phonetic:"bu-nə sea-ra",             grammar:"« Seara » = la tarde/noche. « Bună » concuerda en femenino.", complements:["« Noapte bună » = Buenas noches."] },
        de:{ source:"Guten Abend",         phonetic:"Bu-nə Sea-ra",             grammar:"« Seara » = der Abend. « Bună » ist feminin kongruent.", complements:["« Noapte bună » = Gute Nacht."] },
        it:{ source:"Buonasera",           phonetic:"bu-nə sea-ra",             grammar:"« Seara » = la sera. « Bună » concorda al femminile.", complements:["« Noapte bună » = Buonanotte."] } } },
      { id:"p008", target:"Unde este toaleta?", freqs:[380,420,460], tr:{
        fr:{ source:"Où sont les toilettes ?", phonetic:"oun-de yes-te toa-lé-ta", grammar:"« Unde » = où. « Toaleta » = emprunt au français avec l'article défini attaché.", complements:["L'article défini se place en fin de mot."] },
        en:{ source:"Where is the toilet?",    phonetic:"OON-deh YES-teh twa-LEH-tah", grammar:"« Unde » = where. « Toaleta » borrowed from French with definite article attached.", complements:["Definite article is a suffix in Romanian."] },
        es:{ source:"¿Dónde está el baño?",   phonetic:"un-de yes-te toa-le-ta", grammar:"« Unde » = dónde. « Toaleta » es préstamo del francés.", complements:["El artículo definido se añade al final."] },
        de:{ source:"Wo ist die Toilette?",    phonetic:"Un-de yes-te toa-le-ta", grammar:"« Unde » = wo. « Toaleta » ist Lehnwort aus dem Französischen.", complements:["Der bestimmte Artikel wird angehängt."] },
        it:{ source:"Dov'è il bagno?",         phonetic:"un-de yes-te toa-le-ta", grammar:"« Unde » = dove. « Toaleta » è un prestito dal francese.", complements:["L'articolo determinativo è un suffisso."] } } },
      { id:"p009", target:"Cât costă?",        freqs:[420,460,400], tr:{
        fr:{ source:"Combien ça coûte ?", phonetic:"ceut kos-teu",             grammar:"« Cât » = combien. « Costă » = coûte, 3ème personne.", complements:["« Este scump » = C'est cher.","« Este ieftin » = C'est pas cher."] },
        en:{ source:"How much does it cost?", phonetic:"kuht KOS-tuh",          grammar:"« Cât » = how much. « Costă » = costs, 3rd person.", complements:["« Este scump » = It's expensive.","« Este ieftin » = It's cheap."] },
        es:{ source:"¿Cuánto cuesta?",    phonetic:"kət kos-tə",               grammar:"« Cât » = cuánto. « Costă » = cuesta, 3ª persona.", complements:["« Este scump » = Es caro."] },
        de:{ source:"Wie viel kostet es?", phonetic:"Kət Kos-tə",              grammar:"« Cât » = wie viel. « Costă » = kostet, 3. Person.", complements:["« Este scump » = Es ist teuer."] },
        it:{ source:"Quanto costa?",       phonetic:"kət kos-tə",              grammar:"« Cât » = quanto. « Costă » = costa, 3ª persona.", complements:["« Este scump » = È caro."] } } },
      { id:"p010", target:"Vorbiți franceză?", freqs:[500,440,480], tr:{
        fr:{ source:"Parlez-vous français ?", phonetic:"vor-bi-tsi fran-tche-zeu", grammar:"« Vorbiți » = forme formelle de « parler » à la 2ème personne.", complements:["Informel : « Vorbești franceză? »"] },
        en:{ source:"Do you speak French?",   phonetic:"vor-BEETS fran-CHEH-zuh",  grammar:"« Vorbiți » is the formal 2nd person of 'to speak'.", complements:["Informal: « Vorbești franceză? »"] },
        es:{ source:"¿Habla francés?",         phonetic:"vor-bi-tsi fran-che-zə",  grammar:"« Vorbiți » es la forma formal de hablar en 2ª persona.", complements:["Informal: « Vorbești franceză? »"] },
        de:{ source:"Sprechen Sie Französisch?", phonetic:"Vor-bi-tsi fran-tsche-să", grammar:"« Vorbiți » ist die formelle 2. Person von 'sprechen'.", complements:["Informell: « Vorbești franceză? »"] },
        it:{ source:"Parla francese?",          phonetic:"vor-bi-tsi fran-che-ză", grammar:"« Vorbiți » è la forma formale della 2ª persona di 'parlare'.", complements:["Informale: « Vorbești franceză? »"] } } },
    ],
  },


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


// ══════════════════════════════════════════════════════
// AUDIO
// ══════════════════════════════════════════════════════
function generatePCM(freqs,dur=0.28,sr=44100){const spn=Math.floor(sr*dur),pcm=new Float32Array(spn*freqs.length);freqs.forEach((f,fi)=>{for(let i=0;i<spn;i++){const e=Math.min(i/(sr*0.01),1)*Math.min((spn-i)/(sr*0.05),1);pcm[fi*spn+i]=Math.sin(2*Math.PI*f*i/sr)*0.5*e;}});return pcm.buffer;}
function playPCM(freqs){const ctx=new(window.AudioContext||window.webkitAudioContext)(),raw=new Float32Array(generatePCM(freqs)),ab=ctx.createBuffer(1,raw.length,44100);ab.copyToChannel(raw,0);const src=ctx.createBufferSource();src.buffer=ab;src.connect(ctx.destination);src.start();src.onended=()=>ctx.close();}
function playFeedback(ok){const ctx=new(window.AudioContext||window.webkitAudioContext)(),g=ctx.createGain(),o=ctx.createOscillator();o.connect(g);g.connect(ctx.destination);o.frequency.value=ok?660:220;o.type=ok?"sine":"sawtooth";g.gain.setValueAtTime(0.3,ctx.currentTime);g.gain.exponentialRampToValueAtTime(0.001,ctx.currentTime+0.4);o.start();o.stop(ctx.currentTime+0.4);o.onended=()=>ctx.close();}

// ══════════════════════════════════════════════════════
// GAME LOGIC
// ══════════════════════════════════════════════════════
const WIN_TARGET=3, WINDOW_SIZE=3;
function shuffle(a){const b=[...a];for(let i=b.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[b[i],b[j]]=[b[j],b[i]];}return b;}
function buildChoices(p, pack){ return shuffle([p.target,...shuffle(pack.phrases.filter(x=>x.id!==p.id)).slice(0,3).map(x=>x.target)]); }
function initGame(pack){ const pool=pack.phrases.map(p=>({...p,score:0})); return{active:pool.slice(0,WINDOW_SIZE),waiting:pool.slice(WINDOW_SIZE),done:[]}; }

// ══════════════════════════════════════════════════════
// STORAGE
// ══════════════════════════════════════════════════════
function lsKey(targetLang){return `tl_progress_${targetLang}_l01`;}
function saveProgress(lang,game){try{localStorage.setItem(lsKey(lang),JSON.stringify({scores:Object.fromEntries([...game.active,...game.waiting,...game.done].map(p=>[p.id,p.score])),doneIds:game.done.map(p=>p.id),savedAt:new Date().toISOString()}));}catch(e){}}
function loadProgress(lang){try{const r=localStorage.getItem(lsKey(lang));return r?JSON.parse(r):null;}catch(e){return null;}}
function clearProgress(lang){try{localStorage.removeItem(lsKey(lang));}catch(e){}}
function restoreGame(saved,pack){const scores=saved.scores||{},doneIds=new Set(saved.doneIds||[]),pool=pack.phrases.map(p=>({...p,score:scores[p.id]||0})),done=pool.filter(p=>doneIds.has(p.id)),rest=pool.filter(p=>!doneIds.has(p.id));return{active:rest.slice(0,WINDOW_SIZE),waiting:rest.slice(WINDOW_SIZE),done};}
function saveActiveLangs(langs){try{localStorage.setItem("tl_active_langs",JSON.stringify(langs));}catch(e){}}
function loadActiveLangs(){try{const r=localStorage.getItem("tl_active_langs");return r?JSON.parse(r):[];}catch(e){return[];}}

// ══════════════════════════════════════════════════════
// COMPOSANT
// ══════════════════════════════════════════════════════
export default function Travelingo() {
  const [screen, setScreen]               = useState("dashboard");
  const [userLang, setUserLang]           = useState("fr");
  const [activeLangs, setActiveLangs]     = useState([]);
  const [currentLang, setCurrentLang]     = useState(null);
  const [game, setGame]                   = useState(null);
  const [savedMeta, setSavedMeta]         = useState(null);
  const [qIdx, setQIdx]                   = useState(0);
  const [choices, setChoices]             = useState([]);
  const [selected, setSelected]           = useState(null);
  const [validated, setValidated]         = useState(false);
  const [feedback, setFeedback]           = useState(null);
  const [showGrammar, setShowGrammar]     = useState(false);
  const [showReport, setShowReport]       = useState(false);
  const [reportType, setReportType]       = useState(null);
  const [reportText, setReportText]       = useState("");
  const [reportSent, setReportSent]       = useState(false);
  const [showLangPicker, setShowLangPicker]   = useState(false);
  const [showConfirmReset, setShowConfirmReset] = useState(false);
  const [isReview, setIsReview]           = useState(false);
  const correctRef    = useRef(false);
  const currentLangRef = useRef(null);
  useEffect(()=>{ currentLangRef.current = currentLang; },[currentLang]);

  const t  = k => (UI[userLang]||UI.fr)[k] || k;
  const pack = currentLang ? (PACKS[currentLang] || PACKS.ro) : PACKS.ro;
  const phrase = game && game.active.length > 0 ? game.active[qIdx % game.active.length] : null;
  const tr = phrase ? (phrase.tr[userLang] || phrase.tr.fr) : null;
  const langInfo = LANGUAGES.find(l => l.code === currentLang) || {};

  useEffect(()=>{ const l=loadActiveLangs(); setActiveLangs(l); if(l.length===0) setScreen("add_lang"); },[]);
  useEffect(()=>{ if(!phrase) return; setChoices(buildChoices(phrase,pack)); setSelected(null); setValidated(false); setFeedback(null); setShowGrammar(false); },[phrase?.id]);
  // Progress saved directly in onContinue and exitLesson

  function addLang(code){currentLangRef.current=code;const u=activeLangs.includes(code)?activeLangs:[...activeLangs,code];setActiveLangs(u);saveActiveLangs(u);setCurrentLang(code);setSavedMeta(loadProgress(code));setScreen("lang_home");}
  function openLang(code){currentLangRef.current=code;setCurrentLang(code);setSavedMeta(loadProgress(code));setScreen("lang_home");}
  function startReview(savedGame) { const pk = PACKS[currentLangRef.current]||PACKS.ro;
    // Build a game from all mastered phrases (score >= WIN_TARGET) in random order
    const allPhrases = pack.phrases.map(p => ({...p, score: 0}));
    const mastered   = savedGame ? savedGame.done.map(d => {
      const orig = pack.phrases.find(p => p.id === d.id);
      return orig ? {...orig, score: 0} : null;
    }).filter(Boolean) : allPhrases;
    const pool   = shuffle([...mastered]);
    const active = pool.slice(0, Math.min(WINDOW_SIZE, pool.length));
    const waiting= pool.slice(Math.min(WINDOW_SIZE, pool.length));
    setGame({active, waiting, done:[]});
    setIsReview(true);
    setQIdx(0); setSelected(null); setValidated(false); setFeedback(null);
    setScreen("lesson");
  }

  function launchLesson(code, fresh) {
    const lang = code || currentLangRef.current;
    const pk   = PACKS[lang] || PACKS.ro;
    currentLangRef.current = lang;
    setCurrentLang(lang);
    if (fresh) {
      clearProgress(lang);
      setSavedMeta(null);
      setGame(initGame(pk));
    } else {
      const s = loadProgress(lang);
      setGame(s ? restoreGame(s, pk) : initGame(pk));
    }
    setIsReview(false);
    setQIdx(0); setSelected(null); setValidated(false); setFeedback(null);
    setScreen("lesson");
  }
  function startFresh(code)  { launchLesson(code, true);  }
  function resumeGame(code)  { launchLesson(code, false); }
  function exitLesson(){
    if(game && !isReview) saveProgress(currentLangRef.current, game);
    setSavedMeta(loadProgress(currentLangRef.current));
    setIsReview(false);
    setScreen("lang_home");
  }

  function onSelect(ch){if(validated)return;setSelected(ch);const p=pack.phrases.find(x=>x.target===ch);if(p)playPCM(p.freqs);}
  function onValidate(){if(!selected||validated||!phrase)return;const ok=selected===phrase.target;correctRef.current=ok;setValidated(true);setFeedback(ok?"correct":"wrong");playFeedback(ok);}
  function onContinue(){
    const ok=correctRef.current; setShowGrammar(false);
    setGame(prev=>{
      let active=prev.active.map(p=>p.id===phrase.id?{...p,score:ok?p.score+1:0}:p);
      const waiting=[...prev.waiting],done=[...prev.done];
      const threshold = isReview ? 1 : WIN_TARGET;
      active.filter(p=>p.score>=threshold).forEach(p=>{done.push(p);active=active.filter(x=>x.id!==p.id);if(waiting.length>0)active.push(waiting.shift());});
      if(active.length===0){if(isReview){setIsReview(false);setScreen("lang_home");return{active,waiting,done};}clearProgress(currentLangRef.current);setSavedMeta(null);setScreen("done");return{active,waiting,done};}
      setQIdx(qi=>(qi+1)%active.length);
      if(!isReview && currentLangRef.current) { saveProgress(currentLangRef.current, {active,waiting,done}); }
      return{active,waiting,done};
    });
  }

  const donePhrases = game ? game.done.length : 0;
  const savedDone   = savedMeta ? Object.values(savedMeta.scores||{}).filter(s=>s>=WIN_TARGET).length : 0;
  const pct         = Math.round((donePhrases/pack.phrases.length)*100);
  const userLangInfo = USER_LANGS.find(l=>l.code===userLang)||{};

  // ── STYLES ──
  const C = {
    wrap:      {minHeight:"100vh",background:"#F1F5F9",display:"flex",flexDirection:"column",alignItems:"center",fontFamily:"system-ui,sans-serif",color:"#0F172A"},
    dashHero:  {width:"100%",background:"linear-gradient(135deg,#0369A1,#0EA5E9)",padding:"28px 20px 24px"},
    dashHdrRow:{display:"flex",justifyContent:"space-between",alignItems:"center",width:"100%",maxWidth:480,margin:"0 auto 6px"},
    dashLogo:  {fontWeight:800,fontSize:"1.4rem",color:"#fff",letterSpacing:"-0.5px"},
    dashSub:   {fontSize:"0.82rem",color:"rgba(255,255,255,0.7)",textAlign:"center",width:"100%",maxWidth:480,margin:"0 auto"},
    btnUserLang:{background:"rgba(255,255,255,0.15)",border:"1px solid rgba(255,255,255,0.3)",borderRadius:99,padding:"5px 12px",color:"#fff",fontSize:"0.82rem",fontWeight:600,cursor:"pointer",fontFamily:"inherit",display:"flex",alignItems:"center",gap:5},
    dashBody:  {width:"100%",maxWidth:480,padding:"20px 16px 80px"},
    dashLabel: {fontSize:"0.7rem",fontWeight:700,letterSpacing:"1.5px",textTransform:"uppercase",color:"#94A3B8",marginBottom:12},
    langCard:  {background:"#fff",borderRadius:16,boxShadow:"0 1px 4px rgba(0,0,0,0.06)",padding:"16px 18px",marginBottom:10,display:"flex",alignItems:"center",gap:14,cursor:"pointer"},
    lcFlag:    {fontSize:"2.4rem",lineHeight:1},
    lcInfo:    {flex:1},
    lcName:    {fontWeight:700,fontSize:"1rem",marginBottom:2},
    lcSub:     {fontSize:"0.78rem",color:"#64748B"},
    lcRight:   {display:"flex",flexDirection:"column",alignItems:"flex-end",gap:4},
    lcPct:     (p)=>({fontSize:"0.82rem",fontWeight:700,color:p>0?"#0369A1":"#CBD5E1"}),
    lcBar:     {width:56,height:5,background:"#E2E8F0",borderRadius:99,overflow:"hidden",marginTop:3},
    lcFill:    (p)=>({height:"100%",width:`${p}%`,background:"linear-gradient(90deg,#0EA5E9,#0369A1)",borderRadius:99}),
    btnAdd:    {width:"100%",background:"#fff",border:"2px dashed #BAE6FD",borderRadius:16,padding:16,color:"#0369A1",fontWeight:700,fontSize:"0.95rem",cursor:"pointer",fontFamily:"inherit",display:"flex",alignItems:"center",justifyContent:"center",gap:8,marginTop:4},
    hero:      {width:"100%",background:"linear-gradient(135deg,#0369A1,#0EA5E9)",padding:"24px 20px 32px",display:"flex",flexDirection:"column",alignItems:"center",textAlign:"center"},
    heroBack:  {alignSelf:"flex-start",background:"rgba(255,255,255,0.15)",border:"none",borderRadius:99,padding:"5px 12px",color:"#fff",fontSize:"0.8rem",cursor:"pointer",fontFamily:"inherit",marginBottom:16},
    heroFlag:  {fontSize:"4rem",marginBottom:6,lineHeight:1},
    heroLang:  {fontSize:"1.8rem",fontWeight:800,color:"#fff",marginBottom:4,letterSpacing:"-0.5px"},
    heroSub:   {fontSize:"0.83rem",color:"rgba(255,255,255,0.75)"},
    heroPill:  {marginTop:12,background:"rgba(255,255,255,0.15)",border:"1px solid rgba(255,255,255,0.3)",borderRadius:99,padding:"5px 14px",fontSize:"0.78rem",color:"#fff",fontWeight:600},
    listWrap:  {width:"100%",maxWidth:480,padding:"20px 16px 60px"},
    secLabel:  {fontSize:"0.7rem",fontWeight:700,letterSpacing:"1.5px",textTransform:"uppercase",color:"#94A3B8",marginBottom:12},
    resumeInfo:{background:"#F0FDF4",border:"1px solid #BBF7D0",borderRadius:12,padding:"10px 14px",marginBottom:12,fontSize:"0.82rem",color:"#166534"},
    lessonCard:(av)=>({background:"#fff",borderRadius:14,boxShadow:"0 1px 4px rgba(0,0,0,0.06)",padding:"14px 16px",marginBottom:8,display:"flex",alignItems:"center",gap:12,opacity:av?1:0.5,cursor:av?"pointer":"default"}),
    lEmoji:    {fontSize:"1.5rem",minWidth:32,textAlign:"center"},
    lInfo:     {flex:1},
    lTitle:    {fontWeight:700,fontSize:"0.92rem",marginBottom:1},
    lSub:      {fontSize:"0.76rem",color:"#64748B"},
    lRight:    {display:"flex",flexDirection:"column",alignItems:"flex-end",gap:3},
    lMiniBar:  {width:44,height:4,background:"#E2E8F0",borderRadius:99,overflow:"hidden"},
    lMiniFill: (p)=>({height:"100%",width:`${p}%`,background:"linear-gradient(90deg,#0EA5E9,#0369A1)",borderRadius:99}),
    lCount:    (p)=>({fontSize:"0.72rem",fontWeight:700,color:p>0?"#0369A1":"#CBD5E1"}),
    btnP:      (on)=>({width:"100%",background:on?"linear-gradient(135deg,#0EA5E9,#0369A1)":"#E2E8F0",color:on?"#fff":"#94A3B8",border:"none",borderRadius:14,padding:14,fontSize:"0.95rem",fontWeight:700,cursor:on?"pointer":"default",fontFamily:"inherit",transition:"all 0.2s",marginBottom:8}),
    btnSec:    {width:"100%",background:"transparent",border:"1.5px solid #E2E8F0",color:"#64748B",borderRadius:14,padding:12,fontSize:"0.88rem",fontWeight:600,cursor:"pointer",fontFamily:"inherit",marginBottom:8},
    lessonHdr: {width:"100%",background:"#fff",borderBottom:"1px solid #F1F5F9",padding:"14px 16px",display:"flex",justifyContent:"space-between",alignItems:"center"},
    btnExit:   {background:"transparent",border:"none",color:"#64748B",cursor:"pointer",fontSize:"0.85rem",fontFamily:"inherit"},
    gBg:       {width:"100%",maxWidth:480,height:6,background:"#E2E8F0",borderRadius:99,overflow:"hidden",margin:"12px 16px 14px"},
    gFill:     {height:"100%",width:`${pct}%`,background:"linear-gradient(90deg,#0EA5E9,#0369A1)",borderRadius:99,transition:"width 0.5s"},
    quizWrap:  {width:"100%",maxWidth:480,padding:"0 16px",display:"flex",flexDirection:"column"},
    card:      {background:"#fff",borderRadius:20,boxShadow:"0 4px 24px rgba(14,165,233,0.10)",padding:"22px",marginBottom:12,position:"relative",overflow:"hidden"},
    stripe:    {position:"absolute",top:0,left:0,right:0,height:4,background:"linear-gradient(90deg,#0EA5E9,#F59E0B)"},
    qlabel:    {fontSize:"0.7rem",fontWeight:700,letterSpacing:"1.5px",textTransform:"uppercase",color:"#0EA5E9",marginBottom:10},
    qphrase:   {fontSize:"1.45rem",fontWeight:800,marginBottom:18,lineHeight:1.2},
    grid:      {display:"grid",gridTemplateColumns:"1fr 1fr",gap:10},
    choice:    (ch)=>{
      let bg="#F8FAFC",border="1.5px solid #E2E8F0",color="#0F172A";
      if(validated){if(ch===phrase.target){bg="#F0FDF4";border="2px solid #10B981";color="#166534";}else if(ch===selected){bg="#FFF1F2";border="2px solid #E11D48";color="#E11D48";}else{color="#CBD5E1";}}
      else if(ch===selected){bg="#EFF6FF";border="2px solid #0EA5E9";color="#0369A1";}
      return{background:bg,border,color,borderRadius:14,padding:"12px 8px",fontSize:"0.86rem",fontWeight:600,cursor:validated?"default":"pointer",textAlign:"center",transition:"all 0.15s",fontFamily:"inherit",lineHeight:1.3};
    },
    phonetic:  {fontSize:"0.68rem",color:"#94A3B8",fontStyle:"italic",marginTop:3},
    fb:        (tp)=>({borderRadius:14,padding:"11px 14px",background:tp==="correct"?"#F0FDF4":"#FFF1F2",border:`1.5px solid ${tp==="correct"?"#BBF7D0":"#FECDD3"}`,color:tp==="correct"?"#166534":"#E11D48",fontWeight:700,fontSize:"0.88rem",textAlign:"center",marginBottom:10}),
    btnMore:   {background:"transparent",color:"#0369A1",border:"1.5px solid #BAE6FD",borderRadius:14,padding:11,fontSize:"0.86rem",fontWeight:600,cursor:"pointer",fontFamily:"inherit",marginBottom:8},
    btnReport: {background:"transparent",color:"#94A3B8",border:"none",fontSize:"0.74rem",cursor:"pointer",fontFamily:"inherit",textDecoration:"underline",padding:4},
    overlay:   {position:"fixed",inset:0,background:"rgba(15,23,42,0.55)",zIndex:200,display:"flex",alignItems:"flex-end",justifyContent:"center"},
    modal:     {background:"#fff",borderRadius:"24px 24px 0 0",width:"100%",maxWidth:520,maxHeight:"78vh",overflowY:"auto",padding:"12px 24px 40px",pointerEvents:"all"},
    mbar:      {width:40,height:4,background:"#E2E8F0",borderRadius:99,margin:"8px auto 20px"},
    mtitle:    {fontWeight:800,fontSize:"1rem",color:"#0F172A",marginBottom:10},
    mphrase:   {background:"#F0F9FF",border:"1px solid #BAE6FD",borderRadius:12,padding:"10px 14px",fontSize:"0.87rem",fontWeight:700,color:"#0369A1",marginBottom:16},
    msub:      {fontSize:"0.7rem",fontWeight:700,color:"#92400E",textTransform:"uppercase",letterSpacing:"1px",marginBottom:8},
    mtext:     {fontSize:"0.86rem",color:"#44403C",lineHeight:1.7,marginBottom:16},
    msub2:     {fontSize:"0.7rem",fontWeight:700,color:"#166534",textTransform:"uppercase",letterSpacing:"1px",marginBottom:10},
    mitem:     {fontSize:"0.84rem",color:"#1C1917",padding:"6px 0",lineHeight:1.5},
    btnClose:  {width:"100%",background:"#0F172A",color:"#fff",border:"none",borderRadius:14,padding:14,fontSize:"0.95rem",fontWeight:700,cursor:"pointer",fontFamily:"inherit",marginTop:16},
    rtypes:    {display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:14},
    rtype:     (a)=>({background:a?"#EFF6FF":"#F8FAFC",border:a?"2px solid #0EA5E9":"1.5px solid #E2E8F0",color:a?"#0369A1":"#64748B",borderRadius:12,padding:"10px 8px",fontSize:"0.79rem",fontWeight:600,cursor:"pointer",textAlign:"center",fontFamily:"inherit"}),
    rtextarea: {width:"100%",border:"1.5px solid #E2E8F0",borderRadius:12,padding:"10px 12px",fontSize:"0.84rem",fontFamily:"inherit",resize:"none",outline:"none",boxSizing:"border-box",marginBottom:12,color:"#0F172A"},
    btnSend:   (on)=>({width:"100%",background:on?"linear-gradient(135deg,#0EA5E9,#0369A1)":"#E2E8F0",color:on?"#fff":"#94A3B8",border:"none",borderRadius:14,padding:13,fontSize:"0.95rem",fontWeight:700,cursor:on?"pointer":"default",fontFamily:"inherit",marginBottom:8}),
    btnCancel: {width:"100%",background:"transparent",color:"#94A3B8",border:"none",borderRadius:14,padding:10,fontSize:"0.88rem",cursor:"pointer",fontFamily:"inherit"},
    centeredOverlay:{position:"fixed",inset:0,background:"rgba(15,23,42,0.55)",zIndex:400,display:"flex",alignItems:"center",justifyContent:"center",padding:"24px"},
    centeredModal:  {background:"#fff",borderRadius:20,width:"100%",maxWidth:360,padding:"24px",pointerEvents:"all",boxShadow:"0 20px 60px rgba(0,0,0,0.2)"},
    pickerTitle:    {fontWeight:800,fontSize:"1rem",color:"#0F172A",marginBottom:4},
    pickerSub:      {fontSize:"0.8rem",color:"#64748B",marginBottom:20},
    pickerGrid:     {display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10,marginBottom:16},
    pickerFlag:     {fontSize:"1.8rem",marginBottom:4},
    pickerBtn:      (a)=>({background:a?"#EFF6FF":"#F8FAFC",border:a?"2px solid #0EA5E9":"1.5px solid #E2E8F0",borderRadius:14,padding:"14px 8px",textAlign:"center",cursor:"pointer",fontFamily:"inherit",transition:"all 0.15s"}),
    pickerName:     (a)=>({fontSize:"0.78rem",fontWeight:700,color:a?"#0369A1":"#0F172A"}),
    pickerClose:    {width:"100%",background:"#F1F5F9",color:"#64748B",border:"none",borderRadius:12,padding:12,fontSize:"0.88rem",fontWeight:600,cursor:"pointer",fontFamily:"inherit"},
    confirmEmoji:   {fontSize:"2.5rem",marginBottom:12,textAlign:"center"},
    confirmTitle:   {fontWeight:800,fontSize:"1rem",color:"#0F172A",marginBottom:8,textAlign:"center"},
    confirmDesc:    {fontSize:"0.84rem",color:"#64748B",marginBottom:24,lineHeight:1.5,textAlign:"center"},
    confirmRow:     {display:"grid",gridTemplateColumns:"1fr 1fr",gap:10},
    btnConfirmOk:   {background:"#E11D48",color:"#fff",border:"none",borderRadius:12,padding:"13px 8px",fontSize:"0.9rem",fontWeight:700,cursor:"pointer",fontFamily:"inherit"},
    btnConfirmNo:   {background:"#F1F5F9",color:"#64748B",border:"none",borderRadius:12,padding:"13px 8px",fontSize:"0.9rem",fontWeight:600,cursor:"pointer",fontFamily:"inherit"},
    addGrid:        {display:"grid",gridTemplateColumns:"1fr 1fr",gap:10},
    addLangBtn:     (taken)=>({background:taken?"#F0FDF4":"#F8FAFC",border:taken?"2px solid #10B981":"1.5px solid #E2E8F0",borderRadius:14,padding:"14px 10px",textAlign:"center",cursor:taken?"default":"pointer",fontFamily:"inherit",opacity:taken?0.7:1}),
    addFlag:        {fontSize:"1.8rem",marginBottom:4},
    addName:        (taken)=>({fontSize:"0.88rem",fontWeight:700,color:taken?"#166534":"#0F172A"}),
    addTaken:       {fontSize:"0.68rem",color:"#10B981",fontWeight:600,marginTop:2},
  };

  // ── DONE ──
  if(screen==="done") return (
    <div style={C.wrap}>
      <div style={C.hero}>
        <button style={C.heroBack} onClick={()=>setScreen("dashboard")}>{t("home")}</button>
        <div style={C.heroFlag}>{langInfo.flag}</div>
        <div style={C.heroLang}>{langName(langInfo,userLang)}</div>
      </div>
      <div style={{display:"flex",flexDirection:"column",alignItems:"center",textAlign:"center",padding:"40px 24px"}}>
        <div style={{fontSize:"4rem",marginBottom:16}}>🏆</div>
        <div style={{fontSize:"1.5rem",fontWeight:800,marginBottom:8}}>{t("doneLessons")}</div>
        <div style={{fontSize:"0.9rem",color:"#64748B",marginBottom:28}}>{t("doneDesc")}</div>
        <button style={{...C.btnP(true),maxWidth:300}} onClick={()=>setScreen("dashboard")}>{t("backHome")}</button>
      </div>
    </div>
  );

  // ── LESSON ──
  if(screen==="lesson" && (!phrase || !tr)) return (
    <div style={{...C.wrap, justifyContent:"center", alignItems:"center"}}>
      <div style={{fontSize:"2rem"}}>⏳</div>
    </div>
  );

  if(screen==="lesson" && phrase && tr) return (
    <div style={C.wrap}>
      <div style={C.lessonHdr}>
        <div style={{fontWeight:700,fontSize:"0.88rem"}}>{langInfo.flag} {pack.lesson.emoji} {pack.lesson.titles[userLang]||pack.lesson.titles.fr}</div>
        <button style={C.btnExit} onClick={exitLesson}>{t("quit")}</button>
      </div>
      <div style={{width:"100%",maxWidth:480,padding:"0 16px"}}>
        <div style={{height:6,background:"#E2E8F0",borderRadius:99,overflow:"hidden",margin:"12px 0 14px"}}>
          <div style={C.gFill}/>
        </div>
      </div>
      <div style={C.quizWrap}>
        <div style={C.card}>
          <div style={C.stripe}/>
          <div style={C.qlabel}>{langInfo.flag} {t("howToSay")} {langName(langInfo,userLang)?.toLowerCase()} ?</div>
          <div style={C.qphrase}>« {tr.source} »</div>
          <div style={C.grid}>
            {choices.map(ch=>{
              const chPhrase = pack.phrases.find(p=>p.target===ch);
              const chTr = chPhrase ? (chPhrase.tr[userLang]||chPhrase.tr.fr) : null;
              return (
                <button key={ch} style={C.choice(ch)} onClick={()=>onSelect(ch)}>
                  <div>
                    <div>{!validated&&ch===selected&&"🔊 "}{validated&&ch===phrase.target&&"✓ "}{validated&&ch===selected&&ch!==phrase.target&&"✗ "}{ch}</div>
                    {chTr && <div style={C.phonetic}>{chTr.phonetic}</div>}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
        {!validated&&<button style={C.btnP(!!selected)} onClick={onValidate}>{t("validate")}</button>}
        {validated &&<button style={C.btnP(true)} onClick={onContinue}>{t("next")}</button>}
        {feedback  &&<div style={C.fb(feedback)}>{feedback==="correct"?t("bravo"):`${t("wrongAnswer")} « ${phrase.target} »`}</div>}
        {validated &&<button style={C.btnMore} onClick={()=>setShowGrammar(true)}>{t("learnMore")}</button>}
        {validated &&<button style={C.btnReport} onClick={()=>{setShowReport(true);setReportSent(false);setReportType(null);setReportText("");}}>{t("report")}</button>}

        {/* ── DEV ONLY ── */}
        <div style={{marginTop:24,padding:"12px 14px",background:"#FEF3C7",border:"1.5px dashed #F59E0B",borderRadius:12}}>
          <div style={{fontSize:"0.7rem",fontWeight:700,color:"#92400E",letterSpacing:"1px",textTransform:"uppercase",marginBottom:10}}>🛠 Dev tools</div>
          <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>

            <button style={{background:"#F59E0B",color:"#fff",border:"none",borderRadius:8,padding:"6px 12px",fontSize:"0.78rem",fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}
              onClick={()=>{
                const lang = currentLangRef.current;
                setGame(prev=>{
                  let active  = prev.active.map(p=>p.id===phrase.id?{...p,score:WIN_TARGET}:p);
                  const waiting=[...prev.waiting], done=[...prev.done];
                  active.filter(p=>p.score>=WIN_TARGET).forEach(p=>{
                    done.push(p); active=active.filter(x=>x.id!==p.id);
                    if(waiting.length>0) active.push(waiting.shift());
                  });
                  const next = {active,waiting,done};
                  if(active.length===0){
                    saveProgress(lang, next);
                    clearProgress(lang);
                    setSavedMeta(null); setScreen("done");
                    return next;
                  }
                  saveProgress(lang, next);
                  setQIdx(qi=>(qi+1)%active.length);
                  setSelected(null); setValidated(false); setFeedback(null); setShowGrammar(false);
                  return next;
                });
              }}>
              ✓ Valider phrase
            </button>

            <button style={{background:"#EF4444",color:"#fff",border:"none",borderRadius:8,padding:"6px 12px",fontSize:"0.78rem",fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}
              onClick={()=>{
                const lang = currentLangRef.current;
                const pk   = PACKS[lang]||PACKS.ro;
                const done = pk.phrases.map(p=>({...p,score:WIN_TARGET}));
                const fullGame = {active:[],waiting:[],done};
                saveProgress(lang, fullGame);
                setSavedMeta(loadProgress(lang));
                setScreen("done");
                setGame(fullGame);
              }}>
              ⚡ Tout compléter
            </button>

            <button style={{background:"#6B7280",color:"#fff",border:"none",borderRadius:8,padding:"6px 12px",fontSize:"0.78rem",fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}
              onClick={()=>{
                const lang = currentLangRef.current;
                const pk   = PACKS[lang]||PACKS.ro;
                clearProgress(lang);
                setSavedMeta(null);
                setGame(initGame(pk));
                setQIdx(0); setSelected(null); setValidated(false); setFeedback(null);
              }}>
              🗑 Reset
            </button>

          </div>
        </div>
      </div>

      {showGrammar&&(<div style={C.overlay}><div style={C.modal}><div style={C.mbar}/><div style={C.mtitle}>{t("grammar")}</div><div style={C.mphrase}>« {tr.source} » → « {phrase.target} »</div><div style={C.msub}>{t("explanation")}</div><div style={C.mtext}>{tr.grammar}</div><div style={C.msub2}>{t("toRemember")}</div>{tr.complements.map((c,i)=><div key={i} style={{...C.mitem,borderBottom:i<tr.complements.length-1?"1px solid #F1F5F9":"none"}}>• {c}</div>)}<button style={C.btnClose} onClick={()=>setShowGrammar(false)}>{t("close")}</button></div></div>)}
      {showReport&&(<div style={C.centeredOverlay}><div style={{...C.centeredModal, maxHeight:"85vh", overflowY:"auto"}}><div style={C.mbar}/>{reportSent?(<div style={{display:"flex",flexDirection:"column",alignItems:"center",textAlign:"center",padding:"16px 0"}}><div style={{fontSize:"3rem",marginBottom:12}}>✅</div><div style={{fontWeight:800,fontSize:"1rem",marginBottom:8}}>{t("reportThanks")}</div><div style={{fontSize:"0.85rem",color:"#64748B",marginBottom:20}}>{t("reportSent")}</div><button style={C.btnClose} onClick={()=>setShowReport(false)}>{t("close")}</button></div>):(<><div style={C.mtitle}>{t("report")}</div><div style={{fontSize:"0.82rem",color:"#64748B",marginBottom:10}}>{t("reportOn")}</div><div style={C.mphrase}>« {tr.source} » → « {phrase.target} »</div><div style={{fontSize:"0.82rem",color:"#64748B",marginBottom:10}}>{t("reportType")}</div><div style={C.rtypes}>{[{id:"phonetic",label:t("reportPhonetic")},{id:"audio",label:t("reportAudio")},{id:"spelling",label:t("reportSpelling")},{id:"translation",label:t("reportTranslation")}].map(opt=><button key={opt.id} style={C.rtype(reportType===opt.id)} onClick={()=>setReportType(opt.id)}>{opt.label}</button>)}</div><textarea style={C.rtextarea} rows={3} placeholder={t("reportPlaceholder")} value={reportText} onChange={e=>setReportText(e.target.value)}/><button style={C.btnSend(!!reportType)} onClick={()=>{if(reportType)setReportSent(true);}}>{t("reportSend")}</button><button style={C.btnCancel} onClick={()=>setShowReport(false)}>{t("cancel")}</button></>)}</div></div>)}
    </div>
  );

  // ── LANG HOME ──
  if(screen==="lang_home"){
    const hasSave=!!savedMeta&&savedDone<pack.phrases.length;
    const savedDate=savedMeta?(() => { try { return new Date(savedMeta.savedAt).toLocaleDateString("fr-FR",{day:"numeric",month:"long",hour:"2-digit",minute:"2-digit"}); } catch(e) { return new Date(savedMeta.savedAt).toLocaleDateString(); } })():null;
    return (
      <div style={C.wrap}>
        <div style={C.hero}>
          <button style={C.heroBack} onClick={()=>setScreen("dashboard")}>{t("home")}</button>
          <div style={C.heroFlag}>{langInfo.flag}</div>
          <div style={C.heroLang}>{langName(langInfo,userLang)}</div>
          <div style={C.heroSub}>{userLangInfo.flag} {langName(userLangInfo,userLang)} → {langInfo.flag} {langName(langInfo,userLang)}</div>
          <div style={C.heroPill}>10 {t("lessons")} · 100 {t("phrases")}</div>
        </div>
        <div style={C.listWrap}>

          {/* Bouton réviser — tout en haut si progression existe */}
          {savedDone>0&&(
            <button style={{width:"100%",background:"linear-gradient(135deg,#0EA5E9,#0369A1)",color:"#fff",border:"none",borderRadius:14,padding:14,fontSize:"0.95rem",fontWeight:700,cursor:"pointer",fontFamily:"inherit",marginBottom:12,display:"flex",alignItems:"center",justifyContent:"center",gap:8}}
              onClick={()=>{const s=loadProgress(currentLang);const pk=PACKS[currentLang]||PACKS.ro;startReview(s?restoreGame(s,pk):initGame(pk));}}>
              🔁 {t("review")} · {savedDone}/{pack.phrases.length} {t("mastered")}
            </button>
          )}

          {/* Progression + actions leçon en cours */}
          {hasSave&&<div style={C.resumeInfo}>✅ {t("savedAt")} · {savedDate}</div>}
          <button style={C.btnP(true)} onClick={()=>hasSave?resumeGame(currentLang):startFresh(currentLang)}>{hasSave?t("resume"):t("start")}</button>
          {hasSave&&<button style={C.btnSec} onClick={()=>setShowConfirmReset(true)}>{t("restart")}</button>}

          {/* Liste de toutes les leçons */}
          <div style={{...C.secLabel,marginTop:20}}>{t("allLessons")}</div>
          {(pack?.lessons || []).map((l,i)=>{
            const isFirst  = l.id==="l01";
            const lDone    = isFirst ? savedDone : 0;
            const lPct     = Math.round((lDone/10)*100);
            const isDone   = isFirst && lDone >= 10;
            const inProgress = isFirst && lDone > 0 && lDone < 10;
            const cardStyle = {
              background: isDone ? "#F0FDF4" : inProgress ? "#F0F9FF" : "#fff",
              border: isDone ? "1.5px solid #BBF7D0" : inProgress ? "1.5px solid #BAE6FD" : "1.5px solid #F1F5F9",
              borderRadius:14, boxShadow:"0 1px 4px rgba(0,0,0,0.04)",
              padding:"14px 16px", marginBottom:8,
              display:"flex", alignItems:"center", gap:12,
              opacity: l.available ? 1 : 0.45,
              cursor: l.available ? "pointer" : "default",
              transition:"all 0.2s",
            };
            return(
              <div key={l.id} style={cardStyle} onClick={()=>{
                if(!l.available) return;
                if(isFirst) { hasSave ? resumeGame(currentLang) : startFresh(currentLang); }
              }}>
                <div style={{...C.lEmoji, position:"relative"}}>
                  {l.emoji}
                  {isDone && <span style={{position:"absolute",top:-4,right:-6,fontSize:"0.65rem"}}>✅</span>}
                </div>
                <div style={C.lInfo}>
                  <div style={{...C.lTitle, color: isDone?"#166534":inProgress?"#0369A1":"#0F172A"}}>
                    {i+1}. {l.titles[userLang]||l.titles.fr}
                  </div>
                  <div style={C.lSub}>{l.subs[userLang]||l.subs.fr}</div>
                </div>
                <div style={C.lRight}>
                  {l.available ? (
                    <>
                      <div style={{fontSize:"0.72rem",fontWeight:700,color:isDone?"#10B981":inProgress?"#0369A1":"#CBD5E1"}}>
                        {isDone ? "✓" : `${lDone}/10`}
                      </div>
                      <div style={C.lMiniBar}>
                        <div style={{...C.lMiniFill(lPct), background: isDone?"linear-gradient(90deg,#10B981,#059669)":"linear-gradient(90deg,#0EA5E9,#0369A1)"}}/>
                      </div>
                    </>
                  ) : (
                    <div style={{fontSize:"0.72rem",color:"#CBD5E1"}}>🔒</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        {showConfirmReset&&(<div style={C.centeredOverlay}><div style={C.centeredModal}><div style={C.confirmEmoji}>⚠️</div><div style={C.confirmTitle}>{t("confirmTitle")}</div><div style={C.confirmDesc}>{t("confirmDesc")}</div><div style={C.confirmRow}><button style={C.btnConfirmNo} onClick={()=>setShowConfirmReset(false)}>{t("cancel")}</button><button style={C.btnConfirmOk} onClick={()=>{setShowConfirmReset(false);startFresh(currentLang);}}>{t("confirmOk")}</button></div></div></div>)}
      </div>
    );
  }

  // ── ADD LANG ──
  if(screen==="add_lang") return (
    <div style={C.wrap}>
      <div style={C.dashHero}>
        <div style={C.dashHdrRow}>
          <div style={C.dashLogo}>🌍 Travelingo</div>
          <button style={C.btnUserLang} onClick={()=>setShowLangPicker(true)}>{userLangInfo.flag} {langName(userLangInfo,userLang)}</button>
        </div>
        <div style={C.dashSub}>{t("appSub")}</div>
      </div>
      <div style={C.dashBody}>
        <div style={C.dashLabel}>{t("chooseLang")}</div>
        <div style={C.addGrid}>
          {LANGUAGES.map(lang=>{
            const taken=activeLangs.includes(lang.code);
            return(
              <button key={lang.code} style={C.addLangBtn(taken)} onClick={()=>!taken&&addLang(lang.code)}>
                <div style={C.addFlag}>{lang.flag}</div>
                <div style={C.addName(taken)}>{langName(lang,userLang)}</div>
                {taken&&<div style={C.addTaken}>✓ {t("inProgress")}</div>}
              </button>
            );
          })}
        </div>
        {activeLangs.length>0&&<button style={{...C.btnCancel,marginTop:20,width:"100%"}} onClick={()=>setScreen("dashboard")}>{t("back")}</button>}
      </div>
      {showLangPicker&&(<div style={C.centeredOverlay}><div style={C.centeredModal}><div style={C.pickerTitle}>{t("myLang")}</div><div style={C.pickerSub}>{t("myLangSub")}</div><div style={C.pickerGrid}>{USER_LANGS.map(l=><button key={l.code} style={C.pickerBtn(userLang===l.code)} onClick={()=>{setUserLang(l.code);setShowLangPicker(false);}}><div style={C.pickerFlag}>{l.flag}</div><div style={C.pickerName(userLang===l.code)}>{langName(l,l.code)}</div></button>)}</div><button style={C.pickerClose} onClick={()=>setShowLangPicker(false)}>{t("cancel")}</button></div></div>)}
    </div>
  );

  // ── DASHBOARD ──
  return (
    <div style={C.wrap}>
      <div style={C.dashHero}>
        <div style={C.dashHdrRow}>
          <div style={C.dashLogo}>🌍 Travelingo</div>
          <button style={C.btnUserLang} onClick={()=>setShowLangPicker(true)}>{userLangInfo.flag} {langName(userLangInfo,userLang)}</button>
        </div>
        <div style={C.dashSub}>{t("appSub")}</div>
      </div>
      <div style={C.dashBody}>
        {activeLangs.length>0&&<>
          <div style={C.dashLabel}>{t("myLangs")}</div>
          {activeLangs.map(code=>{
            const lang=LANGUAGES.find(l=>l.code===code);
            const saved=loadProgress(code);
            const done=saved?Object.values(saved.scores||{}).filter(s=>s>=WIN_TARGET).length:0;
            const p=Math.round((done/pack.phrases.length)*100);
            return(
              <div key={code} style={C.langCard} onClick={()=>openLang(code)}>
                <div style={C.lcFlag}>{lang.flag}</div>
                <div style={C.lcInfo}>
                  <div style={C.lcName}>{langName(lang,userLang)}</div>
                  <div style={C.lcSub}>10 {t("lessons")} · 100 {t("phrases")}</div>
                </div>
                <div style={C.lcRight}>
                  <div style={C.lcPct(p)}>{done}/{pack.phrases.length}</div>
                  <div style={C.lcBar}><div style={C.lcFill(p)}/></div>
                </div>
              </div>
            );
          })}
        </>}
        <div style={{...C.dashLabel,marginTop:activeLangs.length>0?20:0}}>{t("addLang")}</div>
        <button style={C.btnAdd} onClick={()=>setScreen("add_lang")}>{t("addLangBtn")}</button>
      </div>
      {showLangPicker&&(<div style={C.centeredOverlay}><div style={C.centeredModal}><div style={C.pickerTitle}>{t("myLang")}</div><div style={C.pickerSub}>{t("myLangSub")}</div><div style={C.pickerGrid}>{USER_LANGS.map(l=><button key={l.code} style={C.pickerBtn(userLang===l.code)} onClick={()=>{setUserLang(l.code);setShowLangPicker(false);}}><div style={C.pickerFlag}>{l.flag}</div><div style={C.pickerName(userLang===l.code)}>{langName(l,l.code)}</div></button>)}</div><button style={C.pickerClose} onClick={()=>setShowLangPicker(false)}>{t("cancel")}</button></div></div>)}
    </div>
  );
}
