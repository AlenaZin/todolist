import { InitialStateType, appReducer, setErrorAC, setStatusAC } from "./app-reducer"


let startState: InitialStateType

beforeEach(() => {
  startState = {
    status: 'idle',
    error: null,
    initialized: false
  }
})

test('correct error message should be set', () => {

    const endState = appReducer(startState, setErrorAC({error: 'some error'}))
    expect(endState.error).toBe('some error')
})

test('correct status message should be set', () => {

  const endState = appReducer(startState, setStatusAC({status: 'loading'}))
  expect(endState.status).toBe('loading')
})