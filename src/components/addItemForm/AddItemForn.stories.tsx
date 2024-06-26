import React from "react";
import { AddItemForm } from "./AddItemForn";
import { action } from '@storybook/addon-actions';

export default {
  title: 'AddItem Form Component', 
  component: AddItemForm,
};

const callback = action('Button "add" was pressed inside the form')

export const AddItemFormBaseExampe = () => {
  return (
    <AddItemForm addItem={callback}/>
  )
}

export const AddItemFormDisablitExampe = () => {
  return (
    <AddItemForm addItem={callback} disablit={true}/>
  )
}
