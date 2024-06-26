import { useState } from "react";
import { v1 } from "uuid";
import { TaskPriorityes, TaskStatuses } from "../../api/todolists-api";
import { TasksStateType } from "../App";
import { todoListId1, todoListId2 } from "../id-utils";

export function useTasksApp() {
  let [tasksObj, setTasksObj] = useState<TasksStateType>({
    [todoListId1]: [
      {
        id: v1(),
        title: "CSS",
        status: TaskStatuses.New,
        priority: TaskPriorityes.Low,
        startDate: "",
        deadline: "",
        todoListId: todoListId1,
        order: 0,
        addedDate: "",
        description: "",
      },
      {
        id: v1(),
        title: "YTML",
        status: TaskStatuses.New,
        priority: TaskPriorityes.Low,
        startDate: "",
        deadline: "",
        todoListId: todoListId1,
        order: 0,
        addedDate: "",
        description: "",
      },
    ],
    [todoListId2]: [
      {
        id: v1(),
        title: "Book",
        status: TaskStatuses.New,
        priority: TaskPriorityes.Low,
        startDate: "",
        deadline: "",
        todoListId: todoListId2,
        order: 0,
        addedDate: "",
        description: "",
      },
      {
        id: v1(),
        title: "Cup",
        status: TaskStatuses.New,
        priority: TaskPriorityes.Low,
        startDate: "",
        deadline: "",
        todoListId: todoListId2,
        order: 0,
        addedDate: "",
        description: "",
      },
    ],
  });

  const removeTasks = (id: string, todoListId: string) => {
    const filtedTasks = tasksObj[todoListId].filter(t => t.id !== id);
    setTasksObj({
      ...tasksObj,
      [todoListId]: filtedTasks
    });

    // let tasks = tasksObj[todoListId]
    // let resultTasksObj = tasks.filter( t => t.id !== id )
    // tasksObj[todoListId] = resultTasksObj
    // setTasksObj({...tasksObj});
  }
  function addTask(title: string, todoListId: string) {
    let newTask = {
      id: v1(), 
      title: title, 
      status: TaskStatuses.New,
      priority: TaskPriorityes.Low,
      startDate: '',
      deadline: '', 
      todoListId: todoListId,
      order: 0,
      addedDate: '',
      description: ''  
    }
      setTasksObj({...tasksObj, [todoListId]:[newTask, ...tasksObj[todoListId]]})
    // let tasks = tasksObj[todoListId];
    // let newTasks = [newTask, ...tasks]
    // tasksObj[todoListId] = newTasks
    // setTasksObj({...tasksObj})
  }
  const chengeStatus = (taskID: string,  status: TaskStatuses, todoListId: string) => {

    setTasksObj({...tasksObj, [todoListId]:tasksObj[todoListId].map(t => t.id === taskID ? {...t, status} : t)})
    // let tasks = tasksObj[todoListId];
    // const task = tasks.find( t => t.id === taskID)
    // if(task){
    //   task.isDone = isDone
    //   setTasksObj({...tasksObj})
    // }
  }
  const chengeTaskTitle = (todoListID: string, taskID: string, newTitle: string) => {
    setTasksObj({...tasksObj, [todoListID]: tasksObj[todoListID].map(t => t.id === taskID ? {...t, title: newTitle} : t)})
  }
  function onStateForNewTodolist(id: string) {
    setTasksObj({
      ...tasksObj,
      [id]: []
    })
  }
  function removeTasksForTodolist(id: string) {
    delete tasksObj[id]
    setTasksObj({...tasksObj})
  }
  return {
    tasksObj,
    setTasksObj,
    removeTasks,
    addTask,
    chengeStatus,
    chengeTaskTitle,
    onStateForNewTodolist,
    removeTasksForTodolist
  };
}
