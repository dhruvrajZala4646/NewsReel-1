
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Search, Sun, Moon } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface NavbarProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isDarkMode, toggleDarkMode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  return (
    <div className="fixed top-0 left-0 right-0 z-40 bg-background border-b">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="text-2xl font-display font-bold text-news-800 dark:text-white">
            NewsReel
          </Link>
        </div>
        
        {!isMobile && (
          <div className="hidden md:flex space-x-8">
            <Link to="/" className="text-foreground hover:text-news-600">Home</Link>
            <Link to="/trending" className="text-foreground hover:text-news-600">Trending</Link>
            <Link to="/saved" className="text-foreground hover:text-news-600">Saved</Link>
            <Link to="/profile" className="text-foreground hover:text-news-600">Profile</Link>
          </div>
        )}
        
        <div className="flex items-center gap-3">
          <button 
            className="p-2 rounded-full hover:bg-muted"
            onClick={toggleDarkMode}
          >
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          
          <button className="p-2 rounded-full hover:bg-muted">
            <Search className="h-5 w-5" />
          </button>
          
          {isMobile && (
            <button 
              className="p-2 rounded-full hover:bg-muted md:hidden"
              onClick={toggleMenu}
            >
              <Menu className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMobile && isMenuOpen && (
        <div className="fixed inset-0 bg-background z-50 flex flex-col">
          <div className="flex justify-between items-center p-4 border-b">
            <span className="text-xl font-bold">Menu</span>
            <button onClick={toggleMenu}>
              <X className="h-6 w-6" />
            </button>
          </div>
          
          <div className="flex flex-col p-4 space-y-4 text-lg">
            <Link to="/" onClick={toggleMenu} className="p-2 hover:bg-muted rounded-md">Home</Link>
            <Link to="/trending" onClick={toggleMenu} className="p-2 hover:bg-muted rounded-md">Trending</Link>
            <Link to="/saved" onClick={toggleMenu} className="p-2 hover:bg-muted rounded-md">Saved</Link>
            <Link to="/profile" onClick={toggleMenu} className="p-2 hover:bg-muted rounded-md">Profile</Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
