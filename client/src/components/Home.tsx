import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Player, PlayerCard } from "./PlayerCard"

export const Home: React.FC = () => {
  const [players, setPlayers] = useState<Player[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    fetch("http://localhost:5000/api/players") // Fetching data from backend API
      .then((response) => response.json())
      .then((data) => setPlayers(data))
      .catch((error) => console.error("Error fetching player data:", error))
  }, [])
  return (
    <div className="player-list">
      {players.map((player) => (
        <div
          key={player.id}
          onClick={() => navigate(`/player-info/${player.id}`)}
        >
          <PlayerCard
            key={player.id}
            player={player}
          />
        </div>
      ))}
    </div>
  )
}
