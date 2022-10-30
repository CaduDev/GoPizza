import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { SignIn } from '../screens/SignIn';

import { ForgotPassword } from '../screens/ForgotPassword';

const { Navigator, Screen } = createNativeStackNavigator();

export function AuthStackRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }} initialRouteName="signIn">
      <Screen
        name="signIn"
        component={SignIn}
      />
      <Screen
        name="forgotPassword"
        component={ForgotPassword}
      />
    </Navigator>
  );
}