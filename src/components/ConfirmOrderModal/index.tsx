import React from 'react';

import {
  Container,
  ContentModal
} from './styles';

type Props = {
  data: {
    quantity: number;
    amount: string | number;
    pizza: string;
    size: string;
    table_number: string;
    status: 'Preparando' | 'Pronto' | 'Entregue';
    waiter_id: string | undefined;
    image: string;
  },
  closedModal: () => void;
  showModal: boolean;
}

export function ConfirmOrderModal({ data, showModal, closedModal }: Props) {
  return (
    <Container visible={showModal}>
      <ContentModal>

      </ContentModal>
    </Container>
  );
}