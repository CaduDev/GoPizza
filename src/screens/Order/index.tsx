import React, { useState } from 'react';

import { Platform } from 'react-native';

import { useNavigation, useRoute } from '@react-navigation/native';

import { ButtonBack } from '../../components/ButtonBack';

import { RadioButton } from '../../components/RadioButton';

import { Input } from '../../components/Input';

import { Button } from '../../components/Button';

import { PIZZA_TYPES } from '../../utils/pizzaTypes';

import {
  Container,
  ContentScroll,
  Header,
  Photo,
  Form,
  Sizes,
  Title,
  Label,
  InputGroup,
  FormRow,
  Price,
} from './styles';

export function Order() {
  const navigation = useNavigation();

  const [size, setSize] = useState('');

  function handleGoBack() {
    navigation.goBack();
  }

  return (
    <Container behavior={Platform.OS === 'ios' ?'padding':undefined}>
      <ContentScroll>
        <Header>
          <ButtonBack 
            onPress={handleGoBack}
            style={{
              marginBottom: 108
            }}
          />
        </Header>
        <Photo
          source={{ uri: 'https://github.com/caduDev.png'}}
        />
        <Form>
            <Title>Nome da Pizza</Title>
            <Label>Selecione um tamanho</Label>
          <Sizes>
            {PIZZA_TYPES.map(item => {
              return (
                <RadioButton
                  key={item.id}
                  title={item.name}
                  selected={size === item.id}
                  onPress={() => setSize(item.id)}
                />
              ) 
            })}
          </Sizes>
          <FormRow>
            <InputGroup>
              <Label>Número da mesa</Label>
              <Input
                keyboardType='numeric'
                
              />
            </InputGroup>
            <InputGroup>
              <Label>Quantidade</Label>
              <Input
                keyboardType='numeric'

              />
            </InputGroup>
          </FormRow>
          <Price>Valor de R$ 00,00</Price>
          <Button
            title="Confirmar Pedido"
          />
        </Form>
      </ContentScroll>
    </Container>
  );
}