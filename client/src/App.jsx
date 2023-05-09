import {BrowserRouter as Router,Routes,Route,Link,Navigate} from 'react-router-dom'
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Navbar from './components/Navbar'
import AddTask from './components/AddTask'
import Tasks from './components/Tasks'
import Home from './pages/Home'
import Register from './pages/register/Register'
import Login from './pages/login/Login'
import { useSelector } from 'react-redux'

function App() {
  const user=useSelector(state=>state?.user);
  const token=useSelector(state=>state?.token);
  const isLogged=token ? true: false;

  return (
    <Router>
      <Navbar user={user} />
      <Routes>
        <Route path='/' element={isLogged ? <Home /> : <Navigate to='/login' />} />
        <Route path='/login' element={!isLogged ? <Login /> : <Navigate to ='/' />} />
        <Route path='/register' element={!isLogged && <Register />} />
      </Routes>
    </Router>
  )
}

export default App
