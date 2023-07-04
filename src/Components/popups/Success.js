import React from 'react'
import Alert from 'react-bootstrap/Alert';
function Success({message}) {
  return (
    <Alert variant='success'>
       {message}
    </Alert>
  )
}

export default Success