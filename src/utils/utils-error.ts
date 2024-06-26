import { setErrorAC, setStatusAC } from "../app/app-reducer";
import {ResponseType} from "../api/todolists-api"
import { Dispatch } from "redux";

export const handleServerAppError = <D> (data: ResponseType<D>, dispatch: Dispatch) => {
  if (data.messages.length) {
    dispatch(setErrorAC({error: data.messages[0]}));
  } else {
    dispatch(setErrorAC({error: 'Some error occorred'}));
  }
  dispatch(setStatusAC({status: 'failed'}));
}

export const handleNetworkAppError = (error: {message: string}, dispatch: Dispatch) => {
  dispatch(setErrorAC(error.message ? {error: error.message} : {error: "Some error occorred"}))
  dispatch(setStatusAC({status: 'failed'}))
}
