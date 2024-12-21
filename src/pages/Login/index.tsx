import { useContext, useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import * as S from "./styles";

import { SocketContext } from "../../context/Socket";
import { useAuth } from "../../context/AuthProvider";
import Button from "../../components/Button";
import TextInput from "../../components/TextInput";

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

  const redirectToLobby = () => {
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
              <>
                <S.ConnectionWarningTitle>Connecting...</S.ConnectionWarningTitle>
                <S.ConnectionWarningSubtitle>
                  If it takes too long, please contact the developer.
                </S.ConnectionWarningSubtitle>
              </>
            )}
            {isConnected && (
              <S.FormSection>
                <TextInput
                  placeholder="Type your name..."
                  onChange={(event) => {
                    setUsernameInput(event.target.value);
                  }}
                />
                <Button 
                  label="Enter the lobby"
                  width="250"
                  height="55"
                  colorType="green"
                  onClick={redirectToLobby}
                />
              </S.FormSection>
            )}
          </S.Form>
        </S.FormWrapper>
      </S.Container>
    </>
  );
}
