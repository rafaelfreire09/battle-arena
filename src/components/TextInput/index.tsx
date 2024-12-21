import React, { forwardRef } from 'react';
import * as S from "./styles";

export type TextInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  width?: string;
  height?: string;
  colorType?: S.InputSize;
  fontSize?: string;
  placeholder?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyUp?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
};

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(({
  width = "250",
  height = "40",
  colorType = "default",
  fontSize = "15",
  placeholder = "",
  onChange,
  onKeyUp,
  ...props
}, ref) => {
  return (
    <S.InputWrapper
      ref={ref}
      width={width}
      height={height}
      colorType={colorType}
      fontSize={fontSize}
      placeholder={placeholder}
      onChange={onChange}
      onKeyUp={onKeyUp}
      {...props}
    />
  );
});

export default TextInput;