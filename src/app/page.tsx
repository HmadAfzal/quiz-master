'use client'

import Navbar from '@/components/Navbar'
import Mainpage from '@/components/main-page'
import Randomfacts from '@/components/random-facts'
import he from'he'




export default function HomePage() {

  return (
    <div className="min-h-screen bg-background mb-4">
      <Navbar />
      <Mainpage />
      <Randomfacts />
    </div>
  )
}
