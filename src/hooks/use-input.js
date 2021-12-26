import { useReducer } from "react";

const initialInputState = {
  value : '',
  isTouched : false
}
// return Default state snapshot
const inputStateReducer  = (state, action ) => {
  if (action.type === 'INPUT') {
    return {value: action.value, isTouched: state.isTouched}
  }
  if (action.type === 'BLUR') {
    return {value: state.value, isTouched: true}
  }
  if (action.type === 'RESET') {
    return {value: '', isTouched: false}
  }

  return initialInputState;
}
const useInput = (validateValue) => {
  // 2nd arg in useReducer is the initial state
  const [inputState, dispatch] = useReducer(inputStateReducer, initialInputState);

  const valueIsValid = validateValue(inputState.value);
  const hasError = !valueIsValid && inputState.isTouched;

  const valueChangeHandler = (event) => {
    dispatch({type: 'INPUT', value: event.target.value})
  };

  const inputBlurHandler = (event) => {
    dispatch({type: 'BLUR'})
  };

  const reset = () => {
    dispatch({type: 'RESET'})
  }

  return {
    value: inputState.value,
    isValid : valueIsValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    reset
  };
};

export default useInput;
