import axios from "axios"

const settings = {
  withCredentials: true,
  headers: {
    'api-key': '1260eb25-46cb-4a88-812f-677a99eb2170'
  }
}
const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.1/',
  ...settings
})

// api 
export const todolistAPI = {
  getTodolists() {
    const promise = instance.get<TodolistType[]>("todo-lists")
    return promise;
  },
  createTodolist(title: string) {
    const promise = instance.post<ResponseType<{item: TodolistType}>>("todo-lists", { title })
    return promise;
  },
  deleteTodolist(todolistId: string) {
    const promise = instance.delete<ResponseType>(`todo-lists/${todolistId}`)
    return promise;
  },
  updateTodolistTitle(title: string, todolistId: string) {
    const promise = instance.put<ResponseType>(`todo-lists/${todolistId}`, { title })
    return promise;
  },
  getTasks(todolistId: string) {
    return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`)
  },
  createTask(todolistId: string, title: string) {
    return instance.post<ResponseType<{item: TasksType}>>(`todo-lists/${todolistId}/tasks`, {title})
  },
  deleteTask(todolistId: string, taskId: string) {
    return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
  },
  updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
    return instance.put<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`, model)
  },
}

export const authAPI = {
  login(data: LoginParamsType) {
    return instance.post<ResponseType<{userId?: number}>>('auth/login', data)
  },
  logout() {
    return instance.delete<ResponseType>('/auth/login')
  },
  me() {
    return instance.get<ResponseType<{data: MeParamsType}>>('auth/me')
  }
} 

// types
export type MeParamsType = {
  id: number
  email: string
  login: string
}
export type LoginParamsType = {
  email: string
  password: string
  rememberMe: boolean
  captcha?: string
}
export type UpdateTaskModelType = {
  description: string
  status: TaskStatuses
  priority: TaskPriorityes
  startDate: string | null
  deadline: string | null
  title: string
}
export type TodolistType = {
  id: string
  title: string,
  addedDate: string
  order: number
}
export type ResponseType<D = {}> = {
  resultCode: number
  messages: string[]
  fieldsErrors: FieldErrorType[]
  data: D
}
type FieldErrorType = {
  error: string
  field: string
}
export enum TaskStatuses {
  New = 0,
  InProgress = 1,
  Completed = 2,
  Draft = 3
}
export enum TaskPriorityes{
  Low = 0, 
  Middle = 1,
  Hi = 2,
  Urgently = 3,
  Later = 4
}
export type TasksType = {
  id: string
  title: string
  status: TaskStatuses
  priority: TaskPriorityes
  description: string  
  startDate: string
  deadline:string 
  todoListId: string
  order: number
  addedDate:string
  //completed: boolean    
}
type GetTasksResponse = {
  totalCount: number
  error: string | null
  items: TasksType[]
}