import React from 'react'

import MapGL, { Marker } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import StopMarker from '../map/StopMarker'

class Map extends React.Component {

  state = {
    zoom: 1,
    currentLocation: {
      latitude: 0,
      longitude: 0
    },
    mapRef: null
  }

  componentDidMount = () => {
    // Sets a reference to the map so that it can be accessed for methods etc.
    this.setState({ mapRef: this.mapRef })

    // Get current location and go to position on map
    navigator.geolocation.getCurrentPosition(data => {
      const { latitude, longitude } = data.coords
      this.setState({ currentLocation: { latitude, longitude } })
    })
  }

  componentDidUpdate = () => {
    // Go to location on map if requested to by parent component
    // Only called once as the flyTo prop should always be nulled as a callback function to setState when used
    if (this.props.flyTo) {
      const { latitude, longitude } = this.props.flyTo
      this.setState({
        zoom: 13,
        currentLocation: { latitude, longitude }
      })
    }
  }

  moveMapView = event => {
    // This if block stop the scroll zoom from moving the map
    if (event.zoom === this.state.zoom) {
      const { latitude, longitude } = event
      this.setState({ currentLocation: { latitude, longitude } })
    }

    // Gets NE and SW bounds of visible area
    if (this.state.mapRef) {
      const bounds = this.state.mapRef.getMap().getBounds()
      this.props.getBounds(bounds)
    }
  }

  scrollToZoom = event => {
    const scrollSpeed = event.srcEvent.deltaY
    if (scrollSpeed >  5) this.setState({ zoom: this.state.zoom - 0.05 })
    if (scrollSpeed < -5) this.setState({ zoom: this.state.zoom + 0.05 })
  }

  render() {

    const { zoom, currentLocation } = this.state
    const { results, startQuest, route, stop } = this.props

    return (
      <MapGL
        ref={map => this.mapRef = map}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
        mapStyle='mapbox://styles/sriramsiv/ckfqhispj079919t8xxbwa6t7'
        width={'100%'} height={'100%'}
        latitude={currentLocation.latitude}
        longitude={currentLocation.longitude}
        zoom={zoom}
        doubleClickZoom={false}
        onViewportChange={this.moveMapView}
        // onDblClick={this.placeMarker}
        getCursor={(() => 'arrow')}
        onWheel={this.scrollToZoom}
      >
        {route && 
          <Marker latitude={route.stops[stop].location.latitude} longitude={route.stops[stop].location.longitude}>
            <StopMarker number={stop} />
          </Marker>
        }
        {results && results.map((quest, i) => {
          const { latitude, longitude } = quest.stops[0].location
          // TODO onClick *not-selected* -> open quest details
          const handleClick = quest.selected ? () => startQuest(quest._id) : null
          const marker =
            <Marker key={i} latitude={latitude} longitude={longitude}>
              <div className={`marker ${quest.selected ? 'select' : ''}`} onClick={handleClick} />
              {quest.selected && <div className="marker-border" />}
            </Marker>
          return marker
        })}
      </MapGL>
    )
  }
}

export default Map