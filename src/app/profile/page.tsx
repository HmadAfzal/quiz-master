'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { motion } from 'framer-motion'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Trophy, Medal, Award } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { useSession } from 'next-auth/react'
import Navbar from '@/components/Navbar'

interface GameHistory {
  id: number
  date: string
  score: number
  totalQuestions: number
  category: string
  difficulty: string
}

export default function UserProfilePage() {
  const router = useRouter()
  const { toast } = useToast()
  const [gameHistory, setGameHistory] = useState<GameHistory[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const { data: session, status } = useSession()

  useEffect(() => {
    const fetchGameHistory = async (userId: string) => {
      setIsLoading(true)
      try {
        const response = await axios.get(`/api/game-history?userId=${userId}`)
        setGameHistory(response.data)
      } catch (error) {
        console.error('Error fetching game history:', error)
        toast({
          title: "Error",
          description: "Failed to fetch game history.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    if (status === 'authenticated' && session?.user?.id) {
      fetchGameHistory(session.user.id)
    }
  }, [status, session?.user?.id, toast])

  const getTopThreeGames = () => {
    return [...gameHistory].sort((a, b) => b.score / b.totalQuestions - a.score / a.totalQuestions).slice(0, 3)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p>Loading profile...</p>
      </div>
    )
  }

  return (
    <>
    <Navbar/>
    
    <div className="min-h-screen bg-background p-8">
      <Card className="max-w-4xl mx-auto">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Avatar className="w-24 h-24">
              <AvatarImage src={session?.user?.pfpUrl} alt={session?.user?.username} />
              <AvatarFallback>{session?.user?.username.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
          </div>
          <CardTitle className="text-3xl font-bold">{session?.user?.username}</CardTitle>
          <CardDescription>Quiz Master Extraordinaire</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-8">
            <h3 className="text-2xl font-semibold mb-4">Top Performances</h3>
            <div className="flex justify-center space-x-8">
              {gameHistory.length === 0 ? (
                <p>No history available.</p>
              ) : (
                getTopThreeGames().map((game, index) => (
                  <motion.div
                    key={game.id}
                    className="text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    {index === 0 && <Trophy className="size-8 mx-auto mb-2 text-yellow-400" />}
                    {index === 1 && <Medal className="size-8 mx-auto mb-2 text-gray-400" />}
                    {index === 2 && <Award className="size-8 mx-auto mb-2 text-yellow-700" />}
                    <p className="font-semibold text-lg">{game.score}/{game.totalQuestions}</p>
                    <p className="text-sm text-gray-500">{game.category}</p>
                    <p className="text-sm text-gray-500">{game.difficulty}</p>
                  </motion.div>
                ))
              )}
            </div>
          </div>
          {gameHistory.length > 0 && (
            <>
              <h3 className="text-2xl font-semibold mb-4">Quiz History</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Difficulty</TableHead>
                    <TableHead>Score</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {gameHistory.map((game) => (
                    <TableRow key={game.id}>
                      <TableCell>{new Date(game.date).toLocaleDateString()}</TableCell>
                      <TableCell>{game.category}</TableCell>
                      <TableCell className="capitalize">{game.difficulty}</TableCell>
                      <TableCell>{game.score}/{game.totalQuestions}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </>
          )}
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button onClick={() => router.push('/')}>Back to Home</Button>
        </CardFooter>
      </Card>
    </div>
    </>
  )
}
