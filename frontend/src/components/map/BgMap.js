import React from 'react'

import MapGL from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

const BgMap = ({ latLng }) => {

  const style = {
    width: '100vw',
    height: '100vh',
    position: 'fixed',
    top: 0,
    zIndex: -10,
    opacity: 0.3,
    pointerEvents: 'none'
  }

  return (
    <div style={style}>
      <MapGL
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
        mapStyle='mapbox://styles/sriramsiv/ckfqhispj079919t8xxbwa6t7'
        width={'100%'} height={'100%'}
        latitude={latLng[0]}
        longitude={latLng[1]}
        zoom={5}
      />
    </div>
  )
}

export default BgMap