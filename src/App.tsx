import React, { useEffect, useState } from "react";
import { Difficulty, fetchQuizAPI } from "./api";
import { Quiz } from "./quizTypes";
import QuestionCard from "./components/QuestionCard";
import "./App.styles.scss";

const TOTAL_QUESTIONS = 5;

const App = () => {
  const [quiz, setQuiz] = useState<Quiz[]>([]);
  let [currentQuestion, setCurrentQuestion] = useState(0);
  let [score, setScore] = useState(0);
  let [showResult, setShowResult] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const questions = await fetchQuizAPI(TOTAL_QUESTIONS, Difficulty.EASY);
      setQuiz(questions);
    };
    fetchData();
  }, []);

  const handleSubmit = (
    event: React.FormEvent<EventTarget>,
    userAnswer: string
  ) => {
    event.preventDefault();

    const holdCurrentAnswer: Quiz = quiz[currentQuestion];
    if (userAnswer === holdCurrentAnswer.answer) {
      setScore(++score);
    }

    if (currentQuestion !== quiz.length - 1) {
      return setCurrentQuestion(++currentQuestion);
    } else {
      console.log("Quiz Completed");
      setShowResult(true);
    }
  };

  if (showResult) {
    return (
      <div className="final-result">
        <h3>Result</h3>

        <div>
          <p>{`Your final score is ${score} out of ${TOTAL_QUESTIONS}`}</p>
        </div>
      </div>
    );
  }

  if (!quiz.length) {
    return <h3 className="loading">Loading...</h3>;
  }

  return (
    <div className="app-container">
      <h1 className="quiz-app-title">Quiz App - React & TypeScript</h1>

      <div className="score-counter">
        Score: {score} / {TOTAL_QUESTIONS}
      </div>

      <QuestionCard
        option={quiz[currentQuestion].option}
        question={quiz[currentQuestion].question}
        callback={handleSubmit}
      />
    </div>
  );
};

export default App;
