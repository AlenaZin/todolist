import { TasksStateType } from "../../../trash/App"
import { tasksReducer } from "../tasks-reducer"
import { addTodolistTC, TodolistDomainType, todolistsReducer } from "../todolists-reducer"

test('ids should be equals', () => {
  const startTasksState: TasksStateType = {}
  const startTodolistsState: TodolistDomainType[] = []

  const action = addTodolistTC.fulfilled({todolist: {id: 'todolistId', title: 'New tosolist', addedDate: '', order: 0}},'', 'New tosolist')

  const endTasksState = tasksReducer(startTasksState, action)
  const endTodolistsState = todolistsReducer(startTodolistsState, action)

  const keys = Object.keys(endTasksState)
  const idFromTasks = keys[0]
  const idFromTodolists = endTodolistsState[0].id

  expect(idFromTasks).toBe(action.payload.todolist.id)
  expect(idFromTodolists).toBe(action.payload.todolist.id)
})

