import styled from 'styled-components';

export const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 2rem;
  padding-right: 2rem;
  margin-bottom: 40px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const Button = styled.button`
  margin-top: 40px;
  padding: 1.2rem;
  border: 0.1rem #FFFFFF solid;
  border-radius: 20px;
  color: black;
//   font-weight: bold;
  font-size: 25px;
  cursor: pointer;
//   background-color: #02c8cc;
background-color: #ffc107;

  &:hover {
    // border: 0.1rem #ab8105 solid;
    // color: #057375;
    background-color: #e6ae09;
  }
`;

export const CloseButton = styled(Button)`
padding: 0.35rem 0.7rem 0.35rem 0.7rem !important;
position: absolute;
right: 1%;
top: 1%;
color: white !important;
margin-top: 0px;
border-radius: 50px;
font-size: 18px;
background-color: #02c8cc;

&:hover {
    // border: 0.1rem #ab8105 solid;
    // color: #057375;
    background-color: #057375;
  }
`;
