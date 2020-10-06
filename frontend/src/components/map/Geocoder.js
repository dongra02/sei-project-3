import React from 'react'
import GeocoderGL from 'react-mapbox-gl-geocoder'

const Geocoder = (props) => {

  return (
    <GeocoderGL
      className="geocoder"
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
      onSelected={props.selectLocation}
      updateInputOnSelect={true}
      initialInputValue={ props.placeName ? props.placeName : null }
      // inputComponent={input}
      viewport={{ view: 0 }} // TODO put in real object
    />
  )
}

export default Geocoder