import React from "react";
import { action } from '@storybook/addon-actions';
import { Task } from "./Task";
import { TaskPriorityes, TaskStatuses } from "../../../../api/todolists-api";

export default {
  title: 'Task Component', 
  component: Task,
};

const chengeStatusCallback = action('Status chenged')
const chengeTitleCallback = action('Title chenged')
const onRemoveClickCallback = action('Task remuve')

export const TaskBaseExampe = () => {
  return (
    <>
      <Task
        task={{
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
        }}
        chengeStatusHandler={chengeStatusCallback}
        chengeTitleHandler={chengeTitleCallback}
        onRemoveClickHandler={onRemoveClickCallback}
      />
      <Task
        task={{
          id: "2",
          title: "JS",
          status: TaskStatuses.New,
          priority: TaskPriorityes.Low,
          startDate: "",
          deadline: "",
          todoListId: "",
          order: 0,
          addedDate: "",
          description: "",
        }}
        chengeStatusHandler={chengeStatusCallback}
        chengeTitleHandler={chengeTitleCallback}
        onRemoveClickHandler={onRemoveClickCallback}
      />
    </>
  ); 
}

