import Navbar from '@/components/Navbar';
import QuizContent from '@/components/quiz-content';
import { Suspense } from 'react';

export default function QuizPage() {
  return (
    <>
    <Navbar/>
    <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center">Loading...</div>}>
      <QuizContent />
    </Suspense>
    </>
  );
}