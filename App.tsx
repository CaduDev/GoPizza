import React from 'react';

import AppLoading from 'expo-app-loading';

import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { StatusBar } from 'expo-status-bar';

import { useFonts, DMSans_400Regular } from '@expo-google-fonts/dm-sans';

import { DMSerifDisplay_400Regular } from '@expo-google-fonts/dm-serif-display';

import { ThemeProvider } from 'styled-components';

import theme from './src/theme/index';

import { AuthProvider } from './src/hooks/auth';

import { AlertProvider } from './src/components/Alert';

import { DropdownProvider } from './src/components/AlertDropdown';

import { Routes } from './src/routes';

export default function App() {
  const [fontsLoaded] = useFonts({
    DMSans_400Regular,
    DMSerifDisplay_400Regular,
  });

  if(!fontsLoaded) {
    return <AppLoading />
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider theme={theme}>
        <StatusBar style='light' translucent backgroundColor='transparent' />
        <DropdownProvider>
          <AlertProvider>
            <AuthProvider>
              <Routes />
            </AuthProvider>
          </AlertProvider>
        </DropdownProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
