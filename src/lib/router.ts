import { useEffect, useState, useCallback } from 'react';

type RouteState = {
  path: string;
  params: Record<string, string>;
};

function parsePath(): RouteState {
  const hash = window.location.hash.replace(/^#/, '') || '/';
  return { path: hash, params: {} };
}

export function useRoute() {
  const [route, setRoute] = useState<RouteState>(parsePath);

  useEffect(() => {
    const onChange = () => {
      setRoute(parsePath());
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    };
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);

  return route;
}

export function navigate(path: string) {
  if (!path.startsWith('/')) path = '/' + path;
  window.location.hash = path;
}

export function useNavigate() {
  return useCallback((path: string) => navigate(path), []);
}
