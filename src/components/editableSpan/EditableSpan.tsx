import { TextField } from "@mui/material"
import React from "react"
import { ChangeEvent, useRef, useState } from "react"

type EditableSpanProps = {
  oldTitle: string
  onChange: (value: string) => void
}

export const EditableSpan = React.memo((props: EditableSpanProps) => {
  let [editMode, setEditMode] = useState(false)
  const[newTitle, setNewTitle] = useState('')

  const activateEditeMode = () => {
    setEditMode(true)
    setNewTitle(props.oldTitle)
  }
  const activateViewMode = () => {
    setEditMode(false)
    props.onChange(newTitle)
  }
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.currentTarget.value)
  }

  return ( 
    editMode    
      ? <TextField variant="standard" color='warning' value={newTitle} onChange={onChangeHandler} onBlur={activateViewMode} autoFocus/>
      : <span onDoubleClick={activateEditeMode}>{props.oldTitle}</span>
  )
})