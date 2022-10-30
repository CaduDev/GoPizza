import styled from 'styled-components/native';

export const Container = styled.Modal.attrs({
  animationType: "slide",
  transparent: true,
})``;

export const ContentModal = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.SHAPE} 
`;