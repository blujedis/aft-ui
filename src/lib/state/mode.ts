
export type ThemeMode = 'light' | 'dark';

const prefersDark = () => {
  const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  return isDark ? 'dark' : 'light';
};

const setMode = (mode: ThemeMode) => {
  if (mode === 'dark') {
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', mode);
  }
  else {
    localStorage.setItem('theme', 'light');
    document.documentElement.classList.remove('dark');
  }
};

export const useMode = (key = 'theme') => {

  if (typeof window === 'undefined') {
    const _api = {
      get dark() { return false; },
      get current() { return 'light' },
      prefersDark,
      toggle: () => { return false; },
      reset: () => { return _api; },
    };
    return _api;
  }

  const api = {
    get dark() { return localStorage.theme === 'dark' },

    get current() { return localStorage.theme; },

    prefersDark,

    toggle: () => {
      const nextMode = localStorage.theme === 'dark' ? 'light' : 'dark';
      setMode(nextMode);
      return nextMode;
    },

    reset: () => { localStorage.removeItem('theme'); document.documentElement.classList.remove('dark'); return api; },

  };

  return api;

};

