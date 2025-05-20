import React from 'react'
import Homepage from './Homepage'
import Legacy from './Legacy'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/legacy" element={<Legacy />} />
      </Routes>
    </Router>

  )
}
