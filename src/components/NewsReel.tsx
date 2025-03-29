
import React, { useState, useEffect, useRef } from 'react';
import { Heart, MessageCircle, Share, Bookmark, ChevronLeft, ChevronRight, Headphones } from 'lucide-react';
import { cn } from '@/lib/utils';
import SummaryPopup from './SummaryPopup';
import ListenButton from './ListenButton';
import { toast } from "@/hooks/use-toast";

interface NewsReelProps {
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
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onArticleClick?: () => void;
  onListen?: (article: any) => void;
}

const NewsReel: React.FC<NewsReelProps> = ({ 
  article, 
  onSwipeLeft, 
  onSwipeRight,
  onArticleClick,
  onListen
}) => {
  const [progress, setProgress] = useState(0);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [summaryVisible, setSummaryVisible] = useState(false);
  const [isLikeAnimating, setIsLikeAnimating] = useState(false);
  const reelRef = useRef<HTMLDivElement>(null);
  
  // Min distance to trigger swipe
  const minSwipeDistance = 50;

  useEffect(() => {
    // Auto-progress the reel
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 0.5;
      });
    }, 100);

    // Show summary with delay
    const timer = setTimeout(() => {
      setSummaryVisible(true);
    }, 500);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe && onSwipeLeft) {
      onSwipeLeft();
    }
    
    if (isRightSwipe && onSwipeRight) {
      onSwipeRight();
    }
    
    // Reset values
    setTouchStart(null);
    setTouchEnd(null);
  };

  // Add mouse equivalents for desktop
  const [mouseStart, setMouseStart] = useState<number | null>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    setMouseStart(e.clientX);
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!mouseStart) return;
    
    const distance = mouseStart - e.clientX;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe && onSwipeLeft) {
      onSwipeLeft();
    }
    
    if (isRightSwipe && onSwipeRight) {
      onSwipeRight();
    }
    
    setMouseStart(null);
  };

  const handleContentClick = (e: React.MouseEvent) => {
    // Prevent click when swiping
    if (mouseStart !== null) return;
    
    // Call the article click handler
    if (onArticleClick) {
      onArticleClick();
    } else if (onSwipeLeft) {
      // Fallback to swipe left if no click handler
      onSwipeLeft();
    }
  };

  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLiked(!liked);
    
    // Add heart animation
    setIsLikeAnimating(true);
    setTimeout(() => setIsLikeAnimating(false), 500);
    
    // Show toast notification
    toast({
      title: liked ? "Removed like" : "Added like",
      description: liked ? "You've removed your like from this article" : "You've liked this article",
      duration: 2000,
    });
  };

  const handleShareClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    // Show toast for share action
    toast({
      title: "Share options",
      description: "Share options would appear here in a production app",
      duration: 2000,
    });
  };

  const handleSaveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSaved(!saved);
    
    // Show toast notification
    toast({
      title: saved ? "Removed from saved" : "Saved to bookmarks",
      description: saved ? "Article removed from your bookmarks" : "Article saved to your bookmarks",
      duration: 2000,
    });
  };

  const handleCommentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    // Show toast for comment action
    toast({
      title: "Comments",
      description: `View ${article.comments} comments on this article`,
      duration: 2000,
    });
  };

  const handleChatClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onSwipeRight) {
      onSwipeRight();
    }
  };

  const handleFullArticleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onSwipeLeft) {
      onSwipeLeft();
    }
  };

  const handleListenClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (onListen) {
      onListen(article);
    }
  };

  return (
    <div 
      ref={reelRef}
      className="news-reel"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${article.imageUrl})` }}
      />
      <div className="reel-content">
        <span className="inline-block bg-news-600 text-white text-xs font-medium px-2.5 py-0.5 rounded mb-2">
          {article.category}
        </span>
        <div className="flex items-center gap-3 mb-2">
          <h2 className="text-2xl md:text-4xl font-bold">{article.title}</h2>
          <ListenButton 
            onClick={handleListenClick}
            variant="ghost"
            size="icon"
            showLabel={false}
            className="bg-news-600/80 text-white h-10 w-10 shadow-md hover:bg-news-600"
          />
        </div>
        
        <div className={cn(
          "transition-opacity duration-500",
          summaryVisible ? "opacity-100" : "opacity-0"
        )}>
          <p className="text-sm md:text-base mb-4">{article.summary}</p>
          <p className="text-xs text-gray-300 mb-6">{article.date}</p>
        </div>

        <div className="absolute right-4 bottom-28 flex flex-col gap-6">
          <button 
            className="interaction-button relative bg-black/30 p-2 rounded-full hover:bg-black/50 transition-colors"
            onClick={handleLikeClick}
          >
            <Heart 
              className={cn(
                "h-7 w-7 transition-all", 
                liked ? "fill-red-500 text-red-500" : "",
                isLikeAnimating ? "scale-125" : ""
              )} 
            />
            <span className="text-xs mt-1">{liked ? article.likes + 1 : article.likes}</span>
            {isLikeAnimating && (
              <span className="absolute inset-0 flex items-center justify-center">
                <Heart 
                  className="h-12 w-12 text-red-500 fill-red-500 animate-pulse opacity-0" 
                />
              </span>
            )}
          </button>
          
          <button 
            className="interaction-button bg-black/30 p-2 rounded-full hover:bg-black/50 transition-colors"
            onClick={handleCommentClick}
          >
            <MessageCircle className="h-7 w-7" />
            <span className="text-xs mt-1">{article.comments}</span>
          </button>
          
          <button 
            className="interaction-button bg-black/30 p-2 rounded-full hover:bg-black/50 transition-colors"
            onClick={handleShareClick}
          >
            <Share className="h-7 w-7" />
            <span className="text-xs mt-1">Share</span>
          </button>
          
          <button 
            className="interaction-button bg-black/30 p-2 rounded-full hover:bg-black/50 transition-colors"
            onClick={handleSaveClick}
          >
            <Bookmark className={cn("h-7 w-7", saved ? "fill-white" : "")} />
            <span className="text-xs mt-1">Save</span>
          </button>
        </div>

        <button 
          className="flex gap-2 absolute left-4 md:left-6 top-1/2 transform -translate-y-1/2 text-white/75 
                     hover:text-white transition-colors px-4 py-2 rounded-full bg-black/30 hover:bg-black/50"
          onClick={handleFullArticleClick}
          aria-label="View full article"
        >
          <ChevronLeft className="w-6 h-6" />
          <span className="text-sm hidden md:inline">Full Article</span>
        </button>
        
        <button 
          className="flex gap-2 absolute right-4 md:right-6 top-1/2 transform -translate-y-1/2 text-white/75 
                     hover:text-white transition-colors px-4 py-2 rounded-full bg-black/30 hover:bg-black/50"
          onClick={handleChatClick}
          aria-label="Open AI chat"
        >
          <span className="text-sm hidden md:inline">AI Chat</span>
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Smart Summary Popup */}
        <SummaryPopup
          title={article.title}
          summary={article.summary}
          onExpandArticle={onSwipeLeft || (() => {})}
          onListen={handleListenClick}
        />

        <div 
          className="absolute inset-0 z-0 cursor-pointer"
          onClick={handleContentClick}
          aria-hidden="true"
        ></div>

        <div className="progress-bar w-full">
          <div 
            className="active-progress" 
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default NewsReel;
