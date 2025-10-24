
import { useState } from 'react';
import './App.css';
import { TodolistItem } from './TodolistItem';
import { AddItemForm } from './AddItemForm';
import { title } from 'process';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';

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

  const deteteTodolist = (todolistId: string) => {
    setTodolists(todolists.filter(tl => tl.id !== todolistId));
    delete tasks[todolistId]
  }

  const addTodolist = (newTitle: string) => {
    let newIdTodolist = crypto.randomUUID()
    let newTodolist: Todolist = { id: newIdTodolist, title: newTitle, filter: "All" }
    setTodolists([...todolists, newTodolist])
    setTasks({ ...tasks, [newIdTodolist]: [] })
  }

  const changeTaskTitle = (todolistId: string, taskId: string, newTitle: string) => {
    setTasks({ ...tasks, [todolistId]: tasks[todolistId].map(task => task.id === taskId ? { ...task, title: newTitle } : task) })

  }

  const changeTodolisTitle = (todolistId: string, newTitle: string) => {
    setTodolists(todolists.map(tl => tl.id === todolistId ? { ...tl, title: newTitle } : tl))
  }

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <Container maxWidth={'lg'}>
            <IconButton color="inherit">

            </IconButton>
            <Button color="inherit">Sign in</Button>

          </Container>

        </Toolbar>
      </AppBar>
      <Container maxWidth={'lg'}>
        <Grid container>
          <AddItemForm onClick={addTodolist} />
        </Grid>
        <Grid container spacing={4}>
          {todolists.map(tl => {

            let filteredTasks = tasks[tl.id];
            if (tl.filter === "Active") {
              filteredTasks = tasks[tl.id].filter((task) => !task.isDone)
            }
            if (tl.filter === "Completed") {
              filteredTasks = tasks[tl.id].filter((task) => task.isDone)
            }

            return (
              <Grid key={tl.id}>
                <Paper>
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
                    changeTaskTitle={changeTaskTitle}
                    changeTodolisTitle={changeTodolisTitle}
                  />
                </Paper>


              </Grid>

            )
          })}
        </Grid>

      </Container>


    </div>
  )
}




export default App;
