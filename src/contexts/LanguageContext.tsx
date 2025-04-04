import React, {createContext, useContext, useState, useEffect} from "react";
import {Language, getBrowserLanguage} from "@/lib/translations";

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType>({
    language: "en",
    setLanguage: () => {
    },
});

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [language, setLanguage] = useState<Language>("en");

    // Set the default language based on browser settings on page load
    useEffect(() => {
        const savedLanguage = localStorage.getItem("app-language");
        if (savedLanguage && ['it', 'en', 'fr', 'es', 'de'].includes(savedLanguage)) {
            setLanguage(savedLanguage as Language);
        } else {
            const browserLang = getBrowserLanguage();
            setLanguage(browserLang);
        }
    }, []);

    // Save language preference when it changes
    useEffect(() => {
        localStorage.setItem("app-language", language);
    }, [language]);

    return (
        <LanguageContext.Provider value={{language, setLanguage}}>
            {children}
        </LanguageContext.Provider>
    );
};
