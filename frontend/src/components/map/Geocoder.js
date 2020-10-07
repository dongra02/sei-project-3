import React from 'react'
import GeocoderGL from 'react-mapbox-gl-geocoder'

class Geocoder extends React.Component {

  componentDidUpdate = () => {
    console.log('geo updating')
  }

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
        viewport={{ view: 0 }} // TODO put in real object
        initialInputValue={initialValue}
      />
    )
  }
}

export default Geocoder