import styled, { css } from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const Title = styled.Text`
  font-size: 14px;
  margin-top: 10px;
  
  ${({ theme }) => css`
    font-family: ${theme.FONTS.TEXT};
    color: ${theme.COLORS.SECONDARY_900};
  `};
`;