
import React, { useState, useRef, useEffect } from 'react';
import NewsReel from '@/components/NewsReel';
import NewsArticle from '@/components/NewsArticle';
import AiChatAssistant from '@/components/AiChatAssistant';
import BottomNavigation from '@/components/BottomNavigation';
import Navbar from '@/components/Navbar';
import MiniPlayer from '@/components/MiniPlayer';
import { newsArticles } from '@/lib/data';
import { useTheme } from '@/context/ThemeContext';

const Index = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [activeArticleIndex, setActiveArticleIndex] = useState(0);
  const [showArticle, setShowArticle] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isSnapping, setIsSnapping] = useState(false);
  const [playingArticle, setPlayingArticle] = useState<any | null>(null);

  const handleSwipeLeft = () => {
    setShowArticle(true);
  };

  const handleSwipeRight = () => {
    setShowChat(true);
  };

  const closeArticle = () => {
    setShowArticle(false);
  };

  const closeChat = () => {
    setShowChat(false);
  };

  const handleScroll = () => {
    if (scrollContainerRef.current && !isSnapping) {
      setIsScrolling(true);
      const scrollPosition = scrollContainerRef.current.scrollTop;
      const reelHeight = window.innerHeight;
      const currentIndex = Math.round(scrollPosition / reelHeight);
      
      // Only update if the index changes
      if (currentIndex !== activeArticleIndex) {
        setActiveArticleIndex(currentIndex);
      }
    }
  };

  // Handle smooth snapping to the nearest reel
  const handleScrollEnd = () => {
    if (scrollContainerRef.current && isScrolling) {
      setIsScrolling(false);
      setIsSnapping(true);
      
      const scrollPosition = scrollContainerRef.current.scrollTop;
      const reelHeight = window.innerHeight;
      const targetIndex = Math.round(scrollPosition / reelHeight);
      const targetPosition = targetIndex * reelHeight;
      
      scrollContainerRef.current.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
      
      // Release the snapping lock after animation completes
      setTimeout(() => setIsSnapping(false), 500);
    }
  };

  // Set up scroll end detection
  useEffect(() => {
    let scrollTimeout: number;
    
    const handleScrollThrottled = () => {
      handleScroll();
      clearTimeout(scrollTimeout);
      scrollTimeout = window.setTimeout(handleScrollEnd, 150);
    };
    
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScrollThrottled);
      
      return () => {
        clearTimeout(scrollTimeout);
        container.removeEventListener('scroll', handleScrollThrottled);
      };
    }
  }, [activeArticleIndex, isScrolling, isSnapping]);

  const handleListenClick = (article: any) => {
    setPlayingArticle(article);
  };

  const handleClosePlayer = () => {
    setPlayingArticle(null);
  };

  const handleNextArticle = () => {
    const nextIndex = (activeArticleIndex + 1) % newsArticles.length;
    setPlayingArticle(newsArticles[nextIndex]);
    
    // Scroll to the next article
    if (scrollContainerRef.current) {
      const reelHeight = window.innerHeight;
      scrollContainerRef.current.scrollTo({
        top: nextIndex * reelHeight,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      
      <div 
        ref={scrollContainerRef}
        className="snap-container pt-16 pb-16"
      >
        {newsArticles.map((article, index) => (
          <NewsReel 
            key={article.id}
            article={article}
            onSwipeLeft={handleSwipeLeft}
            onSwipeRight={handleSwipeRight}
            onArticleClick={handleSwipeLeft}
            onListen={handleListenClick}
          />
        ))}
      </div>
      
      {showArticle && (
        <NewsArticle 
          article={newsArticles[activeArticleIndex]}
          onClose={closeArticle}
          onListen={handleListenClick}
        />
      )}
      
      {showChat && (
        <AiChatAssistant 
          onClose={closeChat}
          articleTitle={newsArticles[activeArticleIndex].title}
        />
      )}
      
      {playingArticle && !showArticle && (
        <MiniPlayer 
          article={playingArticle}
          onClose={handleClosePlayer}
          onNext={handleNextArticle}
        />
      )}
      
      <BottomNavigation />
    </div>
  );
};

export default Index;
