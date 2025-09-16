import { TaskType } from "./App"
import { Button } from "./Button"

type TodolistItemPropsType = {
    title: string
    tasks: TaskType[]
    date?: string
}

export const TodolistItem = (props: TodolistItemPropsType) => {

    const { title, tasks } = props

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
                                </li>
                            )
                        })}

                    </ul>
                )}

            <div>
                <Button title = {"All"}/>
                <Button title = {"Active"}/>
                <Button title = {"Complited"}/>
                
            </div>
            <div>{props.date}</div>
        </div>
    )
}