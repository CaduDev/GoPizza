import React, { useEffect, useState } from 'react';

import { TouchableOpacity, Alert, FlatList } from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';

import firestore from '@react-native-firebase/firestore';

import { useTheme } from 'styled-components/native';

import { Search } from '../../components/Search';

import { ProductCard, ProductProps } from '../../components/ProductCard';

import happyEmoji from '../../assets/happy.png';

import {
  Container,
  Header,
  Greeting,
  GreetingEmoji,
  GreetingText,
  MenuHeader,
  Title,
  MenuItemsNumber,
} from './styles';

export function Home() {
  const { COLORS } = useTheme();

  const [pizzas, setPizzas] = useState<ProductProps[]>([]);

  function fetchPizzas(value: string) {
    const formattedValue = value.toLowerCase().trim();

    firestore()
    .collection('pizzas')
    .orderBy('name_insensitive')
    .startAt(formattedValue)
    .endAt(`${formattedValue}\uf8ff`)
    .get()
    .then(response => {
      const data = response.docs.map(doc => {
        return {
          id: doc.id,
        ...doc.data(),
        }
      }) as ProductProps[];

      setPizzas(data);
    })
    .catch(() => Alert.alert('Error', 'Não foi possivel realizar a consulta!'));
  }

  useEffect(() => {
    fetchPizzas('');
  }, [])

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
      <MenuHeader>
        <Title>Cardápio</Title>
        <MenuItemsNumber>{pizzas.length} pizzas</MenuItemsNumber>
      </MenuHeader>
      <FlatList
        data={pizzas}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <ProductCard data={item} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: 20,
          paddingBottom: 125,
          marginHorizontal: 24,
        }}
      />
    </Container>
  );
}