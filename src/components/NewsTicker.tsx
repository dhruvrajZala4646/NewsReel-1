
import React from 'react';

interface NewsTickerProps {
  headlines: string[];
}

const NewsTicker: React.FC<NewsTickerProps> = ({ headlines }) => {
  return (
    <div className="ticker-container w-full">
      <div className="ticker-content">
        {headlines.map((headline, index) => (
          <React.Fragment key={index}>
            <span className="mx-4">•</span>
            <span className="font-medium">{headline}</span>
          </React.Fragment>
        ))}
        {/* Duplicate headlines to ensure smooth looping */}
        {headlines.map((headline, index) => (
          <React.Fragment key={`dup-${index}`}>
            <span className="mx-4">•</span>
            <span className="font-medium">{headline}</span>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default NewsTicker;
