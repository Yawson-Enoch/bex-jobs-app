import { useEffect, useState } from 'react';

export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);
  const [value, setValue] = useState(window.innerWidth);

  useEffect(() => {
    const media = window.matchMedia(query);
    setMatches(media.matches);

    const listener = (event: MediaQueryListEvent) => setMatches(event.matches);
    media.addEventListener('change', listener);

    const resizeListener = () => setValue(window.innerWidth);
    window.addEventListener('resize', resizeListener);

    return () => {
      media.removeEventListener('change', listener);
      window.removeEventListener('resize', resizeListener);
    };
  }, [query]);

  return { matches, value };
}
