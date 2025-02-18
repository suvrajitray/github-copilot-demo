import React from "react"
import { PlayerCard } from "./PlayerCard"
import players from "../data/players.json"

export const Home: React.FC = () => {
  return (
    <div className="player-list">
      {players.map((player) => (
        <PlayerCard
          key={player.id}
          player={player}
        />
      ))}
    </div>
  )
}
