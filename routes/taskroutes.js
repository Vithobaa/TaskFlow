import express from 'express';
import {home,createtask,edittask,del} from '../controller/taskcontroller.js';
import protect from '../middleware/authmiddleware.js';
const taskrouter=express.Router();

taskrouter.get('/task',protect,home);

taskrouter.post('/add-task',protect,createtask);

taskrouter.put('/edit-task/:id',protect,edittask);

taskrouter.delete('/delete-task/:id',protect,del);

export default taskrouter
