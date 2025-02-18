import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Player } from "./PlayerCard"

export const PlayerInfo: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [player, setPlayer] = useState<Player | null>(null)

  /*
  useEffect(() => {
    fetch(`http://localhost:5000/api/players/${id}`)
      .then((response) => response.json())
      .then((data) => setPlayer(data))
      .catch((error) => console.error("Error fetching player details:", error))
  }, [id])
  */

  if (!player) {
    return <div>Loading...</div>
  }

  return (
    <div className="player-info">
      <img
        src={player.image}
        alt={player.name}
      />
      <h2>{player.fullName}</h2>
      <p>
        <strong>Born:</strong> {player.born}
      </p>
      <p>
        <strong>Age:</strong> {player.age}
      </p>
      <p>
        <strong>Batting Style:</strong> {player.battingStyle}
      </p>
      <p>
        <strong>Bowling Style:</strong> {player.bowlingStyle}
      </p>
      <p>
        <strong>Playing Role:</strong> {player.playingRole}
      </p>
    </div>
  )
}
