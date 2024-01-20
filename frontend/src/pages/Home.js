import { React, useEffect, useState } from 'react'
import CharCards from '../components/CharCards'

const Home = () => {

  const [chars, setChars] = useState(null);

  const fetchCharacters = async () => {
    const res = await fetch('/api/characters')
    const data = await res.json()

    if (res.ok) {
      setChars(data)
    }
  }

  useEffect((e) => {
    fetchCharacters();
  }, [])

  return (
    <div className='grid grid-cols-3 gap-6 m-10 pr-20'>
      {chars && chars.map((char) =>(
        <CharCards key={char._id} char={char}/>
      ))}
    </div>
  )
}

export default Home;

