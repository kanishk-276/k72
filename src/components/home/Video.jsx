// Video.js
import React from 'react'

const Video = ({ className = "" }) => {
  return (
    <video
      className={`w-full h-full object-cover ${className}`} 
      autoPlay
      loop
      muted
      playsInline
      src="/video.mp4"
    />
  )
}

export default Video
