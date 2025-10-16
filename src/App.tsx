
import { useState } from 'react';
import './App.css';
import { TodolistItem } from './TodolistItem';

export type Todolist = {
  id: string
  title: string
  filter: FilterValueType
}

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}
export type TasksState = {
  [key: string]: TaskType[]
}

export type FilterValueType = "All" | "Active" | "Completed"

const App = () => {

  //const [filter, setFilter] = useState<FilterValueType>("All")
  const todolistId1 = crypto.randomUUID();
  const todolistId2 = crypto.randomUUID();

  const [todolists, setTodolists] = useState<Todolist[]>([
    { id: todolistId1, title: 'What to learn', filter: 'All' },
    { id: todolistId2, title: 'What to buy', filter: 'Completed' },
  ])

  const [tasks, setTasks] = useState<TasksState>({
    [todolistId1]: [
      { id: crypto.randomUUID(), title: 'HTML&CSS', isDone: true },
      { id: crypto.randomUUID(), title: 'JS', isDone: true },
      { id: crypto.randomUUID(), title: 'ReactJS', isDone: false },
    ],
    [todolistId2]: [
      { id: crypto.randomUUID(), title: 'Rest API', isDone: true },
      { id: crypto.randomUUID(), title: 'GraphQL', isDone: false },
    ],
  })




  const deleteTask = (todolistId: string, taskId: string) => {
    setTasks({ ...tasks, [todolistId]: tasks[todolistId].filter(task => task.id !== taskId) })
    // const filteredTasks = tasks.filter((task) => task.id !== taskId)
    // setTasks(filteredTasks)
  }

  const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
    setTasks({ ...tasks, [todolistId]: tasks[todolistId].map(task => task.id === taskId ? { ...task, isDone: isDone } : task) })
    // const newState = tasks.map(task => task.id === taskId ? { ...task, isDone: isDone } : task)
    // setTasks(newState)
  }

  const createTask = (todolistId: string, newTaskTitle: string) => {
    const newTask = { id: crypto.randomUUID(), title: newTaskTitle, isDone: false }
    setTasks({ ...tasks, [todolistId]: [newTask, ...tasks[todolistId]] })

    // setTasks([newTask, ...tasks])
  }
  const changeFilter = (todolistId: string, newValueFilter: FilterValueType) => {
    setTodolists(todolists.map(tl => tl.id === todolistId ? { ...tl, filter: newValueFilter } : tl))
    //setFilter(newValueFilter);

  }

  const deteteTodolist =(todolistId: string) => {
    setTodolists(todolists.filter( tl => tl.id !== todolistId));
    delete tasks[todolistId]
  }

  return (
    <div className="App">

      {todolists.map(tl => {

        let filteredTasks = tasks[tl.id];
        if (tl.filter === "Active") {
          filteredTasks = tasks[tl.id].filter((task) => !task.isDone)
        }
        if (tl.filter === "Completed") {
          filteredTasks = tasks[tl.id].filter((task) => task.isDone)
        }

        return (
          <TodolistItem
            todolistId={tl.id}
            title={tl.title}
            tasks={filteredTasks}
            filter={tl.filter}
            deleteTask={deleteTask}
            changeFilter={changeFilter}
            createTask={createTask}
            changeTaskStatus={changeTaskStatus}
            deteteTodolist={deteteTodolist}
          />
        )
      })}



    </div>
  )
}




export default App;
