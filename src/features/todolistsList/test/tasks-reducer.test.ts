import { addTaskTC, fetchTasksTC, removeTaskTC, tasksReducer, updateTaskTC } from '../tasks-reducer'
import { addTodolistTC, fetchTodolistsTC, removeTodolistTC} from '../todolists-reducer'
import { TaskPriorityes, TaskStatuses } from '../../../api/todolists-api'
import { v1 } from 'uuid'
import { TasksStateType } from '../todolist/tasks/Task'
import { title } from 'process'

let startState: TasksStateType = {}
let todolistId1: string
let todolistId2: string

beforeEach(() => {
  todolistId1 = v1()
  todolistId2 = v1()
  startState = {
    [todolistId1]: [
        {
          id: "1",
          title: "CSS",
          status: TaskStatuses.New,
          priority: TaskPriorityes.Low,
          startDate: "",
          deadline: "",
          todoListId: "",
          order: 0,
          addedDate: "",
          description: "",
        },
        {
          id: "2",
          title: "JS",
          status: TaskStatuses.Completed,
          priority: TaskPriorityes.Low,
          startDate: "",
          deadline: "",
          todoListId: "",
          order: 0,
          addedDate: "",
          description: "",
        },
        {
          id: "3",
          title: "React",
          status: TaskStatuses.New,
          priority: TaskPriorityes.Low,
          startDate: "",
          deadline: "",
          todoListId: "",
          order: 0,
          addedDate: "",
          description: "",
        },
    ],
    [todolistId2]: [
        {
          id: "1",
          title: "bread",
          status: TaskStatuses.New,
          priority: TaskPriorityes.Low,
          startDate: "",
          deadline: "",
          todoListId: "",
          order: 0,
          addedDate: "",
          description: "",
        },
        {
          id: "2",
          title: "milk",
          status: TaskStatuses.Completed,
          priority: TaskPriorityes.Low,
          startDate: "",
          deadline: "",
          todoListId: "",
          order: 0,
          addedDate: "",
          description: "",
        },
        {
          id: "3",
          title: "tea",
          status: TaskStatuses.New,
          priority: TaskPriorityes.Low,
          startDate: "",
          deadline: "",
          todoListId: "",
          order: 0,
          addedDate: "",
          description: "",
        },
    ],
};
})

test('correct task should be deleted from correct array', () => {

const action = removeTaskTC.fulfilled({id: '2', todolistId: todolistId2}, '', {id: '2', todolistId: todolistId2})

const endState = tasksReducer(startState, action)

expect(endState).toEqual({
    [todolistId1]: [
        {
          id: "1",
          title: "CSS",
          status: TaskStatuses.New,
          priority: TaskPriorityes.Low,
          startDate: "",
          deadline: "",
          todoListId: "",
          order: 0,
          addedDate: "",
          description: "",
        },
        {
          id: "2",
          title: "JS",
          status: TaskStatuses.Completed,
          priority: TaskPriorityes.Low,
          startDate: "",
          deadline: "",
          todoListId: "",
          order: 0,
          addedDate: "",
          description: "",
        },
        {
          id: "3",
          title: "React",
          status: TaskStatuses.New,
          priority: TaskPriorityes.Low,
          startDate: "",
          deadline: "",
          todoListId: "",
          order: 0,
          addedDate: "",
          description: "",
        },
    ],
    [todolistId2]: [
        {
          id: "1",
          title: "bread",
          status: TaskStatuses.New,
          priority: TaskPriorityes.Low,
          startDate: "",
          deadline: "",
          todoListId: "",
          order: 0,
          addedDate: "",
          description: "",
        },
        {
          id: "3",
          title: "tea",
          status: TaskStatuses.New,
          priority: TaskPriorityes.Low,
          startDate: "",
          deadline: "",
          todoListId: "",
          order: 0,
          addedDate: "",
          description: "",
        },
    ],
})
})

test('correct task should be added to correct array', () => {

  const task: any = {
    id: '1',
    title: 'juce',
    status: TaskStatuses.New,
    priority: TaskPriorityes.Low,
    startDate: "",
    deadline: "",
    todoListId: todolistId2,
    order: 0,
    addedDate: "",
    description: "",
  }

const action = addTaskTC.fulfilled(task, '', task)
const endState = tasksReducer(startState, action)

expect(endState[todolistId2].length).toBe(4)
expect(endState[todolistId1].length).toBe(3)
//expect(endState[todolistId2][0].id).toBeDefined()
expect(endState[todolistId2][0].title).toBe('juce')
expect(endState[todolistId2][0].status).toBe(TaskStatuses.New)
})

test('status of specified task should be changed', () => {

const action = updateTaskTC.fulfilled({id: '2', domainModel: {status: TaskStatuses.New}, todolistId: todolistId2}, '', {id: '2', domainModel: {status: TaskStatuses.New}, todolistId: todolistId2})
const endState = tasksReducer(startState, action)

expect(endState[todolistId2][1].status).toBe(TaskStatuses.New)
expect(endState[todolistId1][1].status).toBe(TaskStatuses.Completed)
})

test('correct task should change its title', () => {
  
const action = updateTaskTC.fulfilled({id: '2', domainModel: {title: 'TS'}, todolistId: todolistId1}, '', {id: '2', domainModel: {status: TaskStatuses.New}, todolistId: todolistId2})
const endState = tasksReducer(startState, action)

expect(endState[todolistId1][1].title).toBe('TS')
expect(endState[todolistId2][1].title).toBe("milk")
})

test('new array should be added when new todolist is added', () => {

const action = addTodolistTC.fulfilled({todolist: {id: 'todolistId3', title: 'New tosolist', addedDate: '', order: 0}}, '', 'New tosolist')
const endState = tasksReducer(startState, action)

const keys = Object.keys(endState)
const newKey = keys.find(k => k != 'todolistId1' && k != 'todolistId2')
if (!newKey) {
    throw Error('new key should be added')}

expect(keys.length).toBe(3)
//expect(endState[newKey]).toEqual([])
})

test('property with todolistId should be deleted', () => {

const action = removeTodolistTC.fulfilled({id: 'todolistId2'}, '', 'todolistId2')
const endState = tasksReducer(startState, action)

const keys = Object.keys(endState)

expect(keys.length).toBe(2)
expect(endState['todolistId2']).not.toBeDefined()
})

test('empty array should be set todolist', () => {

  const action = fetchTodolistsTC.fulfilled({todolist: [
    {id: '1', title: 'title 1', addedDate: '', order: 0},
    {id: '2', title: 'title 2', addedDate: '', order: 0}
]}, '')
  const endState = tasksReducer({}, action)
  
  const keys = Object.keys(endState)
  
  expect(keys.length).toBe(2)
  expect(endState['1']).toStrictEqual([])
  expect(endState['2']).toStrictEqual([])
  })

  test('tasks should be added for todolist', () => {

    // const action = setTasksAC({tasks: startState[todolistId1], todolistId: todolistId1})
    const action = fetchTasksTC.fulfilled({tasks: startState[todolistId1], todolistId: todolistId1}, '', todolistId1)
    const endState = tasksReducer({
      [todolistId1]: [],
      [todolistId2]: []
    }, action)
        
    expect(endState[todolistId1].length).toBe(3)
    expect(endState[todolistId2].length).toBe(0)
    })




