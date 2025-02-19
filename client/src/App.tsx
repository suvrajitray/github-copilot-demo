import React from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { Home, Header, Footer } from "./components"
import "./index.css"
import { PlayerInfo } from "./components"
import { ThemeProvider } from "./context/ThemeContext"

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
          <Header />
          <main className="flex-grow">
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
          </main>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  )
}

export default App
