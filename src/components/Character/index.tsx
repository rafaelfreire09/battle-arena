import * as S from "./styles";
import { CharacterSides } from "../../types/CharacterSides";

type Props = {
  x: number;
  y: number;
  side: CharacterSides;
  name: string;
  weapon?: string;
  size: number;
  color: string;
};

export const Character = ({ x, y, side, name, weapon, size, color }: Props) => {
  const sides = {
    down: 0,
    left: 1,
    right: 2,
    up: 3,
  };

  return (
    <S.Container size={size} left={x} top={y} sidePos={sides[side] ?? 0}>
      <S.NameBox size={size} color={color}>{name}</S.NameBox>
      {weapon && <S.WeaponIcon src={weapon} size={size} />}
    </S.Container>
  );
};
