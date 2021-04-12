import styled from "styled-components"

export const ContainerCard = styled.div`
    height: 300px;
    width: 300px;
    background: #cccccc;
    margin: 12px;
    display: flex;
    flex-direction: column;
    padding: 16px;
    border-radius: 8px;
`
export const ContainerMain = styled.div`
    height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;

`
export const FormTags = styled.div`
    height: 200px;
    width: 300px;
    margin: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    background-color: #cccccc;
    border-radius: 9px;
    h1{
        font-size: 12px;
    }
`

export const TagsContainer = styled.div`
    width: 100%;
    margin: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    background-color: #cccccc;
    border-radius: 9px;
    flex-wrap: wrap;
    button{
        margin: 8px;
        border-radius: 5px;
        background: #3f51b5;
        color: #ffffff;
        font-size: 16px;
        padding: 9px;
        border: 0px;
        cursor: pointer;
        transition: 0.2s;
        &:hover{
            opacity: 0.4;
        };
        &:active{
            opacity: 1;
        }       
    }
`