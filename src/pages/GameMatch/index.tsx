import * as S from "./styles";
import { useContext, useEffect, useRef, useState } from "react";
import { useCharacter } from "../../hooks/useCharacter";

import { CharacterSides } from "../../types/CharacterSides";
import { Character } from "../../components/Character";
import { Hud } from "../../components/Hud";

import { SocketContext } from "../../context/Socket";
import {
  canHit,
  checkWeapon,
  GameRules,
  receiveDamage,
  WeaponsList,
} from "../../utils/general";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import Button from "../../components/Button";

export const GameMatch = () => {
  const socket = useContext(SocketContext);
  const navigate = useNavigate();
  const { username, roomId, opponentId, clearRoomAndOpponentId } = useAuth();

  const mapRef = useRef<HTMLDivElement>(null);
  const size = 55;

  const [mapPadding, setMapPadding] = useState({
    left: 19.5,
    top: 8.65,
  });

  // Function to calculate map padding
  const calculateMapPadding = () => {
    if (mapRef.current) {
      const mapRect = mapRef.current.getBoundingClientRect();

      // Calculates padding in relative units
      const leftPadding = mapRect.left / size;
      const topPadding = mapRect.top / size;

      setMapPadding({
        left: leftPadding,
        top: topPadding,
      });
    }
  };

  // Effect to calculate initial padding e add resize listener
  useEffect(() => {
    calculateMapPadding();

    const handleResize = () => {
      calculateMapPadding();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [endGame, setEndGame] = useState("");

  const player1 = useCharacter(
    username!,
    GameRules.playerConfig.defaultPosition.x_asis,
    GameRules.playerConfig.defaultPosition.y_asis
  );

  const [player1Hud, setPlayer1Hud] = useState({
    life: GameRules.playerConfig.defaultLifeHealth,
    weapon: WeaponsList[0].name,
    weaponImage: WeaponsList[0].image,
    damage: WeaponsList[0].damage,
  });

  const [player2, setPlayer2] = useState({
    name: "",
    side: "down" as CharacterSides,
    x: GameRules.playerConfig.defaultPosition.x_asis,
    y: GameRules.playerConfig.defaultPosition.y_asis,
    life: GameRules.playerConfig.defaultLifeHealth,
  });

  useEffect(() => {
    if (!roomId || !opponentId) {
      navigate("/lobby");
    }

    if (!username) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    socket.on("gameMove", (data) => {
      setPlayer2((player2) => ({
        ...player2,
        name: data.playerId,
        side: data.side,
        x: data.xAxis,
        y: data.yAxis,
      }));
    });

    socket.on("hit", (data) => {
      setPlayer1Hud((player1Hud) => ({
        ...player1Hud,
        life: receiveDamage(player1Hud.life, data.damage),
      }));
    });

    socket.on("opponentLife", (data) => {
      if (data.life === 0) {
        socket.emit("endGame", {
          winner: username!,
          opponentId: opponentId!,
          roomId: roomId!,
        });
      }
      setPlayer2((player2) => ({
        ...player2,
        life: data.life,
      }));
    });

    socket.on("endGame", (data) => {
      if (data.winner === username) {
        setEndGame("You won the battle! Congratulations!");
      } else {
        setEndGame(data.winner + " won the battle!");
      }
    });
  }, [socket, endGame]);

  useEffect(() => {
    socket.emit("gameMove", {
      playerId: player1.name,
      side: player1.side,
      xAxis: player1.x,
      yAxis: player1.y,
      opponentId: opponentId!,
    });

    const newWeapon = checkWeapon(player1.x, player1.y);

    if (newWeapon) {
      setPlayer1Hud((player1Hud) => ({
        ...player1Hud,
        weapon: newWeapon.name,
        weaponImage: newWeapon.image,
        damage: newWeapon.damage,
      }));
    }
  }, [player1.x, player1.y]);

  useEffect(() => {
    socket.emit("opponentLife", {
      life: player1Hud.life,
      opponentId: opponentId!,
    });
  }, [player1Hud.life]);

  const returnToLobby = () => {
    socket.emit(
      "exit_room",
      {
        client_id: socket.id,
        username: username!,
        roomId: roomId!,
      },
      (data) => {}
    );

    socket.emit("join_lobby", {
      client_id: socket.id,
      username: username!,
    });

    clearRoomAndOpponentId();

    navigate("/lobby");
  };

  const handleResetMatch = () => {
    if (endGame) {
      player1.y = GameRules.playerConfig.defaultPosition.y_asis;
      player1.x = GameRules.playerConfig.defaultPosition.x_asis;

      setPlayer1Hud({
        life: GameRules.playerConfig.defaultLifeHealth,
        weapon: WeaponsList[0].name,
        weaponImage: WeaponsList[0].image,
        damage: WeaponsList[0].damage,
      });

      setPlayer2({
        name: "",
        side: "down" as CharacterSides,
        x: GameRules.playerConfig.defaultPosition.x_asis,
        y: GameRules.playerConfig.defaultPosition.y_asis,
        life: GameRules.playerConfig.defaultLifeHealth,
      });

      setEndGame('')
    }
  };

  const handleMouseClick = () => {
    if (endGame) return;

    if (canHit(player1.x, player1.y, player2.x, player2.y, player1.side)) {
      socket.emit("hit", {
        damage: player1Hud.damage,
        opponentId: opponentId!,
      });
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (endGame) return;

    switch (event.code) {
      case "KeyA":
        player1.moveLeft();
        break;
      case "KeyW":
        player1.moveUp();
        break;
      case "KeyD":
        player1.moveRight();
        break;
      case "KeyS":
        player1.moveDown();
        break;
    }
  };

  return (
    <S.Container>
      <S.Wrapper
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onClick={handleMouseClick}
      >
        <S.Map ref={mapRef} size={size}>
          <Character
            x={(player2.x + mapPadding.left) * size}
            y={(player2.y + mapPadding.top) * size}
            side={player2.side}
            name={player2.name}
            size={size}
            color="#e20b0b"
          />
          <Character
            x={(player1.x + mapPadding.left) * size}
            y={(player1.y + mapPadding.top) * size}
            side={player1.side}
            name={player1.name}
            weapon={player1Hud.weaponImage}
            size={size}
            color="#15803d"
          />
          {WeaponsList.map(
            (weapon, index) =>
              weapon.name != "Punch" && (
                <S.Weapon
                  top={(weapon.defaultPosition.y + mapPadding.top) * size}
                  left={(weapon.defaultPosition.x + mapPadding.left) * size}
                  src={weapon.image}
                  key={index}
                  size={size}
                />
              )
          )}
        </S.Map>

        <Hud
          life={player1Hud.life}
          weapon={player1Hud.weapon}
          strengh={player1Hud.damage}
          opponentsLife={player2.life}
        />
      </S.Wrapper>
      {endGame && (
        <S.EndGameSection>
          <S.Result>
            <S.ResultLabel>The match is over!</S.ResultLabel>
            <span>{endGame}</span>{" "}
          </S.Result>
          <S.ButtonSection>
            <Button
              type="button"
              label="Rematch"
              width="150"
              height="55"
              colorType="green"
              onClick={handleResetMatch}
            />
            <Button
              type="button"
              label="Return to lobby"
              width="200"
              height="55"
              colorType="default"
              onClick={returnToLobby}
            />
          </S.ButtonSection>
        </S.EndGameSection>
      )}
    </S.Container>
  );
};
