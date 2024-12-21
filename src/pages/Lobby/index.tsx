import * as S from "./styles";
import { ChangeEvent, useContext, useEffect, useState } from "react";

import { SocketContext } from "../../context/Socket";
import { Message, Rooms } from "../../types/Socket";
import { useNavigate } from "react-router-dom";
import Chat from "../../components/Chat";
import { useAuth } from "../../context/AuthProvider";
import Button from "../../components/Button";
import TextInput from "../../components/TextInput";

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
  const handleMainButtonLabel = (): string => {
    if (roomJoined != "") {
      return "Waiting another player";
    }

    if (!isRoomSelected) {
      return "Select a room";
    }

    return "Enter the room";
  };

  const handleMainButtonIsDisable = (): boolean => {
    if (!isRoomSelected) {
      return true;
    }

    if (roomJoined != "") {
      return true;
    }

    return false;
  };

  const handleJoinRoom = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    socket.emit("join_room", {
      client_id: socket.id,
      username: username!,
      room,
    });

    setRoomJoined(room);
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
            <TextInput
              placeholder="Type your message"
              width="300"
              height="35"
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
        <S.RoomForm onSubmit={handleJoinRoom}>
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
            <Button
              ref={enterRoomButtonRef}
              type="submit"
              label={handleMainButtonLabel()}
              width="250"
              height="55"
              colorType="green"
              disabled={handleMainButtonIsDisable()}
            />
          
        </S.RoomForm>
      </S.Container>
    </>
  );
}
