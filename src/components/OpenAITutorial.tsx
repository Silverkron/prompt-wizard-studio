
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { getTranslation } from "@/lib/translations";
import { useIsMobile } from "@/hooks/use-mobile";

export const OpenAITutorial: React.FC = () => {
  const { language } = useLanguage();
  const isMobile = useIsMobile();
  
  if (isMobile) {
    return (
      <Card className="mb-6">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">
            {getTranslation(language, "tutorialTitle")}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <ol className="space-y-2 list-decimal pl-4">
            <li>
              {getTranslation(language, "tutorialStep1")}{" "}
              <a 
                href="https://platform.openai.com/signup" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {getTranslation(language, "tutorialStep1Link")}
              </a>.
            </li>
            <li>
              {getTranslation(language, "tutorialStep2")}{" "}
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
              {getTranslation(language, "tutorialStep3")}
            </li>
            <li>
              {getTranslation(language, "tutorialStep4")}{" "}
              <a 
                href="https://platform.openai.com/account/billing/overview" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {getTranslation(language, "tutorialStep4Link")}
              </a>.
            </li>
          </ol>
          <p className="mt-3">
            {getTranslation(language, "tutorialStep5")}
          </p>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="mb-6">
      <CardHeader className="pb-2">
        <CardTitle>
          {getTranslation(language, "tutorialTitle")}
        </CardTitle>
        <CardDescription>
          {getTranslation(language, "openaiApiTutorialSubtitle")}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <ol className="space-y-3 list-decimal pl-5">
          <li>
            {getTranslation(language, "tutorialStep1")}{" "}
            <a 
              href="https://platform.openai.com/signup" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              {getTranslation(language, "tutorialStep1Link")}
            </a>.
          </li>
          <li>
            {getTranslation(language, "tutorialStep2")}{" "}
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
            {getTranslation(language, "tutorialStep3")}
          </li>
          <li>
            {getTranslation(language, "tutorialStep4")}{" "}
            <a 
              href="https://platform.openai.com/account/billing/overview" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              {getTranslation(language, "tutorialStep4Link")}
            </a>.
          </li>
        </ol>
        <p className="mt-3">
          {getTranslation(language, "tutorialStep5")}
        </p>
      </CardContent>
    </Card>
  );
};
