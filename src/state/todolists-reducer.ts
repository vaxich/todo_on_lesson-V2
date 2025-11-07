import { FilterValueType, Todolist } from "../App"



//const initialState: Todolist[] = []

export const todolistsReducer = (state: Todolist[], action: todolistsReducerAtionType) => {
    switch (action.type) {
        case 'DELETE-TODOLIST': {
            // setTodolists(todolists.filter(tl => tl.id !== todolistId));
            // delete tasks[todolistId]
            return state.filter(tl => tl.id !== action.payload.todolistId)
        }
        case "ADD-TODOLIST": {
            const crypto = require('crypto');
            let newIdTodolist = crypto.randomUUID()
            let newTodolist: Todolist = { id: newIdTodolist, title: action.payload.newTitle, filter: "All" }
            // setTodolists([...todolists, newTodolist])
            // setTasks({ ...tasks, [newIdTodolist]: [] })
            return [...state, newTodolist]
        }
        case "CHANGE-TODOLIST-TITLE": {
            // setTodolists(todolists.map(tl => tl.id === todolistId ? { ...tl, title: newTitle } : tl))
            return state.map(tl => tl.id === action.payload.todolistId ? { ...tl, title: action.payload.newTitle } : tl)
        }
        case "CHANGE-TODOLIST-FILTER": {
            // setTodolists(todolists.map(tl => tl.id === todolistId ? { ...tl, filter: newValueFilter } : tl))
            return state.map(tl => tl.id === action.payload.todolistId ? { ...tl, filter: action.payload.newValueFilter } : tl)
        }

    }
}

type todolistsReducerAtionType = DeleteTodolistACType | addTodolistACType | changeTodolistTitleACType| changeTodolistFilterACType

export type DeleteTodolistACType = ReturnType<typeof deleteTodolistAC>
export type addTodolistACType = ReturnType<typeof addTodolistAC>
type changeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>
type changeTodolistFilterACType = ReturnType<typeof changeTodolistFilterAC>



export const deleteTodolistAC = (todolistId: string) => {
    return {
        type: "DELETE-TODOLIST",
        payload: {
            todolistId
        }
    } as const
}
export const addTodolistAC = (newTitle: string) => {
    const crypto = require('crypto');
    let newTodolistId = crypto.randomUUID()
    return {
        type: "ADD-TODOLIST",
        payload: {
            newTodolistId,
            newTitle
        }
    } as const
}
export const changeTodolistTitleAC = (todolistId: string, newTitle: string) => {
    return {
        type: "CHANGE-TODOLIST-TITLE",
        payload: {
            todolistId,
            newTitle
        }
    } as const
}
export const changeTodolistFilterAC = (todolistId: string, newValueFilter: FilterValueType) => {
    return {
        type: "CHANGE-TODOLIST-FILTER",
        payload: {
            todolistId,
            newValueFilter
        }
    } as const
}