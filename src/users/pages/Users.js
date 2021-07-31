import React, { useState, useEffect } from "react";

import UserList from "../components/UserList";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import { useHttpClient } from "../../shared/hooks/http-hook";

const Users = () => {
  // const [isLoading, setIsloading] = useState(false);
  // const [error, setError] = useState();
  const [users, setusers] = useState();

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // setIsloading(true);
        const response = await sendRequest("http://localhost:5000/api/users");
        // const responseData = await response.json();
        // if (!response.ok) {
        //   throw new Error(responseData.message);
        // }
        setusers(response.users);
        // setIsloading(false);
      } catch (error) {
        // setIsloading(false);
        // setError(error.message);
      }
    };

    fetchUsers();
  }, [sendRequest]);

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && users && <UserList items={users} />}
    </React.Fragment>
  );
};

export default Users;
