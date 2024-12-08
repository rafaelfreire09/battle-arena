import React, { createContext, useState, useContext, ReactNode } from "react";

interface AuthContextType {
  username: string | null;
  roomId: string | null;
  opponentId: string | null;
  setUsername: (username: string) => void;
  setRoomId: (roomId: string) => void;
  setOpponentId: (opponentId: string) => void;
  clearRoomAndOpponentId: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [username, setUsernameState] = useState<string | null>(null);
  const [roomId, setRoomIdState] = useState<string | null>(null);
  const [opponentId, setOpponentIdState] = useState<string | null>(null);

  const setUsername = (newUsername: string) => {
    setUsernameState(newUsername);
  };

  const setRoomId = (newRoomId: string) => {
    setRoomIdState(newRoomId);
  };

  const setOpponentId = (newOpponentId: string) => {
    setOpponentIdState(newOpponentId);
  };

  const clearRoomAndOpponentId = () => {
    setRoomIdState(null);
    setOpponentIdState(null);
  };

  return (
    <AuthContext.Provider
      value={{
        username,
        roomId,
        opponentId,
        setUsername,
        setRoomId,
        setOpponentId,
        clearRoomAndOpponentId,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
