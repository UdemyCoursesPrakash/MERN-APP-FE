import React, { useState, useEffect, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../util/validators";
import "./PlaceForm.css";
import useForm from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import AuthContext from "../../shared/context/auth-context";

const UpdatePlace = () => {
  const [place, setPlace] = useState();
  const placeId = useParams().placeId;
  const authContext = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const history = useHistory();
  const { formState, inputHandler, setFormData } = useForm(
    {
      title: {
        value: '',
        isValid: true,
      },
      description: {
        value: '',
        isValid: true,
      },
    },
    true
  );

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const response = await sendRequest(`http://localhost:5000/api/places/${placeId}`);
        setPlace(response.place);
        setFormData(
          {
            title: {
              value: response.place.title,
              isValid: true
            },
            description: {
              value: response.place.description,
              isValid: true
            }
          },
          true
        );
      } catch (error) {
        console.log(error)
      }
    }
    fetchPlace();
  }, [sendRequest, placeId, setFormData])

  const placeUpdateSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      await sendRequest(`http://localhost:5000/api/places/${placeId}`,
        "PATCH",
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value
        }),
        {
          "Content-Type": "application/json",
        }
      );
      history.push(`${authContext.user.id}/places`);
    } catch (error) {
      console.log(error)
    }
  };

  if (isLoading) {
    return (
      <div className="center">
        <LoadingSpinner asOverlay />
      </div>
    );
  }

  if (!place && !error) {
    return (
      <div className="center">
        <h2>Could not found place</h2>
      </div>
    );
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {!isLoading && place && (
        <form className="place-form" onSubmit={placeUpdateSubmitHandler}>
          <Input
            id="title"
            type="text"
            element="input"
            label="Title"
            validators={[VALIDATOR_REQUIRE()]}
            errorMessage="Please enter a valid title"
            onInput={inputHandler}
            initialValue={place.title}
            initialValid={true}
          ></Input>
          <Input
            id="description"
            element="textarea"
            label="Description"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorMessage="Please enter a valid description"
            onInput={inputHandler}
            initialValue={place.description}
            initialValid={true}
          ></Input>

          <Button type="submit" disabled={!formState.isValid}>
            UPDATE PLACE
          </Button>
        </form>
      )}
    </React.Fragment>
  );
};

export default UpdatePlace;
