
import './App.css';
import { TodolistItem } from './TodolistItem';


export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

const  App = () => {

  const tasks1 : TaskType[] = [
    { id: crypto.randomUUID(), title: 'HTML&CSS', isDone: true },
    { id: crypto.randomUUID(), title: 'JS', isDone: true },
    { id: crypto.randomUUID(), title: 'ReactJS', isDone: false },
    { id: crypto.randomUUID(), title: 'Redux', isDone: false },
    { id: crypto.randomUUID(), title: 'Typescript', isDone: false },
    { id: crypto.randomUUID(), title: 'RTK query', isDone: false },
  ]
 
  const tasks2 : TaskType[]= [ ]
  
  return (
      <div className="App">
        <TodolistItem title = "what to learn" tasks = {tasks1}/>
        <TodolistItem title = "what to buy" tasks = {tasks2} date={"hello"}/>
       
      </div>
  )
}
    
  


export default App;
