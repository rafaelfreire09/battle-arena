import styled from "styled-components";

export const Container = styled.div`
  text-align: center;
  align-items: center;
  justify-content: center;
  background-color: #24282f;
  height: 100vh;

  padding: 2rem;
`;

export const FormWrapper = styled.div`
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

export const Title = styled.div`
  color: white;
  font-weight: 800;
  font-size: 36px;
`;

export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;

  text-align: center;
  align-items: center;
  justify-content: center;
  height: 270px;
  margin-top: 70px;
`;

export const ConnectionWarningTitle = styled.div`
  color: #ffffff;
  margin-bottom: 10px;
  font-size: 20px;
`;

export const ConnectionWarningSubtitle = styled.div`
  color: gray;
  font-size: 14px;
`;

export const FormSection = styled.div`
  display: flex;
  flex-direction: column;

  text-align: center;
  align-items: center;
  justify-content: center;
  gap: 2rem 0;
`;
