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
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow p-6 cursor-pointer">
      <div className="flex flex-col items-center">
        <img
          className="w-24 h-24 rounded-full object-cover shadow-md mb-4"
          src={player.image}
          alt={player.name}
          onError={(event: React.SyntheticEvent<HTMLImageElement>) => {
            const target = event.target as HTMLImageElement
            target.src = "/profile.png"
            target.onerror = null
          }}
        />
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2 text-center">
          {player.fullName}
        </h2>
        <div className="w-full space-y-2 text-sm text-gray-600 dark:text-gray-300">
          <p className="flex justify-between">
            <span className="font-medium text-gray-700 dark:text-gray-200">
              Age:
            </span>
            <span>{player.age}</span>
          </p>
          <p className="flex justify-between">
            <span className="font-medium text-gray-700 dark:text-gray-200">
              Role:
            </span>
            <span>{player.playingRole}</span>
          </p>
          <p className="flex justify-between">
            <span className="font-medium text-gray-700 dark:text-gray-200">
              Batting:
            </span>
            <span>{player.battingStyle}</span>
          </p>
          <p className="flex justify-between">
            <span className="font-medium text-gray-700 dark:text-gray-200">
              Bowling:
            </span>
            <span>{player.bowlingStyle}</span>
          </p>
        </div>
      </div>
    </div>
  )
}
