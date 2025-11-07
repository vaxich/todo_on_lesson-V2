
import { addTodolistAC, changeTodolistFilterAC, changeTodolistTitleAC, deleteTodolistAC, todolistsReducer } from "./todolists-reducer"
import { FilterValueType, Todolist } from "../App"


test('correct todolist should be removed', () => {
  const crypto = require('crypto');
  let todolistId1 = crypto.randomUUID()
  let todolistId2 = crypto.randomUUID()

  const startState: Todolist[] = [
    { id: todolistId1, title: 'What to learn', filter: 'All' },
    { id: todolistId2, title: 'What to buy', filter: 'All' }
  ]

  const endState = todolistsReducer(startState, deleteTodolistAC(todolistId1))
  expect(endState.length).toBe(1)
  expect(endState[0].id).toBe(todolistId2)

})

test('correct todolist should be added', () => {
  const crypto = require('crypto');
  let todolistId1 = crypto.randomUUID()
  let todolistId2 = crypto.randomUUID()

  let newTodolistTitle = "New Todolist"

  const startState: Todolist[] = [
    { id: todolistId1, title: 'What to learn', filter: 'All' },
    { id: todolistId2, title: 'What to buy', filter: 'All' }
  ]

  const endState = todolistsReducer(startState, addTodolistAC(newTodolistTitle))

  expect(endState.length).toBe(3)
  expect(endState[2].title).toBe(newTodolistTitle)
  expect(endState[2].filter).toBe('All')
})

test("correct todolist should change its name", () => {
  const crypto = require('crypto');
  let todolistId1 = crypto.randomUUID()
  let todolistId2 = crypto.randomUUID()

  let newTodolistTitle = "New Todolist"

  const startState: Todolist[] = [
    { id: todolistId1, title: 'What to learn', filter: 'All' },
    { id: todolistId2, title: 'What to buy', filter: 'All' }
  ]

  

  const endState = todolistsReducer(startState, changeTodolistTitleAC(todolistId2, newTodolistTitle))

  expect(endState[0].title).toBe('What to learn')
  expect(endState[1].title).toBe(newTodolistTitle)
})

test("correct filter of todolist should be change", () => {
  const crypto = require('crypto');
  let todolistId1 = crypto.randomUUID()
  let todolistId2 = crypto.randomUUID()

  let newFilter: FilterValueType = "Completed"

  const startState: Todolist[] = [
    { id: todolistId1, title: 'What to learn', filter: 'All' },
    { id: todolistId2, title: 'What to buy', filter: 'All' }
  ]

  

  const endState = todolistsReducer(startState, changeTodolistFilterAC(todolistId2, newFilter))

  expect(endState[0].filter).toBe('All')
  expect(endState[1].filter).toBe(newFilter)
})


