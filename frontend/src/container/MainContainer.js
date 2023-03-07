import React, { useEffect, useState } from 'react';
import TinderCard from 'react-tinder-card';
import SignupForm from '../component/SignupForm';
import PreferenceForm from '../component/PreferenceForm';

const DogSwiper = () => {
  const [dogData, setDogData] = useState([]);
  const [cards, setCards] = useState([]);
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

  // processes dog data and creates cards
  const dogCards = () => {
    const processedCards =
      dogData &&
      dogData.map((dog) => {
        const url = 'https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/60481973/1/?bust=1678048544&width=450';
        const imgUrl = dog.primary_photo_cropped !== null ? dog.primary_photo_cropped.medium : url;
        const { name } = dog;

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
              <h3>{name}</h3>
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
        const data = await response.json();
        setDogData(data);
      } catch (error) {
        console.log('Error in MainContainer useEffect to fetch dogs', error);
      }
    };
    fetchDogs();
  }, []);

  // runs dogCards when dogData is updated
  useEffect(() => {
    dogCards();
  }, [dogData]);

  return (
    <div className="cardWrapper">
      <h1>Pet swiper here</h1>
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
      {lastDirection ? <h2 className="infoText">You swiped {lastDirection}</h2> : <h2 className="infoText" />}
    </div>
  );
};

export default DogSwiper;
