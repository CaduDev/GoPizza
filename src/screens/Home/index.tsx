import React from 'react';

import { TouchableOpacity } from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';

import { useTheme } from 'styled-components/native';

import { Search } from '../../components/Search';

import happyEmoji from '../../assets/happy.png';

import {
  Container,
  Header,
  Greeting,
  GreetingEmoji,
  GreetingText,
} from './styles';

export function Home() {
  const { COLORS } = useTheme();

  return (
    <Container>
      <Header>
        <Greeting>
          <GreetingEmoji source={happyEmoji} />
          <GreetingText>Olá, Admin</GreetingText>
        </Greeting>
        <TouchableOpacity>
          <MaterialIcons
            name="logout"
            size={24}
            color={COLORS.TITLE}
          />
        </TouchableOpacity>
      </Header>
      <Search onSearch={() => {}} onClear={() => {}} />
    </Container>
  );
}