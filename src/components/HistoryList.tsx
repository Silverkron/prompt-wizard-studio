
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HistoryItem } from "@/types/openai";
import { format } from "date-fns";
import { Clock, Copy, Trash } from "lucide-react";

interface HistoryListProps {
  history: HistoryItem[];
  onSelect: (item: HistoryItem) => void;
  onClear: () => void;
}

export const HistoryList: React.FC<HistoryListProps> = ({
  history,
  onSelect,
  onClear,
}) => {
  if (history.length === 0) {
    return (
      <Card>
        <CardContent className="py-10 text-center text-gray-500">
          Nessuna cronologia disponibile
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <div className="flex justify-end mb-4">
        <Button variant="destructive" onClick={onClear}>
          <Trash className="h-4 w-4 mr-2" />
          Cancella Cronologia
        </Button>
      </div>
      
      <div className="space-y-4">
        {history.map((item) => (
          <Card key={item.id} className="cursor-pointer hover:bg-gray-50 transition-colors">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center justify-between text-base font-medium">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-gray-500" />
                  <span>
                    {format(new Date(item.timestamp), "dd/MM/yyyy HH:mm:ss")}
                  </span>
                </div>
                <div>
                  <Button variant="ghost" size="sm" onClick={() => onSelect(item)}>
                    <Copy className="h-4 w-4 mr-2" />
                    Carica
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div className="space-y-1">
                  <div className="font-semibold">Modello</div>
                  <div>{item.promptConfig.model}</div>
                </div>
                <div className="space-y-1">
                  <div className="font-semibold">Max Tokens</div>
                  <div>{item.promptConfig.max_tokens}</div>
                </div>
                <div className="space-y-1">
                  <div className="font-semibold">Temperatura</div>
                  <div>{item.promptConfig.temperature}</div>
                </div>
              </div>
              
              <div className="mt-3 space-y-1">
                <div className="font-semibold">Messaggi</div>
                <div className="bg-gray-100 p-2 rounded-md text-xs overflow-hidden max-h-10">
                  {item.promptConfig.messages.map((msg, idx) => (
                    <div key={idx} className="truncate">
                      <span className="font-semibold">{msg.role}: </span>
                      <span>
                        {typeof msg.content === "string" 
                          ? msg.content.substring(0, 50) + (msg.content.length > 50 ? "..." : "")
                          : "Complex content..."}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              
              {item.error ? (
                <div className="mt-3 space-y-1">
                  <div className="font-semibold text-red-500">Errore</div>
                  <div className="bg-red-50 p-2 rounded-md text-xs text-red-500">
                    {item.error}
                  </div>
                </div>
              ) : item.response ? (
                <div className="mt-3 space-y-1">
                  <div className="font-semibold">Risposta</div>
                  <div className="bg-gray-100 p-2 rounded-md text-xs overflow-hidden max-h-10">
                    {item.response.choices[0]?.message.content.substring(0, 100)}
                    {item.response.choices[0]?.message.content.length > 100 ? "..." : ""}
                  </div>
                </div>
              ) : null}
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
};
