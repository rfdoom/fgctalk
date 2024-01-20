import React from 'react';
import { useLocation } from 'react-router-dom';

const CharPage = () => {

  let { state } = useLocation();
  console.log(state.data.dataToPass);

  return (
    <>
      <div>
        <h1>Dynamic Page</h1>
        <p>Current Name: { state.data.dataToPass.name }</p>
        <p>Current Description: { state.data.dataToPass.description }</p>
      </div>
      <div>
        {state.data.dataToPass.comments && state.data.dataToPass.comments.map(comment => {
          <li key={ comment._id }>
            <strong>{ comment.author }:</strong> { comment.text}
          </li>
        })}
      </div>
    </>
  )
}

export default CharPage;