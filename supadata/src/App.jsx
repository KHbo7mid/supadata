import './index.css';

import { Routes,Route } from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Auth/Login/Login';
import Profile from './Pages/Profile/Profile';
import Register from './Pages/Auth/Register/Register';
import Team from './Pages/Auth/Register/Team/Team';
import Ambassador from './Pages/Auth/Register/Ambassador/Ambassador';


function App() {
  

  return (
    <>
   
    

    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/profile/*' element={<Profile/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/register/:userId' element={<Register />} />
      <Route path='/team'  element={<Team/>}/>
      <Route path='/team/:userId'  element={<Team/>}/>

      <Route  path='/ambassador' element={<Ambassador/>}/>
      <Route  path='/ambassador/:userId' element={<Ambassador/>}/>


    </Routes>
    

    </>
  )
}

export default App
