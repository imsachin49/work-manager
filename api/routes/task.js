const express=require('express');
const router=express.Router();
const {
    createTask,
    getAllTasks,
    getTaskById,
    updateTaskById,
    deleteTaskById
}=require('../controllers/task');
const {verifyToken,corsMiddleware}=require('../middleware/verify');

// Create Task
router.post('/create',corsMiddleware,verifyToken,createTask);

// Get all tasks of logged in user
router.get('/all',corsMiddleware,verifyToken,getAllTasks);

// Get task by id
router.get('/:id',corsMiddleware,verifyToken,getTaskById);

// Update task by id
router.put('/:id',corsMiddleware,verifyToken,updateTaskById);

// Delete task by id
router.delete('/:id',corsMiddleware,verifyToken,deleteTaskById);

module.exports=router;
