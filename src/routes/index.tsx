import React from 'react';

import { NavigationContainer } from '@react-navigation/native';

import { useAuth } from '../hooks/auth';

import { UserStackRoutes } from './user.stack.routes';

import { AuthStackRoutes } from './auth.stack.routes';

export function Routes() {
  const { user } = useAuth(); 

  return (
    <NavigationContainer>
      {user ? <UserStackRoutes /> : <AuthStackRoutes />}
    </NavigationContainer>
  );
}