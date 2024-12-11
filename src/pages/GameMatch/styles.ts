import styled from "styled-components";

export const Container = styled.div`
  background-color: #24282f;
  min-height: 100vh;
  color: #fff;
`;

export const Wrapper = styled.div`
  display: flex;
`;

export const Map = styled.div`
  width: 480px;
  height: 480px;
  background-image: url("/assets/map.png");
  background-position: left top;
  background-size: 100%;
`;

type WeaponProps = {
  top: number;
  left: number;
};

export const Weapon = styled.img<WeaponProps>`
  width: 30px;
  height: 30px;

  position: absolute;
  top: ${({ top }) => top}px;
  left: ${({ left }) => left}px;
`;

export const EndGameSection = styled.div`
  margin: 5rem 0 0 5rem;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Result = styled.div`
  margin: 0 0 2rem 0;

  span {
    color: orange;
    font-weight: 500;
    font-size: 1.8rem;
  }
`;
