import React, { useState } from "react";
import { QuestionCardProps } from "../quizTypes";

const QuestionCard: React.FC<QuestionCardProps> = ({
  option,
  question,
  callback,
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState("");

  const handleSelection = (event: any) => setSelectedAnswer(event.target.value);

  return (
    <div className="question-card">
      <div className="question">
        <h3>{question}</h3>
      </div>

      <div className="options">
        <form
          onSubmit={(event: React.FormEvent<EventTarget>) =>
            callback(event, selectedAnswer)
          }
        >
          {option.map((item, index) => {
            return (
              <div key={index}>
                <label>
                  <input
                    type="radio"
                    value={item}
                    name="option"
                    required
                    checked={selectedAnswer === item}
                    onChange={handleSelection}
                  />
                  {item}
                </label>
              </div>
            );
          })}

          <input type="submit" />
        </form>
      </div>
    </div>
  );
};

export default QuestionCard;
