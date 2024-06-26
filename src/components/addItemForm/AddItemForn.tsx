import { Button, TextField } from "@mui/material";
import React from "react";
import { ChangeEvent, useState, KeyboardEvent, useRef } from "react";

type AddItemFormProps = {
  addItem: (title: string) => void 
  disablit?: boolean 
}

export const AddItemForm = React.memo(({addItem, disablit = false}: AddItemFormProps) => {
  
  const inputRef = useRef<HTMLInputElement>(null);
  const[title, setTitle] = useState("")
  const[error, setError] = useState<string | null>(null)

  const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }
  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if(error !== null){
      setError(null);
    }  
    if(e.key === "Enter") {
      addItemHandler()
    }
  }
  const addItemHandler = () => {
    if (title.trim() !== "") {
      addItem(title.trim());
      setTitle("");
    } else {
      setError("Title is requied");
      inputRef.current?.focus();
    }
  }
  const styles = {
    minWidth: "39px", 
    minHeight: "39px",
    maxWidth: "39px", 
    maxHeight: "39px"
  }

  return (
    <div>
      <TextField
        value={title}
        variant="outlined"
        label={error ? "Title is requied" : "Type value"}
        onChange={onNewTitleChangeHandler}
        onKeyDown={onKeyPressHandler}
        error={!!error}
        // helperText={error}
        ref={inputRef}
        size="small"
        color="warning"
        style={{marginBottom: "10px"}}
        disabled={disablit}
      />
      <Button onClick={addItemHandler} variant="contained" color="warning" style={styles} disabled={disablit}>+</Button>
      {/* {error && <div className="error-message">{error}</div>} */}
    </div>
  );
})