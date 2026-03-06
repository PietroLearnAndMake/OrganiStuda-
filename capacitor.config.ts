import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.pietro.organizador.enem',
  appName: 'OrganiStuda',
  webDir: 'dist',
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#000000",
      showSpinner: false,
      androidScaleType: "CENTER_CROP"
    }
  },
  android: {
    allowMixedContent: true,
    backgroundColor: "#000000"
  }
};

export default config;
