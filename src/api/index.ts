import axios from "axios";
import { QuestionType, Quiz } from "../quizTypes";
import { shuffleArray } from "../utils";

export enum Difficulty {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard",
}

export const fetchQuizAPI = async (
  totalQuestion: number,
  difficulty: Difficulty
): Promise<Quiz[]> => {
  const url = `https://opentdb.com/api.php?amount=${totalQuestion}&category=18&difficulty=${difficulty}&type=multiple`;

  const response = await axios.get(url);
  const { results } = response.data;

  const quizQuestions: Quiz[] = results.map((questionObj: QuestionType) => {
    return {
      question: questionObj.question,
      answer: questionObj.correct_answer,
      option: shuffleArray(
        questionObj.incorrect_answers.concat(questionObj.correct_answer)
      ),
    };
  });

  return quizQuestions;
};
