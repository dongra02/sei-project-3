import React from 'react'

import MapGL, { Marker } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import StopMarker from '../map/StopMarker'

class Map extends React.Component {

  state = {
    zoom: 1,
    viewport: {
      latitude: 0,
      longitude: 0
    },
    clickedLocation: null,
    mapRef: null,
    autoTransition: false
  }

  componentDidMount = () => {
    // Sets a reference to the map so that it can be accessed for methods etc.
    this.setState({ mapRef: this.mapRef })
    // Get current location and go to position on map
    // this.goToCurrentPosition()
    if (this.props.flyTo) {
      this.flyTo(this.props.flyTo)
    }
  }

  goToCurrentPosition = () => {
    navigator.geolocation.getCurrentPosition(data => {
      this.flyTo(data.coords)
    })
  }

  flyTo = (coords) => {
    const { latitude, longitude } = coords
    this.setState({ autoTransition: coords }, () => {
      this.mapRef.getMap().flyTo({ center: [longitude, latitude], zoom: 11, speed: 2 })
      
      this.mapRef.getMap().on('moveend', () => {
        if (this.state.autoTransition) {
          const { latitude, longitude } = this.state.autoTransition
          this.setState({ viewport: { latitude, longitude }, autoTransition: false, zoom: 11  })
        }
      })
    })
  }

  componentDidUpdate = () => {
    // Go to location on map if requested to by parent component
    // Only called once as the flyTo prop should always be nulled as a callback function to setState when used
    if (this.props.flyTo) {
      this.flyTo(this.props.flyTo)
    }
  }

  moveMapView = event => {
    // This if block stop the scroll zoom from moving the map
    if (event.zoom === this.state.zoom) {
      const { latitude, longitude } = event
      this.setState({ viewport: { latitude, longitude } })
    }

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
    // Set scrolling dead zone
    if (Math.abs(scrollSpeed) < 1) return

    let zoom = this.state.zoom
    zoom -= 0.005 * scrollSpeed
    zoom = Math.max(Math.min(zoom, 20), 1)
    this.setState({ zoom })
  }

  placeMarker = ({ lngLat }) => {
    if (!this.props.getLocation) return

    const clickedLocation = {
      latitude: lngLat[1],
      longitude: lngLat[0]
    }
    // this.setState({ clickedLocation })
    this.props.getLocation(clickedLocation)
  }

  render() {

    const { zoom, viewport, clickedLocation, autoTransition } = this.state
    const { results, clickMarker, route } = this.props

    return (
      <MapGL
        ref={map => this.mapRef = map}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
        mapStyle='mapbox://styles/sriramsiv/ckfqhispj079919t8xxbwa6t7'
        width={'100%'} height={'100%'}
        {...viewport}
        zoom={zoom}
        onViewportChange={this.moveMapView}
        onDblClick={this.placeMarker}
        getCursor={(() => 'arrow')}
        onWheel={this.scrollToZoom}
      >
        {route && route.stops.map((stop, i) => {
          // TODO fix this bug -> doesnt display the start location
          if (!stop) return null
          const marker =
            <Marker key={i} latitude={stop.location.latitude} longitude={stop.location.longitude}>
              <StopMarker number={i} altColor={stop.altColor} />
            </Marker>
          return marker
        })}
        {clickedLocation &&
          <Marker latitude={clickedLocation.latitude} longitude={clickedLocation.longitude}>
            <div className="marker" />
          </Marker>
        }
        {results && !autoTransition && results.map((place, i) => {
          const { latitude, longitude } = place.location
          const marker =
            <Marker key={i} latitude={latitude} longitude={longitude}>
              {place.selected
                ? <StopMarker />
                // TODO fix this crappy ternary
                : < div className="marker" onClick={clickMarker ? () => clickMarker(place) : null} />}
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