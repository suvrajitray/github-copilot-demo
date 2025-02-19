import { render, screen } from "@testing-library/react"
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

  beforeEach(() => {
    ;(global.fetch as jest.Mock) = jest.fn()
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
})
