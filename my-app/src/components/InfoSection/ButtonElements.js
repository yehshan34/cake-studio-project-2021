import styled from "styled-components";
import {Link} from 'react-scroll';

export const Button = styled(Link)`
border-radius: 50px;
background: ${({primary}) => (primary ? '#d6a1a1':'#248f96')};
white-space: nowrap;
padding: ${({big}) => (big? '14px 48px': '12px 32px')};
color: ${({dark}) => (dark ? '#248f96': '#fff')};
font-size: ${({fontBig}) => (fontBig ? '20px': '18px')};
outline: none;
border: none;
cursor: pointer;
display: flex;
justify-content: center;
align-items: center;
transition: all 0.2s ease-in-out;
text-decoration: none;
&:hover{
    transition: all 0.2s ease-in-out;
    background: ${({primary})=> (primary? '': 
    '')};
    color: black;
}

`