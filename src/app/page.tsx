'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Lightbulb, Brain, Book, Film, Music } from 'lucide-react'
import Navbar from '@/components/Navbar'

const categories = [
  { id: '9', name: 'General Knowledge', icon: Lightbulb },
  { id: '10', name: 'Books', icon: Book },
  { id: '11', name: 'Film', icon: Film },
  { id: '12', name: 'Music', icon: Music },
]

const funFacts = [
  "The first computer programmer was a woman named Ada Lovelace.",
  "The world's first website is still online!",
  "The most common password is '123456'. Please use something more secure!",
  "The first computer mouse was made of wood.",
  "The first computer virus was created in 1983 as an experiment.",
]

export default function HomePage() {
  const [numQuestions, setNumQuestions] = useState('10')
  const [category, setCategory] = useState('')
  const [difficulty, setDifficulty] = useState('')
  const [type, setType] = useState('')
  const [funFact, setFunFact] = useState('')
  const router = useRouter()

  useEffect(() => {
    setFunFact(funFacts[Math.floor(Math.random() * funFacts.length)])
  }, [])

  const handleStartQuiz = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    })
    const queryParams = new URLSearchParams({
      amount: numQuestions,
      ...(category && { category }),
      ...(difficulty && { difficulty }),
      ...(type && { type })
    }).toString()
    router.push(`/quiz?${queryParams}`)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="w-full max-w-2xl mx-auto mb-8">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-center">Welcome to QuizMaster!</CardTitle>
              <CardDescription className="text-center">
                Test your knowledge with fun quizzes from various categories.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="categories" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="categories">Categories</TabsTrigger>
                  <TabsTrigger value="custom">Custom Quiz</TabsTrigger>
                </TabsList>
                <TabsContent value="categories">
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    {categories.map((cat) => (
                      <motion.div
                        key={cat.id}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          variant="outline"
                          className="w-full h-24 flex flex-col items-center justify-center"
                          onClick={() => {
                            setCategory(cat.id)
                            handleStartQuiz()
                          }}
                        >
                          <cat.icon className="w-8 h-8 mb-2" />
                          {cat.name}
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="custom">
                  <form className="space-y-4 mt-4">
                    <div>
                      <Label htmlFor="numQuestions">Number of Questions</Label>
                      <Input
                        id="numQuestions"
                        type="number"
                        min="1"
                        max="50"
                        value={numQuestions}
                        onChange={(e) => setNumQuestions(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="category">Category</Label>
                      <Select value={category} onValueChange={setCategory}>
                        <SelectTrigger id="category">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((cat) => (
                            <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="difficulty">Difficulty</Label>
                      <Select value={difficulty} onValueChange={setDifficulty}>
                        <SelectTrigger id="difficulty">
                          <SelectValue placeholder="Select difficulty" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="easy">Easy</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="hard">Hard</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="type">Question Type</Label>
                      <Select value={type} onValueChange={setType}>
                        <SelectTrigger id="type">
                          <SelectValue placeholder="Select question type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="multiple">Multiple Choice</SelectItem>
                          <SelectItem value="boolean">True / False</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={handleStartQuiz}>Start Quiz</Button>
            </CardFooter>
          </Card>
        </motion.div>

        <AnimatePresence>
          <motion.div
            key={funFact}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="text-center mt-8"
          >
            <Card className='w-full max-w-2xl mx-auto'>
              <CardContent className="pt-6">
                <Brain className="w-12 h-12 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Did you know?</h3>
                <p>{funFact}</p>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  )
}