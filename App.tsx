import React, { useEffect } from "react";
import AppNavigator from "@/navigation/AppNavigator";
import { LogBox } from "react-native";

import { SafeAreaProvider } from "react-native-safe-area-context";

import { NavigationContainer } from "@react-navigation/native";
import { navigationRef } from "@/navigation/NavigationService";

import themeData from "@/assets/theme-data";
import { ThemeProvider } from "react-native-theme-component";

import SplashScreen from "react-native-splash-screen";
LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications
import env from "@/env";

import {
  MemberShipService,
  UserProvider,
} from "react-native-user-profile-component";
import {
  WalletProvider,
  ProductInfoProvider,
  WalletService,
  ProductInfoService,
} from "react-native-dashboard-component";

import {
  AuthComponent,
  AuthProvider,
  createAppTokenApiClient,
  createAuthorizedApiClient,
} from "react-native-auth-component";

import {
  FinancialService,
  FinanceProvider,
} from "react-native-financial-profile-component";

import { BranchProvider } from "react-native-branch-component";

// If you wanna avoid overwrite your codes, please add your code inside ignore overwrite block

/* Start ignore overwrite imports block */

/* End ignore overwrite imports block */
// console.log('env ',env);

AuthComponent.instance()
  .configure({
    appId: env.api.appId,
    envId: env.api.envId,
    bankId: env.api.bankId,
    codeVerifier: env.api.codeVerifier,
    codeChallenge: env.api.codeChallenge,
    redirectUrl: env.api.redirectUrl,
    apiBaseUrl: env.api.apiBaseUrl,
    authBaseUrl: env.api.authBaseUrl,
  })
  .then(() => {
    MemberShipService.instance().initClients({
      memberShipClient: createAuthorizedApiClient(
        env.api.apiBaseUrl + env.api.membershipBaseUrl
      ),
    });
    WalletService.instance().initClients({
      walletClient: createAuthorizedApiClient(
        env.api.apiBaseUrl + env.api.walletBaseUrl
      ),
    });
    ProductInfoService.instance().initClients({
      productInfoClient: createAuthorizedApiClient(
        env.api.apiBaseUrl + env.api.bankingProductInfoBaseUrl
      ),
    });
    FinancialService.instance().initClients({
      financialClient: createAuthorizedApiClient(
        env.api.apiBaseUrl + env.api.financialBaseUrl
      ),
    });
  });

const App = () => {
  /* Start ignore overwrite code block */

  /* End ignore overwrite code block */

  // useEffect(() => {
  //   setTimeout(() => SplashScreen.hide(), 2000);
  // });

  return (
    <ThemeProvider theme={themeData}>
      <AuthProvider>
        <UserProvider>
          <BranchProvider>
            <FinanceProvider>
              <ProductInfoProvider>
                <WalletProvider>
                  <SafeAreaProvider>
                    <NavigationContainer ref={navigationRef}>
                      <AppNavigator />
                    </NavigationContainer>
                  </SafeAreaProvider>
                </WalletProvider>
              </ProductInfoProvider>
            </FinanceProvider>
          </BranchProvider>
        </UserProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
