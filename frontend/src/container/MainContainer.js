import React, { useEffect, useState } from 'react';
import TinderCard from 'react-tinder-card';

const DogSwiper = ({ onSwiperPage, setOnSwiperPage, savedCards, setSavedCards }) => {
  const [dogData, setDogData] = useState([]);
  const [cards, setCards] = useState([]);
  const [lastDirection, setLastDirection] = useState();
  // const [isLoading, setIsLoading] = useState(true);
  // const [savedCards, setSavedCards] = useState([]);

  // utility function for swiping
  const swiped = (direction, nameToDelete, dogImage, savedCards, setSavedCards) => {
    console.log('removing: ' + nameToDelete);
    // console.log('dogImage', dogImage);
    // create new obj with name and url
    const dogObj = {
      name: nameToDelete,
      url: dogImage
    };
    // pass that into new array with the existing array elements using ...
    // setState, passing in new array
    setLastDirection(direction);
    if (direction === 'right') {
      setSavedCards((savedCards) => [...savedCards, dogObj]);
    }
  };

  // utility function for out of frame
  const outOfFrame = (name) => {
    console.log(name + ' left the screen!');
  };

  // change OnSwiperPage to false when main conainter button is clicked
  const onHandleClick = (e) => {
    e.preventDefault();
    setOnSwiperPage(false);
  };

  // processes dog data and creates cards
  const dogCards = () => {
    // console.log(dogData[0])
    const processedCards =
      dogData &&
      dogData.map((dog) => {
        const url = 'https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/60481973/1/?bust=1678048544&width=450';
        const imgUrl = dog.primary_photo_cropped !== null ? dog.primary_photo_cropped.medium : url;
        const dogName = dog.name !== 'Dog' ? dog.name : 'I still need a name! :-(';
        return (
          <TinderCard
            className="swipe"
            key={dog.id}
            onSwipe={(dir) => swiped(dir, { dogName }, { imgUrl }, savedCards, setSavedCards)}
            onCardLeftScreen={() => outOfFrame({ dogName })}>
            <div
              key={dog.id}
              className="card"
              style={{
                backgroundImage: `url(${imgUrl})`,
                backgroundSize: 'cover'
              }}>
              <h3>{dogName}</h3>
            </div>
          </TinderCard>
        );
      });
    setCards(processedCards);
    // setIsLoading(false);
  };

  // fetches dog data from backend
  useEffect(() => {
    const fetchDogs = async () => {
      try {
        // setIsLoading(true);
        const response = await fetch('/api/preferences', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ id: 22 }) // THIS IS SAMPLE ID, CHANGE ME
        });
        const data = await response.json();
        console.log('RESPONSE DATA IN MAIN CONTAINER', data);
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

  // if lastDirection is right, we will invoke setSavedCards by passing in the dog id to the existing saveCards
  // useEffect(() => {
  //   if (lastDirection === 'right') {

  //   }
  // });

  return (
    <div className="cardWrapper">
      <h1>Find your furry soulmate</h1>
      {dogData.length === 0 ? (
        <div
          className="card"
          style={{
            backgroundImage: `url(https://cdn.dribbble.com/users/77598/screenshots/12570694/media/8eaa19b2448ee8719f559e4d1ec931bc.gif)`,
            backgroundSize: 'cover'
          }}></div>
      ) : (
        <div className="cardContainer">{cards}</div>
      )}
      {lastDirection ? <h2 className="infoText">You swiped {lastDirection}</h2> : <h2 className="infoText" />}
      <button onClick={onHandleClick}>View Favorite Pets</button>
    </div>
  );
};

export default DogSwiper;
