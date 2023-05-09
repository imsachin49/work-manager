import React, { useState } from 'react';
import Task from './Task';
import moment from 'moment';
import axios from 'axios';
import { useSelector,useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {setAllTasks,setDeleteTask,setUpadedTask} from "../state";

const Tasks = ({task}) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const token=useSelector(state=>state.token);
  const [editTitle,setEditedTitle]=useState(task.title);
  const dispatch=useDispatch();
  const tasks=useSelector(state=>state.tasks);

  const handleEditClick = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleDelete = async () => {
    try {
      const res = await axios.delete(`http://localhost:8800/api/tasks/${task._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(res.data);
      dispatch(setDeleteTask({task:task}));
      toast.success('Task Deleted Successfully',{
        position: "top-center",
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if(editTitle===''){
      toast.error('Title cannot be empty',{
        position: "top-center",
      });
      return;
    }
    else{
      try {
        const res = await axios.put(`http://localhost:8800/api/tasks/${task._id}`,{ title: editTitle },
          {headers: { Authorization: `Bearer ${token}` },}
        );
        console.log(res.data.updatedTask);
        dispatch(setUpadedTask({task:res.data.updatedTask}));
        setIsPopupOpen(false);
        toast.success('Task Updated Successfully',{
          position: "top-center",
        });
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className='border bg-gray-800 p-2 rounded-lg shadow-lg'>
      <p className='text-gray-400 text-xs font-light text-right mr-2'>Added On:{(task.createdAt).slice(0,10)}</p>
      <div className=' text-white font-mono text-base px-4'>{task.title}</div>
      <div className='flex justify-between items-center mt-2 mx-8'>
        <button
          className="text-blue-500 font-medium cursor-pointer text-lg px-4 py-0 border border-blue-500 rounded-full transition-colors duration-300 hover:text-blue-300 hover:font-bold"
          onClick={handleEditClick}
        >
          Edit
        </button>
        <button
          className="text-red-500 font-light cursor-pointer text-lg px-4 py-0 border border-red-500 rounded-full transition-colors duration-300 hover:text-red-300 hover:font-bold"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>

      {isPopupOpen && (
        <div className="fixed top-0 left-0 h-screen w-full bg-gray-800 bg-opacity-50 flex justify-center items-center z-10">
          <div className="p-4 bg-gray-300 rounded-md shadow-lg relative">
          <p className='text-black text-left font-extrabold text-xl text-md py-0 my-0 mr-2 -mb-3'>Edit Your Task</p>
            <form className='flex flex-col justify-center items-start space-y-1 mt-6'>
              <textarea type="text" className="border border-gray-700 p-2 rounded-md w-96 outline-none" value={editTitle} onChange={e=>setEditedTitle(e.target.value)} />
              <div className='flex justify-between items-center w-full'>
                <button type='submit' onClick={handleSave} className="outline-none  bg-green-400 text-white font-light cursor-pointer text-lg px-4 py-0 border border-gray-300 rounded-full transition-colors duration-300 hover:font-bold">Save</button>
                <button className="bg-red-500 text-white font-light cursor-pointer text-lg px-4 py-0 border border-gray-300 rounded-full transition-colors duration-300 hover:font-bold" onClick={handleClosePopup}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default Tasks;
