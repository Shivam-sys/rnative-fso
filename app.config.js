import "dotenv/config";

export default {
  name: "rate-repository-app",
  slug: "rate-repository-app",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "light",
  splash: {
    image: "./assets/splash.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff",
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    supportsTablet: true,
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#ffffff",
    },
    package: "com.shivam.repositoryApp",
  },
  web: {
    favicon: "./assets/favicon.png",
  },
  extra: {
    apolloUrl: process.env.APOLLO_URI,
    eas: {
      projectId: "4c6d4b8a-dbf3-4213-bd46-e13cf3cd76c3",
    },
  },
};
