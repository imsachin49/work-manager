import React from 'react'
import Task from './Task'
import axios from 'axios'
import {useSelector} from 'react-redux'
import {useEffect,useState} from 'react'
import { useDispatch } from 'react-redux'
import { setAllTasks } from '../state'
// const hostUrl='http://localhost:8800'

const Tasks = () => {
  // const [tasks,setTasks]=useState([]);
  const token=useSelector(state=>state.token);
  const [loading,setLoading]=useState(false);
  const [err,setErr]=useState(false);
  const dispatch=useDispatch();
  const tasks=useSelector(state=>state.tasks);

  useEffect(()=>{
    setLoading(true);
    const getTasks=async()=>{
      try{
        const res=await axios.get('https://work-manager-pi.vercel.app/api/tasks/all',{
          headers:{Authorization:`Bearer ${token}`}
        })
        // setTasks(res.data.tasks);
        // console.log(res.data.tasks);
        setLoading(false);
        dispatch(setAllTasks({tasks:res.data.tasks}))
      }catch(err){
        console.log(err);
        setErr(true);
      }
    }
    getTasks();
  },[])

  return (
    <div className='flex w-full px-6'>
      {tasks.length >0 ? <div className='bg-aliceblue w-full flex flex-wrap gap-4 p-4 items-center align-middle justify-center'>
        {tasks.map((t) => (
          <div key={t._id} className='w-full md:w-1/2 lg:w-1/3 xl:w-1/4'>
            <Task task={t} />
          </div>
        ))}
      </div> : <div className='w-full flex justify-center items-center mt-10'>
        <h1 className='text-2xl font-semibold text-gray-400'>Your tasks will be Shown here..</h1>
        </div>}
    </div>
  )
}

export default Tasks
