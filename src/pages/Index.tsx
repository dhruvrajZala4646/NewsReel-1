
import React, { useState, useRef } from 'react';
import NewsReel from '@/components/NewsReel';
import NewsArticle from '@/components/NewsArticle';
import AiChatAssistant from '@/components/AiChatAssistant';
import BottomNavigation from '@/components/BottomNavigation';
import Navbar from '@/components/Navbar';
import { newsArticles } from '@/lib/data';
import { useTheme } from '@/context/ThemeContext';

const Index = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [activeArticleIndex, setActiveArticleIndex] = useState(0);
  const [showArticle, setShowArticle] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

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
    if (scrollContainerRef.current) {
      const scrollPosition = scrollContainerRef.current.scrollTop;
      const reelHeight = window.innerHeight;
      const currentIndex = Math.round(scrollPosition / reelHeight);
      setActiveArticleIndex(currentIndex);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      
      <div 
        ref={scrollContainerRef}
        className="snap-container pt-16 pb-16"
        onScroll={handleScroll}
      >
        {newsArticles.map((article, index) => (
          <NewsReel 
            key={article.id}
            article={article}
            onSwipeLeft={handleSwipeLeft}
            onSwipeRight={handleSwipeRight}
          />
        ))}
      </div>
      
      {showArticle && (
        <NewsArticle 
          article={newsArticles[activeArticleIndex]}
          onClose={closeArticle}
        />
      )}
      
      {showChat && (
        <AiChatAssistant 
          onClose={closeChat}
          articleTitle={newsArticles[activeArticleIndex].title}
        />
      )}
      
      <BottomNavigation />
    </div>
  );
};

export default Index;
