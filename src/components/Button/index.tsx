import React, { forwardRef } from 'react';
import * as S from "./styles";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  label?: string;
  href?: string;
  width?: string;
  height?: string;
  submit?: boolean;
  colorType?: S.ButtonSize;
  onClick?: VoidFunction;
  fontSize?: string;
  disabled?: boolean;
  type?: "button" | "submit";
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  width = "70",
  height = "40",
  submit = false,
  colorType = "default",
  label,
  href,
  onClick,
  fontSize = "15",
  type,
  ...props
}, ref) => {
  const handleClick = () => {
    onClick && onClick();
  };

  return (
    <>
      {type === "button" ? (
        <S.Wrapper
          ref={ref}
          width={width}
          height={height}
          colorType={colorType}
          fontSize={fontSize}
          type={type}
          onClick={handleClick}
          {...props}
        >
          <span>{label}</span>
        </S.Wrapper>
      ) : (
        <S.Wrapper
          ref={ref}
          width={width}
          height={height}
          colorType={colorType}
          fontSize={fontSize}
          type={type}
          {...props}
        >
          <span>{label}</span>
        </S.Wrapper>
      )}
    </>
  );
});

export default Button;