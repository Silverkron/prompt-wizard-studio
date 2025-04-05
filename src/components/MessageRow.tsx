import React, { useState } from "react";
import {Card} from "@/components/ui/card";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
import {Message, MessageRole, Content, ImageMessageContent, MessageContent} from "@/types/openai";
import {Trash, Image as ImageIcon} from "lucide-react";
import {Switch} from "@/components/ui/switch";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";

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
    const [includeImage, setIncludeImage] = useState<boolean>(
        Array.isArray(message.content) && 
        message.content.some(item => typeof item === 'object' && 'type' in item && item.type === 'image_url')
    );
    const [imageUrl, setImageUrl] = useState<string>(
        Array.isArray(message.content) 
            ? (message.content.find(item => 
                typeof item === 'object' && 'type' in item && item.type === 'image_url'
              ) as ImageMessageContent)?.image_url?.url || '' 
            : ''
    );
    const [textContent, setTextContent] = useState<string>(getEditableContent());

    const handleRoleChange = (role: MessageRole) => {
        onChange({...message, role});
    };

    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTextContent(e.target.value);
        updateMessageContent(e.target.value, imageUrl);
    };

    const handleImageToggle = (checked: boolean) => {
        setIncludeImage(checked);
        updateMessageContent(textContent, checked ? imageUrl : "");
    };

    const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setImageUrl(e.target.value);
        updateMessageContent(textContent, e.target.value);
    };

    function updateMessageContent(text: string, imgUrl: string) {
        let newContent: Content | Content[];
        
        if (includeImage && imgUrl) {
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

    function getEditableContent(): string {
        if (typeof message.content === "string") {
            return message.content;
        }

        if (Array.isArray(message.content)) {
            return message.content
                .filter(item => typeof item === 'object' && 'type' in item && item.type === 'text')
                .map(item => {
                    if (typeof item === "string") {
                        return item;
                    }
                    if (item.type === "text") {
                        return item.text;
                    }
                    return "";
                })
                .join("\n");
        }

        if (typeof message.content === "object") {
            if ("text" in message.content) {
                return message.content.text;
            }
            return "";
        }

        return "";
    };

    return (
        <Card className="p-4">
            <div className="space-y-4">
                <div className="flex gap-4 items-start">
                    <Select value={message.role} onValueChange={handleRoleChange}>
                        <SelectTrigger className="w-32">
                            <SelectValue placeholder="Select role"/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="system">system</SelectItem>
                            <SelectItem value="user">user</SelectItem>
                            <SelectItem value="assistant">assistant</SelectItem>
                        </SelectContent>
                    </Select>

                    <div className="flex-1">
                        <Textarea
                            value={textContent}
                            onChange={handleContentChange}
                            placeholder="Inserisci il contenuto del messaggio..."
                            className="min-h-[100px]"
                        />
                    </div>

                    {showRemoveButton && (
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={onRemove}
                            className="text-red-500 hover:text-red-700"
                        >
                            <Trash className="h-5 w-5"/>
                        </Button>
                    )}
                </div>
                
                <div className="flex items-center gap-4">
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
                        <div className="flex-1">
                            <Input
                                value={imageUrl}
                                onChange={handleImageUrlChange}
                                placeholder="https://example.com/image.jpg"
                                className="w-full"
                            />
                        </div>
                    )}
                </div>
            </div>
        </Card>
    );
};
