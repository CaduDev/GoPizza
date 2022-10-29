import React, { useState, useEffect } from 'react';

import {
  Platform,
  TouchableOpacity,
  ScrollView,
  View,
} from 'react-native';

import * as ImagePicker from 'expo-image-picker';

import firestore from '@react-native-firebase/firestore';

import storage from '@react-native-firebase/storage';

import { useNavigation, useRoute } from '@react-navigation/native';

import { ProductNavigationProps } from '../../@types/navigation';

import { ProductProps } from '../../components/ProductCard';

import { ButtonBack } from '../../components/ButtonBack';

import { Photo } from '../../components/Photo';

import { Input } from '../../components/Input';

import { InputPrice } from '../../components/InputPrice';

import { Button } from '../../components/Button';

import { Loading } from '../../components/Loading';

import { Alert } from '../../components/Alert';

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

type PizzaResponse = ProductProps & {
  photo_path: string;
  prices_sizes: {
    p: string;
    m: string;
    g: string;
  }
}

export function Product() {
  const navigation = useNavigation();
  const route = useRoute();

  const { id } = route.params as ProductNavigationProps;

  const [image, setImage] = useState('');
  const [photoPath, setPhotoPath] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [priceSizeP, setPriceSizeP] = useState('');
  const [priceSizeM, setPriceSizeM] = useState('');
  const [priceSizeG, setPriceSizeG] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingProduct, setIsLoadingProduct] = useState(true);
  const [modal, setModal] = useState({
    showModal: false,
    title: "Erro!",
    description: "Não foi possivel realizar a consulta!",
    textCancel: "",
    textConfirm: "Ok",
    functionCancel: () => setModal({...modal, showModal: false, }),
    functionConfirm: () => setModal({...modal, showModal: false, }),
  });

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
      return setModal({
        ...modal, 
        showModal: true,
        title: 'Cadastro',
        textCancel: '',
        description: 'Informe o nome da pizza.'
      });
    }

    if(!description) {
      return setModal({
        ...modal, 
        showModal: true,
        title: 'Cadastro',
        textCancel: '',
        description: 'Informe a descrição da pizza.'
      });
    }

    if(!image) {
      return setModal({
        ...modal, 
        showModal: true,
        title: 'Cadastro',
        textCancel: '',
        description: 'Selecione a imagem da pizza.'
      });
    }

    if(!priceSizeP || !priceSizeM || !priceSizeG) {
      return setModal({
        ...modal, 
        showModal: true,
        title: 'Cadastro',
        textCancel: '',
        description: 'Verifique se preencheu todos os campos de tamanhos da pizza.'
      });
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
        setModal({
          ...modal, 
          showModal: true,
          title: 'Sucesso',
          textCancel: '',
          description: 'Pizza cadastrada com sucesso!',
          functionConfirm: () => navigation.navigate('home'),
        });

        setImage('');
        setName('');
        setDescription('');
        setPriceSizeP('');
        setPriceSizeM('');
        setPriceSizeG('');
      })
      .catch(() => {
        setModal({
          ...modal, 
          showModal: true,
          title: 'Erro',
          textCancel: '',
          description: 'Não foi possivel cadastrar a pizza!'
        });
        setIsLoading(false);
      });
  }

  function handleGoBack() {
    navigation.goBack();
  }

  function handleDelete() {
    firestore()
    .collection('pizzas')
    .doc(id)
    .delete()
    .then(() => {
      storage()
      .ref(photoPath)
      .delete()
      .then(() => navigation.navigate('home'))
    })
    .catch(() => {
      setModal({
        ...modal, 
        showModal: true,
        title: 'Erro',
        textCancel: "",
        description: 'Ocorreu um erro ao tentar deletar o produto!'
      });
    });
  }

  useEffect(() => {
    if(id) {
      firestore()
      .collection('pizzas')
      .doc(id)
      .get()
      .then(response => {
        const product = response.data() as PizzaResponse;

        setName(product.name);
        setImage(product.photo_url)
        setDescription(product.description);
        setPriceSizeP(product.prices_sizes.p);
        setPriceSizeM(product.prices_sizes.m);
        setPriceSizeG(product.prices_sizes.g);
        setPhotoPath(product.photo_path);
        setIsLoadingProduct(false);
      })
      .catch(() => {
        setModal({
          ...modal, 
          showModal: true,
          title: 'Erro',
          textCancel: "",
          description: 'Não foi possivel carregar os dados do produto'
        });
      })
    } else {
      setIsLoadingProduct(false);
    }
  }, [id]);

  return (
    <Container behavior={Platform.OS === 'ios' ?'padding':undefined}>
      <Header>
        <ButtonBack onPress={handleGoBack} />
        <Title>Cadastrar</Title>
        {id ? (
          <TouchableOpacity onPress={() => {
            setModal({
              showModal: true,
              title: "Aviso!",
              description: "Tem certeza que deseja apagar esse produto?",
              textCancel: "Cancelar",
              textConfirm: "Ok",
              functionCancel: () => setModal({...modal, showModal: false, }),
              functionConfirm: () => handleDelete(),
            });
          }}>
            <DeleteLabel>Deletar</DeleteLabel>
          </TouchableOpacity>
        ): <View style={{ width: 20 }} />}
      </Header>
      {!isLoadingProduct ? (
        <ScrollView showsVerticalScrollIndicator={false}>
          <Upload>
            <Photo uri={image} />
            {!id && (
              <PickImageButton
                title={image?"Limpar":"Carregar"}
                type="secondary"
                onPress={handlePickerImage}  
              />
            )}
          </Upload>
          <Form>
            <InputGroup>
              <Label>Nome</Label>
              <Input value={name} onChangeText={setName} editable={!id} />
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
                  editable={!id}
                />
            </InputGroup>
            <InputGroup>
              <Label>Tamanhos e Preços</Label>
              <InputPrice
                size="P"
                value={priceSizeP}
                onChangeText={setPriceSizeP}
                editable={!id}
              />
              <InputPrice
                size="M"
                value={priceSizeM}
                onChangeText={setPriceSizeM}
                editable={!id}
              />
              <InputPrice
                size="G"
                value={priceSizeG}
                onChangeText={setPriceSizeG}
                editable={!id}
              />
            </InputGroup>
            {!id && (
              <Button
                title="Cadastrar Pizza"
                isLoading={isLoading}
                onPress={handleAdd}
              />
            )}
          </Form>
          <Alert 
            showModal={modal.showModal}
            title={modal.title}
            description={modal.description}
            textCancel={modal.textCancel}
            functionCancel={modal.functionCancel}
            textConfirm={modal.textConfirm}
            functionConfirm={modal.functionConfirm}
          />
        </ScrollView>
      ) : (
        <Loading title={id ? "Carregando produto...": "Carregando..." } />
      )}
    </Container>
  );
}