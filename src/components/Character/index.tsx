import * as C from "./styles";
import { CharacterSides } from "../../types/CharacterSides";

type Props = {
  x: number;
  y: number;
  side: CharacterSides;
  name: string;
  weapon?: string;
  size: number;
};

export const Character = ({ x, y, side, name, weapon, size }: Props) => {
  const sides = {
    down: 0,
    left: -30,
    right: -60,
    up: -90,
  };

  return (
    <C.Container
      size={size}
      left={x}
      top={y}
      sidePos={sides[side] ?? 0}
    >
      <C.NameBox>{name}</C.NameBox>
      {weapon && <C.WeaponIcon src={weapon} />}
    </C.Container>
  );
};
