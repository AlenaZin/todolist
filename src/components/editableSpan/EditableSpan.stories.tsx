import React from "react";
import { action } from '@storybook/addon-actions';
import { EditableSpan } from "./EditableSpan";

export default {
  title: 'EditableSpan Component', 
  component: EditableSpan,
};

const chengeTitleCallback = action('Title chenged')

export const EditableSpanBaseExampe = () => {
  return (
    <>
      <EditableSpan
        oldTitle={"Start value"}
        onChange={chengeTitleCallback}
      />
    </>
  ); 
}

