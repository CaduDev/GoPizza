import React, { useState, useEffect } from 'react';

import { Platform } from 'react-native';

import { useNavigation, useRoute } from '@react-navigation/native';

import firestore from '@react-native-firebase/firestore';

import { useAuth } from '../../hooks/auth';

import { ButtonBack } from '../../components/ButtonBack';

import { RadioButton } from '../../components/RadioButton';

import { Input } from '../../components/Input';

import { Button } from '../../components/Button';

import { OrderNavigationProps } from '../../@types/navigation';

import { ProductProps } from '../../components/ProductCard';

import { ConfirmOrderModal } from '../../components/ConfirmOrderModal';

import { useDropdown } from '../../components/AlertDropdown';

import { PIZZA_TYPES } from '../../utils/pizzaTypes';

// import { Animated }

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
import { NewProductButton } from '../Home/styles';

type PizzaResponse = ProductProps & {
  prices_sizes: {
    [key: string]: number;
  }
}

export function Order() {
  const navigation = useNavigation();

  const { openDropdown } = useDropdown();

  const { user } = useAuth();

  const route = useRoute();
  const { id } = route.params as OrderNavigationProps;

  const [size, setSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [tableNumber, setTableNumber] = useState('');
  const [pizza, setPizza] = useState<PizzaResponse>({} as PizzaResponse);
  const [sendingOrder, setSendingOrder] = useState(false);
  const [confirmOrderModal, setConfirmOrderModal] = useState(true);

  const amount = size ? pizza.prices_sizes[size] * quantity: '0,00';

  function handleGoBack() {
    navigation.goBack();
  }

  function handleCloseModal() {
    
  }

  async function handleOrder() {
    if(!size) {
      return openDropdown('error', 'Aviso!','Selecione o tamanho da pizza.');
    }

    if(!tableNumber) {
      return openDropdown('error', 'Aviso!','Informe o número da mesa.');
    }

    if(!quantity) {
      return openDropdown('error', 'Aviso!','Informe a quantidade de pizzas.');
    }

    setSendingOrder(true);

    firestore()
    .collection('orders')
    .add({
      quantity,
      amount,
      pizza: pizza.name,
      size,
      table_number: tableNumber,
      status: 'Preparando',
      waiter_id: user?.id,
      image: pizza.photo_url,
    })
    .then(() => {
      navigation.navigate('home');

      return openDropdown('success', 'Sucesso!','Pedido realizado com sucesso.'); 
    })
    .catch(() => {
      return openDropdown('error', 'Aviso!','Não foi possivel realizar o pedido.');
    })
  }

  useEffect(() => {
    if(id) {
      firestore()
      .collection('pizzas')
      .doc(id)
      .get()
      .then(response => setPizza(response.data() as PizzaResponse))
      .catch(() => {
        return openDropdown('error', 'Aviso!','Não foi possível carregar o produto.');
      });
    }
  }, [id]);

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
        <Photo source={{ uri: pizza.photo_url }}/>
        <Form>
          <Title>{pizza.name}</Title>
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
                onChangeText={setTableNumber}
                value={tableNumber}
              />
            </InputGroup>
            <InputGroup>
              <Label>Quantidade</Label>
              <Input
                keyboardType='numeric'
                onChangeText={value => setQuantity(Number(value))}
                value={quantity.toString()}
              />
            </InputGroup>
          </FormRow>
          <Price>Valor de R$ {amount}</Price>
          <Button
            title="Confirmar Pedido"
            onPress={handleOrder}
          />
        </Form>
      </ContentScroll>
    </Container>
  );
}