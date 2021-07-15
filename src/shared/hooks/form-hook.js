import { useCallback, useReducer } from "react";

const formReducer = (state, action) => {
  switch (action.type) {
    case "INPUT_CHANGE":
      let isFormVaid = true;
      for (let inputId in state.inputs) {
        if (inputId === action.inputId) {
          isFormVaid = isFormVaid && action.isValid;
        } else {
          isFormVaid = isFormVaid && state.inputs[inputId].isValid;
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: { isValid: action.isValid, value: action.value },
        },
        isValid: isFormVaid,
      };
    default:
      return state;
  }
};

const useForm = (initialInputs, initialValidity) => {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: initialInputs,
    isValid: initialValidity,
  });

  const inputHandler = useCallback((inputId, value, isValid) => {
    dispatch({
      type: "INPUT_CHANGE",
      value,
      inputId,
      isValid,
    });
  }, []);

  return {
    formState,
    inputHandler,
  };
};

export default useForm;
