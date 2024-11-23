import { collection, getDocs, limit, query } from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { CardBody, CardText } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { FiRefreshCcw } from "react-icons/fi";
import { ReactSketchCanvas } from "react-sketch-canvas";
import { db } from "../../firebase";
import Toolbar from "./Toolbar";

export const getRandomWord = async () => {
  const wordsRef = collection(db, "words");

  try {
    const q = query(wordsRef, limit(500));
    const snapshot = await getDocs(q);
    if (snapshot.empty) {
      return null;
    }
    const wordIds = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));


    const randomIndex = Math.floor(Math.random() * wordIds.length);
    const randomWord = wordIds[randomIndex];

    return randomWord.word;
  } catch (error) {
    console.error("Error fetching random word:", error);
    throw error;
  }
};

const styles = {
  border: ".4625rem solid black",
  borderRadius: "0.25rem",
};

const Draw = () => {
  const sketchRef = useRef(null);
  const [color, setColor] = useState("black");
  const [word, setWord] = useState(null);
  const [cursorSize, setCursorSize] = useState(4);

  useEffect(() => {
    fetchRandomWord();
  }, []);

  const fetchRandomWord = async () => {
    const fetchedWord = await getRandomWord();
    setWord(fetchedWord);
  };

  const handleCursorSizeChange = (size) => {
    setCursorSize(parseInt(size.target.value));
  };

  const handleColorChange = (newColor) => {
    setColor(newColor.hex);
  };

  return (
    <div>
      <Container>
        <Row>
          <Col className="g-0">
            <Container className="g-0"
              style={{ display: "flex", maxWidth: "512px", }}
            >
              <Card
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: "100%",
                  margin: "5px 0px",
                }}
              >
                <CardBody>
                  <CardText>Word: {word}</CardText>
                </CardBody>
              </Card>
              <Button
                style={{
                  margin: "5px 0px",
                }}
                variant="info"
                onClick={fetchRandomWord}
              >
                <FiRefreshCcw />
              </Button>
            </Container>
          </Col>
        </Row>
        <Row>
          <Col xxl={3}>{/* Empty */}</Col>
          <Col xxl={6} className="d-flex justify-content-center g-0">
            <ReactSketchCanvas
              ref={sketchRef}
              style={styles}
              width="512px"
              height="512px"
              strokeWidth={cursorSize}
              strokeColor={color}
              eraserWidth={cursorSize}
            />
          </Col>

          <Col xxl={3}></Col>
          <Col xxl={0}>{/* Empty */}</Col>
        </Row>
        <Row>
          <Col xxl={3}>{/* Empty */}</Col>
          <Col xxl={6} className="d-flex justify-content-center g-0">
            <Toolbar
              color={color}
              handleColorChange={handleColorChange}
              sketchRef={sketchRef}
              handleCursorSizeChange={handleCursorSizeChange}
              cursorSize={cursorSize}
              word={word}
              setWord={setWord}
            />
          </Col>
          <Col xxl={3}>{/* Empty */}</Col>
        </Row>
      </Container>
    </div>
  );
};

export default Draw;
