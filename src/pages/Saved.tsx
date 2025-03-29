
import React from 'react';
import Navbar from '@/components/Navbar';
import BottomNavigation from '@/components/BottomNavigation';
import { getSavedArticles } from '@/lib/data';
import { useTheme } from '@/context/ThemeContext';
import { Bookmark, X } from 'lucide-react';

const Saved = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const savedArticles = getSavedArticles();
  
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      
      <div className="pt-16 pb-20">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-2 mb-6">
            <Bookmark className="text-news-600 h-6 w-6" />
            <h1 className="text-2xl font-bold">Saved Articles</h1>
          </div>
          
          {savedArticles.length > 0 ? (
            <div className="space-y-4">
              {savedArticles.map(article => (
                <div 
                  key={article.id}
                  className="flex gap-4 bg-card rounded-lg overflow-hidden shadow-md"
                >
                  <div className="w-1/3 md:w-1/4 h-32 overflow-hidden">
                    <img 
                      src={article.imageUrl} 
                      alt={article.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="w-2/3 md:w-3/4 p-4 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between">
                        <span className="text-xs text-muted-foreground">
                          {article.category} • {article.date}
                        </span>
                        <button className="text-muted-foreground hover:text-foreground">
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                      <h3 className="font-bold my-1 line-clamp-2">{article.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 md:line-clamp-none">
                        {article.summary}
                      </p>
                    </div>
                    <div className="flex justify-end mt-2">
                      <button className="text-sm text-news-600 font-medium">
                        Read Article
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
              <Bookmark className="h-12 w-12 mb-4" />
              <h3 className="text-xl font-semibold mb-2">No saved articles yet</h3>
              <p className="text-center max-w-md">
                When you save articles, they will appear here for you to read later.
              </p>
            </div>
          )}
        </div>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default Saved;
