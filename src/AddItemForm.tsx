import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { ChangeEvent, KeyboardEvent, useState } from "react";


type addItemFormProps = {
    onClick: (title: string) => void
}


export const AddItemForm = (props: addItemFormProps) => {

    const { onClick } = props;

    const [newTaskTitle, setNewTaskTitle] = useState('');

    const [error, setError] = useState<string | null>(null);

    const createTaskHandler = () => {
        const trimmedTitle = newTaskTitle.trim()
        if (trimmedTitle.trim() !== "") {
            onClick(trimmedTitle)
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
        <div >
            {/* <input
                className={error ? 'error' : ''}
                value={newTaskTitle}
                onChange={changeTaskTitleHandler}
                onKeyDown={createTaskOnEnterHandler}
            /> */}
            <TextField label={'Enter a title'}
                variant={'outlined'}
                className={error ? 'error' : ''}
                value={newTaskTitle}
                size={'small'}
                onChange={changeTaskTitleHandler}
                onKeyDown={createTaskOnEnterHandler} />
            {/* <Button
                title={"+"}
                onClick={createTaskHandler} /> */}
            <Button variant="contained" onClick={createTaskHandler}>+</Button>
            {error && <div className={'error-message'}>{error}</div>}
        </div>

    )
}