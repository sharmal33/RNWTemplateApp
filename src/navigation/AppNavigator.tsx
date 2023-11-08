import {createStackNavigator} from '@react-navigation/stack';
import React, {useEffect} from 'react';
import {getSecureData} from '@/utils/keychainStorage';
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';
import {useAuth} from 'react-native-auth-component';
import Route from './routes';

type StackNavigatorProps = React.ComponentProps<typeof Stack.Navigator>;

export type AppNavigatorParams = {
  [Route.AUTH_NAVIGATOR]: undefined;
  [Route.MAIN_NAVIGATOR]: undefined;
};

const Stack = createStackNavigator();

const AppNavigator = (props: Partial<StackNavigatorProps>) => {
  const {user} = useAuth();

  return (
    <Stack.Navigator {...props} headerMode="none">
      {user ? (
        <Stack.Screen name={Route.MAIN_NAVIGATOR} component={MainNavigator} />
      ) : (
        <Stack.Screen
          name={Route.AUTH_NAVIGATOR}
          component={AuthNavigator}
          options={{
            animationTypeForReplace: user ? 'push' : 'pop',
          }}
        />
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;
