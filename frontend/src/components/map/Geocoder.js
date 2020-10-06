import React from 'react'
import GeocoderGL from 'react-mapbox-gl-geocoder'

class Geocoder extends React.Component {
  render() {

    const { selectLocation, initialValue } = this.props
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
}

export default Geocoder