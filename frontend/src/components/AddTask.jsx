import React,{useState,useEffect}  from 'react'
import {useSelector,useDispatch} from 'react-redux'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {setAllTasks} from "../state";

const AddTask = () => {
  const [task,setTask]=useState('');
  const [loading,setLoading]=useState(false);
  const [err,setErr]=useState(false);
  const token=useSelector(state=>state.token);
  const tasks=useSelector(state=>state.tasks);
  console.log(tasks)
  const dispatch=useDispatch();

  const handleSubmit=async(e)=>{
    e.preventDefault();
    if(task.length<1){
      toast.warn('Please Enter Some text', {
        position: "top-center",
        autoClose: 3000,
        theme: "dark",
      });
    }else{
      setLoading(true);
      try{
        const res=await axios.post('https://work-manage-49.vercel.app/api/tasks/create',{title:task},{
        headers:{Authorization:`Bearer ${token}`}
        })
        setTask('');
        setLoading(false);
        console.log(res.data);
        dispatch(
          setAllTasks({
            tasks: [...tasks, res.data.task],
          })
        )
        toast.success('Task Added Successfully', {
          position: "top-center",
          autoClose: 3000,
          theme: "light",
        });
      }catch(err){
        console.log(err);
        setErr(true);
        toast.error('Something went wrong', {position: "top-center"});
      }
    }
  }

  return (
    <div className='w-full flex align-middle justify-center items-center mt-4 sticky top-1 '>
      <div className='w-1/2 flex flex-col'>
        <div className='w-full flex justify-center'>
          <input className='w-2/3 rounded-sm p-2 outline-none border border-gray-400' type='text' value={task} placeholder='Add New Task Here..' onChange={e=>setTask(e.target.value)} />
          <button type='submit' onClick={handleSubmit} className='border rounded-md shadow-lg p-2 px-2 ml-1 font-semibold capitalize bg-pink text-yellow-50'>add task</button>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default AddTask
