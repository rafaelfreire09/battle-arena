import { Rooms } from "../../types/Socket";
import Button from "../Button";
import * as S from "./styles";
import { useState, useEffect, useRef } from "react";

interface CustomRoomSelectProps {
  rooms: Rooms[];
  onChange: (value: string) => void;
  currentUsername: string;
  onDelete?: (roomId: string) => void;
  onBlur?: () => void;
  value?: string;
  buttonRef: React.RefObject<HTMLButtonElement>;
}

const CustomRoomSelect = ({
  rooms,
  onChange,
  currentUsername,
  onDelete,
  onBlur,
  value,
  buttonRef,
}: CustomRoomSelectProps) => {
  const [selectedValue, setSelectedValue] = useState<string | undefined>(value);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Add global click event to detect clicks outside the component
    const handleClickOutside = (event: MouseEvent) => {
      // Checks if the click was on the button
      if (
        buttonRef.current &&
        buttonRef.current.contains(event.target as Node)
      ) {
        return;
      } else if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        onBlur?.();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectedValue]);

  const handleSelect = (roomId: string, disabled: boolean) => {
    if (!disabled) {
      setSelectedValue(roomId);
      onChange(roomId);
    }
  };

  const handleBlur = () => {
    setSelectedValue("");
  };

  const handleDelete = (roomId: string) => {
    onDelete!(roomId);
  };

  return (
    <S.SelectContainer ref={containerRef} tabIndex={0} onBlur={handleBlur}>
      {rooms.map((room, index) => (
        <S.Option
          key={index}
          disabled={room.status === "full"}
          isSelected={selectedValue === room.roomId}
          onClick={() => handleSelect(room.roomId, room.status === "full")}
        >
          <S.RoomInfo>
            <S.RoomName>{room.roomName}</S.RoomName>
            <S.RoomOwner>{room.roomOwner}</S.RoomOwner>
          </S.RoomInfo>
          <S.RoomStatus>
            <div>{room.players.length}/2</div>
            <div>({room.status})</div>
          </S.RoomStatus>
          {currentUsername == room.roomOwner && (
            <S.RoomStatus>
              <Button
                type="button"
                label={"Delete"}
                width="65"
                height="35"
                colorType="red"
                onClick={() => handleDelete(room.roomId)}
              />
            </S.RoomStatus>
          )}
        </S.Option>
      ))}
    </S.SelectContainer>
  );
};

export default CustomRoomSelect;
