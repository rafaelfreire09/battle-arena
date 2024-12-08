import styled from "styled-components";

export const Container = styled.div`
  text-align: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #24282f;
  height: 100vh;
  color: white;
  button {
    padding: 1rem 2rem;
    background-color: #30cc51;
    border: 0;
    color: white;
    cursor: pointer;
    font-weight: 700;
    width: 250px;
    margin: 1rem;
    &:hover {
      filter: brightness(0.9);
    }
    transition: filter 0.2s;
  }
  select {
    margin: 1rem 2rem;

    height: 320px;
    width: 450px;
    border: none;
    outline: none;
    option {
      cursor: auto;
      font-size: 0.9rem;
      font-weight: 500;
      padding: 1rem;
      color: #0a0a0a;
    }
  }
`;

export const Content = styled.div`
  display: flex;
  margin-top: 5rem;
  p {
    padding: 0.2rem;
    display: flex;
    flex-direction: column;
    margin-left: 5px;
  }
`;

export const ChatWrapper = styled.div`
  width: 300px;

  input {
    border: 1px solid #c4c4c4;
    outline: none;
    padding: 1rem;
  }
`;

export const Users = styled.div`
  display: flex;
  flex-direction: column;
  overflow: scroll;
  height: 300px;
  width: 110px;

  p {
    padding: 0.1rem;
  }

  div {
    align-items: center;
    display: flex;
  }
`;

export const Ball = styled.div`
  width: 7px;
  height: 7px;
  margin-left: 1rem;
  border-radius: 50%;

  background-color: #30cc51;
`;
