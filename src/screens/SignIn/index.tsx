import React, { useState } from 'react';

import { KeyboardAvoidingView, Platform } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { useAuth } from '../../hooks/auth';

import { Input } from '../../components/Input';

import { Button } from '../../components/Button';

import brandImg from '../../assets/brand.png';

import {
  Container,
  Content,
  Title,
  ContentBrand,
  Brand,
  ForgotPasswordButton,
  FortPasswordLabel,
} from './styles';

export function SignIn() {
  const navigation = useNavigation();
  const { signIn, isLogging } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSignIn() {
    signIn(email, password);
  }

  return (
    <Container>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <Content>
          <ContentBrand>
            <Brand source={brandImg} />
          </ContentBrand>
          <Title>Log In</Title>
          <Input
            placeholder="E-mail"
            type="secondary"
            autoCorrect={false}
            autoCapitalize={"none"}
            onChangeText={setEmail}
          />
          <Input
            placeholder="Senha"
            type="secondary"
            secureTextEntry
            onChangeText={setPassword}
          />
          <ForgotPasswordButton
            onPress={() => navigation.navigate('forgotPassword')}
          >
            <FortPasswordLabel>Esqueci minha senha</FortPasswordLabel>
          </ForgotPasswordButton>
          <Button
            title="Entrar"
            type="secondary"
            onPress={handleSignIn}
            isLoading={isLogging}
          />
        </Content>
      </KeyboardAvoidingView>
    </Container>
  );
}