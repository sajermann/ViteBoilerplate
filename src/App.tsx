import { useState } from 'react'
import logo from './logo.svg'
import Home from './Pages/Home'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
     <Home />
    </div>
  )
}

export default App
