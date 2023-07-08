import { useEffect, useState } from 'react';

const isClient = typeof window !== 'undefined';

export default function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(
    isClient ? window.matchMedia(query).matches : false,
  );

  useEffect(() => {
    const media = window.matchMedia(query);

    const handleMediaQuery = () => {
      setMatches(media.matches);
    };

    setMatches(media.matches);

    handleMediaQuery();

    media.addEventListener('change', handleMediaQuery);

    return () => {
      media.removeEventListener('change', handleMediaQuery);
    };
  }, [query]);

  return { matches };
}
