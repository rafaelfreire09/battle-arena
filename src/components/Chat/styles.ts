import styled from "styled-components";

export const Chat = styled.div`
  width: 100%;
  background-color: white;
  height: 300px;
  width: 300px;
  color: #24282f;
  overflow: scroll;
`;

export const MessageWrapper = styled.div<{
  position: 'left' | 'right'
}>`
  display: flex;
  justify-content: ${(props) => props.position};
  padding: 0;
  margin: 20px 15px;
`;

export const MessageSection = styled.div<{
  align: 'start' | 'end'
}>`
  display: flex;
  flex-direction: column;
  align-items: ${(props) => props.align};
`;

export const UserMessage = styled.div`
  font-size: 11px;
  color: gray;
`;

export const TextMessage = styled.div`
  font-size: 17px;
`;