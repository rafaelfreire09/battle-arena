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

export const Map = styled.div<{ size: number }>`
  width: ${({ size }) => size * 16}px;
  height: ${({ size }) => size * 16}px;
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
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 1000;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Result = styled.div`
  margin: 0 0 2rem 0;
  text-align: center;

  span {
    color: orange;
    font-weight: 500;
    font-size: 2rem;
  }
`;

export const ResultLabel = styled.div`
  color: white;
  font-weight: 500;
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;
