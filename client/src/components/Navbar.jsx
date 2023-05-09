import React from 'react'
import { Link } from 'react-router-dom'
import { setLogout } from '../state'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Navbar = ({user}) => {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const handleLogout=()=>{
    dispatch(setLogout());
    toast.success('Logged out successfully',{position: "top-center",autoClose: 2000});
    navigate('/login'); 
    window.location.reload();   
  }

  return (
    <div className='bg-[aliceblue] w-[100%] flex align-middle justify-between border-b-2 sticky top-0 '>
      <div className='text-2xl text-black p-2 font-bold'>Task<span className='text-red-600 font-extrabold'>App</span></div>
      <div className='flex align-middle  fixed right-2'>
        {user && <div className='flex align-middle justify-center items-center h-full mt-1'>
          <button className='bg-blue-400 uppercase outline-none border-none text-white rounded-md shadow-xl font-bold m-1 p-1 px-2'>{user.name}</button>
          <button className='bg-pink text-white font-bold m-1 rounded-md p-1 px-2 shadow-lg' onClick={handleLogout}>Logout</button>
        </div>}
      </div>
      <ToastContainer />
    </div>
  )
}

export default Navbar
