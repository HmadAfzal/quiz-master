import React from 'react'
import { useState} from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Lightbulb,Earth,Dog,CarFront } from 'lucide-react'

const categories = [
    { id: '9', name: 'General Knowledge', icon: Lightbulb },
    { id: '28', name: 'Vehicles', icon: CarFront },
    { id: '23', name: 'History', icon: Earth },
    { id: '27', name: 'Animals', icon: Dog },
  ]

  
const Mainpage = () => {
    const [numQuestions, setNumQuestions] = useState('10')
    const [category, setCategory] = useState('9')
    const [difficulty, setDifficulty] = useState('medium')
    const [type, setType] = useState('multiple')
    const [selected, setSelected]=useState('')
const router=useRouter();
    
const handleStartQuiz = async () => {
  router.push(`/quiz?c=${category }&d=${difficulty}&t=${type}&n=${numQuestions}`);
};

  return (
    <main className="container mx-auto px-4 md:py-8 py-4">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      
      <Card className="w-full max-w-2xl mx-auto ">
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
                      className={`w-full h-24 flex flex-col items-center justify-center ${
                        selected === cat.id && 'dark:bg-zinc-800 bg-zinc-100'
                      }`}
                      onClick={() => {
                        setCategory(cat.id)
                        setSelected(cat.id)
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
                        <SelectItem key={cat.id} value={cat.id}>
                          {cat.name}
                        </SelectItem>
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
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={handleStartQuiz}>
            Start Quiz
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  </main>
  )
}

export default Mainpage



