import React from 'react'

function Popup({text , className}) {
  return (
    <div className={` ${className} top-24  p-2 w-[200px] absolute z-10 right-7 rounded-lg shadow-md border`}>
    {text}
  </div>
  )
}

export default Popup