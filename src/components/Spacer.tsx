import React from "react";

interface SpacerProps {
  height?: number | string;
  width?: number | string;
}

export const Spacer: React.VFC<SpacerProps> = (props) => {
  return (
    <div
      style={{ width: props.width ?? "1px", height: props.height ?? "1px" }}
    />
  );
};
