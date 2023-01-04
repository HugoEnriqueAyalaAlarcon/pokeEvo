import React from 'react'


const Button = ({text , handleClick}) => {
  return (
    <div className="btn-container">
        <button className="button"
        onClick={handleClick}>
        {text}
        </button>
    </div>
  )
}

export {Button}