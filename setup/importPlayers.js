const admin = require("firebase-admin")
const fs = require("fs")

// Initialize Firebase Admin SDK
const serviceAccount = require("./serviceAccountKey.json")

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})

const db = admin.firestore()

// Load JSON data
const players = JSON.parse(fs.readFileSync("players.json", "utf8"))

async function importData() {
  const collectionRef = db.collection("players")

  for (const player of players) {
    await collectionRef.doc(player.id.toString()).set(player)
    console.log(`Imported: ${player.fullName}`)
  }

  console.log("Import complete!")
}

importData().catch(console.error)
