import React from 'react'
import { Link } from 'react-router-dom'



const CharDetails = ({ char }) => {

  const dataToPass = {name: char.name, description: char.description, comments: char.comments};

 return (
    <div className="pl-32 mt-10 ml-4 mr-10">
      <div className="card w-96 bg-base-100 shadow-xl">
          <figure><img src="https://www.streetfighter.com/6/assets/images/character/ryu/sns.jpg" alt={ char.name } /></figure>
          <div className="card-body">
            <h2 className="card-title">{char.name}</h2>
            <p>{char.description}</p>
            <div className="card-actions justify-end">
              <Link className="btn btn-primary btn-lg" to={char._id} state={{ data:{ dataToPass }}}>See More</Link>
            </div>
          </div>
        </div>
      </div>
  )
}


export default CharDetails;