import React, { useState } from 'react';

import { Platform, TouchableOpacity, ScrollView, Alert } from 'react-native';

import * as ImagePicker from 'expo-image-picker';

import firestore from '@react-native-firebase/firestore';

import storage from '@react-native-firebase/storage';

import { ButtonBack } from '../../components/ButtonBack';

import { Photo } from '../../components/Photo';

import { Input } from '../../components/Input';

import { InputPrice } from '../../components/InputPrice';

import { Button } from '../../components/Button';

import {
  Container,
  Header,
  Title,
  DeleteLabel,
  Upload,
  PickImageButton,
  Form,
  Label,
  InputGroup,
  InputGroupHeader,
  MaxCharacteres,
} from './styles';

export function Product() {
  const [image, setImage] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [priceSizeP, setPriceSizeP] = useState('');
  const [priceSizeM, setPriceSizeM] = useState('');
  const [priceSizeG, setPriceSizeG] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  async function handlePickerImage() {
    if(image) {
      return setImage("");
    }


    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if(status === 'granted') {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        aspect: [4, 4]
      });

      if(!result.cancelled) {
        setImage(result.uri);
      }
    }
  }

  async function handleAdd() {
    if(!name) {
      return Alert.alert('Cadastro', 'Informe o nome da pizza.');
    }

    if(!description) {
      return Alert.alert('Cadastro', 'Informe a descrição da pizza.');
    }

    if(!image) {
      return Alert.alert('Cadastro', 'Selecione a imagem da pizza.');
    }

    if(!priceSizeP || !priceSizeM || !priceSizeG) {
      return Alert.alert('Cadastro', 'Verifique se preencheu todos os campos de tamanhos da pizza!');
    }

    setIsLoading(true);

    const fileName = new Date().getTime();

    const reference = storage().ref(`/pizzas/${fileName}.png`);

    await reference.putFile(image);

    const photo_url = await reference.getDownloadURL();

    firestore()
      .collection('pizzas')
      .add({
        name,
        name_insensitive: name.toLowerCase().trim(),
        description,
        prices_sizes: {
          p: priceSizeP,
          m: priceSizeM,
          g: priceSizeG,
        },
        photo_url,
        photo_path: reference.fullPath
      })
      .then(() => {
        Alert.alert('Sucesso', 'Pizza cadastrada com sucesso!');

        setImage('');
        setName('');
        setDescription('');
        setPriceSizeP('');
        setPriceSizeM('');
        setPriceSizeG('');
      })
      .catch(() => Alert.alert('Error', 'Não foi possivel cadastrar a pizza!'));
      
      setIsLoading(false);
  }

  return (
    <Container behavior={Platform.OS === 'ios' ?'padding':undefined}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header>
          <ButtonBack />
          <Title>Cadastrar</Title>
          <TouchableOpacity>
            <DeleteLabel>Deletar</DeleteLabel>
          </TouchableOpacity>
        </Header>
        <Upload>
          <Photo uri={image} />
          <PickImageButton
            title={image?"Limpar":"Carregar"}
            type="secondary"
            onPress={handlePickerImage}  
          />
        </Upload>
        <Form>
          <InputGroup>
            <Label>Nome</Label>
            <Input value={name} onChangeText={setName} />
          </InputGroup>
          <InputGroup>
            <InputGroupHeader>
              <Label>Descrição</Label>
              <MaxCharacteres>{description.length} de 60 caracteres</MaxCharacteres>
            </InputGroupHeader>
              <Input
                multiline
                maxLength={60}
                style={{ height: 100 }}
                value={description}
                onChangeText={setDescription}
              />
          </InputGroup>
          <InputGroup>
            <Label>Tamanhos e Preços</Label>
            <InputPrice size="P" value={priceSizeP} onChangeText={setPriceSizeP} />
            <InputPrice size="M" value={priceSizeM} onChangeText={setPriceSizeM} />
            <InputPrice size="G" value={priceSizeG} onChangeText={setPriceSizeG} />
          </InputGroup>
          <Button
            title="Cadastrar pizza"
            isLoading={isLoading}
            onPress={handleAdd}
          />
        </Form>
      </ScrollView>
    </Container>
  );
}