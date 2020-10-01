import React from 'react'

import MapGL from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

class Map extends React.Component {

  state = {
    zoom: 10,
    currentLocation: {
      lat: 0,
      lng: 0
    }
  }

  render() {

    const { zoom, currentLocation } = this.state

    console.log(process.env.REACT_APP_MAPBOX_ACCESS_TOKEN)

    return (
      <MapGL
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
        width={'100vw'}
        height={'100vh'}
        mapStyle='mapbox://styles/sriramsiv/ckfqhispj079919t8xxbwa6t7'
        latitude={currentLocation.lat}
        longitude={currentLocation.lng}
        zoom={zoom}
        doubleClickZoom={false}
        onViewportChange={this.moveMapView}
        onDblClick={this.placeMarker}
        getCursor={(() => 'arrow')}
        onWheel={this.scrollToZoom}

      />
    )
  }
}

export default Map