import React from "react"
import { CheckboxComponent } from "../../../../components/checkbox/Checkbox"
import { EditableSpan } from "../../../../components/editableSpan/EditableSpan"
import { IconButton } from "@mui/material"
import { Delete } from "@mui/icons-material"
import { TaskStatuses, TasksType } from "../../../../api/todolists-api"

export type TasksStateType = {
  [key: string]: TasksType[]
}

type TaskProps ={
  task: TasksType
  chengeStatusHandler:(id: string, status: TaskStatuses)=>void
  chengeTitleHandler: (id: string, newTitle: string)=>void
  onRemoveClickHandler: (id: string)=>void
} 

export const Task = React.memo((props: TaskProps) => {
  return (
    <div key={props.task.id} className={props.task.status === TaskStatuses.Completed ? "is-done" : ""}>
      <CheckboxComponent
        status={props.task.status}
        onChange={(status: TaskStatuses) => {
          props.chengeStatusHandler(props.task.id, status);
        }}
      />

      <EditableSpan
        oldTitle={props.task.title}
        onChange={(newTitle: string) =>
          props.chengeTitleHandler(props.task.id, newTitle)
        }
      />
      <IconButton onClick={()=>props.onRemoveClickHandler(props.task.id)}>
        <Delete />
      </IconButton>
    </div>
  );
})