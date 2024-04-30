const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,

  // Configuration PWA
  pwa: {
    name: 'Quiz App', 
    themeColor: '#004643',
    msTileColor: '#004643', 
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    manifestOptions: {
      short_name: 'QuizApp', 
      start_url: '/', 
      display: 'standalone', 
      background_color: '#ffffff',
      icons: [
        {
          src: 'img/quiz.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: 'img/quiz.png', 
          sizes: '512x512',
          type: 'image/png',
        },
      ],
    },
    workboxPluginMode: 'GenerateSW', 
    workboxOptions: {
      skipWaiting: true,
      clientsClaim: true,
    },
  },
});
