import * as S from "./styles";
import { ChangeEvent, useContext, useEffect, useRef, useState } from "react";

import { SocketContext } from "../../context/Socket";
import { Message, Rooms } from "../../types/Socket";
import { useNavigate } from "react-router-dom";
import Chat from "../../components/Chat";
import { useAuth } from "../../context/AuthProvider";
import Button from "../../components/Button";
import CustomRoomSelect from "../../components/CustomRoomSelect";
import TextInput from "../../components/TextInput";

export default function Lobby() {
  const socket = useContext(SocketContext);
  let navigate = useNavigate();
  const { username, setRoomId, setOpponentId } = useAuth();

  const [message, setMessage] = useState("");
  const [messagesList, setMessagesList] = useState<Message[]>([]);
  const [clientsList, setClientsList] = useState<string[]>([]);

  const [room, setRoom] = useState("");
  const [roomList, setRoomList] = useState<Rooms[]>();
  const [roomName, setRoomName] = useState("");

  const [roomJoined, setRoomJoined] = useState("");
  const [isRoomSelected, setIsRoomSelected] = useState(false);

  const enterRoomButtonRef = useRef<HTMLButtonElement>(null);

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

  const handleMessageInput = (event: ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const handleRoomNameInput = (event: ChangeEvent<HTMLInputElement>) => {
    setRoomName(event.target.value);
  };

  const handleRoomSelect = (selectedRoom: string) => {
    setRoom(selectedRoom);
    setIsRoomSelected(selectedRoom !== "");
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


  const handleBlur = () => {
    if (room != "") {
      setIsRoomSelected(false);
    }
  };

  const handleExitRoom = () => {
    if (roomJoined != "") {
      socket.emit(
        "exit_room",
        {
          client_id: socket.id,
          username: username!,
          roomId: roomJoined,
        },
        (data) => {
          if (data.client_id === socket.id) {
            setRoom("");
            setIsRoomSelected(false);
            setRoomJoined("");
          }
        }
      );
    }
  };

  const handleCreateRoom = () => {
    if (roomName != "") {
      socket.emit("create_room", {
        client_id: socket.id,
        username: username!,
        roomName: roomName,
      });

      setRoomName("");
    }
  };

  const handleDeleteRoom = (roomId: string) => {
    if (roomId != "") {
      socket.emit("delete_room", {
        client_id: socket.id,
        username: username!,
        roomId: roomId,
      });
    }
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
          <CustomRoomSelect
            rooms={roomList || []}
            onChange={handleRoomSelect}
            currentUsername={username!}
            onDelete={handleDeleteRoom}
            onBlur={handleBlur}
            value={room}
            buttonRef={enterRoomButtonRef}
          />
          <S.CreateRoomSection>
            <TextInput
              placeholder="Type a name for your room"
              value={roomName}
              onChange={handleRoomNameInput}
              width="180"
              height="35"
            />
            <Button
              type="button"
              label={"Create room"}
              width="120"
              height="55"
              colorType="default"
              onClick={handleCreateRoom}
              disabled={roomName == ""}
            />
          </S.CreateRoomSection>
          <S.ButtonSection>
            {roomJoined != "" && (
              <Button
                type="button"
                label="Leave room"
                width="250"
                height="55"
                colorType="red"
                onClick={handleExitRoom}
              />
            )}
            <Button
              ref={enterRoomButtonRef}
              type="submit"
              label={handleMainButtonLabel()}
              width="250"
              height="55"
              colorType="green"
              disabled={handleMainButtonIsDisable()}
            />
          </S.ButtonSection>
        </S.RoomForm>
      </S.Container>
    </>
  );
}
