
import React, { useEffect, useState } from 'react';
import { ChevronLeft, Heart, MessageCircle, Share, Bookmark, Headphones } from 'lucide-react';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import ArticleSummary from './ArticleSummary';
import AudioPlayer from './AudioPlayer';
import ListenButton from './ListenButton';

interface NewsArticleProps {
  article: {
    id: string;
    title: string;
    summary: string;
    imageUrl: string;
    category: string;
    date: string;
    content: string;
    likes: number;
    comments: number;
  };
  onClose: () => void;
  onListen?: (article: any) => void;
}

const NewsArticle: React.FC<NewsArticleProps> = ({ article, onClose, onListen }) => {
  // Add swipe gesture support for closing
  const [touchStart, setTouchStart] = React.useState<number | null>(null);
  const [touchEnd, setTouchEnd] = React.useState<number | null>(null);
  
  // Handle closing animation
  const [isExiting, setIsExiting] = React.useState(false);
  
  // Handle audio player
  const [isListening, setIsListening] = useState(false);

  // Min distance to trigger swipe
  const minSwipeDistance = 50;

  // Handle swipe right to close
  const handleSwipeClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      onClose();
    }, 300); // Match animation duration
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isRightSwipe) {
      handleSwipeClose();
    }
    
    // Reset values
    setTouchStart(null);
    setTouchEnd(null);
  };

  useEffect(() => {
    // Focus trap to prevent scrolling background
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const handleListenClick = () => {
    setIsListening(true);
    if (onListen) {
      onListen(article);
    }
  };

  return (
    <div 
      className={`fixed inset-0 bg-background z-50 overflow-y-auto ${
        isExiting ? 'animate-slide-right' : 'animate-slide-in'
      }`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="bg-muted sticky top-0 z-10 flex items-center justify-between p-4 shadow-sm">
        <button 
          className="flex items-center text-foreground"
          onClick={handleSwipeClose}
        >
          <ChevronLeft className="w-6 h-6 mr-2" />
          <span>Back to feed</span>
        </button>
        <div className="text-sm text-muted-foreground">{article.date}</div>
      </div>

      <div className="max-w-3xl mx-auto pb-24">
        <div className="relative h-64 md:h-96 w-full">
          <img 
            src={article.imageUrl} 
            alt={article.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
            <span className="inline-block bg-news-600 text-white text-xs font-medium px-2.5 py-0.5 rounded mb-2">
              {article.category}
            </span>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl md:text-4xl font-bold text-white flex-1">{article.title}</h1>
              <ListenButton 
                onClick={handleListenClick}
                variant="ghost"
                size="lg"
                className="bg-black/20 text-white border-none"
              />
            </div>
            <p className="text-sm text-gray-300 mt-2">{article.date}</p>
          </div>
        </div>

        <div className="px-4 md:px-8 pt-6">
          {/* Add the Smart Summary component */}
          <ArticleSummary title={article.title} />
          
          {/* Audio Player */}
          {isListening && (
            <div className="my-4 animate-fade-in">
              <AudioPlayer
                title={article.title}
                content={article.content}
                isMiniplayer={false}
                onClose={() => setIsListening(false)}
              />
            </div>
          )}
        </div>

        <div className="flex justify-center gap-8 py-4 border-b">
          <button className="flex items-center gap-1 text-sm">
            <Heart className="h-5 w-5" />
            <span>{article.likes}</span>
          </button>
          <button className="flex items-center gap-1 text-sm">
            <MessageCircle className="h-5 w-5" />
            <span>{article.comments}</span>
          </button>
          <button className="flex items-center gap-1 text-sm">
            <Share className="h-5 w-5" />
            <span>Share</span>
          </button>
          <button className="flex items-center gap-1 text-sm">
            <Bookmark className="h-5 w-5" />
            <span>Save</span>
          </button>
        </div>

        <div className="article-content">
          <p className="text-lg font-medium mb-6">{article.summary}</p>
          <div className="space-y-4 leading-relaxed" dangerouslySetInnerHTML={{ __html: article.content }} />
        </div>

        <div className="px-4 md:px-8 py-6">
          <h3 className="text-xl font-bold mb-4">Related Articles</h3>
          <Carousel
            opts={{
              align: "start",
              loop: false,
            }}
            className="w-full"
          >
            <CarouselContent>
              {[1, 2, 3].map((i) => (
                <CarouselItem key={i} className="basis-4/5 sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                  <div className="bg-card rounded-lg overflow-hidden flex-shrink-0 shadow-md h-full">
                    <div className="h-32 bg-muted">
                      <img 
                        src={`https://picsum.photos/seed/${i + 10}/400/200`} 
                        alt="Related article"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <span className="text-xs text-muted-foreground">Related</span>
                      <h4 className="font-bold">Another Interesting News Article {i}</h4>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-1" />
            <CarouselNext className="right-1" />
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default NewsArticle;
