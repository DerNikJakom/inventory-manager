import React from "react";

export default function BackButton(props) {
  return (
    <button
      style={{ backgroundColor: "#7F0037" }}
      onClick={() => props.goBack("")}
    >
      Zurück
    </button>
  );
}
