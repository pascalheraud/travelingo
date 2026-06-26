/// <reference types="@capacitor-community/safe-area" />

import type { CapacitorConfig } from '@capacitor/cli';
import { SystemBarsStyle } from '@capacitor-community/safe-area';

const config: CapacitorConfig = {
  appId: 'com.travelingo.app',
  appName: 'Travelingo',
  webDir: 'dist',
  plugins: {
    SafeArea: {
      statusBarStyle: SystemBarsStyle.Dark,
      navigationBarStyle: SystemBarsStyle.Dark,
    },
  },
};

export default config;
