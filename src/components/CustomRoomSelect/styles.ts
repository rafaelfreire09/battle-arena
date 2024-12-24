import styled from "styled-components";

export const SelectContainer = styled.div`
  margin: 1rem 0rem 1rem 0rem;
  height: 580px;
  width: 560px;
  border: 1px solid #c4c4c4;
  border-radius: 8px;
  overflow-y: auto;
  background: white;

  ::-webkit-scrollbar {
    width: 5px;
  }
  
  ::-webkit-scrollbar-track {
    background: #f2f2f2;
  }
  
  ::-webkit-scrollbar-thumb {
    border-radius: 25px;
    background:rgb(124, 124, 124);
  }
  
  ::-webkit-scrollbar-thumb:hover {
    width: 20px;
    background: #6e6e6e;
  }
`;

export const Option = styled.div<{ disabled?: boolean; isSelected?: boolean }>`
  padding: 1.8rem 1rem;
  color: #0a0a0a;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  background-color: ${(props) =>
    props.isSelected ? "#e0e0e0" : "transparent"};
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  display: flex;
  align-items: center;
  justify-content: space-around;

  &:hover {
    background-color: ${(props) => !props.disabled && "#f5f5f5"};
  }
`;

export const RoomInfo = styled.div``;

export const RoomName = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 0.7rem;
`;

export const RoomOwner = styled.div`
  font-size: 14px;
  color: rgb(109, 109, 109);
`;

export const RoomStatus = styled.div``;
