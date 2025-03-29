
import React from 'react';
import { Headphones } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { cn } from '@/lib/utils';

interface ListenButtonProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  size?: 'default' | 'sm' | 'lg' | 'icon';
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  showLabel?: boolean;
}

const ListenButton: React.FC<ListenButtonProps> = ({ 
  onClick, 
  className,
  size = 'default',
  variant = 'outline',
  showLabel = true
}) => {
  return (
    <Button
      variant={variant}
      size={size}
      onClick={(e) => {
        e.stopPropagation();
        onClick(e);
      }}
      className={cn(
        "hover:bg-news-600/10",
        className
      )}
    >
      <Headphones className="h-4 w-4 mr-1" />
      {showLabel && <span>Listen</span>}
    </Button>
  );
};

export default ListenButton;
