import React from "react";

import UserList from "../components/UserList";

const Users = () => {
  const USERS = [
    {
      id: "u1",
      image: "https://miro.medium.com/max/1400/1*9ldt4UL_uUGWTwnL8_XyLA.jpeg",
      name: "MSD",
      placesCount: 3,
    },
    {
      id: "u2",
      image:
        "https://static.theprint.in/wp-content/uploads/2020/11/EilxqtGWkAgg3vL-e1605948236762-696x392.jpeg",
      name: "Rohit",
      placesCount: 3,
    },
    {
      id: "u3",
      image:
        "https://c.ndtvimg.com/2020-03/bthb68ug_virat-kohli-afp_625x300_27_March_20.jpg",
      name: "Virat",
      placesCount: 3,
    },
    {
      id: "u4",
      image:
        "https://cdn.dnaindia.com/sites/default/files/styles/full/public/2020/12/29/946363-ajinkya-rahane-mullagh-medal.jpg",
      name: "Ajinkya",
      placesCount: 3,
    },
  ];
  return <UserList items={USERS} />;
};

export default Users;
