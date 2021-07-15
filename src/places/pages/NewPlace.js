import React, { useReducer, useCallback } from "react";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../util/validators";
import "./PlaceForm.css";
import useForm from "../../shared/hooks/form-hook";

// const formReducer = (state, action) => {
//   switch (action.type) {
//     case "INPUT_CHANGE":
//       let isFormVaid = true;
//       for (let inputId in state.inputs) {
//         if (inputId === action.inputId) {
//           isFormVaid = isFormVaid && action.isValid;
//         } else {
//           isFormVaid = isFormVaid && state.inputs[inputId].isValid;
//         }
//       }
//       return {
//         ...state,
//         inputs: {
//           ...state.inputs,
//           [action.inputId]: { isValid: action.isValid, value: action.value },
//         },
//         isValid: isFormVaid,
//       };
//     default:
//       return state;
//   }
// };

const NewPlace = () => {
  // const [formState, dispatch] = useReducer(formReducer, {
  //   inputs: {
  //     // this is a nested object which stores information about individual inputs
  //     title: {
  //       // title is the id of input element
  //       value: "",
  //       isValid: false,
  //     },
  //     description: {
  //       // title is the id of input element
  //       description: "",
  //       isValid: false,
  //     },
  //   },
  //   isValid: false, // isValid is a overall form validity
  // });

  const { formState, inputHandler } = useForm(
    {
      // this is a nested object which stores information about individual inputs
      title: {
        // title is the id of input element
        value: "",
        isValid: false,
      },
      description: {
        // title is the id of input element
        description: "",
        isValid: false,
      },
    },
    false // isValid is a overall form validity
  );

  // const inputHandler = useCallback((inputId, value, isValid) => {
  //   dispatch({
  //     type: "INPUT_CHANGE",
  //     value,
  //     inputId,
  //     isValid,
  //   });
  // }, []);

  const submitHandler = (event) => {
    event.preventDefault();
    console.log(formState); // send this to backend
  };

  return (
    <form className="place-form" onSubmit={submitHandler}>
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorMessage="Please enter a valid title"
        onInput={inputHandler}
      />
      <Input
        id="description"
        element="textarea"
        label="Title"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorMessage="Please enter a valid description(at least 5 characters)"
        onInput={inputHandler}
      />

      <Input
        id="address"
        element="input"
        type="text"
        label="Address"
        validators={[VALIDATOR_REQUIRE()]}
        errorMessage="Please enter a valid title"
        onInput={inputHandler}
      />

      <Button type="submit" disabled={!formState.isValid}>
        ADD PLACE
      </Button>
    </form>
  );
};

export default NewPlace;
