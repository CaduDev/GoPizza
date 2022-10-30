import React, { useState, useEffect } from 'react';

import firestore from '@react-native-firebase/firestore';

import { FlatList } from 'react-native';

import { useAuth } from '../../hooks/auth';

import { useModal } from '../../components/Alert';

import { OrderCard, OrderProps } from '../../components/OrderCard';

import {
  Container,
  Header,
  Title,
  ItemSeparator,
} from './styles';

export function Orders() {
  const { user } = useAuth();

  const { openModal } = useModal();

  const [orders, setOrders] = useState<OrderProps[]>([]);

  function handlePizzaDelivered(id: string) {
    openModal(
      'Atualização do pedido!',
      'Confirmar que a pizza foi entregue?',
      'Não',
      'Confirmar',
      {
        confirm: () => {
          firestore()
          .collection('orders')
          .doc(id)
          .update({
            status: 'Entregue'
          })
        }
      }
    );
  }

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
          <OrderCard
            index={index}
            data={item}
            disabled={item.status === 'Entregue'}
            onPress={() => handlePizzaDelivered(item.id)}
          />
        )}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 125 }}
        ItemSeparatorComponent={() => <ItemSeparator />}
      />
    </Container>
  );
}