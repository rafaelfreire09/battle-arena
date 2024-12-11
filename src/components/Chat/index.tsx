import * as S from "./styles";

import { Message } from "../../types/Socket";
import { useEffect, useRef } from "react";

type ChatProps = {
  messagesList: Message[];
  username: string;
};

export default function Chat({ messagesList, username }: ChatProps) {
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to the bottom when messagesList changes
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messagesList]);

  return (
    <>
      <S.Chat ref={chatRef}>
        {messagesList?.map((data, key) => {
          if (data.username === username) {
            return (
              <S.MessageWrapper position="right" key={key}>
                <S.MessageSection align="end">
                  <S.UserMessage>You</S.UserMessage>
                  <S.TextMessage>{data.text}</S.TextMessage>
                  <S.TimestampMessage>{data.hour}</S.TimestampMessage>
                </S.MessageSection>
              </S.MessageWrapper>
            );
          } else {
            return (
              <S.MessageWrapper position="left" key={key}>
                <S.MessageSection align="start">
                  <S.UserMessage>{data.username}</S.UserMessage>
                  <S.TextMessage>{data.text}</S.TextMessage>
                  <S.TimestampMessage>{data.hour}</S.TimestampMessage>
                </S.MessageSection>
              </S.MessageWrapper>
            );
          }
        })}
      </S.Chat>
    </>
  );
}
