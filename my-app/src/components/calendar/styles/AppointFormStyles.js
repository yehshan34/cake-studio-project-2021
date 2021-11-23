import styled from "styled-components";
import {Button} from "./CalendarStyles";

export const FormWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

export const Header = styled.h3`
    margin: 0 auto;
    color: black;
`;

export const ListItem = styled.li`
    display: flex;
    flex-direction: column;
    padding: 0.3rem;
`;

export const ListContainer = styled.ul`
    padding: 0;
    list-style-type: none;
    width: 100%;
`;

export const AddButton = styled(Button)`
    background-color: #28b463;
`;

export const Input = styled.input`
    padding: 0.3rem;
    border: 0.1rem #c0c0c0 solid;
`;

export const Select = styled.select`
    padding: 5px 10px;
`

export const Option = styled.option`
    color: yellow;
`

export const Label = styled.label`
    padding-bottom: 0.2rem;
    // width: 200px;
`;

export const GenderContainer = styled.div`
    display: flex;
    flex-direction: row;
`;
