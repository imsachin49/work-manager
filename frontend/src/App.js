import {BrowserRouter as Router,Routes,Route,Link,Navigate} from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Register from './pages/register/Register'
import Login from './pages/login/Login'
import { useSelector } from 'react-redux'

function App() {
  const user=useSelector(state=>state?.user);
  const token=useSelector(state=>state?.token);
  const isLogged=token ? true: false;
  console.log(process.env.REACT_APP_API_URL);

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
