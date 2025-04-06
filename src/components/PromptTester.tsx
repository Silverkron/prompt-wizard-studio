
import React, {useState, useEffect} from "react";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Slider} from "@/components/ui/slider";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {useToast} from "@/components/ui/use-toast";
import {HistoryItem, Message, PromptConfig} from "@/types/openai";
import {sendPromptToOpenAI} from "@/services/openai";
import {
    getOpenAIToken, saveOpenAIToken,
    getModel, saveModel,
    getMaxTokens, saveMaxTokens,
    getTemperature, saveTemperature,
    addToHistory, getPromptHistory,
    saveCurrentMessages, getCurrentMessages
} from "@/lib/storage";
import {MessageRow} from "@/components/MessageRow";
import {HistoryList} from "@/components/HistoryList";
import {Copy, Plus, Send, Trash, Settings, ExternalLink} from "lucide-react";
import {OpenAITutorial} from "@/components/OpenAITutorial";
import LanguageSelector from "@/components/LanguageSelector";
import {useLanguage} from "@/contexts/LanguageContext";
import {getTranslation} from "@/lib/translations";
import {useIsMobile} from "@/hooks/use-mobile";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

export const PromptTester: React.FC = () => {
    const {toast} = useToast();
    const {language} = useLanguage();
    const [apiToken, setApiToken] = useState("");
    const [model, setModel] = useState("gpt-4o-mini");
    const [maxTokens, setMaxTokens] = useState(800);
    const [temperature, setTemperature] = useState(0.7);
    const [messages, setMessages] = useState<Message[]>([
        {role: "user", content: ""}
    ]);
    const [response, setResponse] = useState<string>("");
    const [loading, setLoading] = useState(false);
    const [history, setHistory] = useState<HistoryItem[]>([]);
    const [activeTab, setActiveTab] = useState("editor");
    const isMobile = useIsMobile();

    // Load saved values from localStorage on component mount
    useEffect(() => {
        setApiToken(getOpenAIToken());
        setModel(getModel());
        setMaxTokens(getMaxTokens());
        setTemperature(getTemperature());
        setHistory(getPromptHistory());

        // Load messages from session storage
        setMessages(getCurrentMessages());
    }, []);

    // Save values to localStorage when they change
    useEffect(() => {
        saveOpenAIToken(apiToken);
    }, [apiToken]);

    useEffect(() => {
        saveModel(model);
    }, [model]);

    useEffect(() => {
        saveMaxTokens(maxTokens);
    }, [maxTokens]);

    useEffect(() => {
        saveTemperature(temperature);
    }, [temperature]);

    // Save messages to session storage when they change
    useEffect(() => {
        saveCurrentMessages(messages);
    }, [messages]);

    const addMessage = () => {
        setMessages([...messages, {role: "user", content: ""}]);
    };

    const updateMessage = (index: number, updatedMessage: Message) => {
        const newMessages = [...messages];
        newMessages[index] = updatedMessage;
        setMessages(newMessages);
    };

    const removeMessage = (index: number) => {
        if (messages.length > 1) {
            const newMessages = messages.filter((_, i) => i !== index);
            setMessages(newMessages);
        } else {
            toast({
                title: getTranslation(language, "error"),
                description: "È necessario almeno un messaggio",
                variant: "destructive",
            });
        }
    };

    const handleSubmit = async () => {
        if (!apiToken) {
            toast({
                title: getTranslation(language, "error"),
                description: "È necessario inserire un token API OpenAI",
                variant: "destructive",
            });
            return;
        }

        // Validate messages
        const invalidMessages = messages.some(message => !message.content);
        if (invalidMessages) {
            toast({
                title: getTranslation(language, "error"),
                description: "Tutti i messaggi devono avere un contenuto",
                variant: "destructive",
            });
            return;
        }

        setLoading(true);
        setResponse("");

        const promptConfig: PromptConfig = {
            model,
            engine: "openai",
            messages,
            max_tokens: maxTokens,
            temperature,
        };

        try {
            const result = await sendPromptToOpenAI(promptConfig);

            const responseText = result.choices[0]?.message?.content || "Nessuna risposta";
            setResponse(responseText);

            // Add to history
            const historyItem: HistoryItem = {
                id: Date.now().toString(),
                timestamp: Date.now(),
                promptConfig,
                response: result,
            };

            addToHistory(historyItem);
            setHistory([historyItem, ...history]);

            toast({
                title: getTranslation(language, "success"),
                description: "Prompt inviato con successo",
            });
        } catch (error) {
            console.error("Error sending prompt:", error);

            const errorMessage = error instanceof Error ? error.message : "Errore sconosciuto";
            setResponse(`Errore: ${errorMessage}`);

            // Add error to history too
            const historyItem: HistoryItem = {
                id: Date.now().toString(),
                timestamp: Date.now(),
                promptConfig,
                error: errorMessage,
            };

            addToHistory(historyItem);
            setHistory([historyItem, ...history]);

            toast({
                title: getTranslation(language, "error"),
                description: errorMessage,
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    const exportConfig = () => {
        const promptConfig: PromptConfig = {
            model,
            engine: "openai",
            messages,
            max_tokens: maxTokens,
            temperature,
        };

        const jsonString = JSON.stringify(promptConfig, null, 2);

        // Copy to clipboard
        navigator.clipboard.writeText(jsonString)
            .then(() => {
                toast({
                    title: getTranslation(language, "success"),
                    description: "La configurazione è stata copiata negli appunti",
                });
            })
            .catch(err => {
                console.error("Failed to copy:", err);
                toast({
                    title: getTranslation(language, "error"),
                    description: "Impossibile copiare negli appunti",
                    variant: "destructive",
                });
            });
    };

    const importConfig = () => {
        try {
            const input = prompt("Incolla la configurazione JSON qui:");
            if (!input) return;

            const config: PromptConfig = JSON.parse(input);

            // Validate the imported config
            if (!config.model || !Array.isArray(config.messages)) {
                throw new Error("Formato di configurazione non valido");
            }

            setModel(config.model);
            setMaxTokens(config.max_tokens || 800);
            setTemperature(config.temperature || 0.7);
            setMessages(config.messages);

            toast({
                title: getTranslation(language, "success"),
                description: "La configurazione è stata importata correttamente",
            });
        } catch (error) {
            console.error("Error importing config:", error);
            toast({
                title: getTranslation(language, "error"),
                description: "Impossibile analizzare la configurazione JSON",
                variant: "destructive",
            });
        }
    };

    const loadFromHistory = (item: HistoryItem) => {
        setModel(item.promptConfig.model);
        setMaxTokens(item.promptConfig.max_tokens);
        setTemperature(item.promptConfig.temperature);
        setMessages(item.promptConfig.messages);
        setActiveTab("editor");

        if (item.response) {
            setResponse(item.response.choices[0]?.message?.content || "");
        } else if (item.error) {
            setResponse(`Errore: ${item.error}`);
        }
    };

    // Mobile Configuration Dialog component
    const ConfigurationDialog = () => (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="mb-2">
                    <Settings className="h-4 w-4 mr-2" />
                    {getTranslation(language, "configuration")}
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{getTranslation(language, "configuration")}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="mobile-api-token">{getTranslation(language, "apiToken")}</Label>
                        <Input
                            id="mobile-api-token"
                            type="password"
                            value={apiToken}
                            onChange={(e) => setApiToken(e.target.value)}
                            placeholder="sk-..."
                        />
                    </div>
                    
                    <div className="space-y-2">
                        <Label htmlFor="mobile-model">{getTranslation(language, "model")}</Label>
                        <Select value={model} onValueChange={setModel}>
                            <SelectTrigger id="mobile-model">
                                <SelectValue placeholder={getTranslation(language, "model")}/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="gpt-4o-mini">gpt-4o-mini</SelectItem>
                                <SelectItem value="gpt-4o">gpt-4o</SelectItem>
                                <SelectItem value="gpt-4.5-preview">gpt-4.5-preview</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="mobile-max-tokens">
                            {getTranslation(language, "maxTokens")}: {maxTokens}
                        </Label>
                        <Slider
                            id="mobile-max-tokens"
                            min={1}
                            max={2000}
                            step={1}
                            value={[maxTokens]}
                            onValueChange={(value) => setMaxTokens(value[0])}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="mobile-temperature">
                            {getTranslation(language, "temperature")}: {temperature.toFixed(1)}
                        </Label>
                        <Slider
                            id="mobile-temperature"
                            min={0}
                            max={2}
                            step={0.1}
                            value={[temperature]}
                            onValueChange={(value) => setTemperature(value[0])}
                        />
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );

    return (
        <div className="container mx-auto py-6 max-w-6xl px-4">
            <Card className="mb-6">
                <CardHeader>
                    <CardTitle className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <span>{getTranslation(language, "appTitle")}</span>
                        {!isMobile ? (
                            <div className="flex items-center gap-2">
                                <Label htmlFor="openai-token"
                                    className="mr-2">{getTranslation(language, "apiToken")}</Label>
                                <Input
                                    id="openai-token"
                                    type="password"
                                    value={apiToken}
                                    onChange={(e) => setApiToken(e.target.value)}
                                    placeholder="sk-..."
                                    className="w-64"
                                />
                                <LanguageSelector/>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                <LanguageSelector />
                            </div>
                        )}
                    </CardTitle>
                </CardHeader>
            </Card>

            {!isMobile && <OpenAITutorial />}

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="mb-4 w-full">
                    <TabsTrigger value="editor" className="flex-1">{getTranslation(language, "editor")}</TabsTrigger>
                    <TabsTrigger value="history" className="flex-1">{getTranslation(language, "history")}</TabsTrigger>
                </TabsList>

                <TabsContent value="editor" className="space-y-6">
                    {isMobile && <ConfigurationDialog />}

                    {!isMobile && (
                        <Card>
                            <CardHeader>
                                <CardTitle>{getTranslation(language, "configuration")}</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="model">{getTranslation(language, "model")}</Label>
                                        <Select value={model} onValueChange={setModel}>
                                            <SelectTrigger id="model">
                                                <SelectValue placeholder={getTranslation(language, "model")}/>
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="gpt-4o-mini">gpt-4o-mini</SelectItem>
                                                <SelectItem value="gpt-4o">gpt-4o</SelectItem>
                                                <SelectItem value="gpt-4.5-preview">gpt-4.5-preview</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div>
                                        <Label
                                            htmlFor="max-tokens">{getTranslation(language, "maxTokens")}: {maxTokens}</Label>
                                        <Slider
                                            className="mt-6"
                                            id="max-tokens"
                                            min={1}
                                            max={2000}
                                            step={1}
                                            value={[maxTokens]}
                                            onValueChange={(value) => setMaxTokens(value[0])}
                                        />
                                    </div>

                                    <div>
                                        <Label
                                            htmlFor="temperature">{getTranslation(language, "temperature")}: {temperature.toFixed(1)}</Label>
                                        <Slider
                                            className="mt-6"
                                            id="temperature"
                                            min={0}
                                            max={2}
                                            step={0.1}
                                            value={[temperature]}
                                            onValueChange={(value) => setTemperature(value[0])}
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                                <span>{getTranslation(language, "messages")}</span>
                                <div className="flex flex-wrap gap-2">
                                    <Button variant="outline" size="sm" onClick={importConfig}>
                                        {getTranslation(language, "import")}
                                    </Button>
                                    <Button variant="outline" size="sm" onClick={exportConfig}>
                                        <Copy className="h-4 w-4 mr-2"/>
                                        {getTranslation(language, "export")}
                                    </Button>
                                </div>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {messages.map((message, index) => (
                                <MessageRow
                                    key={index}
                                    message={message}
                                    onChange={(updatedMessage) => updateMessage(index, updatedMessage)}
                                    onRemove={() => removeMessage(index)}
                                    showRemoveButton={messages.length > 1}
                                />
                            ))}

                            <Button variant="outline" onClick={addMessage} className="w-full">
                                <Plus className="h-4 w-4 mr-2"/>
                                {getTranslation(language, "addMessage")}
                            </Button>
                        </CardContent>
                        <CardFooter>
                            <Button
                                onClick={handleSubmit}
                                disabled={loading}
                                className="w-full"
                            >
                                {loading ? (
                                    <div className="flex items-center">
                                        <div
                                            className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                        {getTranslation(language, "processing")}
                                    </div>
                                ) : (
                                    <>
                                        <Send className="h-4 w-4 mr-2"/>
                                        {getTranslation(language, "send")}
                                    </>
                                )}
                            </Button>
                        </CardFooter>
                    </Card>

                    {response && (
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                                    <span>{getTranslation(language, "response")}</span>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => navigator.clipboard.writeText(response)}
                                    >
                                        <Copy className="h-4 w-4 mr-2"/>
                                        {getTranslation(language, "copy")}
                                    </Button>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="bg-gray-50 p-4 rounded-md whitespace-pre-wrap font-mono text-sm overflow-x-auto">
                                    {response}
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </TabsContent>

                <TabsContent value="history">
                    <HistoryList
                        history={history}
                        onSelect={loadFromHistory}
                        onClear={() => {
                            setHistory([]);
                            localStorage.removeItem("openai-history");
                        }}
                    />
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default PromptTester;
