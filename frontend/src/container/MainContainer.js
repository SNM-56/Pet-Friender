import React, { useEffect, useState } from 'react';
import TinderCard from 'react-tinder-card';

<<<<<<< HEAD
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
=======
const DogSwiper = () => {
  const [dogData, setDogData] = useState([]);
  const [cards, setCards] = useState([]);
>>>>>>> dev
  const [lastDirection, setLastDirection] = useState();
  const [isLoading, setIsLoading] = useState(true);

  // utility function for swiping
  const swiped = (direction, nameToDelete) => {
    console.log('removing: ' + nameToDelete);
    setLastDirection(direction);
  };

  // utility function for out of frame
  const outOfFrame = (name) => {
    console.log(name + ' left the screen!');
  };

<<<<<<< HEAD
  useEffect(() => {
    const fetchDogs = async () => {
      try {
        const response = await fetch('/api/dogs');
=======
  // processes dog data and creates cards
  const dogCards = () => {
    const processedCards =
      dogData &&
      dogData.map((dog) => {
        const url = 'https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/60481973/1/?bust=1678048544&width=450';
        const imgUrl = dog.primary_photo_cropped !== null ? dog.primary_photo_cropped.medium : url;
        return (
          <TinderCard
            className="swipe"
            key={dog.id}
            onSwipe={(dir) => swiped(dir, dog.name)}
            onCardLeftScreen={() => outOfFrame(dog.name)}>
            <div
              key={dog.id}
              className="card"
              style={{
                backgroundImage: `url(${imgUrl})`,
                backgroundSize: 'cover'
              }}>
              <h3>{dog.name}</h3>
            </div>
          </TinderCard>
        );
      });
    setCards(processedCards);
    setIsLoading(false);
  };

  // fetches dog data from backend
  useEffect(() => {
    const fetchDogs = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/preferences', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ id: 22 }) // THIS IS SAMPLE ID, CHANGE ME
        });
>>>>>>> dev
        const data = await response.json();
        // console.log('RESPONSE DATA', await data);
        setDogData(data);
      } catch (error) {
        console.log('Error in MainContainer useEffect to fetch dogs', error);
      }
    };
    fetchDogs();
  }, []);

<<<<<<< HEAD
  console.log('Dog Data:', dogData);
  // const logger = () => {
  //   async () => console.log('in Logger', await dogData);
  // }

  // logger();

  // create a func
  // fetch (/api/dogs)
  // get the data and json
  // store that data in state using useState

  // have a useEffect function that calls the fetch func
=======
  // runs dogCards when dogData is updated
  useEffect(() => {
    dogCards();
  }, [dogData]);

>>>>>>> dev
  return (
    <div>
      <h1>Pet swiper here</h1>
<<<<<<< HEAD
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
=======
      {dogData.length === 0 ? (
        <div
          className="card"
          style={{
            backgroundImage: `url(https://media2.giphy.com/media/3o7bu3XilJ5BOiSGic/giphy.gif)`,
            backgroundSize: 'cover'
          }}></div>
      ) : (
        <div className="cardContainer">{cards}</div>
      )}
>>>>>>> dev
      {lastDirection ? <h2 className="infoText">You swiped {lastDirection}</h2> : <h2 className="infoText" />}
    </div>
  );
};

export default DogSwiper;
