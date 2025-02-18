import React from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { Home, Header, Footer } from "./components"
import "./index.css"
import { PlayerInfo } from "./components"

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/player/:playerId"
          element={<PlayerInfo />}
        />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
