'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { motion } from 'framer-motion'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from '@/hooks/use-toast'
import Navbar from '@/components/Navbar'

interface LeaderboardEntry {
  id: string
  username: string
  profilePicture: string
  totalScore: number
  gamesPlayed: number
}

export default function LeaderboardPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await axios.get('/api/leaderboard')
        setLeaderboard(response.data)
      } catch (error) {
        console.error('Error fetching leaderboard:', error)
        toast({
          title: "Error",
          description: "Failed to fetch leaderboard data.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchLeaderboard()
  }, [toast])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p>Loading leaderboard...</p>
      </div>
    )
  }

  return (
    <>
    <Navbar/>
   
    <div className="min-h-screen bg-background p-8">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">Leaderboard</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">Rank</TableHead>
                <TableHead>Player</TableHead>
                <TableHead>Total Score</TableHead>
                <TableHead>Games Played</TableHead>
                <TableHead>Avg. Score</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leaderboard.map((entry, index) => (
                <motion.tr
                  key={entry.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={entry.profilePicture} alt={entry.username} />
                        <AvatarFallback>{entry.username.slice(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <span>{entry.username}</span>
                    </div>
                  </TableCell>
                  <TableCell>{entry.totalScore}</TableCell>
                  <TableCell>{entry.gamesPlayed}</TableCell>
                  <TableCell>{(entry.totalScore / entry.gamesPlayed).toFixed(2)}</TableCell>
                </motion.tr>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <div className="mt-8 flex justify-center">
        <Button onClick={() => router.push('/')}>Back to Home</Button>
      </div>
    </div>
    </>
  )
}