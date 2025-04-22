import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Dashboard from './screen/Dashboard'
import { SessionDetail } from './screen/SessionDetail'

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/session/:sessionId" element={<SessionDetail />} />
      </Routes>
    </Router>
  )
}

export default App
