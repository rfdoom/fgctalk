import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

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
        const fetchPromises =commentArr.map(async id => {
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

  return (
    <>
      <div>
        <h1>Dynamic Page</h1>
        <p>Current Name: { state.data.dataToPass.name }</p>
        <p>Current Description: { state.data.dataToPass.description }</p>
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
    </>
  )
}

export default CharPage;