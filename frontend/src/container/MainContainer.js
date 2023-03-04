import React, { useEffect, useState } from 'react';
import TinderCard from 'react-tinder-card';

// const DogSwiper = () => {
//   const onSwipe = (direction) => {
//       console.log('You swiped: ' + direction)
//     };

//   const onCardLeftScreen = (myIdentifier) => {
//     console.log(myIdentifier + ' left the screen');
//   }
//   return (
//     <TinderCard onSwipe={onSwipe} onCardLeftScreen={() => onCardLeftScreen('fooBar')} preventSwipe={['right', 'left']}>Hello, World!</TinderCard>
//     // <TinderCard>Dog Swiper</TinderCard>
//   //   <div className="swiping-component">
//   //     <p>MainContainer component is loaded</p>
//   //   </div>
//    );
// };

const db = [
  {
    name: 'Dubs',
    url: 'https://images.seattletimes.com/wp-content/uploads/2018/03/dubs1.jpg?d=780x495'
  },
  {
    name: 'Golden Girl',
    url: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/golden-retriever-royalty-free-image-506756303-1560962726.jpg?crop=0.672xw:1.00xh;0.166xw,0&resize=640:*'
  },
  {
    name: 'Cheeky Boy',
    url: 'https://d.newsweek.com/en/full/2074004/puppy.jpg'
  },
  {
    name: 'Grumpy Boy',
    url: 'https://media.istockphoto.com/id/460588321/photo/mean-dog.jpg?s=612x612&w=0&k=20&c=Xeq9HpMEjdNQhhgus3hOLfxvL47gucbFy-oQOerYF20='
  },
  {
    name: 'Little Meow Meow',
    url: 'https://i.pinimg.com/originals/05/39/f6/0539f678c0ffae8b9d263e9b54055a98.jpg'
  }
];

const DogSwiper = () => {
  const characters = db;
  const [dogData, setDogData] = useState();
  const [lastDirection, setLastDirection] = useState();

  const swiped = (direction, nameToDelete) => {
    console.log('removing: ' + nameToDelete);
    setLastDirection(direction);
  };

  const outOfFrame = (name) => {
    console.log(name + ' left the screen!');
  };

  useEffect(() => {
    const fetchDogs = async () => {
      try {
        const response = await fetch('/api/dogs');
        // const data = JSON.parse(response);
        console.log('RESPONSE DATA', await response);
        
      } catch (error) {
        console.log('Error in MainContainer useEffect to fetch dogs', error);
      }
    }
    fetchDogs();
  }, []);
  // create a func
  // fetch (/api/dogs)
  // get the data and json
  // store that data in state using useState

  // have a useEffect function that calls the fetch func
  return (
    <div>
      <h1>Pet swiper here</h1>
      <div className="cardContainer">
        {characters.map((character) => (
          <TinderCard
            className="swipe"
            key={character.name}
            onSwipe={(dir) => swiped(dir, character.name)}
            onCardLeftScreen={() => outOfFrame(character.name)}>
            <div style={{ backgroundImage: 'url(' + character.url + ')' }} className="card">
              <h3>{character.name}</h3>
            </div>
          </TinderCard>
        ))}
      </div>
      {lastDirection ? <h2 className="infoText">You swiped {lastDirection}</h2> : <h2 className="infoText" />}
    </div>
  );
};

export default DogSwiper;
