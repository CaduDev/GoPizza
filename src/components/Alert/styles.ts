import styled, { css } from 'styled-components/native';

import { RectButton } from 'react-native-gesture-handler';

export const Modal = styled.Modal.attrs({
  animationType: "fade",
  transparent: true,
})``;

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background: rgba(0,0,0,0.6);
  padding: 0px 20px;
`;

export const Content = styled.View`
  width: 100%;
  height: 200px;
  background: ${({ theme }) => theme.COLORS.SHAPE};
  border-radius: 8px;
  elevation: 1;
  padding: 20px;
  justify-content: space-between;
`;

export const Header = styled.View`
  width: 100%;
`;

export const Title = styled.Text`
  font-size: 20px;
  font-weight: 800;

  ${({ theme }) => css`
    color: ${theme.COLORS.ALERT_900};
    font-family: ${theme.FONTS.TEXT};
  `};
`;

export const Description = styled.Text`
  font-size: 18px;
  font-weight: 600;
  margin-top: 20px;

  ${({ theme }) => css`
    color: ${theme.COLORS.ALERT_800};
    font-family: ${theme.FONTS.TEXT};
  `};
`;

export const FooterModal = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
`;

export const ActionButtonModal = styled.TouchableOpacity`
  padding: 18px 20px;
  width: 42%;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
`;

export const TitleAction = styled.Text`
  
`;