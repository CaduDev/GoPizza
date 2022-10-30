import React from 'react';

import { TouchableOpacity, TouchableOpacityProps } from 'react-native';

import { Image, Placeholder, PlaceholderTitle } from './styles';

type Props = TouchableOpacityProps & {
  uri: string | null;
  onClearPhoto: () => void;
}

export function Photo({ uri, onClearPhoto, ...rest }: Props) {
  if(uri) {
    return (
      <TouchableOpacity onPress={() => onClearPhoto()}>
        <Image source={{ uri }} />
      </TouchableOpacity>
    );
  }

  return (
    <Placeholder {...rest}>
      <PlaceholderTitle>Carregar foto</PlaceholderTitle>
    </Placeholder>
  );
}