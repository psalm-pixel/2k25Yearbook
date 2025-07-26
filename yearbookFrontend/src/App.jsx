import React from 'react'
import Homepage from './Homepage'
import Legacy from './Legacy'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Memories from './Memories'
import YearbookMugshots from './Mugshots';
import ErrorBoundary from './components/ErrorBoundary';

export default function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/legacy" element={<Legacy />} />
          <Route path="/memories" element={<Memories />} />
          <Route path="/mugshots" element={<YearbookMugshots/>} />
        </Routes>
      </Router>
    </ErrorBoundary>
  )
}
