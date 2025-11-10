import { v1 } from "uuid";
import { TasksState } from "../App"
import { AddTodolistACType, RemoveTodolistACType } from "./todolists-reducer";


const initialState: TasksState = {};


// export const tasksReducer = (state = initialState, action: tasksReducerAtionType) => {
//     switch (action.type) {
//         case 'REMOVE-TASK': {
//             // setTasks({ ...tasks, [todolistId]: tasks[todolistId].filter(task => task.id !== taskId) })
//             return { ...state, [action.payload.todolistId]: state[action.payload.todolistId].filter(task => task.id !== action.payload.taskId) }
//         }
//         case 'ADD-TASK': {
            
//             const newTask = { id: v1(), title: action.payload.newTaskTitle, isDone: false }
//             return { ...state, [action.payload.todolistId]: [newTask, ...state[action.payload.todolistId]] }
//         }
//         case "CHANGE-TASK-STATUS": {
//             // setTasks({ ...tasks, [todolistId]: tasks[todolistId].map(task => task.id === taskId ? { ...task, isDone: isDone } : task) })
//             return { ...state, [action.payload.todolistId]: state[action.payload.todolistId].map(task => task.id === action.payload.taskId ? { ...task, isDone: action.payload.newStatus } : task) }
//         }
//         case "CHANGE-TASK-TITLE":{
//             //  setTasks({ ...tasks, [todolistId]: tasks[todolistId].map(task => task.id === taskId ? { ...task, title: newTitle } : task) })
//             return { ...state, [action.payload.todolistId]: state[action.payload.todolistId].map(task => task.id === action.payload.taskId ? { ...task, title: action.payload.newTitle } : task) }
//         }
//         case "ADD-TODOLIST":{
//             //  setTasks({ ...tasks, [newIdTodolist]: [] })
//             return { ...state, [action.payload.newTodolistId]: [] }
//         }
//         case "DELETE-TODOLIST":{
//             // delete tasks[todolistId]
//             let copyState = { ...state }
//             delete copyState[action.payload.todolistId]
//             return copyState
//         }
//          default: return state

//     }
// }

export const tasksReducer = (state= initialState, action: tasksReducerAtionType): TasksState => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            // setTasks({ ...tasks, [todolistId]: tasks[todolistId].filter(task => task.id !== taskId) })
            return { ...state, [action.payload.todolistId]: state[action.payload.todolistId].filter(task => task.id !== action.payload.taskId) }
        }
        case 'ADD-TASK': {
            const newTask = { id: v1(), title: action.payload.newTaskTitle, isDone: false }; // : TaskType
            // setTasks({ ...tasks, [todolistId]: [...tasks[todolistId], newTask] })
            return { ...state, [action.payload.todolistId]: [newTask, ...state[action.payload.todolistId]] }
        }
        case 'CHANGE-TASK-STATUS': {
            //  setTasks({ ...tasks, [todolistId]: tasks[todolistId].map(task => task.id === taskId ? { ...task, isDone: newIsDoneValue } : task) })
            return { ...state, [action.payload.todolistId]: state[action.payload.todolistId].map(task => task.id === action.payload.taskId ? { ...task, isDone: action.payload.newStatus } : task) }
        }
        case 'CHANGE-TASK-TITLE': {
            // setTasks({ ...tasks, [todolistId]: tasks[todolistId].map(task => task.id === taskId ? { ...task, title: newTitle } : task) })
            return { ...state, [action.payload.todolistId]: state[action.payload.todolistId].map(task => task.id === action.payload.taskId ? { ...task, title: action.payload.newTitle } : task) }
        }
        case 'ADD-TODOLIST': {
            // setTasks({ ...tasks, [newTodolistId]: [] })
            return { ...state, [action.payload.todolistId]: [] }
        }
        case 'REMOVE-TODOLIST': {
            // delete tasks[todolistId]
            let copyState = { ...state }
            delete copyState[action.payload.todolistId]
            return copyState
        }

        default: return state
    }
}


type tasksReducerAtionType = removeTaskACType | addTaskACType | changeTaskStatusACType | changeTaskTitleACType | AddTodolistACType | RemoveTodolistACType

type removeTaskACType = ReturnType<typeof removeTaskAC>
type addTaskACType = ReturnType<typeof addTaskAC>
type changeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
type changeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>

export const removeTaskAC = (todolistId: string, taskId: string) => {
    return {
        type: "REMOVE-TASK",
        payload: {
            todolistId,
            taskId
        }
    } as const
}

export const addTaskAC = (todolistId: string, newTaskTitle: string) => {
    return {
        type: "ADD-TASK",
        payload: {
            todolistId,
            newTaskTitle
        }
    } as const
}

export const changeTaskStatusAC = (todolistId: string, taskId: string , newStatus: boolean) => {
    return {
        type: "CHANGE-TASK-STATUS",
        payload: {
            todolistId,
            taskId,
            newStatus
        }
    } as const
}
export const changeTaskTitleAC = (todolistId: string, taskId: string , newTitle: string) => {
    return {
        type: "CHANGE-TASK-TITLE",
        payload: {
            todolistId,
            taskId,
            newTitle
        }
    } as const
}