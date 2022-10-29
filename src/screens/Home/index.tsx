import React, { useState, useCallback } from 'react';

import { TouchableOpacity, FlatList } from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';

import firestore from '@react-native-firebase/firestore';

import { useNavigation, useFocusEffect } from '@react-navigation/native';

import { useTheme } from 'styled-components/native';

import { useAuth } from '../../hooks/auth';

import { Search } from '../../components/Search';

import { ProductCard, ProductProps } from '../../components/ProductCard';

import { Alert } from '../../components/Alert';

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

export function Home() {
  const navigation = useNavigation();
  
  const { signOut, user } = useAuth();

  const { COLORS } = useTheme();

  const [modal, setModal] = useState({
    showModal: false,
    title: "Erro!",
    description: "Não foi possivel realizar a consulta!",
    textCancel: "",
    textConfirm: "Ok",
    functionCancel: () => {},
    functionConfirm: () => setModal({...modal, showModal: false, }),
  });
  
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
    .catch(() => setModal({...modal, showModal: true }));
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
      {user && <NewProductButton
        title="Cadastrar Pizza"
        type="secondary"
        onPress={handleAdd}
      />}
      <Alert 
        showModal={modal.showModal}
        title={modal.title}
        description={modal.description}
        textCancel={modal.textCancel}
        functionCancel={modal.functionCancel}
        textConfirm={modal.textConfirm}
        functionConfirm={modal.functionConfirm}
      />
    </Container>
  );
}