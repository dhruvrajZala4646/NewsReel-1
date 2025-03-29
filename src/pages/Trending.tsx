
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import BottomNavigation from '@/components/BottomNavigation';
import NewsTicker from '@/components/NewsTicker';
import NewsArticle from '@/components/NewsArticle';
import MiniPlayer from '@/components/MiniPlayer';
import ListenButton from '@/components/ListenButton';
import { getTrendingArticles, getFeaturedArticles, breakingHeadlines } from '@/lib/data';
import { useTheme } from '@/context/ThemeContext';
import { TrendingUp, MessageCircle, Heart } from 'lucide-react';
import { toast } from "@/hooks/use-toast";

const Trending = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const trendingArticles = getTrendingArticles();
  const featuredArticles = getFeaturedArticles();
  const [selectedArticle, setSelectedArticle] = useState<any | null>(null);
  const [playingArticle, setPlayingArticle] = useState<any | null>(null);
  
  const handleArticleClick = (article: any) => {
    setSelectedArticle(article);
  };
  
  const closeArticle = () => {
    setSelectedArticle(null);
  };

  const handleListenClick = (article: any) => {
    setPlayingArticle(article);
    toast({
      title: "Now playing",
      description: `Playing "${article.title}"`,
      duration: 2000
    });
  };

  const handleClosePlayer = () => {
    setPlayingArticle(null);
  };

  const handleNextArticle = () => {
    const currentIndex = trendingArticles.findIndex(article => article.id === playingArticle.id);
    const nextIndex = (currentIndex + 1) % trendingArticles.length;
    setPlayingArticle(trendingArticles[nextIndex]);
  };
  
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      
      <div className="pt-16 pb-20">
        <NewsTicker headlines={breakingHeadlines} />
        
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="text-news-600 h-6 w-6" />
            <h1 className="text-2xl font-bold">Trending Now</h1>
          </div>
          
          {/* Featured Articles */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Featured Stories</h2>
            <div className="grid grid-cols-1 gap-6">
              {featuredArticles.slice(0, 1).map(article => (
                <div 
                  key={article.id}
                  className="relative h-64 md:h-96 rounded-lg overflow-hidden cursor-pointer transform hover:scale-[1.01] transition-transform"
                  onClick={() => handleArticleClick(article)}
                >
                  <img 
                    src={article.imageUrl} 
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-6">
                    <span className="inline-block bg-news-600 text-white text-xs font-medium px-2.5 py-0.5 rounded mb-2">
                      {article.category}
                    </span>
                    <div className="flex items-center gap-3">
                      <h3 className="text-xl md:text-2xl font-bold text-white flex-1">{article.title}</h3>
                      <ListenButton
                        onClick={(e) => {
                          e.stopPropagation();
                          handleListenClick(article);
                        }}
                        variant="ghost"
                        size="sm"
                        className="bg-news-600/80 text-white border-none shadow-md hover:bg-news-600"
                      />
                    </div>
                    <p className="text-white/80 text-sm md:text-base line-clamp-2 mb-2">{article.summary}</p>
                    <div className="flex items-center gap-4">
                      <span className="flex items-center text-white/80 gap-1">
                        <Heart className="h-4 w-4" /> {article.likes}
                      </span>
                      <span className="flex items-center text-white/80 gap-1">
                        <MessageCircle className="h-4 w-4" /> {article.comments}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Top Stories Grid */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Top Stories</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trendingArticles.slice(0, 6).map(article => (
                <div 
                  key={article.id}
                  className="bg-card rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => handleArticleClick(article)}
                >
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={article.imageUrl} 
                      alt={article.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="inline-block bg-muted text-xs font-medium px-2.5 py-0.5 rounded text-muted-foreground">
                        {article.category}
                      </span>
                      <ListenButton
                        onClick={(e) => {
                          e.stopPropagation();
                          handleListenClick(article);
                        }}
                        variant="ghost"
                        size="sm"
                        showLabel={false}
                        className="h-8 w-8 p-0 bg-news-600/10 hover:bg-news-600/20 text-news-600"
                      />
                    </div>
                    <h3 className="font-bold mb-2 line-clamp-2">{article.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{article.summary}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">{article.date}</span>
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1 text-sm">
                          <Heart className="h-4 w-4 text-news-600" /> {article.likes}
                        </span>
                        <span className="flex items-center gap-1 text-sm">
                          <MessageCircle className="h-4 w-4" /> {article.comments}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {selectedArticle && (
        <NewsArticle 
          article={selectedArticle}
          onClose={closeArticle}
          onListen={handleListenClick}
        />
      )}
      
      {playingArticle && !selectedArticle && (
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

export default Trending;
