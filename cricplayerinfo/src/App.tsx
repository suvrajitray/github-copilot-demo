import React from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { Home, Header, Footer } from "./components"
import "./index.css"

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
