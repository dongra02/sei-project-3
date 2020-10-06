import React from 'react'
import GeocoderGL from 'react-mapbox-gl-geocoder'

const Geocoder = (props) => {
  const { selectLocation, initialValue } = props
  const input = (inputProps) => <input {...inputProps} placeholder="Location" />
  return (
    <GeocoderGL
      className="geocoder"
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
      onSelected={selectLocation}
      updateInputOnSelect={true}
      inputComponent={input}
      initialInputValue={initialValue}
      viewport={{ view: 0 }} // TODO put in real object
    />
  )
}

export default Geocoder