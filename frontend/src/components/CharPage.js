import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import ComForm from '../components/ComForm';

const CharPage = () => {

  let { state } = useLocation();

  const commentArr = state.data.dataToPass.comments;
  const commentStrings = [];
  const [parsedComments, setParsedComments] = useState([]);
  const [showComForm, setShowComForm] = useState(false);

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
  
  const confirmDeleteChar = async () => {
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

  const toggleComForm = () => {
    setShowComForm((prevState) => !prevState);
  }

  // const deleteCom = async () => {
  //   try {
  //     const response = await fetch('/')
  //   } catch(error) {
  //     console.error("Error: ", error.message);
  //   }
  // }

  // const confirmDeleteCom = () => {
  //   confirmAlert({
  //     title: 'Confirm to delete',
  //     message: 'Are you sure to do this? Once deleted, this cannot be undone.',
  //     buttons: [
  //       {
  //         label: 'Yes',
  //         className: 'btn btn-error mr-4',
  //         onClick: () => deleteCom()
  //       },
  //       {
  //         label: 'No',
  //         className: 'btn btn-primary'
  //       }
  //     ]
  //   })
  // }

  return (
    <>
      <div>
        <p>Current Name: { state.data.dataToPass.name }</p>
        <p>Current Description: { state.data.dataToPass.description }</p>
        <p>Current Image: { state.data.dataToPass.image }</p>
      </div>
      
      <div>
        <button onClick={ confirmDeleteChar } className="btn btn-error">Delete Character</button>
      </div>
      
      <section>
        <button onClick={ toggleComForm } className='btn btn-primary'>
          { showComForm ? 'Hide Comment Form' : 'Add Comment' }
        </button>
        { showComForm && (
          <ComForm key={state.data.dataToPass.id} id={state.data.dataToPass.id} />
        )}
      </section>

      <div>
        <ul>
          {parsedComments && parsedComments.map(comment => (
            <div className='mt-10'>
              <li key={comment._id}>
                <div className="chat chat-start">
                  <div className="chat-header">
                    {comment.author}
                  </div>
                  <div className="chat-bubble">{comment.text}</div>
                  <div className="chat-footer opacity-50">
                    {comment.createdAt}
                    <br />
                    <button className='btn btn-sm'>Delete Comment</button>
                  </div>
                </div>
              </li>
             
            </div>
          ))}
        </ul>

      </div>
      
    </>
  )
}

export default CharPage;