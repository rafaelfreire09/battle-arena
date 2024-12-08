import styled from "styled-components";

export const Container = styled.div`
  text-align: center;
  align-items: center;
  justify-content: center;
  background-color: #24282f;
  height: 100vh;

  padding: 2rem;

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

  input {
    background-color: white;
    text-decoration: none;
    padding: 0.5rem;
    width: 250px;
    color: black;

    margin: 1rem;
    height: 25px;
    border: none;
    outline: none;
    text-decoration: none;
  }
`;

export const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  justify-content: center;

  height: 500px;
  width: 550px;

  border: 1px solid #f4f4f4;
  border-radius: 15px;
  margin: auto;
`;

export const Title = styled.form`
  color: white;
  font-weight: 800;
  font-size: 36px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;

  text-align: center;
  align-items: center;
  justify-content: center;
  height: 270px;
  margin-top: 70px;
`;

export const ConnectionError = styled.form`
  color: red;
  margin-bottom: 30px;
`;