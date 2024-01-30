import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';

const CharPage = () => {

  let { state } = useLocation();
  //console.log(state.data.dataToPass);

  const commentArr = state.data.dataToPass.comments;
  const commentStrings = [];
  const [parsedComments, setParsedComments] = useState([]);

  const parseComments = () => {
    const parsedCommentsArr = commentStrings.map(commentString => JSON.parse(commentString));
    setParsedComments(parsedCommentsArr);
  }
  
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const fetchPromises = commentArr.map(async id => {
          const response = await fetch('/api/comments/' + id);
          const stuff = await response.json();

          if (response.ok) {
            commentStrings.push(JSON.stringify(stuff));
          } else {
            console.error("Error: ", response.status, response.statusText);
          }
        });
      
        await Promise.all(fetchPromises);
        console.log(commentStrings);
        parseComments();
      } catch (error) {
        console.error("Error: ", error)
      }
    }
    fetchComments();
  }, [commentArr]);

  const navigate = useNavigate();
  const deleteChar = async () => {
    try {
      const response = await fetch('/api/characters/' + state.data.dataToPass.id, {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log('Character deleted successfully');
        navigate('/');
      } else {
        console.error("Error: ", response.status, response.statusText);
      }
    } catch (error) {
      console.error("Error: ", error.message);
    }
  }
  
  const confirmDelete = async () => {
    confirmAlert({
      title: 'Confirm to delete',
      message: 'Are you sure to do this? Once deleted, this cannot be undone.',
      buttons: [
        {
          label: 'Yes',
          className: 'btn btn-error mr-4',
          onClick: () => deleteChar()
        },
        {
          label: 'No',
          className: 'btn btn-primary'
          //onClick: () => alert('Click No')
        }
      ]
    });
  }

  return (
    <>
      <div>
        <h1>Dynamic Page</h1>
        <p>Current Name: { state.data.dataToPass.name }</p>
        <p>Current Description: { state.data.dataToPass.description }</p>
        <p>Current Image: { state.data.dataToPass.image }</p>
      </div>
      <div>
        <h2>Comments:</h2>
        <ul>
          {parsedComments && parsedComments.map(comment => (
            <li key={comment._id}>
              <p><strong>ID:</strong> {comment._id}, {' '}</p>
              <p><strong>Author:</strong> {comment.author}, {' '}</p>
              <p><strong>Text:</strong> {comment.text}, {' '}</p>
              <p><strong>CreatedAt:</strong> {comment.createdAt}, {' '}</p>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <button onClick={ confirmDelete } className="btn btn-error">Delete Character</button>
      </div>
    </>
  )
}

export default CharPage;