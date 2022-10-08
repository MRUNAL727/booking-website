import React from 'react';
import './hotel.css';
import Navbar from '../../components/navbar/Navbar';
import Header from '../../components/header/Header';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Hotel = () => {
  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="hotelContainer">
        <div className="hotelWrapper">
          <h1 className="hotelTitle">Grand Hotel</h1>
          <div className='hotelAddress'>
            <FontAwesomeIcon icon={faLocationDot} />
            <span>Elton street 125 New york</span>
            </div>
            <span className="hotelDistance">
              Excellent location – 131m from center
            </span>
            <span className="hotelPriceHighlight">
              Book a stay over $131 at this property and get a
              free airport taxi
            </span>
            <div className='hotelImages'>
              
            </div>
        </div>
      </div>
    </div>
  );
};

export default Hotel;
