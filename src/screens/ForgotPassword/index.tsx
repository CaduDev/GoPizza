import React, { useState } from 'react';

import { KeyboardAvoidingView, Platform } from 'react-native';

import { useAuth } from '../../hooks/auth';

import { Input } from '../../components/Input';

import { Button } from '../../components/Button';

import brandImg from '../../assets/brand.png';

import {
  Container,
  Content,
  ContentBrand,
  Brand,
  Title,
  LogInButton,
  LogInLabel,
} from './styles';

export function ForgotPassword() {
  const { forgotPassword, isLogging } = useAuth();

  const [email, setEmail] = useState('');

  function handleForgotPassword() {
    forgotPassword(email);
  }

  return (
    <Container>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <Content>
          <ContentBrand>
            <Brand source={brandImg} />
          </ContentBrand>
          <Title>Forgot Password</Title>
          <Input
            placeholder="E-mail"
            type="secondary"
            autoCorrect={false}
            autoCapitalize={"none"}
            onChangeText={setEmail}
          />
          <Button
            title="Enviar"
            type="secondary"
            onPress={handleForgotPassword}
            isLoading={isLogging}
          />
          <LogInButton>
            <LogInLabel>Já tenho uma conta!</LogInLabel>
          </LogInButton>
        </Content>
      </KeyboardAvoidingView>
    </Container>
  );
}