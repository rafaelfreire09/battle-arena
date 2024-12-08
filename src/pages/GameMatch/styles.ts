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

  button {
    padding: 1rem 2rem;
    background-color: #30cc51;
    border: 0;
    color: white;
    cursor: pointer;
    font-weight: 700;
    font-family: "Roboto";
    width: 250px;
    margin: 1rem;
    &:hover {
      filter: brightness(0.9);
    }
    transition: filter 0.2s;
  }
`;

export const Result = styled.div`
  span {
    color: orange;
    font-weight: 500;
    font-size: 1.8rem;
  }
`;
