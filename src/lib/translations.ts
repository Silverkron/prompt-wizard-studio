export type Language = "it" | "en" | "fr" | "es" | "de";

export type TranslationKey =
    | "appTitle"
    | "editor"
    | "history"
    | "configuration"
    | "model"
    | "maxTokens"
    | "temperature"
    | "messages"
    | "export"
    | "import"
    | "addMessage"
    | "send"
    | "processing"
    | "response"
    | "copy"
    | "apiToken"
    | "error"
    | "success"
    | "clearHistory"
    | "systemMessage"
    | "userMessage"
    | "assistantMessage"
    | "date"
    | "noHistory"
    | "remove"
    | "confirmation"
    | "confirmClearHistory"
    | "cancel"
    | "confirm"
    | "tutorialTitle"
    | "openaiApiTutorial"
    | "openaiApiTutorialText"
    | "openaiApiTutorialSubtitle"
    | "getApiKey"
    | "format"
    | "tokenEstimation"
    | "promptTokensEstimated"
    | "completionTokensEstimated"
    | "totalTokensEstimated";

export const translations: Record<Language, Record<TranslationKey, string>> = {
    it: {
        appTitle: "Testatore di Prompt per OpenAI",
        editor: "Editor",
        history: "Cronologia",
        configuration: "Configurazione",
        model: "Modello",
        maxTokens: "Token massimi",
        temperature: "Temperatura",
        messages: "Messaggi",
        export: "Esporta",
        import: "Importa",
        addMessage: "Aggiungi messaggio",
        send: "Invia",
        processing: "Elaborazione...",
        response: "Risposta",
        copy: "Copia",
        apiToken: "Token API",
        error: "Errore",
        success: "Successo",
        clearHistory: "Cancella cronologia",
        systemMessage: "Messaggio di sistema",
        userMessage: "Messaggio utente",
        assistantMessage: "Messaggio assistente",
        date: "Data",
        noHistory: "Nessuna cronologia",
        remove: "Rimuovi",
        confirmation: "Conferma",
        confirmClearHistory: "Sei sicuro di voler cancellare tutta la cronologia?",
        cancel: "Annulla",
        confirm: "Conferma",
        tutorialTitle: "Come ottenere il tuo token API",
        openaiApiTutorial: "Tutorial API OpenAI",
        openaiApiTutorialText: "Per utilizzare questo strumento, avrai bisogno di una chiave API OpenAI. Segui il link qui sotto per ottenerla.",
        openaiApiTutorialSubtitle: "Come ottenere e utilizzare la tua chiave API",
        getApiKey: "Ottieni la tua chiave API",
        format: "Formatta",
        tokenEstimation: "Stima dei token",
        promptTokensEstimated: "Token prompt (stimato)",
        completionTokensEstimated: "Token completamento (stimato)",
        totalTokensEstimated: "Token totali (stimato)"
    },
    en: {
        appTitle: "OpenAI Prompt Tester",
        editor: "Editor",
        history: "History",
        configuration: "Configuration",
        model: "Model",
        maxTokens: "Max Tokens",
        temperature: "Temperature",
        messages: "Messages",
        export: "Export",
        import: "Import",
        addMessage: "Add Message",
        send: "Send",
        processing: "Processing...",
        response: "Response",
        copy: "Copy",
        apiToken: "API Token",
        error: "Error",
        success: "Success",
        clearHistory: "Clear History",
        systemMessage: "System Message",
        userMessage: "User Message",
        assistantMessage: "Assistant Message",
        date: "Date",
        noHistory: "No history",
        remove: "Remove",
        confirmation: "Confirmation",
        confirmClearHistory: "Are you sure you want to clear all history?",
        cancel: "Cancel",
        confirm: "Confirm",
        tutorialTitle: "How to get your API token",
        openaiApiTutorial: "OpenAI API Tutorial",
        openaiApiTutorialText: "To use this tool, you'll need an OpenAI API key. Follow the link below to get one.",
        openaiApiTutorialSubtitle: "How to get and use your API key",
        getApiKey: "Get your API key",
        format: "Format",
        tokenEstimation: "Token Estimation",
        promptTokensEstimated: "Prompt tokens (estimated)",
        completionTokensEstimated: "Completion tokens (estimated)",
        totalTokensEstimated: "Total tokens (estimated)"
    },
    fr: {
        appTitle: "Testeur de Prompt pour OpenAI",
        editor: "Éditeur",
        history: "Historique",
        configuration: "Configuration",
        model: "Modèle",
        maxTokens: "Tokens maximum",
        temperature: "Température",
        messages: "Messages",
        export: "Exporter",
        import: "Importer",
        addMessage: "Ajouter un message",
        send: "Envoyer",
        processing: "Traitement...",
        response: "Réponse",
        copy: "Copier",
        apiToken: "Jeton API",
        error: "Erreur",
        success: "Succès",
        clearHistory: "Effacer l'historique",
        systemMessage: "Message système",
        userMessage: "Message utilisateur",
        assistantMessage: "Message assistant",
        date: "Date",
        noHistory: "Pas d'historique",
        remove: "Supprimer",
        confirmation: "Confirmation",
        confirmClearHistory: "Êtes-vous sûr de vouloir effacer tout l'historique ?",
        cancel: "Annuler",
        confirm: "Confirmer",
        tutorialTitle: "Comment obtenir votre jeton API",
        openaiApiTutorial: "Tutoriel API OpenAI",
        openaiApiTutorialText: "Pour utiliser cet outil, vous aurez besoin d'une clé API OpenAI. Suivez le lien ci-dessous pour en obtenir une.",
        openaiApiTutorialSubtitle: "Comment obtenir et utiliser votre clé API",
        getApiKey: "Obtenez votre clé API",
        format: "Formater",
        tokenEstimation: "Estimation des tokens",
        promptTokensEstimated: "Tokens de prompt (estimé)",
        completionTokensEstimated: "Tokens de complétion (estimé)",
        totalTokensEstimated: "Tokens totaux (estimé)"
    },
    es: {
        appTitle: "Comprobador de Prompt para OpenAI",
        editor: "Editor",
        history: "Historial",
        configuration: "Configuración",
        model: "Modelo",
        maxTokens: "Tokens máximos",
        temperature: "Temperatura",
        messages: "Mensajes",
        export: "Exportar",
        import: "Importar",
        addMessage: "Añadir mensaje",
        send: "Enviar",
        processing: "Procesando...",
        response: "Respuesta",
        copy: "Copiar",
        apiToken: "Token API",
        error: "Error",
        success: "Éxito",
        clearHistory: "Borrar historial",
        systemMessage: "Mensaje del sistema",
        userMessage: "Mensaje del usuario",
        assistantMessage: "Mensaje del asistente",
        date: "Fecha",
        noHistory: "Sin historial",
        remove: "Eliminar",
        confirmation: "Confirmación",
        confirmClearHistory: "¿Estás seguro de que quieres borrar todo el historial?",
        cancel: "Cancelar",
        confirm: "Confirmar",
        tutorialTitle: "Cómo obtener su token API",
        openaiApiTutorial: "Tutorial de API OpenAI",
        openaiApiTutorialText: "Para usar esta herramienta, necesitarás una clave API de OpenAI. Sigue el enlace de abajo para obtener una.",
        openaiApiTutorialSubtitle: "Cómo obtener y usar tu clave API",
        getApiKey: "Obtén tu clave API",
        format: "Formatear",
        tokenEstimation: "Estimación de tokens",
        promptTokensEstimated: "Tokens de prompt (estimado)",
        completionTokensEstimated: "Tokens de finalización (estimado)",
        totalTokensEstimated: "Tokens totales (estimado)"
    },
    de: {
        appTitle: "OpenAI Prompt-Tester",
        editor: "Editor",
        history: "Verlauf",
        configuration: "Konfiguration",
        model: "Modell",
        maxTokens: "Maximale Tokens",
        temperature: "Temperatur",
        messages: "Nachrichten",
        export: "Exportieren",
        import: "Importieren",
        addMessage: "Nachricht hinzufügen",
        send: "Senden",
        processing: "Verarbeitung...",
        response: "Antwort",
        copy: "Kopieren",
        apiToken: "API-Token",
        error: "Fehler",
        success: "Erfolg",
        clearHistory: "Verlauf löschen",
        systemMessage: "System-Nachricht",
        userMessage: "Benutzer-Nachricht",
        assistantMessage: "Assistenten-Nachricht",
        date: "Datum",
        noHistory: "Kein Verlauf",
        remove: "Entfernen",
        confirmation: "Bestätigung",
        confirmClearHistory: "Sind Sie sicher, dass Sie den gesamten Verlauf löschen möchten?",
        cancel: "Abbrechen",
        confirm: "Bestätigen",
        tutorialTitle: "Wie Sie Ihren API-Token erhalten",
        openaiApiTutorial: "OpenAI API Tutorial",
        openaiApiTutorialText: "Um dieses Tool zu verwenden, benötigen Sie einen OpenAI API-Schlüssel. Folgen Sie dem Link unten, um einen zu erhalten.",
        openaiApiTutorialSubtitle: "Wie Sie Ihren API-Schlüssel erhalten und verwenden",
        getApiKey: "Holen Sie sich Ihren API-Schlüssel",
        format: "Formatieren",
        tokenEstimation: "Token-Schätzung",
        promptTokensEstimated: "Prompt-Tokens (geschätzt)",
        completionTokensEstimated: "Completion-Tokens (geschätzt)",
        totalTokensEstimated: "Gesamt-Tokens (geschätzt)"
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
