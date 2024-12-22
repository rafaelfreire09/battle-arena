import styled from "styled-components";

export const Container = styled.div<{
  size: number;
  left: number;
  top: number;
  sidePos: number;
}>`
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  left: ${(props) => props.left}px;
  top: ${(props) => props.top}px;
  background-image: url("/assets/char.png");
  background-position: 0px ${(props) => -(props.sidePos * props.size)}px;
  background-size: 100% 400%;

  position: absolute;
  z-index: 1;

  display: flex;
  align-items: center;
  justify-content: center;

`;

export const NameBox = styled.div<{ size: number; color?: string }>`
  background-color: ${(props) => props.color};
  padding: ${(props) => props.size / 10}px;
  border-radius: 5px;
  position: absolute;
  font-size: ${(props) => props.size / 3}px;
  text-align: center;
  margin-top: -${(props) => props.size / 0.6}px;
`;

export const WeaponIcon = styled.img<{ size: number }>`
  width: ${(props) => props.size / 2.5}px;
  height: ${(props) => props.size / 2.5}px;

  position: absolute;
  margin: -${(props) => props.size / 1.75}px 0px 0px
    ${(props) => props.size / 0.8}px;
`;
