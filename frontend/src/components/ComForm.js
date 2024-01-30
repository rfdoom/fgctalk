import React, { useState} from 'react';
import { useNavigate } from 'react-router-dom';

const ComForm = ({ id }) => {
  const [commentData, setCommentData] = useState({
    characterID: id,
    author: '',
    text: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCommentData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  }

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/characters/${id}`, {
        method: 'POST',
        headers: {
           'Content-Type': 'application/json',
        },
        body: JSON.stringify(commentData),
      })

      const responseData = await response.json();
      console.log('response: ', responseData);

      if(response.ok) {
        console.log('Comment added successfully!');
        navigate('/');
      } else {
        console.error('Error adding comment: ', responseData.error || response.statusText)
      }
    } catch (err) {
      console.error('Error adding comment: ', err.message);
    }
  }

  return (
    <div>
      <p>{ id }</p>
      <form onSubmit={ handleSubmit }>
        <label>
          Author:
          <input
            type='text'
            name='author'
            placeholder='name here'
            value={ commentData.author }
            onChange={ handleChange }
          />
        </label>
        <br />
        <label>
          Comment:
          <textarea
            name='text'
            placeholder='comment here'
            value={ commentData.text }
            onChange={ handleChange }
          />
        </label>
        <br />
        <button type='submit' className='btn btn-primary'>
          Add Comment
        </button>
      </form>
    </div>
  )
}

export default ComForm;