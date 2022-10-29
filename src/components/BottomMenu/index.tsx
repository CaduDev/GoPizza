import React from 'react';

import { View } from 'react-native';

import {
  Container,
  Title,
  Notification,
  Quantity,
} from './styles';

type Props = {
  title: string;
  color: string;
  notifications?: string | undefined;
}

export function BottomMenu({ title, color, notifications }: Props) {
  const noNotifications = notifications === ''; 
  
  return (
    <Container>
      <Title color={color}>{title}</Title>
      {noNotifications && (
        <Notification noNotifations={noNotifications}>
          <Quantity noNotifations={noNotifications}>{notifications}</Quantity>
        </Notification>
      )}
    </Container>
  );
}