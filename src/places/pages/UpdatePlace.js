import React from "react";
import { useParams } from "react-router-dom";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../util/validators";
import "./PlaceForm.css";
import useForm from "../../shared/hooks/form-hook";

const DUMMY_PLACES = [
  {
    id: "p1",
    title: "Wankhede",
    description: "Indias best cricket stadium",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Wankhede_Stadium_%2886312941%29.jpeg/1200px-Wankhede_Stadium_%2886312941%29.jpeg",
    address: "Mumbai",
    locatoin: {
      lat: 18.9388528,
      lng: 72.8235753,
    },
    creator: "u1",
  },
  {
    id: "p2",
    title: "Chinnaswami",
    description: "Karnataka Cricket stadium",
    imageUrl: "https://www.cricwindow.com/images/stadiums/wankhede_stadium.jpg",
    address: "Bangaluru",
    locatoin: {
      lat: 12.9793652,
      lng: 77.5974792,
    },
    creator: "u2",
  },
  {
    id: "p3",
    title: "MCA",
    description: "Maharashtra Cricket Associatoin",
    imageUrl: "https://www.cricwindow.com/images/stadiums/wankhede_stadium.jpg",
    address: "Pune",
    locatoin: {
      lat: 18.9388528,
      lng: 72.8235753,
    },
    creator: "u2",
  },
];

const UpdatePlace = () => {
  const placeId = useParams().placeId;

  const identifiedPlace = DUMMY_PLACES.find((place) => place.id === placeId);

  const { formState, inputHandler } = useForm(
    {
      title: {
        value: identifiedPlace.title,
        isValid: true,
      },
      description: {
        value: identifiedPlace.description,
        isValid: true,
      },
    },
    true
  );

  if (!identifiedPlace) {
    return (
      <div className="center">
        <h2>Could not found place</h2>
      </div>
    );
  }

  const placeUpdateSubmitHandler = (e) => {
    e.preventDefault();
    console.log(formState);
  };

  return (
    <form className="place-form" onSubmit={placeUpdateSubmitHandler}>
      <Input
        id="title"
        type="text"
        element="input"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorMessage="Please enter a valid title"
        onInput={inputHandler}
        initialValue={formState.inputs.title.value}
        initialValid={formState.inputs.title.isValid}
      ></Input>
      <Input
        id="description"
        element="textarea"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorMessage="Please enter a valid description"
        onInput={inputHandler}
        initialValue={formState.inputs.description.value}
        initialValid={formState.inputs.description.isValid}
      ></Input>

      <Button type="submit" disabled={!formState.isValid}>
        UPDATE PLACE
      </Button>
    </form>
  );
};

export default UpdatePlace;
