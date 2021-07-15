import React from "react";
import { useParams } from "react-router-dom";

import PlaceList from "../components/PlaceList";

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

const UserPlaces = () => {
  const userId = useParams().userId;

  const filteredPlaces = DUMMY_PLACES.filter(
    (place) => place.creator === userId
  );

  return <PlaceList items={filteredPlaces} />;
};

export default UserPlaces;
