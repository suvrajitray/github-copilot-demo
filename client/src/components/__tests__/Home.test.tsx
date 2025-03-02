import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import { Home } from "../Home"

// Mock react-router-dom
jest.mock("react-router-dom", () => ({
  useNavigate: () => jest.fn()
}))

describe("Home", () => {
  const mockPlayers = [
    {
      id: 1,
      name: "Test Player 1",
      fullName: "Test Player One",
      born: "1990-01-01",
      age: "33 years",
      battingStyle: "Right Handed",
      bowlingStyle: "Right-arm fast",
      playingRole: "Bowler",
      image: "test-image-1.jpg"
    },
    {
      id: 2,
      name: "Test Player 2",
      fullName: "Test Player Two",
      born: "1992-01-01",
      age: "31 years",
      battingStyle: "Left Handed",
      bowlingStyle: "Left-arm medium",
      playingRole: "All-rounder",
      image: "test-image-2.jpg"
    }
  ]

  // Generate more mock players to test pagination (total: 10)
  const generateMorePlayers = () => {
    const morePlayers = [...mockPlayers]
    for (let i = 3; i <= 10; i++) {
      morePlayers.push({
        id: i,
        name: `Test Player ${i}`,
        fullName: `Test Player ${i}`,
        born: "1995-01-01",
        age: "28 years",
        battingStyle: i % 2 === 0 ? "Right Handed" : "Left Handed",
        bowlingStyle: i % 2 === 0 ? "Right-arm medium" : "Left-arm medium",
        playingRole:
          i % 3 === 0 ? "Batsman" : i % 3 === 1 ? "Bowler" : "All-rounder",
        image: `test-image-${i}.jpg`
      })
    }
    return morePlayers
  }

  beforeEach(() => {
    ;(global.fetch as jest.Mock) = jest.fn()
    // Mock scrollTo
    window.scrollTo = jest.fn()
  })

  it("renders loading state initially", () => {
    ;(global.fetch as jest.Mock).mockImplementationOnce(
      () => new Promise(() => {})
    )

    render(<Home />)
    expect(screen.getByRole("status")).toBeInTheDocument()
  })

  it("renders players after successful fetch", async () => {
    ;(global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockPlayers)
      })
    )

    render(<Home />)

    await screen.findByText("Cricket Players")
    expect(screen.getByText("Test Player One")).toBeInTheDocument()
    expect(screen.getByText("Test Player Two")).toBeInTheDocument()
  })

  it("handles fetch error gracefully", async () => {
    const consoleError = jest
      .spyOn(console, "error")
      .mockImplementation(() => {})
    ;(global.fetch as jest.Mock).mockRejectedValueOnce(
      new Error("Failed to fetch")
    )

    render(<Home />)

    await screen.findByText("Cricket Players")
    expect(consoleError).toHaveBeenCalled()
    consoleError.mockRestore()
  })

  it("renders search box", async () => {
    ;(global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockPlayers)
      })
    )

    render(<Home />)

    await screen.findByText("Cricket Players")
    expect(
      screen.getByPlaceholderText("Search by name or role...")
    ).toBeInTheDocument()
  })

  it("filters players when searching", async () => {
    ;(global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockPlayers)
      })
    )

    render(<Home />)

    await screen.findByText("Cricket Players")

    const searchInput = screen.getByLabelText("Search players")
    fireEvent.change(searchInput, { target: { value: "Bowler" } })

    await waitFor(() => {
      expect(screen.getByText("Test Player One")).toBeInTheDocument()
      expect(screen.queryByText("Test Player Two")).not.toBeInTheDocument()
    })
  })

  it("shows 'no players found' message when search has no results", async () => {
    ;(global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockPlayers)
      })
    )

    render(<Home />)

    await screen.findByText("Cricket Players")

    const searchInput = screen.getByLabelText("Search players")
    fireEvent.change(searchInput, { target: { value: "NonexistentPlayer" } })

    expect(
      await screen.findByText('No players found matching "NonexistentPlayer"')
    ).toBeInTheDocument()
  })

  it("renders pagination when there are more players than the limit per page", async () => {
    const manyPlayers = generateMorePlayers()
    ;(global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve(manyPlayers)
      })
    )

    render(<Home />)

    await screen.findByText("Cricket Players")

    // Pagination should show since we have more than 8 players
    expect(screen.getByLabelText("Page navigation")).toBeInTheDocument()
    expect(screen.getByLabelText("Page 1")).toBeInTheDocument()
    expect(screen.getByLabelText("Page 2")).toBeInTheDocument()
  })

  it("changes page when pagination is clicked", async () => {
    const manyPlayers = generateMorePlayers()
    ;(global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve(manyPlayers)
      })
    )

    render(<Home />)

    await screen.findByText("Cricket Players")

    // First page shows first 8 players
    expect(screen.getByText("Test Player One")).toBeInTheDocument()

    // Click on page 2
    fireEvent.click(screen.getByLabelText("Page 2"))

    // Should show players from second page
    expect(screen.getByText("Test Player 9")).toBeInTheDocument()
    expect(screen.queryByText("Test Player One")).not.toBeInTheDocument()

    // Should call scrollTo
    expect(window.scrollTo).toHaveBeenCalled()
  })

  it("resets to first page when search term changes", async () => {
    const manyPlayers = generateMorePlayers()
    ;(global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve(manyPlayers)
      })
    )

    render(<Home />)

    await screen.findByText("Cricket Players")

    // Go to page 2
    fireEvent.click(screen.getByLabelText("Page 2"))

    // Change search term
    const searchInput = screen.getByLabelText("Search players")
    fireEvent.change(searchInput, { target: { value: "Bowler" } })

    // Should reset to page 1
    await waitFor(() => {
      expect(screen.getByLabelText("Page 1")).toHaveAttribute(
        "aria-current",
        "page"
      )
    })
  })
})
