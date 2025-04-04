
import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import { getTranslation } from "@/lib/translations";

export const OpenAITutorial: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { language } = useLanguage();

  const toggleTutorial = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Card className="mb-6">
      <CardHeader className="pb-3 cursor-pointer" onClick={toggleTutorial}>
        <CardTitle className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span>{getTranslation(language, "tutorialTitle")}</span>
            <Badge variant="outline" className="bg-green-50 text-green-600 hover:bg-green-100 border-green-200">
              Tutorial
            </Badge>
          </div>
          {isOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </CardTitle>
      </CardHeader>

      {isOpen && (
        <CardContent className="pt-0">
          <ol className="list-decimal pl-6 space-y-4">
            <li>
              <span className="font-medium">{getTranslation(language, "tutorialStep1")}</span>{" "}
              <a 
                href="https://platform.openai.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {getTranslation(language, "tutorialStep1Link")}
              </a>.
            </li>
            <li>
              <span className="font-medium">{getTranslation(language, "tutorialStep2")}</span>{" "}
              <a 
                href="https://platform.openai.com/api-keys" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {getTranslation(language, "tutorialStep2Link")}
              </a>.
            </li>
            <li>
              <span className="font-medium">{getTranslation(language, "tutorialStep3")}</span>
            </li>
            <li>
              <span className="font-medium">{getTranslation(language, "tutorialStep4")}</span>{" "}
              <a 
                href="https://platform.openai.com/account/billing/overview" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {getTranslation(language, "tutorialStep4Link")}
              </a>{" "}
              {getTranslation(language, "tutorialStep5")}{" "}
              <a 
                href="https://platform.openai.com/usage" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {getTranslation(language, "tutorialStep5Tool")}
              </a>.
            </li>
          </ol>
        </CardContent>
      )}
    </Card>
  );
};

export default OpenAITutorial;
