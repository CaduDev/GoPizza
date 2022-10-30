import styled, { css } from 'styled-components/native';

export const Content = styled.View`
  padding-horizontal: 14px;
`;

export const Title = styled.Text`
  font-size: 18px;
  color: #0000003d;
  font-weight: 800;

  ${({ theme }) => css`
    font-family: ${theme.FONTS.TEXT};
  `};
`;

export const Description = styled.Text`
  font-size: 20px;
  color: #0000003d;
  font-weight: 800;
  width: 100%;
  align-content: flex-start;
  max-width: 300px;
  line-height: 20px;
  margin-top: 10px;
  padding-bottom: 10px;

  ${({ theme }) => css`
    font-family: ${theme.FONTS.TEXT};
  `}; 
`;

