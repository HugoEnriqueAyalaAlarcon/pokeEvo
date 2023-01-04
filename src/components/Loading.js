import { Spinner } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react'

function Loading() {
  return (
    <div>      <Spinner 
    color='danger'
  /></div>
  )
}

export default Loading