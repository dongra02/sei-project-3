import React from 'react'
import Slider, { Range } from 'rc-slider'
import 'rc-slider/assets/index.css'

const Filter = ({ location, theme, time, handleChange }) => {
  return (
    <div className="filters">
      <div>
        <label htmlFor="location">Location :</label>
        <input id="location" type="text" value={location} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="theme">Theme :</label>
        <select id="theme" value={theme} onChange={handleChange} >
          <option value="adventure">adventure</option>
          <option value="horror">horror</option>
        </select>
      </div>
      <div>
        <label htmlFor="time">Time :</label>
        <input id="time" type="range" value={time} onChange={handleChange} />
      </div>
    </div>
  )
}

export default Filter