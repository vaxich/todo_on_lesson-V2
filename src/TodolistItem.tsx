import { ChangeEvent, useState, KeyboardEvent } from "react"
import { FilterValueType, TaskType } from "./App"
import { Button } from "./Button"

type TodolistItemPropsType = {
    title: string
    tasks: TaskType[]
    filter: FilterValueType
    deleteTask: (taskId: string) => void
    changeFilter: (newValueFilter: FilterValueType) => void
    createTask: (newTaskTitle: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
}

export const TodolistItem = (props: TodolistItemPropsType) => {

    const { title, tasks, filter, deleteTask, changeFilter, createTask, changeTaskStatus } = props;

    const [newTaskTitle, setNewTaskTitle] = useState('');

    const [error, setError] = useState<string | null>(null);

    const createTaskHandler = () => {
        const trimmedTitle = newTaskTitle.trim()
        if (trimmedTitle.trim() !== "") {
            createTask(trimmedTitle)
            setNewTaskTitle('')
        } else {
            setError('Title is required')
        }

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

    return (
        <div>
            <h3>{title}</h3>
            <div>
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
                                deleteTask(task.id)
                            }

                            const changeTaskStatusHandler = (event: ChangeEvent<HTMLInputElement>) => {
                                const newStatusValue = event.currentTarget.checked;
                                changeTaskStatus(task.id, newStatusValue)
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
                <Button className={filter === 'All' ? 'active-filter' : ''} title={"All"} onClick={() => changeFilter("All")} />
                <Button className={filter === 'Active' ? 'active-filter' : ''} title={"Active"} onClick={() => changeFilter("Active")} />
                <Button className={filter === 'Completed' ? 'active-filter' : ''} title={"Completed"} onClick={() => changeFilter("Completed")} />

            </div>

        </div>
    )
}