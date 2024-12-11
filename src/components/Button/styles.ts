import styled, { css } from "styled-components";
import mainColors from "../../styles/mainColors";

type Props = {
  width: string;
  height: string;
  colorType: ButtonSize;
  fontSize: string;
};

const colorsType = {
  default: css<Props>`
    background-color: ${mainColors.white.normal};
    border: 1px solid ${mainColors.others.borderDark};

    span,
    a {
      color: ${mainColors.black.normal};
      text-decoration: none;
    }

    &:hover {
      filter: brightness(0.7);
    }
  `,
  red: css<Props>`
    background-color: ${mainColors.error.normal};
    border: 1px solid ${mainColors.error.normal};

    span,
    a {
      color: ${mainColors.white.normal};
      text-decoration: none;
    }
  `,
  green: css<Props>`
    background-color: ${mainColors.success.normal};
    border: 1px solid ${mainColors.success.normal};

    span,
    a {
      color: ${mainColors.white.normal};
      text-decoration: none;
    }
  `,
};

export type ButtonSize = keyof typeof colorsType;

export const Wrapper = styled.button<Props>`
  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 15px;

  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;

  font-size: 15px;
  font-weight: 600;

  span,
  a {
    text-decoration: none;
    font-size: ${(props) => props.fontSize}px;
  }

  &:not(:disabled) {
    cursor: pointer;
  }

  ${({ colorType }) => colorsType[colorType]};

  img:hover {
    opacity: 50%;
  }

  &:hover {
    filter: brightness(0.9);
  }
  transition: filter 0.2s;
`;
