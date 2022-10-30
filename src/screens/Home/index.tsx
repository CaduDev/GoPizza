import React, { useState, useCallback } from 'react';

import { TouchableOpacity, FlatList } from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';

import firestore from '@react-native-firebase/firestore';

import { useNavigation, useFocusEffect } from '@react-navigation/native';

import { useTheme } from 'styled-components/native';

import { useAuth } from '../../hooks/auth';

import { Search } from '../../components/Search';

import { ProductCard, ProductProps } from '../../components/ProductCard';

import { useModal } from '../../hooks/Alert';

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
  LabelListEmptyComponent,
  NewProductButton,
} from './styles';
import { Button } from '../../components/Button';

export function Home() {
  const navigation = useNavigation();
  
  const { signOut, user } = useAuth();

  const { openModal } = useModal();

  const { COLORS } = useTheme();
  
  const [pizzas, setPizzas] = useState<ProductProps[]>([]);
  const [search, setSearch] = useState('');

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
    .catch(() => {
      openModal(
        'Erro!',
        'Não fo possivel carregar a lista de produtos.',
        '',
        'Ok',
        {
          cancel: false,
        }
      );
    });
  }

  function handleSearch() {
    fetchPizzas(search);
  }

  function handleSearchClear() {
    setSearch('');

    fetchPizzas('');
  }

  function handleOpen(id: string) {
    const route = user?.isAdmin ? 'product' : 'order';
    
    navigation.navigate(route, { id });
  }

  function handleAdd() {
    navigation.navigate('product', {});
  }

  function teste() {
    openModal(
      'Erro!',
      'Não fo possivel carregar a lista de produtos.',
      '',
      'Ok',
      {
        cancel: false,
      }
    );
  }

  useFocusEffect(useCallback(() => {
    fetchPizzas('');
  }, []));

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
            onPress={signOut}
          />
        </TouchableOpacity>
      </Header>
      <Search
        onChangeText={setSearch}
        value={search}
        onSearch={handleSearch}
        onClear={handleSearchClear}
      />
      <MenuHeader>
        <Title>Cardápio</Title>
        <MenuItemsNumber>{pizzas.length} pizzas</MenuItemsNumber>
      </MenuHeader>
      <FlatList
        data={pizzas}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <ProductCard
            data={item}
            onPress={() => handleOpen(item.id)}
          />
        )}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<LabelListEmptyComponent>Nenhum valor encontrado!</LabelListEmptyComponent>}
        contentContainerStyle={{
          paddingTop: 20,
          paddingBottom: 125,
          marginHorizontal: 24,
        }}
      />
      <Button title="Testar Dropdawn Alert" onPress={teste} />
      {user?.isAdmin && <NewProductButton
        title="Cadastrar Pizza"
        type="secondary"
        onPress={handleAdd}
      />}
    </Container>
  );
}