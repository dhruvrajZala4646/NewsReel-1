
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type SummaryTone = 'casual' | 'formal' | 'fun';

interface ArticleSummaryProps {
  title: string;
}

const ArticleSummary: React.FC<ArticleSummaryProps> = ({ title }) => {
  const [activeTone, setActiveTone] = useState<SummaryTone>('casual');

  // Static summaries for different tones (in a real app, these would be fetched or generated)
  const summaries = {
    casual: `This article breaks down how ${title} affects everyday people. Bottom line: expect some changes to your daily routine, but nothing too dramatic.`,
    formal: `The aforementioned article provides a comprehensive analysis of ${title}, delineating the significant implications for various stakeholders and offering strategic insights.`,
    fun: `OMG! 😲 ${title} is the talk of the town! This news is basically a rollercoaster of drama and surprises. Buckle up, because things are about to get WILD! 🔥`
  };

  return (
    <Card className="my-4 bg-muted/50 border-none shadow-sm">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold">Smart Summary</h3>
          <div className="flex space-x-2">
            <Button 
              variant={activeTone === 'casual' ? 'default' : 'outline'} 
              size="sm" 
              onClick={() => setActiveTone('casual')}
              className="text-xs h-8"
            >
              Casual
            </Button>
            <Button 
              variant={activeTone === 'formal' ? 'default' : 'outline'} 
              size="sm" 
              onClick={() => setActiveTone('formal')}
              className="text-xs h-8"
            >
              Formal
            </Button>
            <Button 
              variant={activeTone === 'fun' ? 'default' : 'outline'} 
              size="sm" 
              onClick={() => setActiveTone('fun')}
              className="text-xs h-8"
            >
              Fun
            </Button>
          </div>
        </div>
        <div className="p-3 bg-background rounded-md animate-fade-in">
          <p className="text-sm text-foreground">
            {summaries[activeTone]}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ArticleSummary;
