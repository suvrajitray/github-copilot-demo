import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import playerData from "./player-summary.json"

export const PlayerInfo = () => {
  const [playerSummary, setPlayerSummary] = useState(null)
  const [player, setPlayer] = useState({})
  const [matchType, setMatchType] = useState(2)
  const { playerId } = useParams()

  useEffect(() => {
    const player = playerData.find(
      (p) => p.id.toString() === playerId?.toString()
    )
    setPlayer(player)
    const selectedPlayerSummary = player.info.find(
      (p) => p.summary.recordClassId === matchType
    )
    setPlayerSummary(selectedPlayerSummary?.summary || null)
  }, [matchType, playerId])

  if (!playerSummary) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  const careerStats = playerSummary.groups.find(
    (group) => group.type === "CAREER_AVERAGES"
  ).stats[0]
  const oppositionStats = playerSummary.groups.find(
    (group) => group.type === "OPPOSITION_TEAM"
  ).stats
  const countryStats = playerSummary.groups.find(
    (group) => group.type === "HOST_COUNTRY"
  ).stats

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          <img
            src={player.image}
            alt={player.name}
            className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover shadow-lg mx-auto md:mx-0"
          />
          <div className="flex-1 space-y-3">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {player.name}
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600 dark:text-gray-300">
              <p>
                <span className="font-medium">Born:</span> {player.born}
              </p>
              <p>
                <span className="font-medium">Age:</span> {player.age}
              </p>
              <p>
                <span className="font-medium">Batting:</span>{" "}
                {player.battingStyle}
              </p>
              <p>
                <span className="font-medium">Bowling:</span>{" "}
                {player.bowlingStyle}
              </p>
              <p>
                <span className="font-medium">Role:</span> {player.playingRole}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-0">
            {careerStats.tt} Career Statistics
          </h2>
          <select
            className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
            value={matchType}
            onChange={(e) => setMatchType(Number(e.target.value))}
          >
            <option value={2}>ODI</option>
            <option value={1}>Test</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                {Object.keys(careerStats).map((key) => (
                  <th
                    key={key}
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    {key}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800">
              <tr>
                {Object.values(careerStats).map((value, index) => (
                  <td
                    key={index}
                    className="px-4 py-3 text-sm text-gray-900 dark:text-gray-300 border-t dark:border-gray-700"
                  >
                    {value}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Opposition Stats Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Performance by Opposition
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                {Object.keys(oppositionStats[0]).map((key) => (
                  <th
                    key={key}
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    {key}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800">
              {oppositionStats.map((stat, index) => (
                <tr key={index}>
                  {Object.values(stat).map((value, i) => (
                    <td
                      key={i}
                      className="px-4 py-3 text-sm text-gray-900 dark:text-gray-300 border-t dark:border-gray-700"
                    >
                      {value}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Country Stats Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Performance by Host Country
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                {Object.keys(countryStats[0]).map((key) => (
                  <th
                    key={key}
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    {key}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800">
              {countryStats.map((stat, index) => (
                <tr key={index}>
                  {Object.values(stat).map((value, i) => (
                    <td
                      key={i}
                      className="px-4 py-3 text-sm text-gray-900 dark:text-gray-300 border-t dark:border-gray-700"
                    >
                      {value}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
