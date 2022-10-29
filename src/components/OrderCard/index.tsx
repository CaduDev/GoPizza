import React from 'react';

import { TouchableOpacityProps } from 'react-native';

import {
  Container,
  Image,
  Name,
  Description,
  StatusContainer,
  StatusLabel,
  StatusTypeProps,
} from './styles';

type Props = TouchableOpacityProps & {
  index: number;
}

export function OrderCard({ index, ...rest }: Props) {
  return (
    <Container index={index} {...rest}>
      <Image source={{ uri: 'https://github.com/caduDev.png' }} />
      <Name>4 Queijos</Name>
      <Description>
        Mesa 5 • Qnt: 1
      </Description>
      <StatusContainer status="Preparando">
        <StatusLabel>Preparando</StatusLabel>
      </StatusContainer>
    </Container>
  );
}