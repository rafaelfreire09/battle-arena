import { BrowserRouter, Route, Routes } from "react-router-dom";
import { GameMatch } from "./pages/GameMatch";
import Lobby from "./pages/Lobby";
import Login from "./pages/Login";
import { socket, SocketContext } from "./context/Socket";

const App = () => {
  return (
    <>
      <SocketContext.Provider value={socket}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/game-match" element={<GameMatch />} />
            <Route path="/lobby" element={<Lobby />} />
          </Routes>
        </BrowserRouter>
      </SocketContext.Provider>
    </>
  );
};

export default App;
