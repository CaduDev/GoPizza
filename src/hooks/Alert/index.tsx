import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

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

type OptionsFunctionActionProps = {
  cancel?: (() => void) | boolean;
  confirm?: (() => void) | boolean;
}

type AlertContext = {
  openModal: (
    title: string,
    description: string,
    titleCancelAction?: string,
    titleConfirmAction?: string,
    optionsFunctionAction?: OptionsFunctionActionProps,
  ) => void;
  closeModal: () => void;
}

type Props = {
  children: ReactNode;
}

export const AlertContext = createContext({} as AlertContext);

const DEFAULT_FUNCTION: OptionsFunctionActionProps = {
  cancel: () => {},
  confirm: () => {},
}

function AlertProvider({ children }: Props) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [titleCancel, setTitleCancel] = useState('');
  const [titleConfirm, setTitleConfirm] = useState('');
  const [action, setAction] = useState<OptionsFunctionActionProps>(DEFAULT_FUNCTION);

  function openModal(
    title: string,
    description: string,
    titleCancelAction: any,
    titleConfirmAction: any,
    optionsFunctionAction?: OptionsFunctionActionProps,
  ) {
    setOpen(true);
    setTitle(title);
    setDescription(description);
    setTitleCancel(titleCancelAction||'Cancelar');
    setTitleConfirm(titleConfirmAction||'Confirmar');

    const optionsFunctionActionCover: OptionsFunctionActionProps = {
      ...DEFAULT_FUNCTION,
      ...optionsFunctionAction,
    }

    setAction(optionsFunctionActionCover);
  }

  function closeModal() {
    setOpen(false);
  }

  function handleCancelModal() {
    if(typeof action.cancel === 'function') {
      action.cancel();
    }
    
    setOpen(false);
  }

  function handleConfirmModal() {
    if(typeof action.confirm === 'function') {
      action.confirm();
    }

    setOpen(false)
  }

  return (
    <AlertContext.Provider value={{ openModal, closeModal }}>
      {children}
      <Modal visible={open}>
        <Container>
          <Content>
            <Header>
              <Title>{title}</Title>
              <Description>{description}</Description>
            </Header>
            <FooterModal>
              {!!action.cancel ? (
                <ActionButtonModal onPress={handleCancelModal}>
                  <TitleAction style={{ color: '#B83341' }}>{titleCancel}</TitleAction>
                </ActionButtonModal>
              ): <View style={{ width: 20}} />}
              {!!action.confirm && (
                <ActionButtonModal onPress={handleConfirmModal}>
                  <TitleAction style={{ color: '#528F33' }}>{titleConfirm}</TitleAction>
                </ActionButtonModal>
              )}
            </FooterModal>
          </Content>
        </Container>
      </Modal>
    </AlertContext.Provider>
  );
}

function useModal() {
  const context = useContext(AlertContext);

  return context;
}

export { AlertProvider, useModal }