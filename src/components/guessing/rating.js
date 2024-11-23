import { doc, increment, updateDoc } from "firebase/firestore";
import React, { forwardRef, useImperativeHandle, useState } from "react";
import { FaThumbsDown, FaThumbsUp } from "react-icons/fa";
import { db } from "../../firebase";
import "./ratings.css";

const Rating = forwardRef(({ word, drawingId }, ref) => {
  const [userChoice, setUserChoice] = useState(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);


  useImperativeHandle(ref, () => ({
    reset() {
      setUserChoice(null);
      setHasSubmitted(false);
    },
  }));

  const handleChoice = async (choice) => {
    if (hasSubmitted) return;

    const drawingRef = doc(db, "words", word, "drawings", drawingId);

    try {
      if (choice === "like") {
        await updateDoc(drawingRef, {
          likes: increment(1),
        });
      } else if (choice === "dislike") {
        await updateDoc(drawingRef, {
          dislikes: increment(1),
        });
      }

      setUserChoice(choice);
      setHasSubmitted(true);
      alert("Your feedback was submitted successfully!");
    } catch (error) {
      console.error("Error updating like/dislike:", error);
      alert("Failed to submit feedback. Please try again.");
    }
  };

  return (
    <div>
      <div className="like-dislike-container">

        <FaThumbsUp
          size={40}
          className={`like-icon ${userChoice === "like" ? "selected-like" : ""
            } ${hasSubmitted ? "disabled-hover" : ""}`}
          onClick={() => handleChoice("like")}
          style={{ cursor: hasSubmitted ? "not-allowed" : "pointer" }}
        />

        <FaThumbsDown
          size={40}
          className={`dislike-icon ${userChoice === "dislike" ? "selected-dislike" : ""
            } ${hasSubmitted ? "disabled-hover" : ""}`}
          onClick={() => handleChoice("dislike")}
          style={{ cursor: hasSubmitted ? "not-allowed" : "pointer" }}
        />
      </div>
    </div>
  );
});
export default Rating;
