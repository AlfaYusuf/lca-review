import { useState } from 'react'
import './App.css'
import CrateReviewCard from "./component/CrateReviewCard";


function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
    <CrateReviewCard />
    
  </div>
  )
}

export default App
