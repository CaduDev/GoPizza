import React from 'react';

import { ActivityIndicator } from 'react-native';

import { useTheme } from 'styled-components';

import { Container, Title } from './styles';

type Props = {
  title: string;
}

export function Loading({ title }: Props) {
  const { COLORS } = useTheme();

  return (
    <Container>
      <ActivityIndicator color={COLORS.PRIMARY_100} size="large" />
      <Title>{title}</Title>
    </Container>
  );
}