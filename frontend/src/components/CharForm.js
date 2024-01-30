import React, { useState} from 'react';
import { useNavigate } from 'react-router-dom';

const CharacterForm = () => {
  const [characterData, setCharacterData] = useState({
    name: '',
    description: '',
    image: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCharacterData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/characters', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(characterData),
      });

      if (response.ok) {
        console.log('Character added successfully!');
        navigate('/');
      } else {
        console.error('Error adding character:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding character:', error.message);
    }
  };

  return (
    <form onSubmit={ handleSubmit } className="mt-8">
      <label>
        Name:
        <input
          type="text"
          name="name"
          placeholder="name here"
          className="input input-bordered input-primary w-full max-w-xs mb-4 ml-4"
          value={ characterData.name }
          onChange={ handleChange }
        />
      </label>
      <br />
      <label className="mb-4">
        Description:
        <textarea
          name="description"
          placeholder="description here"
          className="textarea textarea-primary ml-2"
          value={ characterData.description }
          onChange={ handleChange }
        />
      </label>
      <br />
      <label>
        Image URL:
        <input
          type="text"
          name="image"
          placeholder="image link here"
          className="input input-bordered input-primary w-full max-w-xs mt-4"
          value={ characterData.image }
          onChange={ handleChange }
        />
      </label>
      <br />
      <button type="submit" className="btn btn-primary">Add Character</button>
    </form>
  );
};

export default CharacterForm;
