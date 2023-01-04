import React from 'react'
import { Spinner } from 'reactstrap';
import "./Card.css"
import Loading from './Loading';

const Card = ({name , img , loading}) => {

  console.log(loading);
  if(loading){
      return <Loading/>;
  }
  return (
    <div className='card'>
        <p className='card__name'>
            {name}
        </p>
        <div className='card__circle'></div>
        <img className='card__img' src={img} alt='pokemonImg' />
    </div>
  )
}

export {Card}