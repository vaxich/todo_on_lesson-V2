import { ChangeEvent, useState, KeyboardEvent } from "react"
import { FilterValueType, TaskType } from "./App"
import { Button } from "./Button"

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
}

export const TodolistItem = (props: TodolistItemPropsType) => {

    const { title, tasks, filter, deleteTask, changeFilter, createTask, changeTaskStatus, todolistId, deteteTodolist } = props;

    const [newTaskTitle, setNewTaskTitle] = useState('');

    const [error, setError] = useState<string | null>(null);

    const createTaskHandler = () => {
        const trimmedTitle = newTaskTitle.trim()
        if (trimmedTitle.trim() !== "") {
            createTask(todolistId, trimmedTitle)
            setNewTaskTitle('')
        } else {
            setError('Title is required')
        }

    }
    const changeFilterHandler = (filter: FilterValueType) => {
        changeFilter(todolistId, filter)
    }
    const changeTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(event.currentTarget.value)
        setError(null)
    }
    const createTaskOnEnterHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            createTaskHandler()
        }
    }

    const deleteTodolistHandler = () => {
        deteteTodolist(todolistId)
    }

    return (
        <div>
            <div className="container">
                <h3>{title}</h3>
                <Button title="X" onClick={deleteTodolistHandler}/>
            </div>
            <div >
                <input
                    className={error ? 'error' : ''}
                    value={newTaskTitle}
                    onChange={changeTaskTitleHandler}
                    onKeyDown={createTaskOnEnterHandler}
                />
                <Button
                    title={"+"}
                    onClick={createTaskHandler} />
            </div>
            {error && <div className={'error-message'}>{error}</div>}
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

                            return (
                                <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                                    <input type="checkbox" checked={task.isDone} onChange={changeTaskStatusHandler} /> <span>{task.title}</span>
                                    <Button title="X" onClick={deleteTaskHandler} />
                                </li>
                            )
                        })}

                    </ul>
                )}

            <div>
                <Button className={filter === 'All' ? 'active-filter' : ''} title={"All"} onClick={() => changeFilterHandler("All")} />
                <Button className={filter === 'Active' ? 'active-filter' : ''} title={"Active"} onClick={() => changeFilterHandler("Active")} />
                <Button className={filter === 'Completed' ? 'active-filter' : ''} title={"Completed"} onClick={() => changeFilterHandler("Completed")} />

            </div>

        </div>
    )
}