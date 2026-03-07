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
    NavigationBar: {
      visibility: 'hidden'
    }
  }
};

export default config;
