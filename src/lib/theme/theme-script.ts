export const THEME_STORAGE_KEY = 'th-theme';
export const THEME_SCRIPT = `(function(){try{var k='${THEME_STORAGE_KEY}';var s=localStorage.getItem(k);var m=window.matchMedia('(prefers-color-scheme: dark)').matches;var t=s||(m?'dark':'light');document.documentElement.setAttribute('data-theme', t);document.documentElement.classList.add(t);}catch(e){}})();`;
