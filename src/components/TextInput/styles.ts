import styled, { css } from "styled-components";
import mainColors from "../../styles/mainColors";

type Props = {
  width: string;
  height: string;
  colorType: InputSize;
  fontSize: string;
};

const inputTypes = {
  default: css<Props>`
    background-color: ${mainColors.white.normal};
    border: 1px solid ${mainColors.others.borderDark};
    color: ${mainColors.black.normal};

    &::placeholder {
      color: ${mainColors.black.normal}80;
    }

    &:focus {
      border-color: ${mainColors.others.borderDark};
      outline: none;
    }
  `,
  error: css<Props>`
    background-color: ${mainColors.white.normal};
    border: 1px solid ${mainColors.error.normal};
    color: ${mainColors.black.normal};

    &::placeholder {
      color: ${mainColors.error.normal}80;
    }

    &:focus {
      border-color: ${mainColors.error.normal};
      outline: none;
    }
  `,
  success: css<Props>`
    background-color: ${mainColors.white.normal};
    border: 1px solid ${mainColors.success.normal};
    color: ${mainColors.black.normal};

    &::placeholder {
      color: ${mainColors.success.normal}80;
    }

    &:focus {
      border-color: ${mainColors.success.normal};
      outline: none;
    }
  `,
};

export type InputSize = keyof typeof inputTypes;

export const InputWrapper = styled.input<Props>`
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  
  /* padding: 0 15px; */
  padding: 0.3rem 0.8rem;
  border-radius: 8px;
  font-size: ${(props) => props.fontSize}px;
  
  transition: border-color 0.2s;

  ${({ colorType }) => inputTypes[colorType]}
`;