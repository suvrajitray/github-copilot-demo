import React from "react"

export type Player = {
  id: number
  name: string
  fullName: string
  born: string
  age: string
  battingStyle: string
  bowlingStyle: string
  playingRole: string
  image: string
}

export interface PlayerCardProps {
  player: Player
}

export const PlayerCard: React.FC<PlayerCardProps> = ({ player }) => {
  return (
    <div className="player-card">
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
