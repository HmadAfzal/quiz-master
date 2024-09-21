'use client'
import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent } from "@/components/ui/card"
import { Brain } from 'lucide-react'
import axios from 'axios'
const Randomfacts = () => {
    const [funFact, setFunFact] = useState()

    useEffect(() => {
        const fetchRandomFacts = async () => {
            try {
                const response = await axios.get('https://uselessfacts.jsph.pl/api/v2/facts/random')
                setFunFact(response.data.text)
            } catch (error) {
                console.log(error)
            }
        }
        fetchRandomFacts();
    }, [])

    return (
        <AnimatePresence>
            <motion.div
                key={funFact}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="text-center mx-3"
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
    )
}

export default Randomfacts
