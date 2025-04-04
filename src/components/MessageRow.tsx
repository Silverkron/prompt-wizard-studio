
import React from "react";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Message, MessageRole } from "@/types/openai";
import { Trash } from "lucide-react";

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
  const handleRoleChange = (role: MessageRole) => {
    onChange({ ...message, role });
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange({ ...message, content: e.target.value });
  };

  // Convert complex content structure to string for editing
  const getEditableContent = (): string => {
    if (typeof message.content === "string") {
      return message.content;
    }

    if (Array.isArray(message.content)) {
      return message.content
        .map(item => {
          if (typeof item === "string") {
            return item;
          }
          if (item.type === "text") {
            return item.text;
          }
          if (item.type === "image_url") {
            return `[Image: ${item.image_url.url}]`;
          }
          return JSON.stringify(item);
        })
        .join("\n");
    }

    if (typeof message.content === "object") {
      if ("text" in message.content) {
        return message.content.text;
      }
      return JSON.stringify(message.content);
    }

    return "";
  };

  return (
    <Card className="p-4">
      <div className="flex gap-4 items-start">
        <Select value={message.role} onValueChange={handleRoleChange}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Select role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="system">system</SelectItem>
            <SelectItem value="user">user</SelectItem>
          </SelectContent>
        </Select>
        
        <Textarea
          value={getEditableContent()}
          onChange={handleContentChange}
          placeholder="Inserisci il contenuto del messaggio..."
          className="flex-1 min-h-[100px]"
        />
        
        {showRemoveButton && (
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onRemove}
            className="text-red-500 hover:text-red-700"
          >
            <Trash className="h-5 w-5" />
          </Button>
        )}
      </div>
    </Card>
  );
};
