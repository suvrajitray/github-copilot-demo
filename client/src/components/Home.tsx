import React, { useEffect, useState, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { Player, PlayerCard } from "./PlayerCard"
import { SearchBox } from "./SearchBox"
import { Pagination } from "./Pagination"

export const Home: React.FC = () => {
  const [players, setPlayers] = useState<Player[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const playersPerPage = 8
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

  // Filter players based on search term
  const filteredPlayers = useMemo(() => {
    if (!searchTerm.trim()) return players

    const searchTermLower = searchTerm.toLowerCase()
    return players.filter(
      (player) =>
        player.name.toLowerCase().includes(searchTermLower) ||
        player.fullName.toLowerCase().includes(searchTermLower) ||
        player.playingRole.toLowerCase().includes(searchTermLower)
    )
  }, [players, searchTerm])

  // Reset to first page when search changes
  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm])

  // Calculate pagination
  const totalPages = Math.max(
    1,
    Math.ceil(filteredPlayers.length / playersPerPage)
  )
  const paginatedPlayers = useMemo(() => {
    const startIndex = (currentPage - 1) * playersPerPage
    return filteredPlayers.slice(startIndex, startIndex + playersPerPage)
  }, [filteredPlayers, currentPage, playersPerPage])

  // Handle page changes
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

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

      <SearchBox
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        placeholder="Search by name or role..."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {paginatedPlayers.length > 0 ? (
          paginatedPlayers.map((player) => (
            <div
              key={player.id}
              onClick={() => navigate(`/player/${player.id}`)}
              className="transform transition-transform hover:scale-105"
            >
              <PlayerCard player={player} />
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-10">
            <p className="text-gray-600 dark:text-gray-300 text-xl">
              No players found matching "{searchTerm}"
            </p>
          </div>
        )}
      </div>

      {filteredPlayers.length > playersPerPage && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}

      <div className="mt-6 text-sm text-gray-500 dark:text-gray-400 text-center">
        Showing {paginatedPlayers.length} of {filteredPlayers.length} players
      </div>
    </div>
  )
}
