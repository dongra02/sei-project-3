import React from 'react'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import Geocoder from '../map/Geocoder'

const Filter = ({ theme, handleChange, selectLocation }) => {
  return (
    <div className="filters">
      <div>
        <label htmlFor="location">Location :</label>
        <Geocoder selectLocation={selectLocation} />
      </div>
      <div>
        <label htmlFor="theme">Theme :</label>
        <select id="theme" value={theme} onChange={handleChange} >
          <option value="adventure">adventure</option>
          <option value="horror">horror</option>
        </select>
      </div>
      <div className="filter-option">
        <label htmlFor="time">Time :</label>
        <Slider
          className="slider"
          trackStyle={{ backgroundColor: '#a63535' }}
          onChange={event => console.log(event)} />
      </div>
    </div>
  )
}

export default Filter