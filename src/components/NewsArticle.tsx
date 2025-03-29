
import React from 'react';
import { ChevronRight, Heart, MessageCircle, Share, Bookmark } from 'lucide-react';

interface NewsArticleProps {
  article: {
    id: string;
    title: string;
    summary: string;
    imageUrl: string;
    category: string;
    date: string;
    content: string;
    likes: number;
    comments: number;
  };
  onClose: () => void;
}

const NewsArticle: React.FC<NewsArticleProps> = ({ article, onClose }) => {
  return (
    <div className="fixed inset-0 bg-background z-50 overflow-y-auto">
      <div className="bg-muted flex items-center p-4 sticky top-0 z-10">
        <button 
          className="flex items-center text-foreground"
          onClick={onClose}
        >
          <ChevronRight className="w-6 h-6 mr-2" />
          <span>Back to feed</span>
        </button>
      </div>

      <div className="max-w-3xl mx-auto pb-24">
        <div className="relative h-64 md:h-96 w-full">
          <img 
            src={article.imageUrl} 
            alt={article.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
            <span className="inline-block bg-news-600 text-white text-xs font-medium px-2.5 py-0.5 rounded mb-2">
              {article.category}
            </span>
            <h1 className="text-2xl md:text-4xl font-bold text-white">{article.title}</h1>
            <p className="text-sm text-gray-300 mt-2">{article.date}</p>
          </div>
        </div>

        <div className="flex justify-center gap-8 py-4 border-b">
          <button className="flex items-center gap-1 text-sm">
            <Heart className="h-5 w-5" />
            <span>{article.likes}</span>
          </button>
          <button className="flex items-center gap-1 text-sm">
            <MessageCircle className="h-5 w-5" />
            <span>{article.comments}</span>
          </button>
          <button className="flex items-center gap-1 text-sm">
            <Share className="h-5 w-5" />
            <span>Share</span>
          </button>
          <button className="flex items-center gap-1 text-sm">
            <Bookmark className="h-5 w-5" />
            <span>Save</span>
          </button>
        </div>

        <div className="article-content">
          <p className="text-lg font-medium mb-6">{article.summary}</p>
          <div dangerouslySetInnerHTML={{ __html: article.content }} />
        </div>

        <div className="px-4 md:px-8 py-6">
          <h3 className="text-xl font-bold mb-4">Related Articles</h3>
          <div className="flex overflow-x-auto gap-4 pb-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="min-w-[280px] bg-card rounded-lg overflow-hidden flex-shrink-0 shadow-md">
                <div className="h-32 bg-muted">
                  <img 
                    src={`https://picsum.photos/seed/${i + 10}/400/200`} 
                    alt="Related article"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <span className="text-xs text-muted-foreground">Related</span>
                  <h4 className="font-bold">Another Interesting News Article {i}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsArticle;
