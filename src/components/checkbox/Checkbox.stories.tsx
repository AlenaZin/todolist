import React from "react";
import { action } from '@storybook/addon-actions';
import { CheckboxComponent } from "./Checkbox";
import { TaskStatuses } from "../../api/todolists-api";

export default {
  title: 'CheckboxComponent Component', 
  component: CheckboxComponent,
};

const chengeStatusCallback = action('Status chenged')

export const CheckBoxBaseExampe = () => {
  return (
    <>
      <CheckboxComponent status={TaskStatuses.Completed} onChange={chengeStatusCallback} />
      <CheckboxComponent status={TaskStatuses.New} onChange={chengeStatusCallback} />
    </>
  ); 
}

