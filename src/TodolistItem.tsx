import { ChangeEvent } from "react"
import { FilterValueType, TaskType } from "./App"

import { AddItemForm } from "./AddItemForm"
import { EditableSpan } from "./EditableSpan"
import Button from "@mui/material/Button"
import Icon from "@mui/material/Icon"
import Stack from "@mui/material/Stack"
import IconButton from "@mui/material/IconButton"

import DeleteIcon from '@mui/icons-material/Delete'
import Checkbox from "@mui/material/Checkbox"


type TodolistItemPropsType = {
    title: string
    todolistId: string
    tasks: TaskType[]
    filter: FilterValueType
    deleteTask: (todolistId: string, taskId: string) => void
    changeFilter: (todolistId: string, newValueFilter: FilterValueType) => void
    createTask: (todolistId: string, newTaskTitle: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    deteteTodolist: (todolistId: string) => void
    changeTaskTitle: (todolistId: string, taskId: string, newTitle: string) => void
    changeTodolisTitle: (todolistId: string, newTitle: string) => void
}

export const TodolistItem = (props: TodolistItemPropsType) => {

    const { title, tasks, filter, deleteTask, changeFilter, createTask, changeTaskStatus, todolistId, deteteTodolist, changeTaskTitle, changeTodolisTitle } = props;

    // const [newTaskTitle, setNewTaskTitle] = useState('');

    // const [error, setError] = useState<string | null>(null);

    // const createTaskHandler = () => {
    //     const trimmedTitle = newTaskTitle.trim()
    //     if (trimmedTitle.trim() !== "") {
    //         createTask(todolistId, trimmedTitle)
    //         setNewTaskTitle('')
    //     } else {
    //         setError('Title is required')
    //     }

    // }
    const changeFilterHandler = (filter: FilterValueType) => {
        changeFilter(todolistId, filter)
    }
    // const changeTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
    //     setNewTaskTitle(event.currentTarget.value)
    //     setError(null)
    // }
    // const createTaskOnEnterHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    //     if (event.key === "Enter") {
    //         createTaskHandler()
    //     }
    // }

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
                {/* <h3>{title}</h3> */}
                <EditableSpan value={title} onChange={changeTodolistTitleHandler} />
                {/* <Button title="X" onClick={deleteTodolistHandler} /> */}
                <IconButton onClick={deleteTodolistHandler}>
                    <DeleteIcon />
                </IconButton>
            </div>

            <AddItemForm onClick={addTaskHandler} />
            {/* <div >
                <input
                    className={error ? 'error' : ''}
                    value={newTaskTitle}
                    onChange={changeTaskTitleHandler}
                    onKeyDown={createTaskOnEnterHandler}
                />
                <Button
                    title={"+"}
                    onClick={createTaskHandler} />
            </div> */}
            {/* {error && <div className={'error-message'}>{error}</div>} */}
            {tasks.length === 0 ?
                (<p>тасок нет</p>)
                :
                (
                    <ul>
                        {tasks.map(task => {

                            const deleteTaskHandler = () => {
                                deleteTask(todolistId, task.id)
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
                                    {/* <input type="checkbox" checked={task.isDone} onChange={changeTaskStatusHandler} /> */}
                                    <Checkbox checked={task.isDone} onChange={changeTaskStatusHandler}/>
                                    {/* <span>{task.title}</span> */}
                                    <EditableSpan value={task.title} onChange={changeTaskTitleHandler} />
                                    {/* <Button title="X" onClick={deleteTaskHandler} /> */}
                                    <IconButton onClick={deleteTaskHandler}>
                                        <DeleteIcon />
                                    </IconButton>

                                </li>
                            )
                        })}

                    </ul>
                )}

            <div>
                {/* <Button className={filter === 'All' ? 'active-filter' : ''} title={"All"} onClick={onAllFilterHandler} />
                <Button className={filter === 'Active' ? 'active-filter' : ''} title={"Active"} onClick={onActiveFilterHandler} />
                <Button className={filter === 'Completed' ? 'active-filter' : ''} title={"Completed"} onClick={onCompletedFilterHandler} /> */}
                <Button variant={filter === 'All' ? 'contained' : 'outlined'} color="primary" onClick={onAllFilterHandler}>All</Button>
                <Button variant={filter === 'Active' ? 'contained' : 'outlined'} color="success" onClick={onActiveFilterHandler}>Active</Button>
                <Button variant={filter === 'Completed' ? 'contained' : 'outlined'} color="error" onClick={onCompletedFilterHandler}>Completed</Button>
            </div>

        </div>
    )
}