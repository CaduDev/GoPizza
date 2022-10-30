import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
} from "react";

import { MaterialIcons } from '@expo/vector-icons';

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated';

import {
  Title,
  Description,
  Content
} from './styles';

type AlertDropdownProps = {
  openDropdown: (
    type: 'success' | 'error',
    title: string,
    description: string
  ) => void
}

type Props = {
  children: ReactNode;
}

export const DropdownContext = createContext({} as AlertDropdownProps);

function DropdownProvider({ children }: Props){
  const [type, setType] = useState('success');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const animation = useSharedValue(-180);
  const animationOpacity = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      top: withTiming(animation.value),
      opacity: withTiming(animationOpacity.value)
    }
  });

  function openDropdown(
    type: 'success' | 'error',
    title: string,
    description: string
  ) {
    setType(type);
    setTitle(title);
    setDescription(description);

    animation.value = 0;
    animationOpacity.value = 1;

    setTimeout(() => {
      animation.value = -180;
      animationOpacity.value = 0;    
    }, 3000);
  }

  return (
    <DropdownContext.Provider value={{ openDropdown }}>
      {children}
      <Animated.View
        style={[{
          width: '100%',
          minHeight: 150,
          backgroundColor: type === 'error' ? '#ecc8c5' : '#def2d6',
          top: 0,
          position: 'absolute',
          zIndex: 9,
          paddingHorizontal: 20,
          paddingTop: 40,
          flexDirection: 'row',
          alignItems: 'center',
          elevation: 2,
        }, animatedStyle]}
      >
        <MaterialIcons
          name={type === 'success'?'check-circle-outline':'error-outline'}
          size={44}
          color="#0000003d"
        />
        <Content>
          <Title>{title}</Title>
          <Description>{description}</Description>
        </Content>
      </Animated.View>
    </DropdownContext.Provider>
  );
}

function useDropdown() {
  const context = useContext(DropdownContext);

  return context;
}

export { DropdownProvider, useDropdown }