import { FilterValueType, TaskType } from "./App"
import { Button } from "./Button"

type TodolistItemPropsType = {
    title: string
    tasks: TaskType[]
    deleteTask: (taskId: string) => void
    changeFilter: (newValueFilter: FilterValueType) => void
}

export const TodolistItem = (props: TodolistItemPropsType) => {

    const { title, tasks , deleteTask , changeFilter} = props

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input />
                <button>+</button>
            </div>
            {tasks.length === 0 ?
                (<p>тасок нет</p>)
                :
                (
                    <ul>
                        {tasks.map(task => {

                            return (
                                <li key={task.id}>
                                    <input type="checkbox" checked={task.isDone} /> <span>{task.title}</span>
                                    <Button title = "X" onClick={ () => deleteTask(task.id)}/>
                                </li>
                            )
                        })}

                    </ul>
                )}

            <div>
                <Button title = {"All"} onClick={ () => changeFilter("All")}/>
                <Button title = {"Active"} onClick={ () => changeFilter("Active")}/>
                <Button title = {"Completed"} onClick={ () => changeFilter("Completed")} />
                
            </div>
            
        </div>
    )
}