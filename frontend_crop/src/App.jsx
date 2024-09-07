import { useState } from 'react'
import './App.css'
import ContractDashboard from './components/contractDashboard'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="App">
      <ContractDashboard/>
    </div>
    </>
  )
}

export default App
