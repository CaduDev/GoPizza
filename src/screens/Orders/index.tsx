import React, { useState, useEffect } from 'react';

import firestore from '@react-native-firebase/firestore';

import { FlatList } from 'react-native';

import { useAuth } from '../../hooks/auth';

import { OrderCard, OrderProps } from '../../components/OrderCard';

import {
  Container,
  Header,
  Title,
  ItemSeparator,
} from './styles';

export function Orders() {
  const { user } = useAuth();

  const [orders, setOrders] = useState<OrderProps[]>([]);

  useEffect(() => {
    const subscribe = firestore()
    .collection('orders')
    .where('waiter_id', '==', user?.id)
    .onSnapshot(querySnapShot => {
      const data = querySnapShot.docs.map(doc => {
        return {
          id: doc.id,
          ...doc.data()
        }
      }) as OrderProps[];

      setOrders(data);
    });

    return () => subscribe();
  }, []);

  return (
    <Container>
      <Header>
        <Title>Pedidos Feitos</Title>
      </Header>
      <FlatList 
        data={orders}
        keyExtractor={item => item.id}
        renderItem={({ item, index }) => (
          <OrderCard index={index} data={item} />
        )}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 125 }}
        ItemSeparatorComponent={() => <ItemSeparator />}
      />
    </Container>
  );
}