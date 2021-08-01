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
import ImageUpload from "../../shared/components/FormElements/ImageUpload";

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
        // description is the id of input element
        value: "",
        isValid: false,
      },
      address: {
        value: '',
        isValid: false,
      },
      image: {
        value: null,
        isValid: false
      }
    },
    false // isValid is a overall form validity
  );

  const submitHandler = async (event) => {
    event.preventDefault();
    try {


      const formData = new FormData();
      formData.append('title', formState.inputs.title.value);
      formData.append('description', formState.inputs.description.value);
      formData.append('address', formState.inputs.address.value);
      formData.append('creator', authContext.user.id);
      formData.append('image', formState.inputs.image.value);

      console.log(formData);

      await sendRequest('http://localhost:5000/api/places',
        'POST',
        formData
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

        <ImageUpload id="image" onInput={inputHandler} errorText="Please provide an image" />

        <Button type="submit" disabled={!formState.isValid}>
          ADD PLACE
        </Button>
      </form>
    </React.Fragment>

  );
};

export default NewPlace;
