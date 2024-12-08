import { useContext, useState } from "react";

import { useNavigate } from "react-router-dom";

import * as S from "./styles";

import { SocketContext } from "../../context/Socket";
import { useAuth } from "../../context/AuthProvider";

export default function Login() {
  const socket = useContext(SocketContext);
  const navigate = useNavigate();
  const { setUsername } = useAuth();

  const [usernameInput, setUsernameInput] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  function connect() {
    if (usernameInput !== "") {
      setUsername(usernameInput);

      socket.emit("join_lobby", {
        client_id: socket.id,
        username: usernameInput,
        // email,
        // password,
      });

      navigate("/lobby");
    }
  }

  return (
    <>
      <S.Container>
        <S.Form>
          <h2>Battle Arena</h2>
          <input
            type="text"
            name="username"
            placeholder="Type your name..."
            onChange={(event) => {
              setUsernameInput(event.target.value);
            }}
          />
          {/* <input
            type="password"
            name="password"
            placeholder="Password..."
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
          <input
            type="email"
            name="email"
            placeholder="Email..."
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          /> */}
          <button
            onClick={() => {
              connect();
              // register();
              // login();
            }}
          >
            Enter the lobby
          </button>
        </S.Form>
      </S.Container>
    </>
  );
}
