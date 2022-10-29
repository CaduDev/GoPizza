import React from 'react';

import { View } from 'react-native';

import {
  Modal,
  Container,
  Content,
  Header,
  Title,
  Description,
  FooterModal,
  ActionButtonModal,
  TitleAction,
} from './styles';

export type AlertProps = {
  showModal: boolean;
  title: string;
  description: string;
  textCancel?: string;
  textConfirm?: string;
  functionCancel: () => void;
  functionConfirm: () => void;
}

export function Alert({
  showModal=false,
  title="Alerta!",
  description="Descrição!",
  textCancel="Cancelar",
  textConfirm="Confirmar",
  functionCancel,
  functionConfirm,
}: AlertProps) {
  return (
    <Modal visible={showModal}>
      <Container>
        <Content>
          <Header>
            <Title>{title}</Title>
            <Description>{description}</Description>
          </Header>
          <FooterModal>
            {textCancel ? (
              <ActionButtonModal onPress={functionCancel}>
                <TitleAction style={{ color: '#B83341' }}>{textCancel}</TitleAction>
              </ActionButtonModal>
            ): <View style={{ width: 20}} />}
            {textConfirm && (
              <ActionButtonModal onPress={functionConfirm}>
                <TitleAction style={{ color: '#528F33' }}>{textConfirm}</TitleAction>
              </ActionButtonModal>
            )}
          </FooterModal>
        </Content>
      </Container>
    </Modal>
  );
}