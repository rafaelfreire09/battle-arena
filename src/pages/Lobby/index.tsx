import * as S from "./styles";
import { ChangeEvent, useContext, useEffect, useState } from "react";

import { SocketContext } from "../../context/Socket";
import { Message, Rooms } from "../../types/Socket";
import { useNavigate } from "react-router-dom";
import Chat from "../../components/Chat";
import { useAuth } from "../../context/AuthProvider";

export default function Lobby() {
  const socket = useContext(SocketContext);
  let navigate = useNavigate();
  const { username, setRoomId, setOpponentId } = useAuth();

  const [room, setRoom] = useState(0);
  const [message, setMessage] = useState("");
  const [messagesList, setMessagesList] = useState<Message[]>([]);
  const [roomList, setRoomList] = useState<Rooms[]>();
  const [clientsList, setClientsList] = useState<string[]>([]);

  useEffect(() => {
    if (!username) {
      navigate("/");
      return;
    }
  }, []);

  useEffect(() => {
    socket.emit("list_players", (response) => {
      setClientsList(response);
    });

    socket.emit("list_rooms", (response) => {
      setRoomList(response);
    });

    socket.emit("list_messages", (response) => {
      setMessagesList(response);
    });
  }, []);

  useEffect(() => {
    socket.on("list_rooms", (data) => {
      data.map((room) => {
        if (room.status === "waiting" && room.players.length >= 2) {
          const result = room.players.find(
            (player) => player.client_id === socket.id
          );

          if (result !== undefined) {
            const opponent = room.players.find(
              (player) => player.client_id !== socket.id
            );

            if (opponent !== undefined) {
              setRoomId(String(room.roomId));
              setOpponentId(opponent.client_id);

              navigate("/game-match");
            }
          }
        }
      });

      setRoomList(data);
    });

    socket.on("list_players", (data) => {
      if (data.add) {
        setClientsList([...clientsList, data.username]);
      } else {
        const updatedClientsList = clientsList.filter(
          (client) => client !== data.username
        );
        setClientsList(updatedClientsList);
      }
    });

    socket.on("message", (newMessage) => {
      setMessagesList([...messagesList, newMessage]);
    });
  }, [messagesList, clientsList, socket, roomList]);

  const handleKeyPress = (event: string, text: string) => {
    if (event === "Enter") {
      const date = new Date();

      const dateString =
        String(date.getHours()) + ":" + String(date.getMinutes());

      const data = {
        username: username!,
        text,
        hour: dateString,
      };

      socket.emit("message", data);
      setMessage("");
    }
  };

  function joinRoom() {
    socket.emit("join_room", {
      client_id: socket.id,
      username: username!,
      room,
    });
  }

  const handleMessageInput = (event: ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const style = {
    cursor: "not-allowed",
  };

  return (
    <>
      <S.Container>
        <S.Sidesection>
          <S.ChatWrapper>
            <Chat messagesList={messagesList} username={username!} />
            <input
              placeholder="Type your message"
              id="message_input"
              value={message}
              onChange={handleMessageInput}
              onKeyUp={(event) => handleKeyPress(event.key, event.target.value)}
            />
          </S.ChatWrapper>
          <S.Users>
            {clientsList.map((username, key) => (
              <div>
                <S.Ball />
                <p key={key}>{username}</p>
              </div>
            ))}
          </S.Users>
        </S.Sidesection>
        <S.RoomSection>
          <div>Select room</div>
          <S.RoomSelect
            name="select_room"
            id="select_room"
            size={5}
            onChange={(event) => {
              setRoom(+event.target.value);
            }}
          >
            {roomList?.map((data, key) =>
              data.status === "starting" ? (
                <S.RoomOption
                  key={key}
                  value={data.roomId}
                  disabled
                  style={style}
                >
                  Room {data.roomId} ({data.status})
                </S.RoomOption>
              ) : (
                <S.RoomOption key={key} value={data.roomId}>
                  Room {data.roomId} ({data.status})
                </S.RoomOption>
              )
            )}
          </S.RoomSelect>
          <button onClick={() => joinRoom()}>Enter the room</button>
        </S.RoomSection>
      </S.Container>
    </>
  );
}
