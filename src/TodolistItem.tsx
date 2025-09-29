import { ChangeEvent, useState , KeyboardEvent} from "react"
import { FilterValueType, TaskType } from "./App"
import { Button } from "./Button"

type TodolistItemPropsType = {
    title: string
    tasks: TaskType[]
    deleteTask: (taskId: string) => void
    changeFilter: (newValueFilter: FilterValueType) => void
    createTask: (newTaskTitle: string) => void
}

export const TodolistItem = (props: TodolistItemPropsType) => {

    const { title, tasks, deleteTask, changeFilter, createTask } = props;

    const [newTaskTitle, setNewTaskTitle] = useState('')

    const createTaskHandler = () => {
        createTask(newTaskTitle)
        setNewTaskTitle('')
    }

    const changeTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(event.currentTarget.value)
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
                    value={newTaskTitle}
                    onChange={changeTaskTitleHandler}
                    onKeyDown={createTaskOnEnterHandler}
                />
                <Button
                    title={"+"}
                    onClick={createTaskHandler} />
            </div>
            {tasks.length === 0 ?
                (<p>тасок нет</p>)
                :
                (
                    <ul>
                        {tasks.map(task => {

                            const deleteTaskHandler = () => {
                                deleteTask(task.id)
                            }

                            return (
                                <li key={task.id}>
                                    <input type="checkbox" checked={task.isDone} /> <span>{task.title}</span>
                                    <Button title="X" onClick={deleteTaskHandler} />
                                </li>
                            )
                        })}

                    </ul>
                )}

            <div>
                <Button title={"All"} onClick={() => changeFilter("All")} />
                <Button title={"Active"} onClick={() => changeFilter("Active")} />
                <Button title={"Completed"} onClick={() => changeFilter("Completed")} />

            </div>

        </div>
    )
}