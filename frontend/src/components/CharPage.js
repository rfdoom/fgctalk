import React from 'react';
import Home from '../pages/Home'
import { useLocation } from 'react-router-dom';

const CharPage = () => {

  let { state } = useLocation();

  return (
    <div>
      <h1>Dynamic Page</h1>
      <p>Current Name: { state.data.dataToPass.name }</p>
      <p>Current Description: { state.data.dataToPass.description }</p>
    </div>
  )
}

export default CharPage;