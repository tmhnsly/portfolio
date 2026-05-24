export const THEME_STORAGE_KEY = 'th-theme';
export const THEME_SCRIPT = `(function(){try{var k='${THEME_STORAGE_KEY}';var s=localStorage.getItem(k);var m=window.matchMedia('(prefers-color-scheme: dark)').matches;document.documentElement.setAttribute('data-theme', s||(m?'dark':'light'));}catch(e){}})();`;
