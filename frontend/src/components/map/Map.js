import React from 'react'

import MapGL, { Marker, FlyToInterpolator } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import StopMarker from '../map/StopMarker'

class Map extends React.Component {

  state = {
    zoom: 1,
    currentLocation: {
      latitude: 0,
      longitude: 0
    },
    clickedLocation: null,
    mapRef: null,
    transition: null,
    transitionDuration: null,
    transitionInterpolator: null
  }

  transition = {
    transitionDuration: 'auto',
    transitionInterpolator: new FlyToInterpolator({ speed: 1.2 })
  }

  componentDidMount() {
    // Sets a reference to the map so that it can be accessed for methods etc.
    this.setState({ mapRef: this.mapRef })
    // Get current location and go to position on map
    this.goToCurrentPosition()
  }

  goToCurrentPosition = () => {
    navigator.geolocation.getCurrentPosition(data => {
      const { latitude, longitude } = data.coords
      // this.setState({ currentLocation: { latitude, longitude }, zoom: 12 })
      this.mapRef.getMap().flyTo({ center: [longitude, latitude], zoom: 11, speed: 1 })

    })
  }

  componentDidUpdate(prevProps) {
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
    console.log(event)
    // This if block stop the scroll zoom from moving the map
    // if (event.zoom === this.state.zoom) {
      const { latitude, longitude } = event
      this.setState({ currentLocation: { latitude, longitude }, })
    // }

    // Gets NE and SW bounds of visible area
    if (this.state.mapRef && this.props.getBounds) {
      try {
        const bounds = this.state.mapRef.getMap().getBounds()
        this.props.getBounds(bounds)
      } catch (err) {
        console.log(err)
      }
    }
  }

  scrollToZoom = event => {
    const scrollSpeed = event.srcEvent.deltaY
    if (scrollSpeed >  5) this.setState({ zoom: this.state.zoom - 0.05 })
    if (scrollSpeed < -5) this.setState({ zoom: this.state.zoom + 0.05 })
  }

  placeMarker = ({ lngLat }) => {
    const clickedLocation = {
      latitude: lngLat[1],
      longitude: lngLat[0]
    }
    this.setState({ clickedLocation })
    if (this.props.showGuess) this.props.showGuess(clickedLocation)
  }

  render() {

    const { zoom, currentLocation, clickedLocation } = this.state
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
        onDblClick={this.placeMarker}
        getCursor={(() => 'arrow')}
        onWheel={this.scrollToZoom}
        transitionDuration={this.state.transitionDuration}
        transitionInterpolator={this.state.transitionInterpolator}
      >
        {route && 
          <Marker latitude={route.stops[stop].location.latitude} longitude={route.stops[stop].location.longitude}>
            <StopMarker number={stop} />
          </Marker>
        }
        {clickedLocation &&
          <Marker latitude={clickedLocation.latitude} longitude={clickedLocation.longitude}>
            <div className="marker" />
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
        <div className="locator" onClick={this.goToCurrentPosition}>
          <img src={require('../../images/locate.png')} alt="locate button"/>
        </div>
      </MapGL>
    )
  }
}

export default Map