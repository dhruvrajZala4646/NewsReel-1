
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import BottomNavigation from '@/components/BottomNavigation';
import { useTheme } from '@/context/ThemeContext';
import { User, Bell, Settings, ChevronRight } from 'lucide-react';

const Profile = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [preferences, setPreferences] = useState({
    categories: {
      technology: true,
      business: true,
      politics: false,
      sports: true,
      entertainment: true,
      science: false,
      health: true
    },
    notifications: {
      breaking: true,
      daily: true,
      recommendations: false
    }
  });
  
  const handleCategoryToggle = (category: string) => {
    setPreferences(prev => ({
      ...prev,
      categories: {
        ...prev.categories,
        [category]: !prev.categories[category as keyof typeof prev.categories]
      }
    }));
  };
  
  const handleNotificationToggle = (type: string) => {
    setPreferences(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [type]: !prev.notifications[type as keyof typeof prev.notifications]
      }
    }));
  };
  
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      
      <div className="pt-16 pb-20">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-2 mb-6">
            <User className="text-news-600 h-6 w-6" />
            <h1 className="text-2xl font-bold">Your Profile</h1>
          </div>
          
          <div className="mb-8 flex flex-col items-center">
            <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mb-4">
              <User className="h-12 w-12 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-bold">John Doe</h2>
            <p className="text-muted-foreground">Member since June 2023</p>
          </div>
          
          <div className="space-y-8">
            {/* Category Preferences */}
            <div className="bg-card rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Settings className="h-5 w-5 text-news-600" />
                Category Preferences
              </h3>
              <div className="space-y-3">
                {Object.entries(preferences.categories).map(([category, isEnabled]) => (
                  <div key={category} className="flex items-center justify-between">
                    <span className="capitalize">{category}</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={isEnabled}
                        onChange={() => handleCategoryToggle(category)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-news-300 dark:peer-focus:ring-news-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-news-600"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Notification Settings */}
            <div className="bg-card rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Bell className="h-5 w-5 text-news-600" />
                Notification Settings
              </h3>
              <div className="space-y-3">
                {Object.entries(preferences.notifications).map(([type, isEnabled]) => (
                  <div key={type} className="flex items-center justify-between">
                    <div>
                      <span className="capitalize">{type} News</span>
                      <p className="text-xs text-muted-foreground">
                        {type === 'breaking' ? 'Get alerts for major news events' : 
                         type === 'daily' ? 'Receive a daily news digest' : 
                         'Get personalized article recommendations'}
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={isEnabled}
                        onChange={() => handleNotificationToggle(type)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-news-300 dark:peer-focus:ring-news-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-news-600"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Additional Settings */}
            <div className="bg-card rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Additional Settings</h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-2 hover:bg-muted rounded-md transition-colors">
                  <span>Dark Mode</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={isDarkMode}
                      onChange={toggleDarkMode}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-news-300 dark:peer-focus:ring-news-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-news-600"></div>
                  </label>
                </div>
                
                <button className="flex items-center justify-between w-full p-2 hover:bg-muted rounded-md transition-colors">
                  <span>Account Settings</span>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </button>
                
                <button className="flex items-center justify-between w-full p-2 hover:bg-muted rounded-md transition-colors">
                  <span>Privacy Settings</span>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </button>
                
                <button className="flex items-center justify-between w-full p-2 hover:bg-muted rounded-md transition-colors">
                  <span>Help & Support</span>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </button>
                
                <button className="mt-4 w-full text-destructive hover:text-destructive/80 p-2 rounded-md transition-colors">
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default Profile;
