import * as S from "./styles";

import { Message } from "../../types/Socket";

type ChatProps = {
  messagesList: Message[];
  username: string;
};

export default function Chat({ messagesList, username }: ChatProps) {
  return (
    <>
      <S.Chat>
        {messagesList?.map((data, key) => {
          if (data.username === username) {
            return (
              <S.MessageWrapper position="right" key={key}>
                <S.MessageSection align="end">
                  <S.UserMessage>You</S.UserMessage>
                  <S.TextMessage>{data.text}</S.TextMessage>
                </S.MessageSection>
              </S.MessageWrapper>
            );
          } else {
            return (
              <S.MessageWrapper position="left" key={key}>
                <S.MessageSection align="start">
                  <S.UserMessage>{data.username}</S.UserMessage>
                  <S.TextMessage>{data.text}</S.TextMessage>
                </S.MessageSection>
              </S.MessageWrapper>
            );
          }
        })}
      </S.Chat>
    </>
  );
}
