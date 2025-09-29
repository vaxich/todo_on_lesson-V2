
import { useState } from 'react';
import './App.css';
import { TodolistItem } from './TodolistItem';
import { log } from 'node:console';


export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

export type FilterValueType = "All" | "Active" | "Completed"

const App = () => {

  const [filter, setFilter] = useState<FilterValueType>("All")

  const [tasks, setTasks] = useState<TaskType[]>([
    { id: crypto.randomUUID(), title: 'HTML&CSS', isDone: true },
    { id: crypto.randomUUID(), title: 'JS', isDone: true },
    { id: crypto.randomUUID(), title: 'ReactJS', isDone: false },
    { id: crypto.randomUUID(), title: 'Redux', isDone: false },
    { id: crypto.randomUUID(), title: 'Typescript', isDone: false },
    { id: crypto.randomUUID(), title: 'RTK query', isDone: false },
  ])

  let filteredTasks = tasks;
  if (filter === "Active") {
    filteredTasks = tasks.filter((task) => !task.isDone)
  }
  if (filter === "Completed") {
    filteredTasks = tasks.filter((task) => task.isDone)
  }


  const deleteTask = (taskId: string) => {
    const filteredTasks = tasks.filter((task) => task.id !== taskId)
    setTasks(filteredTasks)
  }

  const createTask = (newTaskTitle: string) => {
    const newTask = {id: crypto.randomUUID() , title: newTaskTitle , isDone: false}
    setTasks([newTask , ...tasks])
  }
  const changeFilter = (newValueFilter: FilterValueType) => {
    setFilter(newValueFilter);
    
  }

  return (
    <div className="App">
      <TodolistItem 
      title="what to learn" 
      tasks={filteredTasks} 
      deleteTask={deleteTask} 
      changeFilter = {changeFilter} 
      createTask= {createTask}
      />


    </div>
  )
}




export default App;
