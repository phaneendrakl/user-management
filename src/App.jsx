import React from 'react'
import './components/UserList.css'
import './components/UserInfo.css'
import UserList from './components/UserList'
import UserInfo from './components/UserInfo'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="/info/:userId" element={<UserInfo />} />
      </Routes>
    </Router>
  )
}

export default App