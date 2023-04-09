import React from 'react'
import logo from "../assets/images/logo-images.jpg";
import { Link } from 'react-router-dom'
import { Button, Card } from 'react-bootstrap';

const PageNotFound = () => {
  return (
    <section id="pagenotfound" className="centerAlignWrap text-center">  
    <Card className="px-4 pb-4">
        <Card.Img variant="top" src={logo} />
        <Card.Body>
        <h1 className='text-danger'>Opps!</h1>
        <h3 className='text-secondary'>Page Not Found</h3>
        <hr className='mt-3 mb-3' />
        <Card.Link as={Link} to="/">        
          <Button variant='secondary'>Back to Home</Button>        
        </Card.Link>
          </Card.Body> 
             
        </Card>
    </section>
  )
}

export default PageNotFound
