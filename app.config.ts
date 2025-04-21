import { ExpoConfig, ConfigContext } from '@expo/config';
import * as dotenv from 'dotenv';

// initialize dotenv
dotenv.config();

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  slug: 'occupai',
  name: 'occupai',
  android: {
    ...config.android,
    package: 'com.alyssapalmer.occupai',
    adaptiveIcon: {
      foregroundImage: './assets/images/occupai-logo.png',
      backgroundColor: '#FFFFFF',
    },
    googleServicesFile: process.env.GOOGLE_SERVICES_JSON,
  }
});
