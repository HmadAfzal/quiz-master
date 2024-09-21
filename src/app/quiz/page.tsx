"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion} from "framer-motion";
import confetti from "canvas-confetti";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { useSession } from "next-auth/react";
import he from "he";

interface Question {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  answers: string[];
}

interface GameHistory {
  id: number;
  date: string;
  score: number;
  totalQuestions: number;
  category: string;
  difficulty: string;
}

export default function QuizPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const { data: session} = useSession();
  const userId = session?.user?.id;
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [isAnswered, setIsAnswered] = useState(false);
  const [gameHistory, setGameHistory] = useState<GameHistory[]>([]);
  const [timeLeft, setTimeLeft] = useState(15);
  const [isLoading, setIsLoading] = useState(true);

  const d = searchParams.get("d") || "medium";
  const t = searchParams.get("t") || "multiple";
  const c = searchParams.get("c") || "science";
  const n = searchParams.get("n") || "10";

  useEffect(() => {
    const fetchQuestions = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `https://opentdb.com/api.php?amount=${n}&category=${c}&difficulty=${d}&type=${t}`
        );
        const fetchedQuestions = response?.data.results.map((q: Question) => ({
          ...q,
          question: he.decode(q.question), 
          correct_answer: he.decode(q.correct_answer),
          incorrect_answers: q.incorrect_answers.map((answer: string) =>
            he.decode(answer)
          ),
          answers: [...q.incorrect_answers, q.correct_answer].sort(
            () => Math.random() - 0.5
          ),
        }));
        setQuestions(fetchedQuestions);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchQuestions();
  }, [searchParams]);
  

  

  useEffect(() => {
    if (!isLoading && questions.length > 0 && !showScore) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timer);
            handleTimeout();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isLoading, questions, showScore, currentQuestion]);

  const handleTimeout = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer("");
      setIsAnswered(false);
      setTimeLeft(15);
    } else {
      setShowScore(true);
      triggerConfetti();
      saveGameHistory();
    }
  };

  const handleAnswerClick = (answer: string) => {
    if (isAnswered) return;

    setSelectedAnswer(answer);
    setIsAnswered(true);

    if (answer === questions[currentQuestion]?.correct_answer) {
      setScore(score + 1);
      toast({
        title: "Correct!",
        description: "Great job!",
        duration: 1500,
      });
    } else {
      toast({
        title: "Incorrect",
        description: `The correct answer was: ${questions[currentQuestion]?.correct_answer}`,
        duration: 2000,
      });
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer("");
        setIsAnswered(false);
        setTimeLeft(15);
      } else {
        setShowScore(true);
        triggerConfetti();
        saveGameHistory();
      }
    }, 1500);
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  const saveGameHistory = async () => {
    try {
      const gameData = {
        userId,
        score,
        totalQuestions: questions.length,
        category: c,
        difficulty: d,
      };
      const response = await axios.post("/api/game-history", gameData);
      setGameHistory([response.data, ...gameHistory]);
    } catch (error) {
      console.error("Error saving game history:", error);
      toast({
        title: "Error",
        description: "Failed to save game history.",
        variant: "destructive",
      });
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setSelectedAnswer("");
    setIsAnswered(false);
    setTimeLeft(15);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p>Loading questions...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl px-4">
        <CardHeader></CardHeader>
        <CardContent>
          {showScore ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <h2 className="text-3xl font-bold mb-4">Quiz Completed!</h2>
              <p className="text-xl mb-6">
                Your score: {score} out of {questions.length}
              </p>

              <div className="flex gap-3 items-center justify-center">
                <Button onClick={restartQuiz}>Restart Quiz</Button>
                <Button onClick={() => router.push("/")}>Back to home</Button>
              </div>
            </motion.div>
          ) : (
            <>
              <Progress
                value={(currentQuestion / questions.length) * 100}
                className="mb-4"
              />
              <h2 className="text-xl font-semibold mb-4">
                Question {currentQuestion + 1} of {questions.length}
              </h2>
              <p className="text-lg mb-6">
                {questions[currentQuestion]?.question}
              </p>
              <div className="grid grid-cols-1 gap-4">
              
                  {questions[currentQuestion]?.answers.map((answer, index) => (
                    <motion.div
                      key={answer}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <Button
                        className="w-full h-16 text-lg"
                        variant={
                          selectedAnswer === answer
                            ? answer ===
                              questions[currentQuestion]?.correct_answer
                              ? "default"
                              : "destructive"
                            : "outline"
                        }
                        onClick={() => handleAnswerClick(answer)}
                        disabled={isAnswered}
                      >
                        {answer}
                      </Button>
                    </motion.div>
                  ))}
        
              </div>
            </>
          )}
        </CardContent>
        <CardFooter className="justify-between">
          <p>Score: {score}</p>
          <p>Time: {timeLeft}s</p>
        </CardFooter>
      </Card>
    </div>
  );
}