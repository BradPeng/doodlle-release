import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import "./HintBox.css";

const HintBox = ({ hintName, hintAnswer, reset }) => {
  const [showHint, setShowHint] = useState(false);

  const handleHintClick = () => {
    setShowHint(!showHint);
  };

  useEffect(() => {
    setShowHint(false);
  }, [hintAnswer]);

  return (
    <Card
      onClick={handleHintClick}
      style={{
        width: "100px",
        aspectRatio: 1,
      }}
      className={`hint-box ${showHint ? "spin" : ""} g-0`}
    >
      {!showHint && (
        <Card.Body
          style={{
            padding: "0px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {hintName}
        </Card.Body>
      )}
      {showHint && (
        <Card.Body
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "0px",
          }}
        >
          {hintAnswer}
        </Card.Body>
      )}
    </Card>
  );
};

export default HintBox;
