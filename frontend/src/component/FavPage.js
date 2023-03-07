import React, { useState } from 'react';

const db = [
  {
    name: 'Dog',
    url: 'https://media.cnn.com/api/v1/images/stellar/prod/220818142713-dogs-tears-emotions-wellness-stock.jpg?c=16x9&q=h_720,w_1280,c_fill'
  },
  {
    name: 'cat',
    url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4Lm66tNBerBY_Yi2AxL8gbMoDoj46cktsAg&usqp=CAU'
  }
];

const FavPage = ({ onSwiperPage, setOnSwiperPage, savedCards, setSavedCards }) => {
  const onHandleClick = (e) => {
    e.preventDefault();
    setOnSwiperPage(true);
  };

  console.log('saved card name', savedCards[0].name);
  console.log('saved card url', savedCards[0].url);
  //saved card name {dogName: 'HELP!! BEAR NEEDS FOSTER/ADOPTER '}
  //saved card url {imgUrl: 'https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/60541288/4/?bust=1678131695&width=450'

  return (
    <div className="cardWrapper">
      <h1>Favorite Pets</h1>
      <div className="favoritePets">
        {savedCards.map((pet, index) => (
          <div key={index}>
            <img src={pet.url.imgUrl} alt="I am a dog" />
            <h3>{pet.name.dogName}</h3>
          </div>
        ))}
      </div>
      <button className="homeToMain-Btn" onClick={onHandleClick}>Find a new fur friend!</button>
    </div>
  );
};

export default FavPage;
