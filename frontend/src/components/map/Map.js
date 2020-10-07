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
    this.goToCurrentPosition()
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
    if (scrollSpeed >  5) this.setState({ zoom: this.state.zoom - 0.05 })
    if (scrollSpeed < -5) this.setState({ zoom: this.state.zoom + 0.05 })
    // const viewport = { latitude: event.lngLat[1], longitude: event.lngLat[0] }
    // this.setState({ viewport })
  }

  placeMarker = ({ lngLat }) => {
    if (!this.props.getLocation) return

    const clickedLocation = {
      latitude: lngLat[1],
      longitude: lngLat[0]
    }
    this.setState({ clickedLocation })
    this.props.getLocation(clickedLocation)
  }

  render() {

    const { zoom, viewport, clickedLocation, autoTransition } = this.state
    const { results, route, stop, clickMarker } = this.props

    return (
      <MapGL
        ref={map => this.mapRef = map}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
        mapStyle='mapbox://styles/sriramsiv/ckfqhispj079919t8xxbwa6t7'
        width={'100%'} height={'100%'}
        {...viewport}
        zoom={zoom}
        // doubleClickZoom={false}
        onViewportChange={this.moveMapView}
        onDblClick={this.placeMarker}
        getCursor={(() => 'arrow')}
        onWheel={this.scrollToZoom}
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
        {results && !autoTransition && results.map((quest, i) => {
          const { latitude, longitude } = quest.stops[0].location
          const marker =
            <Marker key={i} latitude={latitude} longitude={longitude}>
              {quest.selected
                ? <StopMarker />
                : < div className="marker" onClick={() => clickMarker(quest)} />}
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