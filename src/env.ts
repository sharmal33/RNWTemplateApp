// import config from 'react-native-config';
console.log("process.env ");

const env = {
  api: {
    envId: process.env.EXPO_PUBLIC_ENV_ID, // [auth-component] This line is generated automatically. Please don't remove it
    appId: process.env.EXPO_PUBLIC_APP_ID, // [auth-component] This line is generated automatically. Please don't remove it
    codeChallenge: process.env.EXPO_PUBLIC_CODE_CHALLENGE, // [auth-component] This line is generated automatically. Please don't remove it
    codeVerifier: process.env.EXPO_PUBLIC_CODE_VERIFIER, // [auth-component] This line is generated automatically. Please don't remove it
    bankId: process.env.EXPO_PUBLIC_BANK_ID, // [auth-component] This line is generated automatically. Please don't remove it
    authBaseUrl: process.env.EXPO_PUBLIC_AUTH_BASE_URL, // [auth-component] This line is generated automatically. Please don't remove it
    redirectUrl: process.env.EXPO_PUBLIC_REDIRECT_URL, // [auth-component] This line is generated automatically. Please don't remove it
    apiBaseUrl: process.env.EXPO_PUBLIC_API_BASE_URL, // [auth-component] This line is generated automatically. Please don't remove it
    membershipBaseUrl: process.env.EXPO_PUBLIC_MEMBERSHIP_BASE_URL, // [user-profile-component] This line is generated automatically. Please don't remove it
    walletBaseUrl: process.env.EXPO_PUBLIC_WALLET_BASE_URL, // [dashboard-component] This line is generated automatically. Please don't remove it
    bankingProductInfoBaseUrl:
      process.env.EXPO_PUBLIC_BANKING_PRODUCT_INFO_BASE_URL, // [dashboard-component] This line is generated automatically. Please don't remove it
    financialBaseUrl: process.env.FINANCIAL_BASE_URL, // [financial-profile-component] This line is generated automatically. Please don't remove it
  },
};

console.log("process.env ", env);

export default env;
