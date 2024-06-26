import { v1 } from "uuid"

import { addTodolistAC, chengeTodolistEntityStatusAC, chengeTodolistFilterAC, chengeTodolistTitleAC, FilterValuesType, removeTodolistAC, setTodolistAC,  TodolistDomainType, todolistsReducer } from "../todolists-reducer"
import { RequestStatusType } from "../../../app/app-reducer"

let todolistId1: string
let todolistId2: string
let startState: TodolistDomainType[] = []

beforeEach(() => {
  todolistId1 = v1()
  todolistId2 = v1()
  startState = [
      {id: todolistId1, title: 'What to learn', addedDate: '', order: 0, filter: 'all', entityStatus: 'idle'},
      {id: todolistId2, title: 'What to buy', addedDate: '', order: 0, filter: 'all', entityStatus: 'idle'}
  ]
})

test('correct todolist should be removed', () => {

    const endState = todolistsReducer(startState, removeTodolistAC({id: todolistId1}))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})

test('correct todolist should change its name', () => {
  let newTodolistTitle = 'New Todolist'

  const action = chengeTodolistTitleAC({title: newTodolistTitle, id: todolistId2})
  const endState = todolistsReducer(startState, action)

  expect(endState[0].title).toBe('What to learn')
  expect(endState[1].title).toBe(newTodolistTitle)
})

test('correct todolist should be added', () => {
  let newTodolist = {id: todolistId1, title: 'New tosolist', addedDate: '', order: 0, filter: 'all'}

  const endState = todolistsReducer(startState, addTodolistAC({todolist: newTodolist}))

  expect(endState.length).toBe(3)
  expect(endState[0].title).toBe('New tosolist')
})

test('correct filter of todolist should be changed', () => {
  let newFilter: FilterValuesType = 'completed'

  const action = chengeTodolistFilterAC({filter: newFilter, id: todolistId2})
  const endState = todolistsReducer(startState, action)

  expect(endState[0].filter).toBe('all')
  expect(endState[1].filter).toBe(newFilter)
})

test('todolist should be set to the state', () => {

  const action = setTodolistAC({todolist: startState})
  const endState = todolistsReducer([], action)

  expect(endState.length).toBe(2)
})

test('correct entity status of todolist should be changed', () => {
  let newStatus: RequestStatusType = 'loading'

  const action = chengeTodolistEntityStatusAC({entityStatus: newStatus, id: todolistId2})
  const endState = todolistsReducer(startState, action)

  expect(endState[0].entityStatus).toBe('idle')
  expect(endState[1].entityStatus).toBe('loading')
})

