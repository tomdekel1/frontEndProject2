import './App.css'
import NavBar from './components/NavBar'
import { Routes, Route } from 'react-router-dom'
import About from './components/pages/About'
import Login from './components/pages/Login'
import Signup from './components/pages/Signup'
import Home from './components/pages/Home'
import SignupBiz from './components/pages/SignupBiz'
import LogOut from './components/pages/LogOut'
import ProtectedRoute from './components/ProtectedRoute'
import MyCards from './components/pages/MyCards'
import CreateCard from './components/pages/CreateCard'
import CardPage from './components/pages/CardPage'
import Favorites from './components/pages/Favorites'
import { useState } from 'react'
import DarkModeToggle from './components/darkModeToggle'
import useLocalStorage from 'use-local-storage'
function App() {
  const [isDark, setIsDark] = useLocalStorage(false)
  const [search, setSearch] = useState("")
  const darkMode = () => {
    return (
      <DarkModeToggle isChecked={isDark} handleChange={() => setIsDark(!isDark)} />
    )
  }

  return (
    <div data-theme={isDark ? "dark" : "light"}>

      <NavBar darkMode={darkMode} setSearch={setSearch} />
      <Routes>
        <Route path="/" element={<Home searchValue={search} />} />
        <Route path="/About" element={<About />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/signUp" element={<Signup />} />
        <Route path="/signUpBiz" element={<SignupBiz />} />
        <Route path="/LogOut" element={<LogOut />} />
        <Route path="/cardPage/:id" element={<CardPage />} />
        <Route path="/favorites" element={<Favorites searchValue={search} />} />

        <Route path="/myCards" element={
          <ProtectedRoute onlyBiz>
            <MyCards />
          </ProtectedRoute>} />

        <Route path="/createCard" element={
          <ProtectedRoute onlyBiz>
            <CreateCard />
          </ProtectedRoute>} />

      </Routes>
    </div>
  )
}

export default App
