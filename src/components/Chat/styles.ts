import styled from "styled-components";

export const Chat = styled.div`
  width: 100%;
  background-color: white;
  border-radius: 8px;
  height: 500px;
  width: 400px;
  color: #24282f;
  overflow-y: scroll;

  ::-webkit-scrollbar {
    width: 5px;
  }
  
  ::-webkit-scrollbar-track {
    background: #f2f2f2;
  }
  
  ::-webkit-scrollbar-thumb {
    border-radius: 25px;
    background:rgb(124, 124, 124);
  }
  
  ::-webkit-scrollbar-thumb:hover {
    width: 20px;
    background: #6e6e6e;
  }
`;

export const MessageWrapper = styled.div<{
  position: "left" | "right";
}>`
  display: flex;
  justify-content: ${(props) => props.position};
  padding: 0;
  margin: 20px 15px;
`;

export const MessageSection = styled.div<{
  align: "start" | "end";
}>`
  display: flex;
  flex-direction: column;
  align-items: ${(props) => props.align};
`;

export const UserMessage = styled.div`
  font-size: 13px;
  color: gray;
`;

export const TextMessage = styled.div`
  font-size: 18px;
  max-width: 275px;
  word-wrap: break-word;
  margin: 7px 0;
`;

export const TimestampMessage = styled.div`
  font-size: 10px;
  color: gray;
`;
