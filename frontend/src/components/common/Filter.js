import React from 'react'
// import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import Geocoder from '../map/Geocoder'

const Filter = ({ theme, sortBy, handleChange, selectLocation }) => {
  return (
    <div className="filters">
      <div className="filter-option">
        <label htmlFor="location">Location :</label>
        <Geocoder selectLocation={selectLocation} />
      </div>
      <div className="filter-option">
        <label htmlFor="theme">Theme :</label>
        <select id="theme" value={theme} onChange={handleChange} className="form-control">
          <option value="All">All</option>
          <option value="Adventure">Adventure</option>
          <option value="Sightseeing">Sightseeing</option>
          <option value="Food & Drink">Food & Drink</option>
          <option value="Speed">Speed</option>
        </select>
      </div>
      <div className="filter-option">
        <label htmlFor="theme">Sort by :</label>
        <select id="sortBy" value={sortBy} onChange={handleChange} className="form-control">
          <option value="rating">Top Rated</option>
          <option value="time">Est. Time</option>
        </select>
      </div>
      {/* <div className="filter-option">
        <label htmlFor="time">Time :</label>
        <Slider
          className="slider"
          trackStyle={{ backgroundColor: '#a63535' }}
          handleStyle={{ border: '2px solid #a63535' }}
        // onChange={event => console.log(event)}
        />
      </div> */}
    </div>
  )
}

export default Filter