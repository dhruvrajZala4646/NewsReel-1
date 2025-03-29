
import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, SkipForward, Volume, Headphones } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { cn } from '@/lib/utils';

interface AudioPlayerProps {
  title: string;
  content: string;
  isMiniplayer?: boolean;
  onClose?: () => void;
  onNext?: () => void;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ 
  title, 
  content,
  isMiniplayer = false,
  onClose,
  onNext
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [voiceType, setVoiceType] = useState<'male' | 'female'>('male');
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  
  // In a real implementation, we would use a text-to-speech service
  // For now, we'll simulate audio playback
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  
  // Calculate a "fake" duration based on content length (1 second per 10 characters)
  useEffect(() => {
    const calculatedDuration = Math.max(content.length / 10, 30);
    setDuration(calculatedDuration);
  }, [content]);

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
  };

  const changeVoice = () => {
    setVoiceType(voiceType === 'male' ? 'female' : 'male');
  };

  const changeSpeed = () => {
    const speeds = [0.5, 1, 1.5];
    const currentIndex = speeds.indexOf(playbackSpeed);
    const nextIndex = (currentIndex + 1) % speeds.length;
    setPlaybackSpeed(speeds[nextIndex]);
  };

  // Simulate progress
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setProgress((prev) => {
          const increment = (playbackSpeed / duration) * 100;
          const newProgress = prev + increment;
          
          // If we reach the end, stop playing
          if (newProgress >= 100) {
            clearInterval(intervalRef.current!);
            setIsPlaying(false);
            setProgress(0);
            if (onNext) onNext();
            return 0;
          }
          
          return newProgress;
        });
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, playbackSpeed, duration, onNext]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const currentTime = (progress / 100) * duration;
  
  return (
    <div className={cn(
      "bg-card text-card-foreground rounded-lg shadow-lg transition-all",
      isMiniplayer ? "p-3" : "p-5"
    )}>
      {!isMiniplayer && (
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Headphones className="h-5 w-5 text-news-600" />
            <h3 className="text-base font-medium">Now Playing</h3>
          </div>
          {onClose && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onClose}
              className="h-8 w-8 p-0"
            >
              <span className="sr-only">Close</span>
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
              </svg>
            </Button>
          )}
        </div>
      )}
      
      <div className={cn(
        "flex items-center gap-3",
        isMiniplayer ? "flex-row" : "flex-col"
      )}>
        {isMiniplayer ? (
          <Button 
            variant="outline"
            size="icon"
            onClick={togglePlayback}
            className="h-10 w-10 rounded-full flex-shrink-0"
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
        ) : (
          <div className="flex justify-center w-full mb-4">
            <Button 
              variant="outline"
              size="icon"
              onClick={togglePlayback}
              className="h-16 w-16 rounded-full"
            >
              {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8" />}
            </Button>
          </div>
        )}
        
        <div className={cn(
          "flex flex-col",
          isMiniplayer ? "flex-1 min-w-0" : "w-full"
        )}>
          <div className={cn(
            "mb-1 text-ellipsis overflow-hidden whitespace-nowrap",
            isMiniplayer ? "text-sm font-medium" : "text-lg font-bold mb-2"
          )}>
            {title}
          </div>
          
          {!isMiniplayer && (
            <div className="flex gap-2 mb-4">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={changeVoice}
                className="text-xs h-8"
              >
                Voice: {voiceType === 'male' ? 'Male' : 'Female'}
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={changeSpeed}
                className="text-xs h-8"
              >
                Speed: {playbackSpeed === 0.5 ? 'Slow' : playbackSpeed === 1 ? 'Normal' : 'Fast'}
              </Button>
              {onNext && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={onNext}
                  className="text-xs h-8 ml-auto"
                >
                  <SkipForward className="h-4 w-4 mr-1" />
                  Next
                </Button>
              )}
            </div>
          )}
          
          <div className="flex items-center gap-2">
            {!isMiniplayer && (
              <span className="text-xs text-muted-foreground w-10 text-right">
                {formatTime(currentTime)}
              </span>
            )}
            
            <div className={cn(
              "relative flex-1 h-2 bg-muted rounded-full overflow-hidden",
              isMiniplayer ? "max-w-[120px] md:max-w-none" : ""
            )}>
              <div 
                className="absolute h-full bg-news-600 left-0 top-0"
                style={{ width: `${progress}%` }}
              />
              
              {/* Waveform animation when playing */}
              {isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex gap-1 items-end h-full py-0.5">
                    {[...Array(5)].map((_, i) => (
                      <div 
                        key={i}
                        className="bg-white w-0.5 animate-pulse"
                        style={{ 
                          height: `${30 + Math.sin(i * 0.9) * 70}%`,
                          animationDelay: `${i * 0.1}s`
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {!isMiniplayer && (
              <>
                <span className="text-xs text-muted-foreground w-10">
                  {formatTime(duration)}
                </span>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="rounded-full p-0 h-8 w-8 flex-shrink-0"
                >
                  <Volume className="h-4 w-4" />
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
