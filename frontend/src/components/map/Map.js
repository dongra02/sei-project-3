import React from 'react'

import MapGL from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'  

class Map extends React.Component {

  state = {
    zoom: 5,
    currentLocation: {
      latitude: 0,
      longitude: 0
    }
  }

  moveMapView = (event) => {
    if (event.zoom === this.state.zoom) {
      const { latitude, longitude } = event
      this.setState({
        currentLocation: { latitude, longitude }
      })
    }
  }

  scrollToZoom = event => {
    const scroll = event.srcEvent.deltaY
    event.lngLat = [this.state.currentLocation.longitude, this.state.currentLocation.latitude]
    if (scroll > 5) this.setState({ zoom: this.state.zoom - 0.05 })
    if (scroll < -5) this.setState({ zoom: this.state.zoom + 0.05 })
  }

  render() {

    const { zoom, currentLocation } = this.state

    return (
      <MapGL
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
        width={'100%'}
        height={'100%'}
        mapStyle='mapbox://styles/sriramsiv/ckfqhispj079919t8xxbwa6t7'
        latitude={currentLocation.latitude}
        longitude={currentLocation.longitude}
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