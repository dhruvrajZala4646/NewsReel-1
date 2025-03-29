
import React from 'react';
import AudioPlayer from './AudioPlayer';

interface MiniPlayerProps {
  article: {
    id: string;
    title: string;
    content: string;
  };
  onClose: () => void;
  onNext: () => void;
}

const MiniPlayer: React.FC<MiniPlayerProps> = ({ article, onClose, onNext }) => {
  return (
    <div className="fixed bottom-20 left-0 right-0 z-50 px-4">
      <div className="animate-slide-in-bottom">
        <AudioPlayer
          title={article.title}
          content={article.content}
          isMiniplayer={true}
          onClose={onClose}
          onNext={onNext}
        />
      </div>
    </div>
  );
};

export default MiniPlayer;
