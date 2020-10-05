import React from 'react'

import MapGL from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

const BgMap = () => {

  const style = {
    width: '100vw',
    height: '100vh',
    position: 'fixed',
    top: 0,
    zIndex: -10,
    opacity: 0.3
  }

  const latitude = (Math.random() * 180) - 90
  const longitude = (Math.random() * 360) - 180

  return (
    <div style={style}>
      <MapGL
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
        mapStyle='mapbox://styles/sriramsiv/ckfqhispj079919t8xxbwa6t7'
        width={'100%'} height={'100%'}
        latitude={latitude}
        longitude={longitude}
        zoom={5}
      />
    </div>
  )
}

export default BgMap