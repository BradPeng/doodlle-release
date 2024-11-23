import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import HintBox from "./HintBox";
const Hints = ({ hints }) => {
  return (
    <Container className="g-0" style={{ marginLeft: "0px" }}>
      <Card style={{ padding: "10px 0px" }}>
        <Row>
          <div style={{ marginBottom: "10px" }}>
            <Col>Hints</Col>
          </div>
        </Row>

        <Row>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flexWrap: "wrap",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            {hints.length > 0 ? (
              hints.map((hint, index) => (
                <div key={index} style={{ marginBottom: "10px" }}>
                  <HintBox hintName={`Hint ${index + 1}`} hintAnswer={hint} />
                </div>
              ))
            ) : (
              <p>No hints available</p>
            )}
          </div>
        </Row>
      </Card>
    </Container>
  );
};

export default Hints;
