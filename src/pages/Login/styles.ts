import styled from "styled-components";

export const Container = styled.div`
  text-align: center;
  align-items: center;
  justify-content: center;
  background-color: #24282f;
  height: 100vh;

  padding: 2rem;

  input {
    background-color: white;
    text-decoration: none;
    padding: 0.5rem;
    width: 250px;
    color: black;

    margin: 1rem 1rem 2rem 1rem;
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

export const ConnectionWarningTitle = styled.form`
  color: #ffffff;
  margin-bottom: 10px;
  font-size: 20px;
`;

export const ConnectionWarningSubtitle = styled.form`
  color: gray;
  font-size: 14px;
`;
