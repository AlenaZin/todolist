import { AppRootStateType } from "./store"

export const selectStatus = (state: AppRootStateType) => state.app.status
export const selektInitialized = (state: AppRootStateType) => state.app.initialized