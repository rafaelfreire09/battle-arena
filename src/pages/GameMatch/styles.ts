import styled from "styled-components";

export const Container = styled.div`
  background-color: #24282f;
  height: 100vh;
  width: 100vw;
  color: #fff;
`;

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
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
  size: number;
};

export const Weapon = styled.img<WeaponProps>`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;

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
