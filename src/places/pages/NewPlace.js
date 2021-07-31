import React, { useReducer, useCallback, useContext } from "react";
import { useHistory } from "react-router";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../util/validators";
import "./PlaceForm.css";
import useForm from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import AuthContext from "../../shared/context/auth-context";

const NewPlace = () => {
  const authContext = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const history = useHistory();

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

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      await sendRequest('http://localhost:5000/api/places',
        'POST',
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
          address: formState.inputs.address.value,
          creator: authContext.user.id,
          coordinates: {
            lat: 18.9388528,
            lng: 72.8235753
          },
        }),
        {
          "Content-Type": "application/json",
        },
      )
      console.log(formState); // send this to backend
    } catch (error) {

    }

    history.push('/');

  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner asOverlay />}
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
    </React.Fragment>

  );
};

export default NewPlace;
