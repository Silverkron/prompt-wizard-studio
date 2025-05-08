
import React, { useState, useEffect } from "react";
import {Card} from "@/components/ui/card";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
import {Message, MessageRole, Content, ImageMessageContent, MessageContent} from "@/types/openai";
import {Trash, Image as ImageIcon, FileText} from "lucide-react";
import {Switch} from "@/components/ui/switch";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {useIsMobile} from "@/hooks/use-mobile";

interface MessageRowProps {
    message: Message;
    onChange: (message: Message) => void;
    onRemove: () => void;
    showRemoveButton: boolean;
}

export const MessageRow: React.FC<MessageRowProps> = ({
    message,
    onChange,
    onRemove,
    showRemoveButton
}) => {
    const [includeImage, setIncludeImage] = useState<boolean>(false);
    const [imageUrl, setImageUrl] = useState<string>("");
    const [textContent, setTextContent] = useState<string>("");
    const isMobile = useIsMobile();

    // Initialize state based on message content
    useEffect(() => {
        if (typeof message.content === "string") {
            setTextContent(message.content);
            setIncludeImage(false);
            setImageUrl("");
        } else if (Array.isArray(message.content)) {
            // Find text content
            const textItem = message.content.find(item => 
                typeof item === "object" && "type" in item && item.type === "text"
            ) as MessageContent | undefined;
            
            // Find image content
            const imageItem = message.content.find(item => 
                typeof item === "object" && "type" in item && item.type === "image_url"
            ) as ImageMessageContent | undefined;
            
            setTextContent(textItem?.text || "");
            setIncludeImage(!!imageItem);
            setImageUrl(imageItem?.image_url?.url || "");
        }
    }, [message.content]);

    const handleRoleChange = (role: MessageRole) => {
        // If changing from user to another role, remove any image content
        if (message.role === "user" && role !== "user") {
            setIncludeImage(false);
            setImageUrl("");
            onChange({...message, role, content: textContent});
        } else {
            onChange({...message, role});
        }
    };

    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTextContent(e.target.value);
        updateMessageContent(e.target.value, imageUrl, includeImage && message.role === "user");
    };

    const handleImageToggle = (checked: boolean) => {
        setIncludeImage(checked);
        updateMessageContent(textContent, imageUrl, checked && message.role === "user");
    };

    const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setImageUrl(e.target.value);
        updateMessageContent(textContent, e.target.value, includeImage && message.role === "user");
    };

    function updateMessageContent(text: string, imgUrl: string, includeImg: boolean) {
        let newContent: Content | Content[];
        
        if (includeImg && imgUrl && message.role === "user") {
            const contentArray: Content[] = [
                { type: "text", text },
                { type: "image_url", image_url: { url: imgUrl } }
            ];
            newContent = contentArray;
        } else {
            newContent = text;
        }
        
        onChange({...message, content: newContent});
    }

    const handleFormatContent = () => {
        // Format the content by replacing escaped characters with actual characters
        const formattedContent = textContent
            .replace(/\\n/g, '\n')
            .replace(/\\t/g, '\t')
            .replace(/\\r/g, '\r')
            .replace(/\\"/g, '"')
            .replace(/\\'/g, "'")
            .replace(/\\\\/g, '\\');
            
        setTextContent(formattedContent);
        updateMessageContent(formattedContent, imageUrl, includeImage && message.role === "user");
    };

    return (
        <Card className="p-4">
            <div className="space-y-4">
                <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} gap-4 items-start`}>
                    <div className="flex flex-col gap-2">
                        <Select value={message.role} onValueChange={handleRoleChange}>
                            <SelectTrigger className={isMobile ? "w-full" : "w-32"}>
                                <SelectValue placeholder="Select role"/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="system">system</SelectItem>
                                <SelectItem value="user">user</SelectItem>
                                <SelectItem value="assistant">assistant</SelectItem>
                            </SelectContent>
                        </Select>
                        
                        <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={handleFormatContent}
                            className="flex items-center gap-1"
                        >
                            <FileText className="h-4 w-4" />
                            Format
                        </Button>
                    </div>

                    <div className="flex-1 w-full">
                        <Textarea
                            value={textContent}
                            onChange={handleContentChange}
                            placeholder="Inserisci il contenuto del messaggio..."
                            className="min-h-[100px] w-full"
                        />
                    </div>

                    {showRemoveButton && (
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={onRemove}
                            className={`text-red-500 hover:text-red-700 ${isMobile ? 'self-end' : ''}`}
                        >
                            <Trash className="h-5 w-5"/>
                        </Button>
                    )}
                </div>
                
                {message.role === "user" && (
                    <div className={`flex ${isMobile ? 'flex-col' : 'items-center'} gap-4`}>
                        <div className="flex items-center space-x-2">
                            <Switch 
                                id={`add-image-${message.role}`} 
                                checked={includeImage}
                                onCheckedChange={handleImageToggle}
                            />
                            <Label htmlFor={`add-image-${message.role}`} className="flex items-center">
                                <ImageIcon className="h-4 w-4 mr-2" />
                                Add image URL
                            </Label>
                        </div>
                        
                        {includeImage && (
                            <div className="flex-1 w-full">
                                <Input
                                    value={imageUrl}
                                    onChange={handleImageUrlChange}
                                    placeholder="https://example.com/image.jpg"
                                    className="w-full"
                                />
                            </div>
                        )}
                    </div>
                )}
            </div>
        </Card>
    );
};
