import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { CirclePicker } from "react-color";
import DrawingToolBar from "./drawingToolBar";

const Toolbar = ({
  color,
  handleColorChange,
  sketchRef,
  handleCursorSizeChange,
  cursorSize,
  word,
  setWord,
}) => {
  return (
    <Container>
      <Row>
        <Col className="d-flex justify-content-center">
          <CirclePicker
            disableAlpha={true}
            color={color}
            onChange={handleColorChange}
            triangle="hide"
            width="auto"
            colors={[
              "#B80000",
              "#DB3E00",
              "#FCCB00",
              "#008B02",
              "#006B76",
              "#1273DE",
              "#004DCF",
              "#5300EB",
              "#FFFFFF",
              "#000000",
            ]}
          />
        </Col>
      </Row>
      <Row>
        <DrawingToolBar
          sketchRef={sketchRef}
          handleCursorSizeChange={handleCursorSizeChange}
          cursorSize={cursorSize}
          word={word}
          setWord={setWord}
        />
      </Row>
    </Container>
  );
};

export default Toolbar;
