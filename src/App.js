import "./App.css";

import React, { useState } from "react";
import logo from "./assets/logo_transparent_trimmed_square.png";
import Image from "react-bootstrap/Image";
import background from "./assets/background.jpg";
import Button from "react-bootstrap/Button";
import { CardBody } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Draw from "./components/drawing/draw";
import Guess from "./components/guessing/guess";

function App() {
  const [isDrawing, setIsDrawing] = useState(false);
  const [isGuessing, setIsGuessing] = useState(false);

  const gameButtonStyles = {
    margin: "10px",
  };

  const handleDrawClick = () => {
    setIsDrawing(true);
    setIsGuessing(false);
  };

  const handleGuessClick = () => {
    setIsDrawing(false);
    setIsGuessing(true);
  };
  return (
    <div
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        minHeight: "100vh",
      }}
    >
      <div
        className="text-center"
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            minHeight: "100vh",
            backgroundColor: "rgba(74, 142, 226, 0.7)",
            minWidth: "30vh",
            margin: "0px",
          }}
        >
          <CardBody
            style={{
              marginBottom: "20px",
            }}
          >
            <Row>
              <Col>
                <Image
                  src={logo}
                  style={{
                    width: "200px",
                    height: "200px",
                    marginBottom: "20px",
                    marginTop: "20px",
                  }}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Button style={gameButtonStyles} onClick={handleDrawClick}>
                  I want to draw
                </Button>
                <Button style={gameButtonStyles} onClick={handleGuessClick}>
                  I want to guess
                </Button>
              </Col>
            </Row>
            <Row>
              {isDrawing && <Draw></Draw>}
              {isGuessing && <Guess></Guess>}
            </Row>
          </CardBody>
        </div>
      </div>
      <div
        style={{
          position: "fixed",
          bottom: "10px",
          right: "10px",
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          padding: "5px",
          borderRadius: "5px",
        }}
      >
        <a href="https://www.freepik.com/free-vector/gray-line-drawings-organic-shapes-background_58590150.htm#query=doodle%20background&position=1&from_view=keyword&track=ais">
          Image by vector_corp
        </a>
        on Freepik
      </div>
    </div>
  );
}

export default App;
