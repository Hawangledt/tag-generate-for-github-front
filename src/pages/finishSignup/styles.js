import styled from 'styled-components';
import { Form } from '@unform/web';

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: stretch;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const Background = styled.div`
flex: 1;
`;

export const ContainerForm = styled(Form)`
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
h1 {
  margin-top: 100px;
  text-align: center;
}
`;