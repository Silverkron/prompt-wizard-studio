
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
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
            {getTranslation(language, "openaiApiTutorial")}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p>
            {getTranslation(language, "openaiApiTutorialText")}
          </p>
        </CardContent>
        <CardFooter>
          <Button variant="outline" size="sm" className="w-full" onClick={() => window.open("https://platform.openai.com/api-keys", "_blank")}>
            <ExternalLink className="h-4 w-4 mr-2" />
            {getTranslation(language, "getApiKey")}
          </Button>
        </CardFooter>
      </Card>
    );
  }
  
  return (
    <Card className="mb-6">
      <CardHeader className="pb-2">
        <CardTitle>
          {getTranslation(language, "openaiApiTutorial")}
        </CardTitle>
        <CardDescription>
          {getTranslation(language, "openaiApiTutorialSubtitle")}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p>
          {getTranslation(language, "openaiApiTutorialText")}
        </p>
      </CardContent>
      <CardFooter>
        <Button variant="outline" onClick={() => window.open("https://platform.openai.com/api-keys", "_blank")}>
          <ExternalLink className="h-4 w-4 mr-2" />
          {getTranslation(language, "getApiKey")}
        </Button>
      </CardFooter>
    </Card>
  );
};
