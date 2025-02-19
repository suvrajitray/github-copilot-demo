const request = require("supertest")
const app = require("../server")
const admin = require("firebase-admin")

// Mock Firebase Admin
jest.mock("firebase-admin", () => ({
  initializeApp: jest.fn(),
  credential: {
    cert: jest.fn()
  },
  firestore: jest.fn(() => ({
    collection: jest.fn(() => ({
      get: jest.fn(),
      doc: jest.fn()
    }))
  }))
}))

describe("Server API Tests", () => {
  const mockPlayers = [
    {
      id: "1",
      name: "Test Player 1",
      fullName: "Test Player One",
      age: "33 years",
      image: "test-image-1.jpg"
    },
    {
      id: "2",
      name: "Test Player 2",
      fullName: "Test Player Two",
      age: "31 years",
      image: "test-image-2.jpg"
    }
  ]

  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks()
  })

  describe("GET /api/players", () => {
    it("should return all players", async () => {
      // Mock the Firestore response
      const mockGet = jest.fn().mockResolvedValue({
        docs: mockPlayers.map((player) => ({
          id: player.id,
          data: () => player
        }))
      })

      admin.firestore().collection.mockReturnValue({
        get: mockGet
      })

      const response = await request(app)
        .get("/api/players")
        .expect("Content-Type", /json/)
        .expect(200)

      expect(response.body).toHaveLength(2)
      expect(response.body[0].name).toBe("Test Player 1")
      expect(response.body[1].name).toBe("Test Player 2")
    })

    it("should handle database errors gracefully", async () => {
      // Mock a database error
      admin.firestore().collection.mockReturnValue({
        get: jest.fn().mockRejectedValue(new Error("Database error"))
      })

      const response = await request(app)
        .get("/api/players")
        .expect("Content-Type", /json/)
        .expect(500)

      expect(response.body).toHaveProperty("error", "Failed to fetch players")
    })
  })
})
