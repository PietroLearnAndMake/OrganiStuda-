import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.pietro.organizador.enem',
  appName: 'OrganiStuda',
  webDir: 'dist',
  plugins: {
    StatusBar: {
      overlaysWebView: true,
      style: 'DARK'
    },
    Keyboard: {
      resize: 'body',
      style: 'DARK',
      resizeOnFullScreen: true
    }
  },
  backgroundColor: '#000000',
  server: {
    androidScheme: 'https',
    allowNavigation: ['*']
  }
};

export default config;
