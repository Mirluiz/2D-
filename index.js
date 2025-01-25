const canvas = document.querySelector('#canvas');

if(canvas) {
  const app = new App(canvas);

  app.run();
}


function applySystemTheme() {
  const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (isDarkMode) {
    document.body.classList.add('dark-mode');
  } else {
    document.body.classList.remove('dark-mode');
  }
}

// applySystemTheme();

// Listen for changes in system theme
// window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', applySystemTheme)