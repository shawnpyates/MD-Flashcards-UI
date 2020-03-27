import React, { useEffect, useState } from 'react';
import { Redirect, useParams } from 'react-router-dom';

function Auth({ setCurrentUser }) {
  const { userId } = useParams();
  const [isFetchComplete, setIsFetchComplete] = useState(false);
  useEffect(() => {
    if (userId) {
      fetch(`http://localhost:4000/api/users/${userId}`)
        .then(res => res.json())
        .then(({ data }) => {
          setCurrentUser(data);
          setIsFetchComplete(true);
        })
    }
  }, [setCurrentUser, userId]);
  return (
    isFetchComplete
    ? <Redirect to="/" />
    : <div />
  )
}

export default Auth;