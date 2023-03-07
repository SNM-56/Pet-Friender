import React, { useEffect, useState } from 'react';
import { BrowserRouter, useNavigate, Route } from 'react-router-dom';
import MainContainer from '../container/MainContainer';
import FavPage from '../component/FavPage';

const Home = () => {
  const [onSwiperPage, setOnSwiperPage] = useState(true);
  const [savedCards, setSavedCards] = useState([]);

  let pageToDisplay;
  if (!onSwiperPage) {
    pageToDisplay = (
      <FavPage
        savedCards={savedCards}
        setSavedCards={setSavedCards}
        onSwiperPage={onSwiperPage}
        setOnSwiperPage={setOnSwiperPage}
      />
    );
  } else {
    pageToDisplay = (
      <MainContainer
        savedCards={savedCards}
        setSavedCards={setSavedCards}
        onSwiperPage={onSwiperPage}
        setOnSwiperPage={setOnSwiperPage}
      />
    );
  }

  return (
    <div className="homepage">
      <div>{pageToDisplay}</div>
    </div>
  );
};

export default Home;
