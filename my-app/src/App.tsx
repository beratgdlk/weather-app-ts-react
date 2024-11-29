import './App.css'
import { useState } from 'react'
import WeatherApp from './WeatherApp'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Hava Durumu</h1>
      <WeatherApp />
    </>
  )
}

export default App
