import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Player, PlayerCard } from "./PlayerCard"

export const Home: React.FC = () => {
  const [players, setPlayers] = useState<Player[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    fetch("http://localhost:5000/api/players")
      .then((response) => response.json())
      .then((data) => {
        setPlayers(data)
        setIsLoading(false)
      })
      .catch((error) => {
        console.error("Error fetching player data:", error)
        setIsLoading(false)
      })
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div
          role="status"
          className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"
          aria-label="Loading"
        />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        Cricket Players
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {players.map((player) => (
          <div
            key={player.id}
            onClick={() => navigate(`/player/${player.id}`)}
            className="transform transition-transform hover:scale-105"
          >
            <PlayerCard player={player} />
          </div>
        ))}
      </div>
    </div>
  )
}
