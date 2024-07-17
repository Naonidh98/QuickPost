import React from 'react'

export const Circle = ({width,height,from,to,zindex}) => {
  return (
    <div className={`${width} ${height} ${zindex} relative rounded-full bg-gradient-to-r from-[${from}] to-[${to}]`}></div>
  )
}
