import { Checkbox} from '@mui/material';
import React from 'react';
import { ChangeEvent } from 'react';
import { TaskStatuses } from '../../api/todolists-api';

type CheckboxComponent = {
  status: TaskStatuses
  onChange: (status: TaskStatuses)=>void
}

export const CheckboxComponent = React.memo((props: CheckboxComponent) => {
  const chengeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    let newIsDoneValue = e.currentTarget.checked
    props.onChange(newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New)
  }
  return (
    <Checkbox
      checked={props.status === TaskStatuses.Completed}
      color="success"
      onChange={chengeStatusHandler}
    />
  );
})