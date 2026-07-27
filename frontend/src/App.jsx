import './css/App.css'
import { Routes, Route } from 'react-router-dom'
import { MovieProvider } from './contexts/MovieContext'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Favorites from './pages/Favorites'
import MovieDetails from './pages/MovieDetails'

function App() {
  return (
    <>
    <MovieProvider>
      <Navbar/>
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
        </Routes>
      </main>
    </MovieProvider>
    </>
  )
}

export default App
