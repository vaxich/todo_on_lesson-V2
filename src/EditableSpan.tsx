import { ChangeEvent, useState } from "react";

type EditableSpanProps = {
    value: string
    onChange: (title: string) => void
}


export const EditableSpan = (props: EditableSpanProps) => {

    const { value , onChange } = props;

    const [editMode, setEditMode] = useState<boolean>(false);
    const [title, setTitle] = useState(value)

    

    const onEditMode = () => {
        setEditMode(true)
    }

    const offEditMode = () => {
        setEditMode(false)
        onChange(title)
    }

    const changeTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
            setTitle(event.currentTarget.value)
            
        }
        
    return (
        editMode
            ? <input onBlur={offEditMode} onChange={changeTaskTitleHandler} value={title} autoFocus />
            : <span onClick={onEditMode}>{value}</span>
    )
}