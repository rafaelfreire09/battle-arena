import { useContext, useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import * as S from "./styles";

import { SocketContext } from "../../context/Socket";
import { useAuth } from "../../context/AuthProvider";

export default function Login() {
  const socket = useContext(SocketContext);
  const navigate = useNavigate();
  const { setUsername } = useAuth();

  const [isConnected, setIsConnected] = useState(false);
  const [connectionError, setConnectionError] = useState(false);

  const [usernameInput, setUsernameInput] = useState("");

  useEffect(() => {
    // Check socket connection
    function onConnect() {
      setIsConnected(true);
      setConnectionError(false);
    }

    function onDisconnect() {
      setIsConnected(false);
      setConnectionError(true);
    }

    // Add event listeners
    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    // Initial connection check
    if (socket.connected) {
      setIsConnected(true);
    } else {
      setConnectionError(true);
    }

    // Cleanup listeners
    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, [socket]);

  function redirectToLobby() {
    if (!isConnected) {
      setConnectionError(true);
      return;
    }

    if (usernameInput !== "") {
      setUsername(usernameInput);

      socket.emit("join_lobby", {
        client_id: socket.id,
        username: usernameInput,
      });

      navigate("/lobby");
    }
  }

  return (
    <>
      <S.Container>
        <S.FormWrapper>
          <S.Title>Battle Arena</S.Title>
          <S.Form>
            {connectionError && (
              <S.ConnectionError>
                Socket connection error. Please check your connection.
              </S.ConnectionError>
            )}
            <input
              type="text"
              name="username"
              placeholder="Type your name..."
              onChange={(event) => {
                setUsernameInput(event.target.value);
              }}
            />
            <button onClick={redirectToLobby} disabled={!isConnected}>
              {isConnected ? "Enter the lobby" : "Connecting..."}
            </button>
          </S.Form>
        </S.FormWrapper>
      </S.Container>
    </>
  );
}
