// App.jsx

import React, { useState, useEffect } from "react";
import Description from "./components/Description/Description";
import Options from "./components/Options/Options";
import Feedback from "./components/Feedback/Feedback";
import Notification from "./components/Notification/Notification";
import "./App.css";

const App = () => {
  // Ініціалізація стану з localStorage з обробкою помилок
  const [feedback, setFeedback] = useState(() => {
    try {
      const savedFeedback = localStorage.getItem("feedback");
      return savedFeedback
        ? JSON.parse(savedFeedback)
        : { good: 0, neutral: 0, bad: 0 };
    } catch (error) {
      console.error("Failed to parse feedback from localStorage", error);
      return { good: 0, neutral: 0, bad: 0 };
    }
  });

  // Збереження стану в localStorage при кожній зміні відгуків
  useEffect(() => {
    try {
      localStorage.setItem("feedback", JSON.stringify(feedback));
    } catch (error) {
      console.error("Failed to save feedback to localStorage", error);
    }
  }, [feedback]);

  // Функція для оновлення відгуків
  const updateFeedback = (feedbackType) => {
    setFeedback((prevFeedback) => ({
      ...prevFeedback,
      [feedbackType]: prevFeedback[feedbackType] + 1,
    }));
  };

  // Функція для скидання відгуків
  const resetFeedback = () => {
    setFeedback({ good: 0, neutral: 0, bad: 0 });
  };

  // Обчислення загальної кількості відгуків
  const totalFeedback = feedback.good + feedback.neutral + feedback.bad;

  // Обчислення позитивних відгуків у відсотках
  const positiveFeedback = totalFeedback
    ? Math.round((feedback.good / totalFeedback) * 100)
    : 0;

  return (
    <div className="app-background">
      <Description />
      <div className="container">
        <div>
          <Options
            updateFeedback={updateFeedback}
            resetFeedback={resetFeedback}
            totalFeedback={totalFeedback}
          />
        </div>
        <div className="feedback-container">
          {totalFeedback > 0 ? (
            <Feedback
              good={feedback.good}
              neutral={feedback.neutral}
              bad={feedback.bad}
              total={totalFeedback}
              positive={positiveFeedback}
            />
          ) : (
            <Notification />
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
