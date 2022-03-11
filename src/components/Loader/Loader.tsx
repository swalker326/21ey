import { useState } from "react";

export const Loader = ({ currentFill, showLoader }) => {
  return (
    <div
      style={{
        display: showLoader ? "block" : "none",
        border: "1px solid red",
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "12px",
      }}
    >
      <div
        style={{
          margin: 0,
          padding: 0,
          height: "100%",
          width: `${currentFill}%`,
          backgroundColor: "green",
        }}
        className="loader-current"
      ></div>
    </div>
  );
};
