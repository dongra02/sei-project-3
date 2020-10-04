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
    fontSize: '1em',
    lineHeight: '1em',
    paddingLeft: '3px'
  }

  return (
    <div style={container}>
      <div style={border} />
      <div style={point} />
      <div style={inner}>{number}</div>
    </div>
  )
}

export default StopMarker