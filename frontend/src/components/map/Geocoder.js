import React from 'react'
import GeocoderGL from 'react-mapbox-gl-geocoder'

const Geocoder = (props) => {
  const input = (props) => <input {...props} placeholder="Location" value="" />
  return (
    <GeocoderGL
      className="geocoder"
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
      onSelected={props.selectLocation}
      updateInputOnSelect={true}
      inputComponent={input}
      viewport={{ view: 0 }} // TODO put in real object
    />
  )
}

export default Geocoder