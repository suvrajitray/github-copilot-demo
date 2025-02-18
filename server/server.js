// backend/server.js (Node.js + Express + Firebase)
const express = require("express")
const cors = require("cors")
const admin = require("firebase-admin")
const serviceAccount = require("./serviceAccountKey.json")

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://github-copilot-demo-fb.firebaseio.com"
})

const db = admin.firestore()
const app = express()
app.use(cors())
app.use(express.json())

app.get("/api/players", async (req, res) => {
  try {
    const playersRef = db.collection("players")
    const snapshot = await playersRef.get()
    const players = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    res.json(players)
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch players" })
  }
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
