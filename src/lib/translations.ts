
export type Language = "it" | "en" | "fr" | "es" | "de";

export type TranslationKey =
    | "appTitle"
    | "apiToken"
    | "configuration"
    | "model"
    | "maxTokens"
    | "temperature"
    | "messages"
    | "import"
    | "export"
    | "addMessage"
    | "role"
    | "content"
    | "send"
    | "response"
    | "copy"
    | "processing"
    | "error"
    | "success"
    | "history"
    | "editor"
    | "clear"
    | "tutorialTitle"
    | "tutorialStep1"
    | "tutorialStep1Link"
    | "tutorialStep2"
    | "tutorialStep2Link"
    | "tutorialStep3"
    | "tutorialStep4"
    | "tutorialStep4Link"
    | "tutorialStep5"
    | "tutorialStep5Tool"
    | "languageSelector"
    | "openaiApiTutorial"
    | "openaiApiTutorialText"
    | "openaiApiTutorialSubtitle"
    | "getApiKey"
    | "format"
    | "promptTokens"
    | "completionTokens"
    | "totalTokens"
    | "estimatedCost";

export const translations: Record<Language, Record<TranslationKey, string>> = {
    it: {
        appTitle: "Tester di Prompt per OpenAI",
        apiToken: "Token API OpenAI",
        configuration: "Configurazione",
        model: "Modello",
        maxTokens: "Max Tokens",
        temperature: "Temperatura",
        messages: "Messaggi",
        import: "Importa",
        export: "Esporta",
        addMessage: "Aggiungi Messaggio",
        role: "Ruolo",
        content: "Contenuto",
        send: "Invia",
        response: "Risposta",
        copy: "Copia",
        processing: "Elaborazione...",
        error: "Errore",
        success: "Successo",
        history: "Storico",
        editor: "Editor",
        clear: "Cancella",
        tutorialTitle: "Come ottengo la chiave di OpenAI?",
        tutorialStep1: "Effettua l'accesso al tuo profilo OpenAI oppure registra subito un nuovo account da",
        tutorialStep1Link: "qui",
        tutorialStep2: "Dopo aver effettuato l'accesso navigare nella sezione \"API Keys\"",
        tutorialStep2Link: "tramite questo link",
        tutorialStep3: "Nella pagina delle chiavi API, troverai il pulsante \"Create new secret key\". Cliccalo e segui le istruzioni per generare una nuova chiave.",
        tutorialStep4: "OpenAI potrebbe offrirti un credito iniziale per darti la possibilità di effettuare i primi test. Una volta esaurito il vostro credito sarà necessario aggiungere ulteriori fondi al vostro account visitando la",
        tutorialStep4Link: "sezione di fatturazione",
        tutorialStep5: "Ci siamo! Incolla qui la tua secret key e attiverai l'AI Assistant. Ricordati di custodire sempre la tua chiave in un posto sicuro",
        tutorialStep5Tool: "lo strumento di monitoraggio",
        languageSelector: "Lingua",
        openaiApiTutorial: "Tutorial API OpenAI",
        openaiApiTutorialText: "Per utilizzare questo strumento, avrai bisogno di una chiave API OpenAI. Segui il link qui sotto per ottenerla.",
        openaiApiTutorialSubtitle: "Come ottenere e utilizzare la tua chiave API",
        getApiKey: "Ottieni la tua chiave API",
        format: "Formatta",
        promptTokens: "Token del prompt:",
        completionTokens: "Token della risposta:",
        totalTokens: "Token totali:",
        estimatedCost: "Costo stimato:"
    },
    en: {
        appTitle: "OpenAI Prompt Tester",
        apiToken: "OpenAI API Token",
        configuration: "Configuration",
        model: "Model",
        maxTokens: "Max Tokens",
        temperature: "Temperature",
        messages: "Messages",
        import: "Import",
        export: "Export",
        addMessage: "Add Message",
        role: "Role",
        content: "Content",
        send: "Send",
        response: "Response",
        copy: "Copy",
        processing: "Processing...",
        error: "Error",
        success: "Success",
        history: "History",
        editor: "Editor",
        clear: "Clear",
        tutorialTitle: "How do I get an OpenAI key?",
        tutorialStep1: "Log in to your OpenAI profile or register a new account",
        tutorialStep1Link: "here",
        tutorialStep2: "After logging in, navigate to the \"API Keys\" section",
        tutorialStep2Link: "via this link",
        tutorialStep3: "On the API keys page, you'll find the \"Create new secret key\" button. Click it and follow the instructions to generate a new key.",
        tutorialStep4: "OpenAI might offer you initial credit to give you the ability to perform your first tests. Once your credit is exhausted, you'll need to add more funds to your account by visiting the",
        tutorialStep4Link: "billing section",
        tutorialStep5: "We're done! Paste your secret key here and you'll activate the AI Assistant. Remember to always keep your key in a safe place",
        tutorialStep5Tool: "the monitoring tool",
        languageSelector: "Language",
        openaiApiTutorial: "OpenAI API Tutorial",
        openaiApiTutorialText: "To use this tool, you'll need an OpenAI API key. Follow the link below to get one.",
        openaiApiTutorialSubtitle: "How to get and use your API key",
        getApiKey: "Get your API key",
        format: "Format",
        promptTokens: "Prompt tokens:",
        completionTokens: "Completion tokens:",
        totalTokens: "Total tokens:",
        estimatedCost: "Estimated cost:"
    },
    fr: {
        appTitle: "Testeur de Prompt pour OpenAI",
        apiToken: "Token API OpenAI",
        configuration: "Configuration",
        model: "Modèle",
        maxTokens: "Tokens Max",
        temperature: "Température",
        messages: "Messages",
        import: "Importer",
        export: "Exporter",
        addMessage: "Ajouter un Message",
        role: "Rôle",
        content: "Contenu",
        send: "Envoyer",
        response: "Réponse",
        copy: "Copier",
        processing: "Traitement...",
        error: "Erreur",
        success: "Succès",
        history: "Historique",
        editor: "Éditeur",
        clear: "Effacer",
        tutorialTitle: "Comment obtenir une clé OpenAI?",
        tutorialStep1: "Connectez-vous à votre profil OpenAI ou enregistrez un nouveau compte",
        tutorialStep1Link: "ici",
        tutorialStep2: "Après vous être connecté, naviguez vers la section \"API Keys\"",
        tutorialStep2Link: "via ce lien",
        tutorialStep3: "Sur la page des clés API, vous trouverez le bouton \"Create new secret key\". Cliquez dessus et suivez les instructions pour générer une nouvelle clé.",
        tutorialStep4: "OpenAI pourrait vous offrir un crédit initial pour vous permettre d'effectuer vos premiers tests. Une fois votre crédit épuisé, vous devrez ajouter des fonds à votre compte en visitant la",
        tutorialStep4Link: "section facturation",
        tutorialStep5: "C'est fait! Collez votre clé secrète ici et vous activerez l'Assistant IA. N'oubliez pas de toujours garder votre clé dans un endroit sûr",
        tutorialStep5Tool: "l'outil de surveillance",
        languageSelector: "Langue",
        openaiApiTutorial: "Tutoriel API OpenAI",
        openaiApiTutorialText: "Pour utiliser cet outil, vous aurez besoin d'une clé API OpenAI. Suivez le lien ci-dessous pour en obtenir une.",
        openaiApiTutorialSubtitle: "Comment obtenir et utiliser votre clé API",
        getApiKey: "Obtenez votre clé API",
        format: "Formater",
        promptTokens: "Tokens de l'invite:",
        completionTokens: "Tokens de réponse:",
        totalTokens: "Tokens totaux:",
        estimatedCost: "Coût estimé:"
    },
    es: {
        appTitle: "Comprobador de Prompt para OpenAI",
        apiToken: "Token API de OpenAI",
        configuration: "Configuración",
        model: "Modelo",
        maxTokens: "Tokens Máximos",
        temperature: "Temperatura",
        messages: "Mensajes",
        import: "Importar",
        export: "Exportar",
        addMessage: "Añadir Mensaje",
        role: "Rol",
        content: "Contenido",
        send: "Enviar",
        response: "Respuesta",
        copy: "Copiar",
        processing: "Procesando...",
        error: "Error",
        success: "Éxito",
        history: "Historial",
        editor: "Editor",
        clear: "Limpiar",
        tutorialTitle: "¿Cómo obtengo una clave de OpenAI?",
        tutorialStep1: "Inicia sesión en tu perfil de OpenAI o registra una nueva cuenta",
        tutorialStep1Link: "aquí",
        tutorialStep2: "Después de iniciar sesión, navega a la sección \"API Keys\"",
        tutorialStep2Link: "a través de este enlace",
        tutorialStep3: "En la página de claves API, encontrarás el botón \"Create new secret key\". Haz clic y sigue las instrucciones para generar una nueva clave.",
        tutorialStep4: "OpenAI podría ofrecerte un crédito inicial para darte la posibilidad de realizar tus primeras pruebas. Una vez que tu crédito se agote, necesitarás añadir más fondos a tu cuenta visitando la",
        tutorialStep4Link: "sección de facturación",
        tutorialStep5: "¡Listo! Pega tu clave secreta aquí y activarás el Asistente IA. Recuerda siempre mantener tu clave en un lugar seguro",
        tutorialStep5Tool: "la herramienta de monitoreo",
        languageSelector: "Idioma",
        openaiApiTutorial: "Tutorial de API OpenAI",
        openaiApiTutorialText: "Para usar esta herramienta, necesitarás una clave API de OpenAI. Sigue el enlace de abajo para obtener una.",
        openaiApiTutorialSubtitle: "Cómo obtener y usar tu clave API",
        getApiKey: "Obtén tu clave API",
        format: "Formatear",
        promptTokens: "Tokens de entrada:",
        completionTokens: "Tokens de respuesta:",
        totalTokens: "Tokens totales:",
        estimatedCost: "Coste estimado:"
    },
    de: {
        appTitle: "OpenAI Prompt-Tester",
        apiToken: "OpenAI API-Token",
        configuration: "Konfiguration",
        model: "Modell",
        maxTokens: "Max Tokens",
        temperature: "Temperatur",
        messages: "Nachrichten",
        import: "Importieren",
        export: "Exportieren",
        addMessage: "Nachricht hinzufügen",
        role: "Rolle",
        content: "Inhalt",
        send: "Senden",
        response: "Antwort",
        copy: "Kopieren",
        processing: "Verarbeitung...",
        error: "Fehler",
        success: "Erfolg",
        history: "Verlauf",
        editor: "Editor",
        clear: "Löschen",
        tutorialTitle: "Wie erhalte ich einen OpenAI-Schlüssel?",
        tutorialStep1: "Melden Sie sich bei Ihrem OpenAI-Profil an oder registrieren Sie ein neues Konto",
        tutorialStep1Link: "hier",
        tutorialStep2: "Nach der Anmeldung navigieren Sie zum Bereich \"API Keys\"",
        tutorialStep2Link: "über diesen Link",
        tutorialStep3: "Auf der Seite der API-Schlüssel finden Sie die Schaltfläche \"Create new secret key\". Klicken Sie darauf und folgen Sie den Anweisungen, um einen neuen Schlüssel zu generieren.",
        tutorialStep4: "OpenAI könnte Ihnen ein Startguthaben anbieten, um Ihnen die Möglichkeit zu geben, Ihre ersten Tests durchzuführen. Sobald Ihr Guthaben aufgebraucht ist, müssen Sie Ihrem Konto weitere Mittel hinzufügen, indem Sie den",
        tutorialStep4Link: "Abrechnungsbereich",
        tutorialStep5: "Wir sind fertig! Fügen Sie Ihren geheimen Schlüssel hier ein und Sie aktivieren den KI-Assistenten. Denken Sie daran, Ihren Schlüssel immer an einem sicheren Ort aufzubewahren",
        tutorialStep5Tool: "das Überwachungstool",
        languageSelector: "Sprache",
        openaiApiTutorial: "OpenAI API Tutorial",
        openaiApiTutorialText: "Um dieses Tool zu verwenden, benötigen Sie einen OpenAI API-Schlüssel. Folgen Sie dem Link unten, um einen zu erhalten.",
        openaiApiTutorialSubtitle: "Wie Sie Ihren API-Schlüssel erhalten und verwenden",
        getApiKey: "Holen Sie sich Ihren API-Schlüssel",
        format: "Formatieren",
        promptTokens: "Prompt-Tokens:",
        completionTokens: "Antwort-Tokens:",
        totalTokens: "Gesamttokens:",
        estimatedCost: "Geschätzte Kosten:"
    }
};

// Helper function to get browser language
export const getBrowserLanguage = (): Language => {
    const browserLang = navigator.language.split('-')[0];
    if (browserLang === 'it' || browserLang === 'en' || browserLang === 'fr' ||
        browserLang === 'es' || browserLang === 'de') {
        return browserLang as Language;
    }
    return "en"; // Default to English
};

// Create a context to store the current language
export const getTranslation = (lang: Language, key: TranslationKey): string => {
    return translations[lang][key];
};
