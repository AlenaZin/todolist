import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { todolistAPI } from '../api/todolists-api'

export default {
  title: 'API',
}

const settings = {
  withCredentials: true,
  headers: {
    'api-key': '1260eb25-46cb-4a88-812f-677a99eb2170'
  }
}

export const GetTodolists = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    todolistAPI.getTodolists()
      .then((res) => {
        setState(res.data);
    });
  }, [])
  return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
  const [state, setState] = useState<any>(null)
  const [title, setTitle] = useState<string>('')

  const createTodolist = () => {
    todolistAPI.createTodolist(title)
    .then((res) => {
      setState(res.data)
    })
  }

  return <div>{JSON.stringify(state)}
    <input placeholder={'title'} value={title} onChange={(e) => {setTitle(e.currentTarget.value)}}/>
      <button onClick={createTodolist}>create todolist</button>
  </div>
}
export const DeleteTodolist = () => {
  const [state, setState] = useState<any>(null)
  const [todolistId, setTodolistId] = useState<string>('')

  const deleteTodolist = () => {
    todolistAPI.deleteTodolist(todolistId)
    .then((res) => {
      setState(res.data)
    })
  }
  return <div>{JSON.stringify(state)}
      <input placeholder={'todolistId'} value={todolistId} onChange={(e) => {setTodolistId(e.currentTarget.value)}}/>
      <button onClick={deleteTodolist}>delete todolist</button>
  </div>
}
export const UpdateTodolistTitle = () => {
  const [state, setState] = useState<any>(null)
  const [todolistId, setTodolistId] = useState<string>('')
  const [title, setTitle] = useState<string>('')

  const updateTodolistTitle = () => {
    todolistAPI.updateTodolistTitle(title, todolistId)
    .then((res) => {
      setState(res.data)
    })
  }
  return <div>{JSON.stringify(state)}
    <input placeholder={'title'} value={title} onChange={(e) => {setTitle(e.currentTarget.value)}}/>
    <input placeholder={'todolistId'} value={todolistId} onChange={(e) => {setTodolistId(e.currentTarget.value)}}/>
      <button onClick={updateTodolistTitle}>update todolist title</button>
  </div>
}
export const GetTasks = () => {
  const [state, setState] = useState<any>(null)  
  const [todolistId, setTodolistId] = useState('')
  
  const getTask = () => {
    todolistAPI.getTasks(todolistId)
    .then((res) => {
      setState(res.data);
  });
  }
  return <div>{JSON.stringify(state)}
    <div>
      <input placeholder={'todolistId'} value={todolistId} onChange={(e) => {setTodolistId(e.currentTarget.value)}}/>
      <button onClick={getTask}>get task</button>
    </div>
  </div>
}
export const CreateTasks = () => {
  const [state, setState] = useState<any>(null)
  const [todolistId, setTodolistId] = useState('')
  const [title, setTitle] = useState('')

  const createTask = () => {
    todolistAPI.createTask(todolistId, title)
    .then((res) => {
      setState(res.data)
    })
  }
  return <div>{JSON.stringify(state)}
      <div>
        <input placeholder={'todolistId'} value={todolistId} onChange={(e) => {setTodolistId(e.currentTarget.value)}}/>
        <input placeholder={'title'} value={title} onChange={(e) => {setTitle(e.currentTarget.value)}}/>
        <button onClick={createTask}>create task</button>
    </div>
  </div>
}
export const DeleteTasks = () => {
  const [state, setState] = useState<any>(null)
  const [taskId, setTaskId] = useState('')
  const [todolistId, setTodolistId] = useState('')

  const deleteTask = () => {
    todolistAPI.deleteTask(todolistId, taskId)
    .then((res) => {
      setState(res.data)
    })
  }
  return <div>{JSON.stringify(state)}
    <div>
      <input placeholder={'todolistId'} value={todolistId} onChange={(e) => {setTodolistId(e.currentTarget.value)}}/>
      <input placeholder={'taskId'} value={taskId} onChange={(e) => {setTaskId(e.currentTarget.value)}}/>
      <button onClick={deleteTask}>delete task</button>
    </div>
  </div>
}
export const UpdateTaskTitle = () => {
  const [state, setState] = useState<any>(null)
  const [taskId, setTaskId] = useState<string>('')
  const [todolistId, setTodolistId] = useState<string>('')
  const [description, setDescription] = useState<string>('description 1')
  const [status, setStatus] = useState<number>(0)
  const [priority, setPriority] = useState<number>(0)
  const [startDate, setStartDate] = useState<string>('')
  const [deadline, setDeadline] = useState<string>('')
  const [title, seTitle] = useState<string>('Nev task')

  const updateTask = () => {
    todolistAPI.updateTask(todolistId, taskId, {
      description: description,
      status: status,
      priority: priority,
      startDate: null,
      deadline: null,
      title: title
    })
    .then((res) => {
      setState(res.data)
    })
  }
  return (
    <div>
      {JSON.stringify(state)}
      <div>
      <input placeholder={'todolistId'} value={todolistId} onChange={(e) => {setTodolistId(e.currentTarget.value)}}/>
      <input placeholder={'taskId'} value={taskId} onChange={(e) => {setTaskId(e.currentTarget.value)}}/>
      <input placeholder={'description'} value={description} onChange={(e) => {setDescription(e.currentTarget.value)}}/>
      <input placeholder={'status'} value={status} onChange={(e) => {setStatus(+e.currentTarget.value)}}/>
      <input placeholder={'priority'} value={priority} onChange={(e) => {setPriority(+e.currentTarget.value)}}/>
      <input placeholder={'startDate'} value={startDate} onChange={(e) => {setStartDate(e.currentTarget.value)}}/>
      <input placeholder={'deadline'} value={deadline} onChange={(e) => {setDeadline(e.currentTarget.value)}}/>
      <input placeholder={'title'} value={title} onChange={(e) => {seTitle(e.currentTarget.value)}}/>
      <button onClick={updateTask}>update task</button>
      </div>
    </div>
  );
}