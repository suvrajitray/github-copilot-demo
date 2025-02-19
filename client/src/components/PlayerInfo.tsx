import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import playerData from "./player-summary.json"

export const PlayerInfo = () => {
  const [playerSummary, setPlayerSummary] = useState(null)
  const [player, setPlayer] = useState({})
  const [matchType, setMatchType] = useState(2) // Default to ODI
  const { playerId } = useParams()

  useEffect(() => {
    console.log(playerId)
    const player = playerData.find(
      (p) => p.id.toString() === playerId?.toString()
    )
    setPlayer(player)
    // Filter player data based on match type
    const selectedPlayerSummary = player.info.find(
      (p) => p.summary.recordClassId === matchType
    )
    setPlayerSummary(selectedPlayerSummary?.summary || null)
  }, [matchType, playerId])

  if (!playerSummary) return <div>Loading...</div>

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
    <div className="container mx-auto p-4">
      <div className="flex items-center space-x-4">
        <img
          src={player.image}
          alt={player.name}
          className="w-32 h-32 rounded-full"
        />
        <div>
          <h1 className="text-3xl font-bold">{player.name}</h1>
          <p>
            <strong>Full Name:</strong> {}
          </p>
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
      </div>
      <h1 className="text-3xl font-bold">Player Info - {careerStats.tt}</h1>
      <label className="block mt-4">
        <span className="text-gray-700">Select Match Type:</span>
        <select
          className="block w-full mt-2 p-2 border"
          value={matchType}
          onChange={(e) => setMatchType(Number(e.target.value))}
        >
          <option value={2}>ODI</option>
          <option value={1}>Test</option>
        </select>
      </label>
      <h2 className="text-xl mt-2">Career Stats</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border p-2">Span</th>
            <th className="border p-2">Matches</th>
            <th className="border p-2">Innings</th>
            <th className="border p-2">NO</th>
            <th className="border p-2">Runs</th>
            <th className="border p-2">BF</th>
            <th className="border p-2">Highest Score</th>
            <th className="border p-2">Avg</th>
            <th className="border p-2">Strike Rate</th>
            <th className="border p-2">100s</th>
            <th className="border p-2">50s</th>
            <th className="border p-2">0s</th>
            <th className="border p-2">4s</th>
            <th className="border p-2">6s</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border p-2">{careerStats.sp}</td>
            <td className="border p-2">{careerStats.mt}</td>
            <td className="border p-2">{careerStats.in}</td>
            <td className="border p-2">{careerStats.no}</td>
            <td className="border p-2">
              <b>{careerStats.rn}</b>
            </td>
            <td className="border p-2">{careerStats.hs}</td>
            <td className="border p-2">{careerStats.bf}</td>
            <td className="border p-2">{careerStats.bta}</td>
            <td className="border p-2">{careerStats.btsr}</td>
            <td className="border p-2">{careerStats.hn}</td>
            <td className="border p-2">{careerStats.ft}</td>
            <td className="border p-2">{careerStats.dk}</td>
            <td className="border p-2">{careerStats.fo}</td>
            <td className="border p-2">{careerStats.si}</td>
          </tr>
        </tbody>
      </table>

      <h2 className="text-xl mt-4">Performance by Opposition</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border p-2">Opponent</th>
            <th className="border p-2">Span</th>
            <th className="border p-2">Matches</th>
            <th className="border p-2">Innings</th>
            <th className="border p-2">NO</th>
            <th className="border p-2">Runs</th>
            <th className="border p-2">BF</th>
            <th className="border p-2">Highest Score</th>
            <th className="border p-2">Avg</th>
            <th className="border p-2">Strike Rate</th>
            <th className="border p-2">100s</th>
            <th className="border p-2">50s</th>
            <th className="border p-2">0s</th>
            <th className="border p-2">4s</th>
            <th className="border p-2">6s</th>
          </tr>
        </thead>
        <tbody>
          {oppositionStats.map((op, index) => (
            <tr key={index}>
              <td className="border p-2">{op.tt}</td>
              <td className="border p-2">{op.sp}</td>
              <td className="border p-2">{op.mt}</td>
              <td className="border p-2">{op.in}</td>
              <td className="border p-2">{op.no}</td>
              <td className="border p-2">
                <b>{op.rn}</b>
              </td>
              <td className="border p-2">{op.hs}</td>
              <td className="border p-2">{op.bf}</td>
              <td className="border p-2">{op.bta}</td>
              <td className="border p-2">{op.btsr}</td>
              <td className="border p-2">{op.hn}</td>
              <td className="border p-2">{op.ft}</td>
              <td className="border p-2">{op.dk}</td>
              <td className="border p-2">{op.fo}</td>
              <td className="border p-2">{op.si}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 className="text-xl mt-4">Performance by Host Country</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border p-2">Country</th>
            <th className="border p-2">Span</th>
            <th className="border p-2">Matches</th>
            <th className="border p-2">Innings</th>
            <th className="border p-2">NO</th>
            <th className="border p-2">Runs</th>
            <th className="border p-2">BF</th>
            <th className="border p-2">Highest Score</th>
            <th className="border p-2">Avg</th>
            <th className="border p-2">Strike Rate</th>
            <th className="border p-2">100s</th>
            <th className="border p-2">50s</th>
            <th className="border p-2">0s</th>
            <th className="border p-2">4s</th>
            <th className="border p-2">6s</th>
          </tr>
        </thead>
        <tbody>
          {countryStats.map((host, index) => (
            <tr key={index}>
              <td className="border p-2">{host.tt}</td>
              <td className="border p-2">{host.sp}</td>
              <td className="border p-2">{host.mt}</td>
              <td className="border p-2">{host.in}</td>
              <td className="border p-2">{host.no}</td>
              <td className="border p-2">
                <b>{host.rn}</b>
              </td>
              <td className="border p-2">{host.hs}</td>
              <td className="border p-2">{host.bf}</td>
              <td className="border p-2">{host.bta}</td>
              <td className="border p-2">{host.btsr}</td>
              <td className="border p-2">{host.hn}</td>
              <td className="border p-2">{host.ft}</td>
              <td className="border p-2">{host.dk}</td>
              <td className="border p-2">{host.fo}</td>
              <td className="border p-2">{host.si}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
