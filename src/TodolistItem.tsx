import { ChangeEvent } from "react"
import { FilterValueType, TaskType } from "./App"

import { AddItemForm } from "./AddItemForm"
import { EditableSpan } from "./EditableSpan"
import Button from "@mui/material/Button"

import IconButton from "@mui/material/IconButton"

import DeleteIcon from '@mui/icons-material/Delete'
import Checkbox from "@mui/material/Checkbox"


type TodolistItemPropsType = {
    title: string
    todolistId: string
    tasks: TaskType[]
    filter: FilterValueType
    removeTask: (todolistId: string, taskId: string) => void
    changeFilter: (todolistId: string, newValueFilter: FilterValueType) => void
    createTask: (todolistId: string, newTaskTitle: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    deteteTodolist: (todolistId: string) => void
    changeTaskTitle: (todolistId: string, taskId: string, newTitle: string) => void
    changeTodolisTitle: (todolistId: string, newTitle: string) => void
}

export const TodolistItem = (props: TodolistItemPropsType) => {

    const { title, tasks , filter, removeTask, changeFilter, createTask, changeTaskStatus, todolistId, deteteTodolist, changeTaskTitle, changeTodolisTitle } = props;
console.log(tasks);

    const changeFilterHandler = (filter: FilterValueType) => {
        changeFilter(todolistId, filter)
    }
    

    const deleteTodolistHandler = () => {
        deteteTodolist(todolistId)
    }

    const addTaskHandler = (newTitle: string) => {
        createTask(todolistId, newTitle)
    }

    const changeTodolistTitleHandler = (newTitle: string) => {
        changeTodolisTitle(todolistId, newTitle)
    }

    const onAllFilterHandler = () => {
        changeFilterHandler("All")
    }
    const onActiveFilterHandler = () => {
        changeFilterHandler("Active")
    }
    const onCompletedFilterHandler = () => {
        changeFilterHandler("Completed")
    }
    return (
        <div>
            <div className="container">
                
                <EditableSpan value={title} onChange={changeTodolistTitleHandler} />
               
                <IconButton onClick={deleteTodolistHandler}>
                    <DeleteIcon />
                </IconButton>
            </div>

            <AddItemForm onClick={addTaskHandler} /> 
            {/* Uncaught TypeError: Cannot read properties of undefined (reading 'length')
    at TodolistItem (TodolistItem.tsx:70:1) */}
            {tasks.length === 0 ?
                (<p>тасок нет</p>)
                :
                (
                    <ul>
                        {tasks.map(task => {

                            const deleteTaskHandler = () => {
                                removeTask(todolistId, task.id)
                            }

                            const changeTaskStatusHandler = (event: ChangeEvent<HTMLInputElement>) => {
                                const newStatusValue = event.currentTarget.checked;
                                changeTaskStatus(todolistId, task.id, newStatusValue)
                            }

                            const changeTaskTitleHandler = (newValue: string) => {
                                changeTaskTitle(todolistId, task.id, newValue)
                            }

                            return (
                                <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                                    
                                    <Checkbox checked={task.isDone} onChange={changeTaskStatusHandler}/>
                                    
                                    <EditableSpan value={task.title} onChange={changeTaskTitleHandler} />
                                    
                                    <IconButton onClick={deleteTaskHandler}>
                                        <DeleteIcon />
                                    </IconButton>

                                </li>
                            )
                        })}

                    </ul>
                )}

            <div>               
                <Button variant={filter === 'All' ? 'contained' : 'outlined'} color="primary" onClick={onAllFilterHandler}>All</Button>
                <Button variant={filter === 'Active' ? 'contained' : 'outlined'} color="success" onClick={onActiveFilterHandler}>Active</Button>
                <Button variant={filter === 'Completed' ? 'contained' : 'outlined'} color="error" onClick={onCompletedFilterHandler}>Completed</Button>
            </div>

        </div>
    )
}