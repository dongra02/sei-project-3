import React from 'react'

import MapGL, { Marker } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'  

class Map extends React.Component {

  state = {
    zoom: 10,
    currentLocation: {
      latitude: 0,
      longitude: 0
    },
    mapRef: null
  }


  componentDidMount = () => {
    this.setState({ mapRef: this.mapRef })
    
    if (!this.props.selectedQuest) {
      navigator.geolocation.getCurrentPosition(data => {
        const currentLocation = {
          latitude: data.coords.latitude,
          longitude: data.coords.longitude
        }
        this.setState({ currentLocation })
      })
    }
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps.selectedQuest !== this.props.selectedQuest) {
      console.log(this.props.selectedQuest)
      const currentLocation = {
        latitude: this.props.selectedQuest.stops[0].location.latitude,
        longitude: this.props.selectedQuest.stops[0].location.longitude
      }
      this.setState({ zoom: 13, currentLocation })
    }
  }

  moveMapView = async event => {
    if (event.zoom === this.state.zoom) {
      const currentLocation = { latitude: event.latitude, longitude: event.longitude }
      this.setState({ currentLocation })
    }

    // Gets NE and SW bounds
    if (this.state.mapRef) {
      const bounds = this.state.mapRef.getMap().getBounds()
      this.props.getBounds(bounds)
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
    const { searchResults, selectedQuest, startQuest } = this.props

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
      >
        {searchResults &&
          searchResults.map((quest, i) => (
            
            <Marker
              key={i}
              latitude={quest.stops[0].location.latitude}
              longitude={quest.stops[0].location.longitude}>
              {selectedQuest && selectedQuest._id === quest._id
                ? <div className="marker-select" onClick={() => startQuest(quest._id)}>GO!</div>
                : <div className="marker" />
              }
            </Marker>
          ))}
      </MapGL>
    )
  }
}

export default Map