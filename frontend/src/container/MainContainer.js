import React, { useEffect, useState } from 'react';
import TinderCard from 'react-tinder-card';
import SignupForm from '../component/SignupForm';
import PreferenceForm from '../component/PreferenceForm';

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



const DogSwiper = () => {
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
        const data = await response.json();
        // console.log('RESPONSE DATA', await data);
        setDogData(data);
      } catch (error) {
        console.log('Error in MainContainer useEffect to fetch dogs', error);
      }
    };

    fetchDogs();
  }, []);

  console.log('DOGGY DATA', dogData);

  // have a useEffect function that calls the fetch func
  return (
    <div className="cardWrapper">
      <h1>Pet swiper here</h1>
      <div className="cardContainer">
        {dogData &&
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
                  className="card"
                  style={{
                    backgroundImage: `url(${imgUrl})`,
                    backgroundSize: 'cover'
                  }}>
                  <h3>{dog.name}</h3>
                </div>
              </TinderCard>
            );
          })}
      </div>
      {lastDirection ? <h2 className="infoText">You swiped {lastDirection}</h2> : <h2 className="infoText" />}
    </div>
  );
};

export default DogSwiper;
