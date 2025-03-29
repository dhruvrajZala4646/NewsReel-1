
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, TrendingUp, Bookmark, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const BottomNavigation: React.FC = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t z-40 md:hidden">
      <div className="flex justify-around items-center h-16">
        <Link 
          to="/" 
          className={cn(
            "flex flex-col items-center justify-center text-xs pt-1",
            isActive('/') ? 'text-news-600' : 'text-muted-foreground'
          )}
        >
          <Home className="h-6 w-6 mb-1" />
          <span>Home</span>
        </Link>
        
        <Link 
          to="/trending" 
          className={cn(
            "flex flex-col items-center justify-center text-xs pt-1",
            isActive('/trending') ? 'text-news-600' : 'text-muted-foreground'
          )}
        >
          <TrendingUp className="h-6 w-6 mb-1" />
          <span>Trending</span>
        </Link>
        
        <Link 
          to="/saved" 
          className={cn(
            "flex flex-col items-center justify-center text-xs pt-1",
            isActive('/saved') ? 'text-news-600' : 'text-muted-foreground'
          )}
        >
          <Bookmark className="h-6 w-6 mb-1" />
          <span>Saved</span>
        </Link>
        
        <Link 
          to="/profile" 
          className={cn(
            "flex flex-col items-center justify-center text-xs pt-1",
            isActive('/profile') ? 'text-news-600' : 'text-muted-foreground'
          )}
        >
          <User className="h-6 w-6 mb-1" />
          <span>Profile</span>
        </Link>
      </div>
    </div>
  );
};

export default BottomNavigation;
