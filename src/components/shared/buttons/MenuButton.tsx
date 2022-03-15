import { darken, lighten } from "polished";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

type ModeButtonProps = {
  label: string;
};
export const MenuButton: React.FC<ModeButtonProps> = ({ children, label }) => {
  const [showChildren, setShowChildren] = useState<"show" | "hide">("hide");
  const handleClick = (event: MouseEvent) => {
    setShowChildren(showChildren === "hide" ? "show" : "hide");
  };

  return (
    <div>
      <MenuButtonContainer
        className={`dropdown_menu_children ${showChildren} `}
        onMouseEnter={() => {
          setShowChildren("show");
        }}
        onMouseLeave={() => {
          setShowChildren("hide");
        }}
        onKeyDown={(event) => {
          if (event.keyCode == 13) {
            setShowChildren(showChildren === "hide" ? "show" : "hide");
          }
        }}
      >
        {`${label}`}
        <MenuButtonOptions
          className={`dropdown_menu_children ${showChildren} `}
        >
          {React.Children.map(children, (child: React.ReactElement) => {
            return (
              <MenuButtonOption {...child.props}>
                {child.props.children}{" "}
              </MenuButtonOption>
            );
          })}
        </MenuButtonOptions>
      </MenuButtonContainer>
    </div>
  );
};

const MenuButtonContainer = styled.div`
  border: 1px solid lightgray;
  color: ${(props) => props.theme.text.quarternary};
  background-color: ${(props) => props.theme.bg.primary};
  text-align: center;
  width: 5.6rem;
  position: relative;
  padding: 0.5rem 0.25rem;
  cursor: pointer;
  border-radius: 6px;
  margin: 0.5rem 0.25rem;
  &:hover {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    background-color: ${(props) => lighten(0.002, props.theme.bg.primary)};
  }
  &.show {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
  &.hide {
    border-radius: 6px;
  }
`;
const MenuButtonOptions = styled.div`
  cursor: pointer;
  display: none;
  position: absolute;
  border: 1px solid lightgray;
  margin-bottom: 0;
  background-color: ${(props) => props.theme.bg.button};
  z-index: ${(props) => props.theme.zIndex.close};
  left: -1px;
  top: 100%;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
  width: 5.47rem;
  &.show {
    display: flex;
    flex-direction: column;
    justify-content: start;
  }
`;
const MenuButtonOption = styled.button`
  padding: 0.5rem 0.25rem;
  width: 100%;
  border: none;
  border-bottom: solid 1px lightgray;
  background-color: ${(props) => props.theme.bg.button};
  &:last-child {
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    border-bottom: none;
  }
  &:hover {
    /* border-radius: 4px; */
    background-color: ${(props) => props.theme.bg.secondary};
  }
`;
