import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";

import PlaceList from "../components/PlaceList";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import { useHttpClient } from "../../shared/hooks/http-hook";
import AuthContext from "../../shared/context/auth-context";

const UserPlaces = () => {
  const userId = useParams().userId;
  const [places, setPlaces] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const authContext = useContext(AuthContext);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {

        const response = await sendRequest('http://localhost:5000/api/places/user/' + userId);

        setPlaces(response.places);
      } catch (error) {
        console.log(error)
      }
    }
    fetchPlaces();
  }, [sendRequest, userId])

  const deletePlaceHandler = (deletedPlaceId) => {
    setPlaces((previousPlaces) => {
      return previousPlaces.filter(place => place.id != deletedPlaceId)
    })
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner asOverlay />}
      {!isLoading && places && <PlaceList onDeletePlace={deletePlaceHandler} items={places} />}

    </React.Fragment>
  )
};

export default UserPlaces;
