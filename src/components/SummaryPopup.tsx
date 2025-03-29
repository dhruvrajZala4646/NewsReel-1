
import React, { useState } from 'react';
import { ChevronDown, CheckCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";
import ListenButton from './ListenButton';

interface SummaryPopupProps {
  title: string;
  summary: string;
  onExpandArticle: () => void;
  onListen: () => void;
}

const SummaryPopup: React.FC<SummaryPopupProps> = ({ title, summary, onExpandArticle, onListen }) => {
  const [keyTakeaway, setKeyTakeaway] = useState("The most important development in this story is the impact on global policy.");
  
  return (
    <HoverCard openDelay={500} closeDelay={200}>
      <HoverCardTrigger asChild>
        <div className="absolute bottom-24 left-0 right-0 z-10 flex justify-center">
          <Button 
            variant="ghost" 
            className="rounded-full px-4 py-2 bg-black/30 backdrop-blur-sm text-white flex gap-2 items-center hover:bg-black/40"
          >
            <span className="text-sm">Smart Summary</span>
            <ChevronDown className="h-4 w-4" />
          </Button>
        </div>
      </HoverCardTrigger>
      <HoverCardContent 
        className="w-[90%] max-w-md p-4 backdrop-blur-md bg-background/90 border-none shadow-lg rounded-lg animate-fade-in"
        align="center"
        side="bottom"
        sideOffset={5}
      >
        <div className="space-y-3">
          <div className="flex items-center gap-2 mb-1">
            <CheckCircle className="h-4 w-4 text-news-600" />
            <h4 className="text-sm font-semibold text-foreground">Key Takeaway</h4>
          </div>
          <p className="text-sm text-muted-foreground">{keyTakeaway}</p>
          <div className="pt-2 border-t">
            <h4 className="text-sm font-medium mb-1">Why This Matters:</h4>
            <p className="text-sm text-muted-foreground">{summary}</p>
          </div>
          <div className="pt-2 flex gap-2">
            <Button 
              onClick={onExpandArticle} 
              variant="outline" 
              className="flex-1"
            >
              Expand Article
            </Button>
            <ListenButton 
              onClick={onListen}
              variant="secondary"
              className="flex-1"
            />
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default SummaryPopup;
