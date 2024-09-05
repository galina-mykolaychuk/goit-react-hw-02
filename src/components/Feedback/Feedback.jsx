// Feedback.jsx

import React from "react";
import css from "./Feedback.module.css";

const Feedback = ({ good, neutral, bad, total, positive }) => (
  <div className={css.container}>
    <p>Good: {good}</p>
    <p>Neutral: {neutral}</p>
    <p>Bad: {bad}</p>
    <p>Total: {total}</p>
    <p>Positive feedback: {positive}%</p>
  </div>
);

export default Feedback;
