import React, { useEffect, useState } from "react";
import { Difficulty, fetchQuizAPI } from "./api";
import "./App.styles.css";
import { Quiz } from "./quizTypes";

const TOTAL_QUESTIONS = 5;

const App = () => {
  const [quiz, setQuiz] = useState<Quiz[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const questions = await fetchQuizAPI(TOTAL_QUESTIONS, Difficulty.EASY);
      console.log(questions);
      setQuiz(questions);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>Quiz App - React & TypeScript</h1>
    </div>
  );
};

export default App;
