import styled from "styled-components";

export const Container = styled.div`
  text-align: center;
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: center;
  background-color: #24282f;
  height: 100vh;
  color: white;
  gap: 0 300px;
`;

export const Sidesection = styled.div`
  display: flex;

  p {
    padding: 0.2rem;
    display: flex;
    flex-direction: column;
    margin-left: 5px;
  }
`;

export const ChatWrapper = styled.div``;

export const Users = styled.div`
  display: flex;
  flex-direction: column;
  overflow: scroll;
  height: 500px;
  width: 110px;
  margin: 0 15px 0 10px;

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
  margin: 0 0.5rem 0 1rem;
  border-radius: 50%;

  background-color: #30cc51;
`;

export const RoomForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const CreateRoomSection = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 2rem;
  gap: 20px;
`;

export const ButtonSection = styled.div`
  display: flex;
  flex-direction: row;
  gap: 3rem;
`;
