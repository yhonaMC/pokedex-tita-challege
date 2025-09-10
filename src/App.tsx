import { useState, useEffect } from 'react'
import { HomePage } from './pages/HomePage'
import { DetailPage } from './pages/DetailPage'
import { useAppDispatch } from './hooks'
import { loadFavorites } from './store/favoritesSlice'

function App() {
  const [currentView, setCurrentView] = useState<'home' | 'detail'>('home')
  const [selectedPokemonId, setSelectedPokemonId] = useState<number | null>(null)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(loadFavorites())
  }, [dispatch])

  const handlePokemonClick = (pokemonId: number) => {
    setSelectedPokemonId(pokemonId)
    setCurrentView('detail')
  }

  const handleBackToHome = () => {
    setCurrentView('home')
    setSelectedPokemonId(null)
  }

  if (currentView === 'detail' && selectedPokemonId) {
    return (
      <DetailPage 
        pokemonId={selectedPokemonId}
        onBack={handleBackToHome}
      />
    )
  }

  return (
    <HomePage onPokemonClick={handlePokemonClick} />
  )
}

export default App
