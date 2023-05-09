import React from 'react'
import AddTask from '../components/AddTask'
import Tasks from '../components/Tasks'
import { useNavigate } from 'react-router-dom'


const Home = () => {
  return (
    <div className='w-full'>
      <AddTask />
      <Tasks />
    </div>
  )
}

export default Home
