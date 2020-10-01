import React from 'react'

import MapGL from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'  

class Map extends React.Component {

  state = {
    zoom: 10,
    currentLocation: {
      latitude: 0,
      longitude: 0
    }
  }

  mapObject = null

  componentDidMount() {
    this.mapObject = this.mapRef.getMap()
    // console.log(this.mapObject.getBounds())

    navigator.geolocation.getCurrentPosition(data => {
      const currentLocation = {
        latitude: data.coords.latitude,
        longitude: data.coords.longitude
      }
      this.setState({ currentLocation })
    })
  }

  moveMapView = event => {
    if (event.zoom === this.state.zoom) {
      const currentLocation = { latitude: event.latitude, longitude: event.longitude }
      this.setState({ currentLocation })
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
        ref={ map => this.mapRef = map }
      />
    )
  }
}

export default Map