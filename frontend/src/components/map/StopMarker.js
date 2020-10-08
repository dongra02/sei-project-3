import React from 'react'

const StopMarker = ({ number }) => {
  const container = {
    position: 'relative',
    top: '-25px',
    left: '-9px'
  }
  const border = {
    width: '20px',
    height: '20px',
    clipPath: 'circle()',
    backgroundColor: '#050'
  }
  const point = {
    backgroundColor: '#050',
    clipPath: 'polygon(50% 100%, 0% 0%, 100% 0%)',
    position: 'absolute',
    top: '14px',
    left: '1px',
    width: '18px',
    height: '13px'
  }
  const inner = {
    position: 'absolute',
    top: '2px',
    left: '2px',
    width: '16px',
    height: '16px',
    clipPath: 'circle()',
    backgroundColor: '#f8f6f3',
    color: '#333',
    fontSize: '1.1em',
    lineHeight: '0.8em',
    paddingLeft: '3px',
    fontFamily: '\'Sanshita Swashed\', cursive'
  }
  const dot = {
    position: 'absolute',
    top: '3px',
    left: '3px',
    width: '10px',
    height: '10px',
    backgroundColor: '#050',
    clipPath: 'circle()'
  }

  return (
    <div style={container}>
      <div style={border} />
      <div style={point} />
      <div style={inner}>
        {number > 0 ? 'number'
          : <div style={dot} />}
      </div>
    </div>
  )
}

export default StopMarker