import { useState } from 'react'
import './App.css'
import{BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Home from './pages/Home/Home'
import Auth from './pages/Auth/Auth'
import Navbar from './components/navBar/Navbar'
import Dashborad from './pages/DashboardPage/Dashborad'
import ChickenMainPart from './pages/Prediction/chicken/MainPart'
import PlantMainPart from './pages/Prediction/plant/MainPart'
import InvasiveSpeciesMainPart from './pages/Prediction/invasive/MainPart'
import EggMainPart from './pages/Prediction/egg/MainPart'
import FeedMainPart from './pages/Prediction/feed/MainPart'
function App() {

  return (
    <div className="App">
    <Router>
      <Navbar/>
      <Routes>
        <Route path='/home' element={<Home/>}/>
        <Route path='/' element={<Auth title="SignIn"/>}/>
        <Route path='/signup' element={<Auth title="SignUp"/>}/>
        <Route path='/chicken' element={<ChickenMainPart/>}/>
        <Route path='/plant' element={<PlantMainPart/>}/>
        <Route path='/invasive' element={<InvasiveSpeciesMainPart/>}/>
        <Route path='/egg' element={<EggMainPart/>}/>
        <Route path='/feed' element={<FeedMainPart/>}/>
        <Route path='/dashboard' element={<Dashborad/>}/>
      </Routes>
    </Router>
    </div>
  )
}

export default App
