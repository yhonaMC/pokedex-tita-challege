import { useState, useEffect } from 'react';

export const useSingleImagePreloader = (imageSrc: string) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  useEffect(() => {
    if (!imageSrc) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setIsLoaded(false);
    setIsFailed(false);

    const img = new Image();
    
    img.onload = () => {
      setIsLoading(false);
      setIsLoaded(true);
      setIsFailed(false);
    };
    
    img.onerror = () => {
      setIsLoading(false);
      setIsLoaded(false);
      setIsFailed(true);
    };
    
    img.src = imageSrc;
  }, [imageSrc]);

  return {
    isLoading,
    isLoaded,
    isFailed,
  };
};